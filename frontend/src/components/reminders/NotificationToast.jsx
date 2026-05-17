import { useState, useEffect } from 'react'

const NotificationToast = ({ alerts, onDismiss }) => {
  const [visible, setVisible] = useState([])

  useEffect(() => {
    if (alerts.length) setVisible(alerts.map((a) => a.id))
  }, [alerts])

  const dismiss = (id) => {
    setVisible((p) => p.filter((v) => v !== id))
    setTimeout(() => onDismiss(id), 300)
  }

  const shown = alerts.filter((a) => visible.includes(a.id))
  if (!shown.length) return null

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {shown.map((alert) => (
        <div
          key={alert.id}
          className={`pointer-events-auto flex items-start gap-3 bg-white rounded-2xl shadow-xl
                      border-l-4 px-4 py-3.5 transition-all duration-300
                      ${visible.includes(alert.id) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
                      ${alert.days === 0 ? 'border-green-500' : alert.days === 1 ? 'border-orange-500' : 'border-amber-400'}`}
        >
          <span className="text-2xl shrink-0 mt-0.5">{alert.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800">
              {alert.days === 0
                ? `🎉 ${alert.name} is TODAY!`
                : alert.days === 1
                ? `🔔 ${alert.name} is TOMORROW!`
                : `📅 ${alert.name} in ${alert.days} days`}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{alert.description}</p>
          </div>
          <button
            onClick={() => dismiss(alert.id)}
            aria-label="Dismiss notification"
            className="shrink-0 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400
                       hover:text-gray-600 flex items-center justify-center text-xs
                       transition-colors duration-200"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export default NotificationToast
