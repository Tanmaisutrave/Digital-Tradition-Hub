import { useState, useEffect, useMemo } from 'react'
import { festivalAPI } from '../services/api'
import FestivalCard from '../components/FestivalCard'
import localFestivals from '../data/festivals'

const regions = ['All', 'North', 'South', 'East', 'West']

const Spinner = () => (
  <div className="flex justify-center py-20">
    <svg className="animate-spin w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  </div>
)

// Normalise API festival → FestivalCard shape (keep images)
const normalise = (f) => ({
  id: f._id || f.id,
  name: f.title || f.name,
  region: (f.region || '').replace(' India', ''),
  description: f.description,
  color: f.color || 'from-orange-400 to-yellow-300',
  images: f.images || [],
  image: f.images?.[0] || null,
})

const Festivals = () => {
  const [festivals, setFestivals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All')

  useEffect(() => {
    festivalAPI.getAll({ limit: 50 })
      .then(({ data }) => {
        const list = data.festivals || []
        setFestivals(list.map(normalise))
      })
      .catch((error) => {
        console.error(error)
        setFestivals([])
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return festivals.filter(f => {
      const name = f.name || f.title || ''
      const matchSearch = name.toLowerCase().includes(search.toLowerCase())
      const matchRegion = region === 'All' || (f.region || '').toLowerCase().includes(region.toLowerCase())
      return matchSearch && matchRegion
    })
  }, [festivals, search, region])

  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <div className="bg-gradient-to-br from-orange-500 to-amber-400 py-14 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-sm">Explore Festivals</h1>
        <p className="text-orange-100 text-base md:text-lg max-w-xl mx-auto">
          Discover stories, traditions, and cultural significance of festivals across India.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search festivals..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-300 transition-all duration-200" />
          </div>
          <select value={region} onChange={e => setRegion(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 hover:border-orange-300 transition-all duration-200 cursor-pointer">
            {regions.map(r => <option key={r} value={r}>{r === 'All' ? 'All Regions' : `${r} India`}</option>)}
          </select>
        </div>

        {loading && <Spinner />}
        {error && <p className="text-center text-red-500 py-10">{error}</p>}

        {!loading && !error && (
          <>
            <p className="text-sm text-gray-400 mb-6">
              Showing <span className="font-semibold text-gray-600">{filtered.length}</span> festival{filtered.length !== 1 ? 's' : ''}
            </p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(festival => (
                  <FestivalCard key={festival.id} festival={festival} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-700 mb-1">No festivals found</h3>
                <p className="text-sm text-gray-400">Try a different search term or region filter.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Festivals
