const colorMap = {
  orange: { bg: 'bg-orange-50', icon: 'bg-orange-100 text-orange-500', text: 'text-orange-600', border: 'border-orange-100' },
  blue:   { bg: 'bg-blue-50',   icon: 'bg-blue-100 text-blue-500',     text: 'text-blue-600',   border: 'border-blue-100' },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-500', text: 'text-purple-600', border: 'border-purple-100' },
  green:  { bg: 'bg-green-50',  icon: 'bg-green-100 text-green-500',   text: 'text-green-600',  border: 'border-green-100' },
}

const DashboardCard = ({ label, value, icon, color = 'orange', trend }) => {
  const c = colorMap[color] || colorMap.orange
  return (
    <div className={`rounded-2xl border ${c.border} ${c.bg} p-5 shadow-sm
                     hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
          <p className={`text-3xl font-bold mt-1 ${c.text}`}>{value.toLocaleString()}</p>
          {trend && (
            <p className="text-xs text-green-500 font-medium mt-1">↑ {trend} this month</p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl ${c.icon} flex items-center justify-center text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
