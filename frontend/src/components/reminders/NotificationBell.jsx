import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import upcomingFestivals from '../../data/remindersData'
import useReminders from '../../hooks/useReminders'

const getDaysLeft = (dateStr) => {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const fest = new Date(dateStr); fest.setHours(0, 0, 0, 0)
  return Math.round((fest - today) / 86400000)
}

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

const NotificationBell = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { reminders, removeReminder } = useReminders()

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Alerts: festivals within 3 days (regardless of reminder)
  const alerts = upcomingFestivals.filter((f) => {
    const days = getDaysLeft(f.date)
    return days >= 0 && days <= 3
  })

  // Saved reminders with festival data
  const savedFestivals = upcomingFestivals.filter((f) => reminders.includes(f.id))

  const totalCount = alerts.length + savedFestivals.length

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Notifications"
        className={`relative w-9 h-9 rounded-xl flex items-center justify-center text-lg
                    transition-all duration-200
                    ${open ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'}`}
      >
        🔔
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white
                           text-[9px] font-bold flex items-center justify-center border-2 border-white">
            {totalCount > 9 ? '9+' : totalCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl
                        border border-orange-100 overflow-hidden z-50 animate-scaleIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-3 flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-sm">Notifications</h3>
              <p className="text-white/80 text-xs">{totalCount} active</p>
            </div>
            <Link
              to="/reminders"
              onClick={() => setOpen(false)}
              className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5
                         rounded-lg font-medium transition-colors duration-200"
            >
              View All
            </Link>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {/* Alerts section */}
            {alerts.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  🚨 Upcoming Alerts
                </p>
                {alerts.map((f) => {
                  const days = getDaysLeft(f.date)
                  return (
                    <div key={f.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50
                                 transition-colors duration-150 border-b border-orange-50">
                      <span className="text-xl shrink-0">{f.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{f.name}</p>
                        <p className="text-xs text-gray-400">{formatDate(f.date)}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0
                        ${days === 0 ? 'bg-green-100 text-green-700' : days === 1 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                        {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `${days}d`}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Saved reminders */}
            {savedFestivals.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  ✅ Your Reminders
                </p>
                {savedFestivals.map((f) => {
                  const days = getDaysLeft(f.date)
                  return (
                    <div key={f.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50
                                 transition-colors duration-150 border-b border-orange-50">
                      <span className="text-xl shrink-0">{f.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{f.name}</p>
                        <p className="text-xs text-gray-400">{formatDate(f.date)} · {days}d left</p>
                      </div>
                      <button
                        onClick={() => removeReminder(f.id)}
                        aria-label="Remove reminder"
                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 text-gray-400
                                   hover:text-red-500 flex items-center justify-center text-xs
                                   transition-colors duration-200 shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Empty */}
            {totalCount === 0 && (
              <div className="py-10 text-center">
                <p className="text-3xl mb-2">🔕</p>
                <p className="text-sm text-gray-500">No notifications right now</p>
                <Link
                  to="/reminders"
                  onClick={() => setOpen(false)}
                  className="inline-block mt-3 text-xs text-orange-500 font-medium hover:underline"
                >
                  Browse upcoming festivals →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell
