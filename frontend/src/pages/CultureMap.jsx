import { useState, useMemo, useRef, useEffect } from 'react'
import ImprovedIndiaMap from '../components/culture/ImprovedIndiaMap'
import RegionDetails from '../components/culture/RegionDetails'
import cultureData from '../data/cultureData'

const CultureMap = () => {
  const [selectedState, setSelectedState] = useState(null)
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef(null)

  const selectedRegion = selectedState ? cultureData[selectedState] : null

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const searchResults = useMemo(() => {
    if (!search.trim()) return []
    const q = search.toLowerCase()
    return Object.entries(cultureData).filter(([, data]) =>
      data.name.toLowerCase().includes(q) ||
      (data.festivals || []).some(f => f.toLowerCase().includes(q))
    )
  }, [search])

  const handleStateSelect = (key) => {
    setSelectedState(prev => prev === key ? null : key)
    setSearch('')
    setShowDropdown(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Cultural Map of India</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Explore the rich culture of every state and union territory.
            </p>
          </div>

          {/* Search */}
          <div ref={searchRef} className="relative w-full sm:w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setShowDropdown(true) }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search State / UT..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm
                         focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm transition-all"
            />
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl
                              border border-gray-100 z-30 overflow-hidden max-h-64 overflow-y-auto">
                {searchResults.map(([key, data]) => (
                  <button key={key} onClick={() => handleStateSelect(key)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50
                               transition-colors text-left border-b border-gray-50 last:border-0">
                    <span className="text-xl">{data.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{data.name}</p>
                      <p className="text-xs text-gray-400">{data.language || ''} · {data.festivals?.[0] || ''}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* Map */}
          <div className={`w-full transition-all duration-500 ${selectedRegion ? 'lg:w-3/5' : 'lg:w-full'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              {selectedState && (
                <div className="flex justify-end mb-2">
                  <button onClick={() => setSelectedState(null)}
                    className="text-xs text-orange-500 hover:text-orange-700 font-medium underline underline-offset-2">
                    Clear selection
                  </button>
                </div>
              )}
              <ImprovedIndiaMap
                selectedState={selectedState}
                onStateSelect={handleStateSelect}
              />
            </div>

            {/* Quick state chips */}
            {!selectedRegion && (
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(cultureData).slice(0, 12).map(([key, data]) => (
                  <button key={key} onClick={() => handleStateSelect(key)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-gray-200
                               text-gray-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50
                               transition-all duration-200 shadow-sm">
                    {data.emoji} {data.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details panel */}
          {selectedRegion ? (
            <div className="w-full lg:w-2/5 lg:sticky lg:top-6" style={{ maxHeight: 'calc(100vh - 120px)' }}>
              <RegionDetails
                region={selectedRegion}
                onClose={() => setSelectedState(null)}
              />
            </div>
          ) : (
            <div className="hidden lg:flex w-80 flex-col items-center justify-center text-center
                            py-12 px-6 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
              <span className="text-5xl mb-4">🗺️</span>
              <h3 className="text-base font-semibold text-gray-700 mb-2">Select a State</h3>
              <p className="text-sm text-gray-400">
                Click any state on the map to explore its culture, festivals, food, and traditions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CultureMap
