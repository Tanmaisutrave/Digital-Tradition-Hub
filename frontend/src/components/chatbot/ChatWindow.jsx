import { useState, useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import { suggestions, getResponse } from '../../data/chatbotData'

const now = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const WELCOME = {
  id: 0,
  role: 'bot',
  text: `Namaste beta! 🙏 I am Grandpa, and I am here to tell you stories about our beautiful Indian traditions.\n\nAsk me anything — about festivals, rituals, food, or customs. I will explain it to you just like a story! 😊`,
  time: now(),
}

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg = { id: Date.now(), role: 'user', text: trimmed, time: now() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setShowSuggestions(false)
    setTyping(true)

    // Simulate grandpa typing delay
    const delay = 900 + Math.random() * 800
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        text: getResponse(trimmed),
        time: now(),
      }
      setMessages((prev) => [...prev, botMsg])
      setTyping(false)
    }, delay)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div
      className="flex flex-col bg-[#fdf6ec] rounded-2xl shadow-2xl border border-orange-200
                 overflow-hidden animate-scaleIn"
      style={{ width: 'min(380px, calc(100vw - 2rem))', height: 'min(560px, calc(100vh - 120px))' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-3.5
                      flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40
                          flex items-center justify-center text-xl">
            👴
          </div>
          <div>
            <h3 className="text-white font-bold text-sm leading-tight">Ask Grandpa</h3>
            <p className="text-white/80 text-xs">Learn traditions like a story</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-white/20 text-white text-xs
                           px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
            Online
          </span>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white
                       flex items-center justify-center text-sm transition-colors duration-200"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-200
                            flex items-center justify-center text-base shrink-0">
              👴
            </div>
            <div className="bg-white border border-orange-100 rounded-2xl rounded-bl-sm
                            px-4 py-3 shadow-sm flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {showSuggestions && !typing && (
          <div className="pt-1">
            <p className="text-xs text-gray-400 mb-2 px-1">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => sendMessage(s.query)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white border border-orange-200
                             text-orange-600 font-medium hover:bg-orange-50 hover:border-orange-400
                             transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="shrink-0 px-3 py-3 bg-white border-t border-orange-100 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Grandpa anything..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-orange-200 bg-orange-50/50
                     text-sm text-gray-700 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white
                     transition-all duration-200"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing}
          aria-label="Send message"
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400
                     text-white flex items-center justify-center shadow-md
                     hover:from-orange-600 hover:to-amber-500 hover:shadow-orange-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
        >
          <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default ChatWindow
