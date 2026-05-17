import { useState } from 'react'
import ChatWindow from './ChatWindow'

const ChatButton = () => {
  const [open, setOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)

  const handleOpen = () => {
    setOpen(true)
    setHasUnread(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {open && (
        <ChatWindow onClose={() => setOpen(false)} />
      )}

      {/* Floating button */}
      <div className="relative">
        {/* Tooltip */}
        {!open && (
          <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap
                          bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg
                          shadow-lg pointer-events-none opacity-0 group-hover:opacity-100
                          animate-fadeIn">
            Ask Grandpa 👴
            <span className="absolute top-full right-4 border-4 border-transparent border-t-gray-800" />
          </div>
        )}

        <button
          onClick={open ? () => setOpen(false) : handleOpen}
          aria-label={open ? 'Close chat' : 'Open Ask Grandpa chat'}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center
                      text-2xl transition-all duration-300 hover:scale-110 active:scale-95
                      ${open
                        ? 'bg-gray-700 text-white rotate-0'
                        : 'bg-gradient-to-br from-orange-500 to-amber-400 text-white'
                      }`}
          style={{ boxShadow: open ? undefined : '0 4px 24px rgba(249,115,22,0.45)' }}
        >
          <span className={`transition-all duration-300 ${open ? 'rotate-90' : 'rotate-0'}`}>
            {open ? '✕' : '👴'}
          </span>
        </button>

        {/* Unread badge */}
        {hasUnread && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500
                           border-2 border-white animate-pulse" />
        )}
      </div>
    </div>
  )
}

export default ChatButton
