import { useState, useEffect } from 'react'
import { userAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import Toast from '../components/Toast'
import useToast from '../hooks/useToast'

const SpinSVG = () => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
)

const ActivityCard = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl flex-shrink-0`}>{icon}</div>
    <div>
      <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
)

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent hover:border-orange-300 transition-all duration-200 placeholder-gray-400'

const Field = ({ label, value, editing, onChange, type = 'text', options, textarea }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
    {editing ? (
      textarea ? (
        <textarea value={value} onChange={onChange} rows={3} className={`${inputCls} resize-none`} />
      ) : options ? (
        <select value={value} onChange={onChange} className={inputCls}>
          {options.map(o => <option key={o} value={o}>{o || 'Not specified'}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={onChange} className={inputCls} />
      )
    ) : (
      <p className="text-sm text-gray-800 font-medium px-1 py-1 min-h-[2rem]">
        {value || <span className="text-gray-400 italic">Not set</span>}
      </p>
    )}
  </div>
)

const Profile = () => {
  const { user, updateUser } = useAuth()
  const { toasts, addToast, removeToast } = useToast()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState(null)
  const [draft, setDraft] = useState({})

  useEffect(() => {
    userAPI.getProfile()
      .then(({ data }) => {
        setProfile(data)
        setDraft({
          name: data.name || '',
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
          gender: data.gender || '',
          location: data.location || '',
          bio: data.bio || '',
        })
      })
      .catch(() => {
        // Fall back to auth context data so page is never blank
        if (user) {
          const fallback = { ...user, savedItems: [], quizScores: [] }
          setProfile(fallback)
          setDraft({
            name: user.name || '',
            dateOfBirth: '',
            gender: '',
            location: '',
            bio: '',
          })
          addToast('Could not reach server — showing cached profile', 'info')
        } else {
          addToast('Failed to load profile', 'error')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const set = (field) => (e) => setDraft(d => ({ ...d, [field]: e.target.value }))

  const handleSave = async () => {
    setSaving(true)
    try {
      const { data } = await userAPI.updateProfile(draft)
      setProfile(p => ({ ...p, ...data }))
      updateUser({ ...user, name: data.name })
      setEditing(false)
      addToast('Profile updated successfully')
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update profile', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setDraft({
      name: profile.name || '',
      dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
      gender: profile.gender || '',
      location: profile.location || '',
      bio: profile.bio || '',
    })
    setEditing(false)
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <svg className="animate-spin w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <p className="text-sm text-gray-400">Loading your profile...</p>
    </div>
  )

  if (!profile) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-4">
      <span className="text-5xl">😕</span>
      <h2 className="text-lg font-bold text-gray-700">Could not load profile</h2>
      <p className="text-sm text-gray-400 max-w-sm">
        Make sure the backend server is running on port 5000 and you are logged in.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-400 text-white
                   font-semibold rounded-xl shadow-md hover:scale-105 transition-all duration-200 text-sm">
        Retry
      </button>
    </div>
  )

  const initials = profile.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-10 px-4">
      <Toast toasts={toasts} onRemove={removeToast} />
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-orange-500 to-amber-400" />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-12 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-300 border-4 border-white shadow-lg flex items-center justify-center text-white text-2xl font-extrabold flex-shrink-0">
                {initials}
              </div>
              <div className="flex gap-2 mt-14">
                {editing ? (
                  <>
                    <button onClick={handleCancel} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
                    <button onClick={handleSave} disabled={saving}
                      className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-xl shadow-md hover:scale-105 transition-all disabled:opacity-70 flex items-center gap-2">
                      {saving ? <><SpinSVG />Saving...</> : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)} className="px-5 py-2 text-sm font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-all">
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
            <h2 className="text-xl font-extrabold text-gray-800">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
            {profile.location && <p className="text-xs text-gray-400 mt-1">📍 {profile.location}</p>}
            <span className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full ${profile.role === 'admin' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>
              {profile.role}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">Activity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ActivityCard icon="❤️" label="Saved Festivals" value={profile.savedItems?.length || 0} color="bg-red-50" />
            <ActivityCard icon="🎯" label="Quiz Scores" value={profile.quizScores?.length || 0} color="bg-yellow-50" />
            <ActivityCard icon="📤" label="Contributions" value="—" color="bg-orange-50" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-5">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name" value={editing ? draft.name : profile.name} editing={editing} onChange={set('name')} />
            <Field label="Date of Birth" type="date" value={editing ? draft.dateOfBirth : (profile.dateOfBirth?.split('T')[0] || '')} editing={editing} onChange={set('dateOfBirth')} />
            <Field label="Gender" value={editing ? draft.gender : profile.gender} editing={editing} onChange={set('gender')} options={['', 'male', 'female', 'other']} />
            <Field label="Location" value={editing ? draft.location : profile.location} editing={editing} onChange={set('location')} />
          </div>
          <div className="mt-5">
            <Field label="Bio" value={editing ? draft.bio : profile.bio} editing={editing} onChange={set('bio')} textarea />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
