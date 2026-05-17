import { useState } from 'react'
import ConfirmModal from '../ConfirmModal'

const statusStyle = {
  Pending:  'bg-yellow-100 text-yellow-700',
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-600',
}

const ContributionsSection = ({ data, onDelete, onStatusChange }) => {
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? data : data.filter((c) => c.status === filter)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Manage Contributions</h2>
          <p className="text-sm text-gray-500 mt-0.5">{data.length} submissions total</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Pending', 'Approved', 'Rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                ${filter === s
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-500 border-orange-200 hover:border-orange-400'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <div key={c.id}
            className="bg-white rounded-2xl border border-orange-100 shadow-sm px-5 py-4
                       hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-800 text-sm">{c.title}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[c.status]}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  👤 {c.author} · 📍 {c.region} · 🏷️ {c.category} · 📅 {c.date}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {c.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => onStatusChange(c.id, 'Approved')}
                      className="px-3 py-1.5 rounded-lg bg-green-50 text-green-600 text-xs
                                 font-semibold hover:bg-green-100 transition-colors duration-150"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => onStatusChange(c.id, 'Rejected')}
                      className="px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs
                                 font-semibold hover:bg-red-100 transition-colors duration-150"
                    >
                      ✕ Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => setDeleteTarget(c)}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-500 text-xs
                             font-medium hover:bg-red-50 hover:text-red-500 transition-colors duration-150"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-2xl border border-orange-100">
            No contributions found.
          </div>
        )}
      </div>

      {deleteTarget && (
        <ConfirmModal
          message={`Delete "${deleteTarget.title}"? This action cannot be undone.`}
          onConfirm={() => { onDelete('contributions', deleteTarget.id); setDeleteTarget(null) }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

export default ContributionsSection
