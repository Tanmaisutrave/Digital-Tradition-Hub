import { useState, useEffect } from 'react'
import Sidebar from '../components/admin/Sidebar'
import OverviewSection from '../components/admin/sections/OverviewSection'
import FestivalsSection from '../components/admin/sections/FestivalsSection'
import ContributionsSection from '../components/admin/sections/ContributionsSection'
import UsersSection from '../components/admin/sections/UsersSection'
import Toast from '../components/Toast'
import useToast from '../hooks/useToast'
import { festivalAPI, contributionAPI, userAPI } from '../services/api'

const sectionTitles = { overview: 'Overview', festivals: 'Festivals', contributions: 'Contributions', users: 'Users' }

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { toasts, addToast, removeToast } = useToast()

  const [festivals, setFestivals] = useState([])
  const [contributions, setContributions] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch data when section changes
  useEffect(() => {
    const fetchSection = async () => {
      setLoading(true)
      try {
        if (activeSection === 'festivals' || activeSection === 'overview') {
          const { data } = await festivalAPI.getAll({ status: undefined, limit: 100 })
          setFestivals(data.festivals || [])
        }
        if (activeSection === 'contributions' || activeSection === 'overview') {
          const { data } = await contributionAPI.getAll({ limit: 100 })
          setContributions(data.contributions || [])
        }
        if (activeSection === 'users') {
          const { data } = await userAPI.getAllUsers()
          setUsers(data)
        }
      } catch (err) {
        addToast(err.response?.data?.message || 'Failed to load data', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchSection()
  }, [activeSection])

  // Normalise festival for admin table
  const normalisedFestivals = festivals.map(f => ({
    id: f._id,
    name: f.title,
    region: f.region,
    category: f.category,
    status: f.status === 'published' ? 'Published' : 'Draft',
    date: f.createdAt?.split('T')[0] || '',
  }))

  const normalisedContributions = contributions.map(c => ({
    id: c._id,
    title: c.title,
    author: c.createdBy?.name || 'Unknown',
    region: c.region,
    category: c.category,
    status: c.status.charAt(0).toUpperCase() + c.status.slice(1),
    date: c.createdAt?.split('T')[0] || '',
  }))

  const normalisedUsers = users.map(u => ({
    id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    joined: u.createdAt?.split('T')[0] || '',
    contributions: 0,
  }))

  const handleDelete = async (type, id) => {
    try {
      if (type === 'festivals') {
        await festivalAPI.delete(id)
        setFestivals(p => p.filter(i => i._id !== id))
        addToast('Festival deleted')
      }
      if (type === 'contributions') {
        await contributionAPI.delete(id)
        setContributions(p => p.filter(i => i._id !== id))
        addToast('Contribution deleted')
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Delete failed', 'error')
    }
  }

  const handleContributionStatus = async (id, status) => {
    try {
      await contributionAPI.review(id, { status: status.toLowerCase() })
      setContributions(p => p.map(c => c._id === id ? { ...c, status: status.toLowerCase() } : c))
      addToast(`Contribution ${status.toLowerCase()}`)
    } catch (err) {
      addToast(err.response?.data?.message || 'Action failed', 'error')
    }
  }

  const handleRoleChange = async (id, role) => {
    try {
      await userAPI.updateRole(id, role)
      setUsers(p => p.map(u => u._id === id ? { ...u, role } : u))
      addToast('User role updated')
    } catch (err) {
      addToast(err.response?.data?.message || 'Role update failed', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toast toasts={toasts} onRemove={removeToast} />
      <Sidebar active={activeSection} onSelect={setActiveSection} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-white border-b border-orange-100 shadow-sm px-5 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 hover:bg-orange-100 transition-colors duration-200" aria-label="Open sidebar">
              ☰
            </button>
            <div>
              <h1 className="text-base font-bold text-gray-800">{sectionTitles[activeSection]}</h1>
              <p className="text-xs text-gray-400 hidden sm:block">Digital Tradition Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {loading && (
              <svg className="animate-spin w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            )}
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              🔐 Admin Panel
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-300 flex items-center justify-center text-white text-sm font-bold shadow-sm">A</div>
          </div>
        </header>

        <main className="flex-1 p-5 md:p-7 overflow-y-auto">
          {activeSection === 'overview' && (
            <OverviewSection festivals={normalisedFestivals} contributions={normalisedContributions} />
          )}
          {activeSection === 'festivals' && (
            <FestivalsSection
              data={normalisedFestivals}
              onDelete={handleDelete}
              onAdd={(created) => setFestivals(p => [created, ...p])}
              onUpdate={(updated) => setFestivals(p => p.map(f => f._id === updated._id ? updated : f))}
            />
          )}
          {activeSection === 'contributions' && (
            <ContributionsSection data={normalisedContributions} onDelete={handleDelete} onStatusChange={handleContributionStatus} />
          )}
          {activeSection === 'gallery' && (
            <GallerySection data={[]} onDelete={handleDelete} />
          )}
          {activeSection === 'users' && (
            <UsersSection data={normalisedUsers} onRoleChange={handleRoleChange} />
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
