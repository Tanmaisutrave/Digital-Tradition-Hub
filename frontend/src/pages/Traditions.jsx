import { useState, useEffect, useMemo } from 'react'
import { contributionAPI } from '../services/api'
import { Link } from 'react-router-dom'
import sampleTraditions from '../data/traditionsData'

const categoryColors = {
  Festival:  { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-400' },
  Food:      { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-400' },
  Clothing:  { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-400' },
  Art:       { bg: 'bg-pink-100',   text: 'text-pink-700',   dot: 'bg-pink-400' },
  Ritual:    { bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-400' },
  Music:     { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-400' },
  Dance:     { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-400' },
}

const categoryEmoji = {
  Festival: '🎉', Food: '🍛', Clothing: '👘',
  Art: '🎨', Ritual: '🙏', Music: '🎵', Dance: '💃',
}

const CATEGORIES = ['All', 'Festival', 'Food', 'Clothing', 'Art', 'Ritual', 'Music', 'Dance']

const TraditionCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(item.likes || 0)
  const c = categoryColors[item.category] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' }
  const emoji = categoryEmoji[item.category] || '🌸'

  const handleLike = (e) => {
    e.stopPropagation()
    setLiked(p => !p)
    setLikeCount(p => liked ? p - 1 : p + 1)
  }

  return (
    <div className="bg-white rounded-2xl border border-orange-50 shadow-sm hover:shadow-xl
                    hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
        ) : null}
        <div className={`w-full h-full bg-gradient-to-br from-orange-100 to-amber-50
                         items-center justify-center text-5xl ${item.image ? 'hidden' : 'flex'}`}>
          {emoji}
        </div>

        {/* Featured badge */}
        {item.featured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-amber-400
                           text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            ⭐ Featured
          </span>
        )}

        {/* Like button */}
        <button onClick={handleLike}
          className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm
                     rounded-full px-2.5 py-1 shadow-sm text-xs font-medium hover:scale-110
                     transition-all duration-200">
          <span className={`transition-all duration-200 ${liked ? 'scale-125' : ''}`}>
            {liked ? '❤️' : '🤍'}
          </span>
          <span className={liked ? 'text-red-500' : 'text-gray-500'}>{likeCount}</span>
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Category + title */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-orange-600
                         transition-colors duration-200 flex-1">
            {item.title}
          </h3>
          <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
            {emoji} {item.category}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">📍 {item.region}</span>
          <span className="flex items-center gap-1">👤 {item.createdBy?.name || 'Community'}</span>
          {item.date && (
            <span className="flex items-center gap-1">
              📅 {new Date(item.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed flex-1
                      line-clamp-3">
          {item.description}
        </p>

        {/* Story expand */}
        {item.story && (
          <div className="mt-3">
            {expanded && (
              <div className="mt-2 pt-3 border-t border-orange-100">
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-2">
                  📖 The Story
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.story}</p>
              </div>
            )}
            <button onClick={() => setExpanded(p => !p)}
              className="mt-2 text-xs font-semibold text-orange-500 hover:text-orange-700
                         transition-colors duration-200 flex items-center gap-1">
              {expanded ? '▲ Show less' : '▼ Read full story'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const Traditions = () => {
  const [apiContributions, setApiContributions] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    contributionAPI.getAll({ status: 'approved', limit: 100 })
      .then(({ data }) => setApiContributions(data.contributions || []))
      .catch(() => setApiContributions([]))
      .finally(() => setLoading(false))
  }, [])

  // Merge: API contributions + sample data (sample shown when API is empty)
  const allTraditions = useMemo(() => {
    const apiItems = apiContributions.map(c => ({
      _id: c._id,
      title: c.title,
      category: c.category,
      region: c.region,
      image: c.image || null,
      description: c.description,
      story: c.story,
      createdBy: c.createdBy,
      likes: 0,
      featured: false,
      date: c.createdAt,
    }))
    return [...apiItems, ...sampleTraditions]
  }, [apiContributions])

  const filtered = useMemo(() => {
    return allTraditions.filter(c => {
      const matchCat = category === 'All' || c.category === category
      const matchSearch = !search.trim() ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.region.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [allTraditions, category, search])

  const featured = allTraditions.filter(t => t.featured).slice(0, 3)
  const mostLoved = [...allTraditions].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 3)
  const regions = [...new Set(allTraditions.map(c => c.region))].length
  const categories = [...new Set(allTraditions.map(c => c.category))].length

  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 py-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm
                        text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          🌸 Community Traditions
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-sm">
          Traditions by the Community
        </h1>
        <p className="text-white/90 text-base md:text-lg max-w-xl mx-auto">
          Real traditions shared by people across India — stories, food, art, and rituals
          preserved by the community, for the community.
        </p>
        <div className="flex justify-center gap-8 mt-6 flex-wrap">
          {[
            { label: 'Traditions', value: allTraditions.length },
            { label: 'Regions', value: regions },
            { label: 'Categories', value: categories },
            { label: 'Contributors', value: 48 },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-white/80 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">

        {/* Featured Traditions */}
        {featured.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              ⭐ Featured Traditions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {featured.map(item => (
                <TraditionCard key={item._id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Most Loved */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            ❤️ Most Loved Traditions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {mostLoved.map((item, i) => (
              <div key={item._id} className="relative">
                <div className="absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full
                                bg-gradient-to-br from-orange-500 to-amber-400 text-white
                                text-xs font-bold flex items-center justify-center shadow-md">
                  #{i + 1}
                </div>
                <TraditionCard item={item} />
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-orange-100" />

        {/* Search + Filter */}
        <section>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search traditions, regions, or categories..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-orange-200 bg-white text-sm
                           focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200" />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200
                    ${category === cat
                      ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-white border-orange-500 shadow-md'
                      : 'bg-white text-gray-500 border-orange-200 hover:border-orange-400 hover:text-orange-500'
                    }`}>
                  {categoryEmoji[cat] || '📋'} {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <svg className="animate-spin w-8 h-8 text-orange-400" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-4">
                Showing <span className="font-semibold text-gray-600">{filtered.length}</span> tradition{filtered.length !== 1 ? 's' : ''}
                {search && <span> for "<span className="text-orange-500">{search}</span>"</span>}
              </p>

              {filtered.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-orange-100">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="text-gray-500 text-sm">No traditions found. Try a different filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map(item => (
                    <TraditionCard key={item._id} item={item} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-10 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-2">Know a tradition not listed here?</h3>
          <p className="text-white/90 text-sm mb-6 max-w-md mx-auto">
            Share it with the community and help preserve India's cultural heritage for future generations.
          </p>
          <Link to="/contribute"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-orange-600
                       font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105
                       transition-all duration-300 text-sm">
            ✍️ Contribute a Tradition
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Traditions
