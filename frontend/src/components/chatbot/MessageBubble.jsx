const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-200
                        flex items-center justify-center text-base shrink-0 mb-1">
          👴
        </div>
      )}

      <div className={`max-w-[78%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {/* Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm
            ${isUser
              ? 'bg-gradient-to-br from-orange-500 to-amber-400 text-white rounded-br-sm'
              : 'bg-white border border-orange-100 text-gray-700 rounded-bl-sm'
            }`}
        >
          {message.text}
        </div>
        {/* Timestamp */}
        <span className="text-[10px] text-gray-400 px-1">{message.time}</span>
      </div>
    </div>
  )
}

export default MessageBubble
