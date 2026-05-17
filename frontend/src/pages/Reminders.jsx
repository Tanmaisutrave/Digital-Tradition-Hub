import { useState, useEffect } from 'react'
import ReminderCard from '../components/reminders/ReminderCard'
import NotificationToast from '../components/reminders/NotificationToast'
import upcomingFestivals from '../data/remindersData'
import useReminders from '../hooks/useReminders'
import useNotifications from '../hooks/useNotifications'
import { reminderAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

const getDaysLeft = (dateStr) => {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const fest = new Date(dateStr); fest.setHours(0, 0, 0, 0)
  return Math.round((fest - today) / 86400000)
}

const FILTERS = ['All', 'Festival', 'Ritual', 'Religious', 'National']

const Reminders = () => {
  const { isAuthenticated } = useAuth()
  const { reminders, addReminder, removeReminder, hasReminder } = useReminders()
  const { requestPermission } = useNotifications(reminders)

  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [toasts, setToasts] = useState([])
  const [dismissedToasts, setDismissedToasts] = useState([])
  const [notifGranted, setNotifGranted] = useState(
    typeof Notification !== 'undefined' && Notification.permission === 'granted'
  )

  // Sort all 2026 festivals by date
  const sorted = [...upcomingFestivals].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )

  // Toast alerts for festivals within 3 days
  useEffect(() => {
    const alerts = sorted.filter(f => {
      const days = getDaysLeft(f.date)
      return days >= 0 && days <= 3 && !dismissedToasts.includes(f.id)
    }).map(f => ({ ...f, days: getDaysLeft(f.date) }))
    setToasts(alerts)
  }, [dismissedToasts])

  const dismissToast = (id) => setDismissedToasts(p => [...p, id])

  const handleEnableNotifications = async () => {
    const granted = await requestPermission()
    setNotifGranted(granted)
  }

  const handleAdd = async (id) => {
    addReminder(id)
    if (isAuthenticated) {
      const festival = upcomingFestivals.find(f => f.id === id)
      if (festival) {
        try {
          await reminderAPI.create({
            festivalId: festival.id,
            festivalName: festival.name,
            festivalDate: festival.date,
          })
        } catch {}
      }
    }
  }

  const handleRemove = async (id) => {
    removeReminder(id)
    if (isAuthenticated) {
      try { await reminderAPI.deleteByFestival(id) } catch {}
    }
  }

  const filtered = sorted.filter(f => {
    const matchFilter = filter === 'All' || f.category === filter
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.region.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const nearestId = filtered[0]?.id
  const reminderCount = reminders.length
  const alertCount = sorted.filter(f => {
    const d = getDaysLeft(f.date)
    return d >= 0 && d <= 3
  }).length
  const thisMonthCount = sorted.filter(f => {
    const d = new Date(f.date), now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <NotificationToast alerts={toasts} onDismiss={dismissToast} />

      <div className="bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 py-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          🔔 Festival Reminders 2026
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-sm">
          Upcoming Festivals 2026
        </h1>
        <p className="text-white/90 text-base md:text-lg max-w-xl mx-auto">
          All major Indian festivals of 2026 — set reminders and never miss a celebration
        </p>
        <div className="flex justify-center gap-8 mt-6 flex-wrap">
          {[
            { label: 'Total Festivals', value: upcomingFestivals.length },
            { label: 'This Month', value: thisMonthCount },
            { label: 'Your Reminders', value: reminderCount },
            { label: 'Alerts', value: alertCount },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-white/80 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">

        {alertCount > 0 && (
          <div className="bg-orange-100 border border-orange-300 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm">
            <span className="text-2xl animate-bounce">🔔</span>
            <div>
              <p className="text-sm font-bold text-orange-800">
                {alertCount} festival{alertCount > 1 ? 's' : ''} happening very soon!
              </p>
              <p className="text-xs text-orange-600 mt-0.5">
                {sorted.filter(f => getDaysLeft(f.date) >= 0 && getDaysLeft(f.date) <= 3).map(f => f.name).join(' & ')}
              </p>
            </div>
          </div>
        )}

        {!notifGranted && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔔</span>
              <div>
                <p className="text-sm font-semibold text-blue-800">Enable browser notifications</p>
                <p className="text-xs text-blue-600">Get reminded on the day of the festival, even when the app is closed.</p>
              </div>
            </div>
            <button onClick={handleEnableNotifications}
              className="shrink-0 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              Enable
            </button>
          </div>
        )}

        {!isAuthenticated && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-center gap-3">
            <span className="text-lg">ℹ️</span>
            <p className="text-sm text-amber-700">
              <a href="/login" className="font-semibold underline">Login</a> to sync reminders across devices.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search festivals or regions..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-orange-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200" />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200
                  ${filter === f
                    ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-white border-orange-500 shadow-md'
                    : 'bg-white text-gray-500 border-orange-200 hover:border-orange-400 hover:text-orange-500'
                  }`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {reminderCount > 0 && (
          <p className="text-sm text-gray-500 px-1">
            <span className="font-semibold text-orange-500">{reminderCount}</span> reminder{reminderCount > 1 ? 's' : ''} set
          </p>
        )}

        <div className="space-y-4">
          {filtered.map(festival => (
            <ReminderCard
              key={festival.id}
              festival={festival}
              hasReminder={hasReminder(festival.id)}
              onAdd={handleAdd}
              onRemove={handleRemove}
              isNearest={festival.id === nearestId}
            />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-orange-100">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-500 text-sm">No festivals found. Try a different filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reminders
