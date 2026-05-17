import DashboardCard from '../DashboardCard'

const recentActivity = [
  { icon: '✍️', text: 'New contribution submitted', time: '2 hours ago', color: 'text-purple-500' },
  { icon: '👤', text: 'New user registered', time: '5 hours ago', color: 'text-blue-500' },
  { icon: '🎉', text: 'Festival published', time: '1 day ago', color: 'text-orange-500' },
  { icon: '🖼️', text: 'Gallery item added', time: '2 days ago', color: 'text-green-500' },
  { icon: '✅', text: 'Contribution approved', time: '3 days ago', color: 'text-teal-500' },
]

const OverviewSection = ({ festivals = [], contributions = [] }) => {
  const statsData = [
    { id: 'festivals', label: 'Total Festivals', value: festivals.length, icon: '🎉', color: 'orange' },
    { id: 'contributions', label: 'Contributions', value: contributions.length, icon: '✍️', color: 'purple' },
    { id: 'pending', label: 'Pending Review', value: contributions.filter(c => c.status === 'Pending').length, icon: '⏳', color: 'blue' },
    { id: 'approved', label: 'Approved', value: contributions.filter(c => c.status === 'Approved').length, icon: '✅', color: 'green' },
  ]

  const pending = contributions.filter(c => c.status === 'Pending')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back, Admin. Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsData.map((s) => (
          <DashboardCard key={s.id} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span>🕐</span> Recent Activity
          </h3>
          <ul className="space-y-3">
            {recentActivity.map(({ icon, text, time, color }, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`text-base mt-0.5 ${color}`}>{icon}</span>
                <div className="min-w-0">
                  <p className="text-sm text-gray-700 leading-snug">{text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span>⏳</span> Pending Contributions
          </h3>
          {pending.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No pending contributions</p>
          ) : (
            <ul className="space-y-2">
              {pending.slice(0, 4).map((c) => (
                <li key={c.id} className="flex items-center justify-between bg-orange-50 rounded-xl px-4 py-2.5 border border-orange-100">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{c.title}</p>
                    <p className="text-xs text-gray-400">{c.author} · {c.region}</p>
                  </div>
                  <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full">Pending</span>
                </li>
              ))}
            </ul>
          )}

          <h3 className="font-semibold text-gray-700 mt-5 mb-3 flex items-center gap-2">
            <span>📋</span> Festival Status
          </h3>
          <div className="flex gap-3">
            {['Published', 'Draft'].map((s) => {
              const count = festivals.filter(f => f.status === s).length
              return (
                <div key={s} className={`flex-1 rounded-xl p-3 text-center border ${s === 'Published' ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-200'}`}>
                  <p className={`text-2xl font-bold ${s === 'Published' ? 'text-green-600' : 'text-gray-500'}`}>{count}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewSection
