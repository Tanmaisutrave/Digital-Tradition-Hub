import { Link } from 'react-router-dom'

const points = [
  { icon: '🌱', text: 'Preserve traditions for future generations' },
  { icon: '🤝', text: 'Connect communities through shared heritage' },
  { icon: '📚', text: 'Make cultural learning fun and accessible' },
]

const WhySection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block mb-4 text-xs font-bold tracking-widest uppercase text-orange-500 bg-orange-100 px-3 py-1 rounded-full">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-5 leading-tight">Why Preserve Culture?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              India's traditions are a living tapestry of stories, art, and wisdom passed down through generations. Digital Tradition Hub exists to ensure these treasures are never lost — making them discoverable, shareable, and alive for everyone.
            </p>
            <ul className="flex flex-col gap-4 mb-8">
              {points.map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-lg flex-shrink-0">{icon}</span>
                  <span className="text-gray-700 font-medium text-sm">{text}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 flex-wrap">
              <Link to="/about"
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm">
                Learn More
              </Link>
              <Link to="/contribute"
                className="px-5 py-2.5 border border-orange-300 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-300 text-sm">
                Contribute
              </Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-gradient-to-br from-orange-400 via-amber-300 to-yellow-200 h-72 md:h-80 flex flex-col items-center justify-center gap-4">
              <div className="grid grid-cols-3 gap-3">
                {['🪔', '🎉', '🌺', '🎭', '🥁', '🌾'].map((e, i) => (
                  <div key={i} className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center text-2xl hover:bg-white/50 transition-colors duration-200">
                    {e}
                  </div>
                ))}
              </div>
              <p className="text-white/80 text-sm font-medium">India's Cultural Tapestry</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhySection
