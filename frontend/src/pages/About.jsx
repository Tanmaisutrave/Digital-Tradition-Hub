import { Link } from 'react-router-dom'

const team = [
  { name: 'Cultural Research', icon: '📚', desc: 'Deep-diving into India\'s 5000-year-old traditions and stories.' },
  { name: 'Technology', icon: '💻', desc: 'Building modern tools to make culture accessible to everyone.' },
  { name: 'Community', icon: '🤝', desc: 'Connecting people who care about preserving heritage.' },
]

const stats = [
  { value: '8+', label: 'States Covered' },
  { value: '30+', label: 'Festivals Documented' },
  { value: '100+', label: 'Cultural Stories' },
  { value: '∞', label: 'Traditions to Explore' },
]

const About = () => (
  <div className="min-h-screen bg-[#fdf6ec]">
    {/* Hero */}
    <div className="bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 py-20 px-6 text-center">
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
        🏛️ About Us
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-sm">
        About Digital Tradition Hub
      </h1>
      <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
        A platform dedicated to preserving, celebrating, and sharing India's rich cultural heritage through technology and storytelling.
      </p>
    </div>

    <div className="max-w-5xl mx-auto px-6 py-14 space-y-14">

      {/* Mission */}
      <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-8 md:p-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl">🎯</div>
          <h2 className="text-2xl font-extrabold text-gray-800">Our Mission</h2>
        </div>
        <p className="text-gray-600 leading-relaxed text-base mb-4">
          India is home to one of the world's oldest and most diverse civilizations. From the snow-capped peaks of the Himalayas to the tropical shores of Kerala, every region carries its own unique traditions, festivals, art forms, and stories.
        </p>
        <p className="text-gray-600 leading-relaxed text-base">
          <span className="font-semibold text-orange-600">Digital Tradition Hub</span> was created with a simple but powerful mission — to ensure that these traditions are never forgotten. We use technology to make cultural knowledge discoverable, shareable, and alive for the next generation.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ value, label }) => (
          <div key={label} className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-200">
            <p className="text-3xl font-extrabold text-orange-500 mb-1">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* What we do */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.map(({ name, icon, desc }) => (
            <div key={name} className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl mb-4">{icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features overview */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-8">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Platform Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '🎉', title: 'Festival Explorer', desc: 'Detailed stories, traditions, and quizzes for every major Indian festival.' },
            { icon: '🗺️', title: 'Culture Map', desc: 'Interactive map of India — click any state to explore its unique culture.' },
            { icon: '✍️', title: 'Contribute', desc: 'Share your own traditions and help grow the cultural knowledge base.' },
            { icon: '🔔', title: 'Festival Reminders', desc: 'Never miss a festival — set reminders and get notified in advance.' },
            { icon: '👴', title: 'Ask Grandpa', desc: 'An AI chatbot that explains traditions in a warm, storytelling style.' },
            { icon: '🔐', title: 'Admin Dashboard', desc: 'Manage festivals, contributions, and users from a dedicated admin panel.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-orange-100">
              <span className="text-xl shrink-0 mt-0.5">{icon}</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-10 shadow-lg">
        <h2 className="text-2xl font-extrabold text-white mb-3">Start Exploring Today</h2>
        <p className="text-white/90 text-sm mb-6 max-w-md mx-auto">
          Dive into India's cultural heritage — discover festivals, explore the culture map, and share your own traditions.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/festivals"
            className="px-6 py-2.5 bg-white text-orange-600 font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm">
            Explore Festivals
          </Link>
          <Link to="/contribute"
            className="px-6 py-2.5 bg-white/20 text-white font-semibold rounded-xl border border-white/40 hover:bg-white/30 transition-all duration-300 text-sm">
            Contribute
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default About
