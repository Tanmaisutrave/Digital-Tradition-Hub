import { useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import FestivalFormModal from '../FestivalFormModal'
import { festivalAPI } from '../../../services/api'

const statusStyle = {
  Published: 'bg-green-100 text-green-700',
  Draft: 'bg-gray-100 text-gray-600',
}

const FestivalsSection = ({ data, onDelete, onAdd, onUpdate }) => {
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editTarget, setEditTarget] = useState(null)   // null = closed, {} = add, {id,...} = edit
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)

  const filtered = data.filter((f) =>
    (f.name || f.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (f.region || '').toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async (payload) => {
    setSaving(true)
    try {
      if (editTarget?.id) {
        // Edit existing
        const { data: updated } = await festivalAPI.update(editTarget.id, payload)
        onUpdate && onUpdate(updated)
      } else {
        // Add new
        const { data: created } = await festivalAPI.create(payload)
        onAdd && onAdd(created)
      }
      setEditTarget(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save festival')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Manage Festivals</h2>
          <p className="text-sm text-gray-500 mt-0.5">{data.length} festivals total</p>
        </div>
        <button
          onClick={() => setEditTarget({})}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r
                     from-orange-500 to-amber-400 text-white text-sm font-semibold
                     shadow-md hover:from-orange-600 hover:to-amber-500 hover:shadow-orange-200
                     transition-all duration-200 self-start sm:self-auto hover:scale-105">
          ＋ Add Festival
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input type="text" placeholder="Search festivals..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-orange-200 bg-white text-sm
                     focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-orange-50 border-b border-orange-100">
                {['Festival', 'Region', 'Category', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {filtered.map((f) => (
                <tr key={f.id} className="hover:bg-orange-50/50 transition-colors duration-150">
                  <td className="px-5 py-3.5 font-medium text-gray-800 whitespace-nowrap">{f.name}</td>
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">📍 {f.region}</td>
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{f.category}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[f.status] || statusStyle.Draft}`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap">{f.date}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditTarget(f)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs
                                   font-medium hover:bg-blue-100 transition-colors duration-150">
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(f)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs
                                   font-medium hover:bg-red-100 transition-colors duration-150">
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-gray-400 text-sm">
                    No festivals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {editTarget !== null && (
        <FestivalFormModal
          festival={editTarget?.id ? editTarget : null}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
          loading={saving}
        />
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <ConfirmModal
          message={`Delete "${deleteTarget.name}"? This action cannot be undone.`}
          onConfirm={() => { onDelete('festivals', deleteTarget.id); setDeleteTarget(null) }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

export default FestivalsSection
