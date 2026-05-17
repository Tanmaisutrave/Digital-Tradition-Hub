const colorMap = {
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-400', accent: 'text-orange-500' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    badge: 'bg-red-100 text-red-700',       dot: 'bg-red-400',    accent: 'text-red-500' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-200',  badge: 'bg-amber-100 text-amber-700',   dot: 'bg-amber-400',  accent: 'text-amber-600' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-400', accent: 'text-yellow-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', dot: 'bg-purple-400', accent: 'text-purple-500' },
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-400',   accent: 'text-blue-500' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700',   dot: 'bg-green-400',  accent: 'text-green-500' },
}

const getDaysLeft = (dateStr) => {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const fest = new Date(dateStr); fest.setHours(0, 0, 0, 0)
  return Math.round((fest - today) / 86400000)
}

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

const DaysChip = ({ days }) => {
  if (days === null || days === undefined || days > 9000) return (
    <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
      Date TBA
    </span>
  )
  if (days === 0) return (
    <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full animate-pulse">
      🎉 Today!
    </span>
  )
  if (days === 1) return (
    <span className="text-xs font-bold bg-red-100 text-red-600 px-3 py-1 rounded-full animate-pulse">
      🔔 Tomorrow!
    </span>
  )
  if (days <= 7) return (
    <span className="text-xs font-bold bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
      {days} days left
    </span>
  )
  if (days <= 30) return (
    <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
      {days} days left
    </span>
  )
  return (
    <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
      {days} days left
    </span>
  )
}

const ReminderCard = ({ festival, hasReminder, onAdd, onRemove, isNearest }) => {
  const c = colorMap[festival.color] || colorMap.orange
  const days = festival.date ? getDaysLeft(festival.date) : null
  const progress = days !== null ? Math.max(3, Math.min(100, Math.round((1 - days / 180) * 100))) : 10

  return (
    <div className={`relative rounded-2xl border shadow-sm p-5 transition-all duration-300
                     hover:shadow-md hover:-translate-y-0.5 ${c.bg} ${c.border}
                     ${isNearest ? 'ring-2 ring-orange-400 ring-offset-2' : ''}`}>
      {isNearest && (
        <span className="absolute -top-3 left-4 bg-gradient-to-r from-orange-500 to-amber-400
                         text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
          ⭐ Next Festival
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        {/* Left */}
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-12 h-12 rounded-xl ${c.badge} flex items-center justify-center text-2xl shrink-0`}>
            {festival.emoji}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-800 text-sm">{festival.name}</h3>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                {festival.category}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">📍 {festival.region}</p>
            <p className={`text-xs font-semibold mt-1 ${c.accent}`}>
              📅 {festival.date ? formatDate(festival.date) : 'Date to be announced'}
            </p>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{festival.description}</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <DaysChip days={days} />
        </div>
      </div>

      {/* Progress bar + action */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1">
          <div className="h-1.5 bg-white/70 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${c.dot}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">
            {days === null ? 'Date to be announced' : days === 0 ? 'Happening today!' : `${days} day${days !== 1 ? 's' : ''} until the festival`}
          </p>
        </div>

        {hasReminder ? (
          <button
            onClick={() => onRemove(festival.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-100 text-green-700
                       text-xs font-semibold border border-green-200 hover:bg-red-50 hover:text-red-500
                       hover:border-red-200 transition-all duration-200 group shrink-0"
          >
            <span className="group-hover:hidden">✅ Reminder Set</span>
            <span className="hidden group-hover:inline">🗑️ Remove</span>
          </button>
        ) : (
          <button
            onClick={() => onAdd(festival.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r
                       from-orange-500 to-amber-400 text-white text-xs font-semibold shadow-sm
                       hover:from-orange-600 hover:to-amber-500 hover:shadow-orange-200
                       transition-all duration-200 hover:scale-105 active:scale-100 shrink-0"
          >
            🔔 Set Reminder
          </button>
        )}
      </div>
    </div>
  )
}

export default ReminderCard
