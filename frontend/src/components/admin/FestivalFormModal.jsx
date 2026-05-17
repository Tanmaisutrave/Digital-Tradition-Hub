import { useState, useEffect } from 'react'

const CATEGORIES = ['Festival', 'Harvest', 'Religious', 'Cultural', 'Ritual']
const REGIONS = ['North India', 'South India', 'East India', 'West India', 'Northeast India', 'Central India', 'Pan-India']
const COLORS = [
  { label: 'Orange → Yellow', value: 'from-orange-400 to-yellow-300' },
  { label: 'Pink → Purple', value: 'from-pink-400 to-purple-300' },
  { label: 'Green → Teal', value: 'from-green-400 to-teal-300' },
  { label: 'Yellow → Orange', value: 'from-yellow-400 to-orange-300' },
  { label: 'Red → Orange', value: 'from-red-400 to-orange-300' },
  { label: 'Amber → Red', value: 'from-amber-400 to-red-300' },
  { label: 'Emerald → Green', value: 'from-emerald-400 to-green-300' },
  { label: 'Lime → Yellow', value: 'from-lime-400 to-yellow-300' },
]

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent hover:border-orange-300 transition-all duration-200'
const labelCls = 'block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5'

const emptyForm = {
  title: '', description: '', region: '', category: 'Festival',
  tagline: '', story: '', whyCelebrate: '',
  traditions: '', funFacts: '', status: 'published', color: 'from-orange-400 to-yellow-300',
}

const FestivalFormModal = ({ festival, onSave, onClose, loading }) => {
  const isEdit = !!festival
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (festival) {
      setForm({
        title: festival.name || festival.title || '',
        description: festival.description || '',
        region: festival.region || '',
        category: festival.category || 'Festival',
        tagline: festival.tagline || '',
        story: festival.story || '',
        whyCelebrate: festival.whyCelebrate || '',
        traditions: Array.isArray(festival.traditions) ? festival.traditions.join('\n') : '',
        funFacts: Array.isArray(festival.funFacts) ? festival.funFacts.map(f => f.fact || f).join('\n') : '',
        status: festival.status === 'Published' ? 'published' : festival.status || 'published',
        color: festival.color || 'from-orange-400 to-yellow-300',
      })
    }
  }, [festival])

  const set = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.region) e.region = 'Region is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      region: form.region,
      category: form.category,
      tagline: form.tagline.trim(),
      story: form.story.trim(),
      whyCelebrate: form.whyCelebrate.trim(),
      traditions: form.traditions.split('\n').map(t => t.trim()).filter(Boolean),
      funFacts: form.funFacts.split('\n').map(f => f.trim()).filter(Boolean).map(fact => ({
        fact, color: 'bg-orange-50 border-orange-200'
      })),
      status: form.status,
      color: form.color,
    }
    onSave(payload)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {isEdit ? '✏️ Edit Festival' : '＋ Add New Festival'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEdit ? 'Update festival details' : 'Add a new festival to the platform'}
            </p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

          {/* Title */}
          <div>
            <label className={labelCls}>Festival Title *</label>
            <input value={form.title} onChange={set('title')} placeholder="e.g. Diwali" className={inputCls} />
            {errors.title && <p className="text-xs text-red-500 mt-1">⚠ {errors.title}</p>}
          </div>

          {/* Region + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Region *</label>
              <select value={form.region} onChange={set('region')} className={inputCls}>
                <option value="">Select region</option>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.region && <p className="text-xs text-red-500 mt-1">⚠ {errors.region}</p>}
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select value={form.category} onChange={set('category')} className={inputCls}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Status + Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Status</label>
              <select value={form.status} onChange={set('status')} className={inputCls}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Card Color</label>
              <select value={form.color} onChange={set('color')} className={inputCls}>
                {COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className={labelCls}>Tagline</label>
            <input value={form.tagline} onChange={set('tagline')} placeholder="Short catchy tagline" className={inputCls} />
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description *</label>
            <textarea value={form.description} onChange={set('description')} rows={3}
              placeholder="Brief description of the festival..." className={`${inputCls} resize-none`} />
            {errors.description && <p className="text-xs text-red-500 mt-1">⚠ {errors.description}</p>}
          </div>

          {/* Story */}
          <div>
            <label className={labelCls}>Story (storytelling format)</label>
            <textarea value={form.story} onChange={set('story')} rows={4}
              placeholder="Tell the story behind this festival..." className={`${inputCls} resize-none`} />
          </div>

          {/* Why Celebrate */}
          <div>
            <label className={labelCls}>Why We Celebrate</label>
            <textarea value={form.whyCelebrate} onChange={set('whyCelebrate')} rows={2}
              placeholder="Significance and reason for celebration..." className={`${inputCls} resize-none`} />
          </div>

          {/* Traditions */}
          <div>
            <label className={labelCls}>Traditions (one per line)</label>
            <textarea value={form.traditions} onChange={set('traditions')} rows={3}
              placeholder={'Lighting diyas\nExchanging sweets\nPerforming Lakshmi Puja'} className={`${inputCls} resize-none`} />
          </div>

          {/* Fun Facts */}
          <div>
            <label className={labelCls}>Fun Facts (one per line)</label>
            <textarea value={form.funFacts} onChange={set('funFacts')} rows={3}
              placeholder={'Diwali spans five days\nOver 1 billion people celebrate it'} className={`${inputCls} resize-none`} />
          </div>

        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-orange-100 flex gap-3 shrink-0">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-white text-sm font-semibold shadow-md hover:from-orange-600 hover:to-amber-500 transition-all disabled:opacity-70 flex items-center justify-center gap-2">
            {loading ? (
              <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>Saving...</>
            ) : isEdit ? '✅ Update Festival' : '＋ Add Festival'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FestivalFormModal
