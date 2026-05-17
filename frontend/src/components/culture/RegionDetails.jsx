import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Section = ({ icon, title, items, color }) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
    <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-sm shrink-0 mt-0.5`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-sm text-gray-700 leading-relaxed">
        {Array.isArray(items) ? items.join(', ') : items}
      </p>
    </div>
  </div>
)

const RegionDetails = ({ region, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!region) return null

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-slideIn flex flex-col h-full">
      {/* Header */}
      <div className="relative">
        {/* Banner image or gradient */}
        <div
          className="h-32 bg-gradient-to-br from-blue-400 to-indigo-500 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${region.color}cc, ${region.color}66)` }}
        >
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/30 hover:bg-black/50
                     text-white flex items-center justify-center text-xs transition-colors"
        >
          ✕
        </button>

        {/* State name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-8
                        bg-gradient-to-t from-black/60 to-transparent">
          <h2 className="text-xl font-bold text-white">{region.name}</h2>
          {region.capital && (
            <p className="text-white/80 text-xs mt-0.5">Capital: {region.capital}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-2">
        <Section
          icon="🎉"
          title="Festivals"
          items={region.festivals}
          color="bg-orange-100 text-orange-600"
        />
        <Section
          icon="🏛️"
          title="Traditions"
          items={region.traditions || region.highlights?.slice(0, 3) || []}
          color="bg-purple-100 text-purple-600"
        />
        <Section
          icon="🍛"
          title="Famous Food"
          items={region.food}
          color="bg-green-100 text-green-600"
        />
        <Section
          icon="🗣️"
          title="Language"
          items={region.language || 'Hindi'}
          color="bg-blue-100 text-blue-600"
        />
        <Section
          icon="💃"
          title="Art & Dance"
          items={region.artDance || region.highlights?.slice(0, 2) || []}
          color="bg-pink-100 text-pink-600"
        />
        <Section
          icon="👘"
          title="Clothing"
          items={region.clothing}
          color="bg-amber-100 text-amber-600"
        />
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-100">
        <Link
          to="/festivals"
          className="block w-full py-2.5 text-center bg-gradient-to-r from-orange-500 to-amber-400
                     text-white text-sm font-semibold rounded-xl shadow-md
                     hover:from-orange-600 hover:to-amber-500 hover:shadow-orange-200
                     transition-all duration-200 hover:scale-[1.02]"
        >
          Explore More →
        </Link>
      </div>
    </div>
  )
}

export default RegionDetails
