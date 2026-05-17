import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 py-28 px-6">

      {/* Decorative circles */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-700/20 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-block mb-5 px-4 py-1.5 bg-white/20 text-white text-xs
                         font-bold tracking-widest uppercase rounded-full border border-white/30">
          India's Cultural Platform
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-sm">
          Discover India's Traditions
          <br />
          <span className="text-yellow-100">Through Stories</span>
        </h1>

        <p className="text-base md:text-lg text-orange-100 max-w-xl mx-auto mb-10 leading-relaxed">
          Learn festivals, culture, and traditions in a fun and interactive way.
          A journey through the heart of India awaits you.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/festivals"
            className="px-8 py-3 bg-white text-orange-600 font-bold rounded-xl shadow-lg
                       hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Explore Now
          </Link>
          <Link
            to="/culture-map"
            className="px-8 py-3 bg-transparent text-white font-semibold rounded-xl
                       border-2 border-white/60 hover:bg-white/10 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
