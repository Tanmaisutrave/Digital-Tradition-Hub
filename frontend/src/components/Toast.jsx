const typeStyle = {
  success: 'border-l-4 border-green-500 bg-white',
  error:   'border-l-4 border-red-500 bg-white',
  info:    'border-l-4 border-blue-500 bg-white',
}

const typeIcon = { success: '✅', error: '❌', info: 'ℹ️' }

const Toast = ({ toasts, onRemove }) => {
  if (!toasts.length) return null
  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start gap-3 rounded-xl shadow-xl px-4 py-3
                      ${typeStyle[t.type] || typeStyle.info} animate-slideIn`}
        >
          <span className="text-base shrink-0 mt-0.5">{typeIcon[t.type]}</span>
          <p className="flex-1 text-sm text-gray-700 font-medium">{t.message}</p>
          <button
            onClick={() => onRemove(t.id)}
            className="shrink-0 text-gray-400 hover:text-gray-600 text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
