import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { festivalAPI } from '../../services/api'

const fallback = [
  { _id: '1', title: 'Diwali', description: 'The festival of lights celebrated with diyas, fireworks, and sweets across India.', color: 'from-orange-400 to-yellow-300', region: 'Pan India', images: ['https://kirkleeslocaltv.com/wp-content/uploads/2021/11/pexels-udayaditya-barua-40785161-1024x682.jpg'] },
  { _id: '2', title: 'Holi', description: 'The vibrant festival of colors marking the arrival of spring and triumph of good.', color: 'from-pink-400 to-purple-300', region: 'North', images: ['https://i.pinimg.com/originals/cb/bc/2e/cbbc2e31f6682b2289fb2e95f9ccd278.jpg'] },
  { _id: '3', title: 'Pongal', description: 'A harvest festival of gratitude celebrated with sugarcane, rice, and folk dances.', color: 'from-green-400 to-teal-300', region: 'South', images: ['https://cdn.cdnparenting.com/articles/2019/03/19151828/2240500895.webp'] },
  { _id: '4', title: 'Navratri', description: 'Nine nights of devotion, dance, and music honoring the goddess Durga.', color: 'from-red-400 to-orange-300', region: 'West', images: ['https://tse4.mm.bing.net/th/id/OIP.zjJzRIDn7yaCJKW1fjOD9wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3'] },
]

const FestivalsSection = () => {
  const [festivals, setFestivals] = useState(fallback)
  const navigate = useNavigate()

  useEffect(() => {
    festivalAPI.getAll({ limit: 4 })
      .then(({ data }) => {
        if (data.festivals?.length) setFestivals(data.festivals.slice(0, 4))
      })
      .catch(() => {}) // keep fallback on error
  }, [])

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Featured Festivals</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            A glimpse into the colorful celebrations that define India's spirit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {festivals.map((f) => (
            <div
              key={f._id}
              onClick={() => navigate(`/festivals/${f._id}`)}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl
                         hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className={`relative h-40 overflow-hidden ${!(f.images?.[0]) ? `bg-gradient-to-br ${f.color || 'from-orange-400 to-yellow-300'}` : ''}`}>
                {f.images?.[0] ? (
                  <img src={f.images[0]} alt={f.title || f.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : null}
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white/80 bg-black/20 px-3 py-1 rounded-full">
                  {f.region}
                </span>
              </div>
              <div className="bg-white p-5">
                <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                  {f.title || f.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/festivals"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400
                       text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105
                       transition-all duration-300 text-sm">
            View All Festivals →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FestivalsSection
