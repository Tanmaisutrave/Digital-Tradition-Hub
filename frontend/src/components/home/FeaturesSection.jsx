import { Link } from 'react-router-dom'

const features = [
  { icon: '📖', title: 'Story Mode', desc: 'Dive into rich cultural stories and folk tales from every corner of India.', bg: 'bg-orange-50', border: 'border-orange-200', iconBg: 'bg-orange-100', to: '/festivals' },
  { icon: '🌸', title: 'Community Traditions', desc: 'Explore traditions shared by people across India — real stories from real communities.', bg: 'bg-yellow-50', border: 'border-yellow-200', iconBg: 'bg-yellow-100', to: '/traditions' },
  { icon: '🗺️', title: 'Culture Map', desc: 'Explore traditions region by region on an interactive map of India.', bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-100', to: '/culture-map' },
  { icon: '🔔', title: 'Festival Reminders', desc: 'Never miss a celebration — set reminders for upcoming festivals.', bg: 'bg-orange-50', border: 'border-orange-200', iconBg: 'bg-orange-100', to: '/reminders' },
]

const FeaturesSection = () => (
  <section className="py-20 px-6 bg-[#fdf6ec]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Everything You Need to Explore</h2>
        <p className="text-gray-500 max-w-md mx-auto">Four powerful ways to connect with India's rich cultural heritage.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon, title, desc, bg, border, iconBg, to }) => (
          <Link key={title} to={to}
            className={`${bg} border ${border} rounded-2xl p-6 flex flex-col gap-4
                        shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300`}>
            <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>{icon}</div>
            <div>
              <h3 className="text-base font-bold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

export default FeaturesSection
