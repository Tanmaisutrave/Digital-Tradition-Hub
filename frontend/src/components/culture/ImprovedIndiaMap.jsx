import { useState, memo, useCallback, useEffect } from 'react'
import cultureData from '../../data/cultureData'

const stateColors = {
  jammukashmir: '#5C6BC0',
  ladakh: '#78909C',
  himachalpradesh: '#26C6DA',
  punjab: '#7E57C2',
  uttarakhand: '#26C6DA',
  haryana: '#8E24AA',
  delhi: '#EC407A',
  uttarpradesh: '#9575CD',
  rajasthan: '#AB47BC',
  bihar: '#FB8C00',
  sikkim: '#26A69A',
  arunachalpradesh: '#E53935',
  nagaland: '#FF8A65',
  manipur: '#FF7043',
  mizoram: '#4DB6AC',
  tripura: '#8D6E63',
  meghalaya: '#FFD54F',
  assam: '#43A047',
  westbengal: '#EF5350',
  jharkhand: '#039BE5',
  odisha: '#FFA726',
  madhyapradesh: '#C0CA33',
  chhattisgarh: '#00ACC1',
  gujarat: '#F9A825',
  maharashtra: '#F06292',
  telangana: '#FFA000',
  andhrapradesh: '#4CAF50',
  karnataka: '#E53935',
  goa: '#26C6DA',
  tamilnadu: '#66BB6A',
  kerala: '#F4511E',
  chandigarh: '#FF7043',
  puducherry: '#FF5722',
  damananddiuandddnh: '#8BC34A',
  lakshadweep: '#009688',
  andamanandnicobar: '#00BCD4',
}

const stateKeyMap = {
  'Jammu and Kashmir': 'jammukashmir',
  'Jammu & Kashmir': 'jammukashmir',
  'Ladakh': 'ladakh',
  'Himachal Pradesh': 'himachalpradesh',
  'Punjab': 'punjab',
  'Uttarakhand': 'uttarakhand',
  'Haryana': 'haryana',
  'Delhi': 'delhi',
  'Chandigarh': 'chandigarh',
  'Uttar Pradesh': 'uttarpradesh',
  'Rajasthan': 'rajasthan',
  'Bihar': 'bihar',
  'Sikkim': 'sikkim',
  'Arunachal Pradesh': 'arunachalpradesh',
  'Nagaland': 'nagaland',
  'Manipur': 'manipur',
  'Mizoram': 'mizoram',
  'Tripura': 'tripura',
  'Meghalaya': 'meghalaya',
  'Assam': 'assam',
  'West Bengal': 'westbengal',
  'Jharkhand': 'jharkhand',
  'Odisha': 'odisha',
  'Madhya Pradesh': 'madhyapradesh',
  'Chhattisgarh': 'chhattisgarh',
  'Gujarat': 'gujarat',
  'Maharashtra': 'maharashtra',
  'Telangana': 'telangana',
  'Andhra Pradesh': 'andhrapradesh',
  'Karnataka': 'karnataka',
  'Goa': 'goa',
  'Tamil Nadu': 'tamilnadu',
  'Kerala': 'kerala',
  'Puducherry': 'puducherry',
}

const ImprovedIndiaMap = ({ selectedState, onStateSelect }) => {
  const [geoJson, setGeoJson] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, name: '' })
  const [loading, setLoading] = useState(true)
  const [bounds, setBounds] = useState(null)

  // Load and calculate bounds for GeoJSON data
  useEffect(() => {
    fetch('/india-states.json')
      .then(res => res.json())
      .then(data => {
        // Calculate bounds for proper scaling
        let minLon = Infinity, maxLon = -Infinity
        let minLat = Infinity, maxLat = -Infinity

        data.features.forEach(feature => {
          const coords = feature.geometry.coordinates
          const processCoords = (coords) => {
            if (typeof coords[0] === 'number') {
              minLon = Math.min(minLon, coords[0])
              maxLon = Math.max(maxLon, coords[0])
              minLat = Math.min(minLat, coords[1])
              maxLat = Math.max(maxLat, coords[1])
            } else {
              coords.forEach(processCoords)
            }
          }
          processCoords(coords)
        })

        setBounds({ minLon, maxLon, minLat, maxLat })
        setGeoJson(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load map data:', err)
        setLoading(false)
      })
  }, [])

  const hasData = useCallback((stateName) => {
    const key = stateKeyMap[stateName]
    return key && cultureData[key]
  }, [])

  const getStateKey = useCallback((stateName) => {
    return stateKeyMap[stateName]
  }, [])

  const handleStateClick = useCallback((stateName) => {
    const key = getStateKey(stateName)
    if (key && cultureData[key]) {
      onStateSelect(selectedState === key ? null : key)
    }
  }, [selectedState, onStateSelect, getStateKey])

  const projectCoordinates = useCallback((lon, lat) => {
    if (!bounds) return { x: 0, y: 0 }
    
    // Simple Web Mercator projection
    const x = (lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * 960
    const y = (bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat) * 960
    
    return { x, y }
  }, [bounds])

  const pathFromCoordinates = useCallback((coordinates, depth = 0) => {
    let pathData = ''
    
    const processRing = (ring) => {
      if (!ring || ring.length === 0) return ''
      let p = ''
      ring.forEach((coord, idx) => {
        const { x, y } = projectCoordinates(coord[0], coord[1])
        p += `${idx === 0 ? 'M' : 'L'} ${x} ${y} `
      })
      return p + 'Z'
    }

    if (coordinates.length > 0) {
      if (typeof coordinates[0][0] === 'number') {
        // Single ring (Polygon outer or inner)
        pathData = processRing(coordinates)
      } else if (typeof coordinates[0][0][0] === 'number') {
        // Array of rings (Polygon with holes)
        coordinates.forEach(ring => {
          pathData += processRing(ring)
        })
      } else if (typeof coordinates[0][0][0][0] === 'number') {
        // Array of polygons (MultiPolygon)
        coordinates.forEach(polygon => {
          polygon.forEach(ring => {
            pathData += processRing(ring)
          })
        })
      }
    }

    return pathData
  }, [projectCoordinates])

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-96 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-300 border-t-orange-600 mx-auto mb-3" />
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  if (!geoJson || !bounds) {
    return (
      <div className="flex items-center justify-center w-full h-96 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-500">Unable to load map. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute z-30 pointer-events-none bg-gray-900 text-white text-xs font-semibold
                     px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
          style={{ left: tooltip.x + 10, top: tooltip.y - 40 }}
        >
          {tooltip.name}
          {hasData(tooltip.name) && (
            <span className="ml-2 text-orange-300 font-normal">click to explore</span>
          )}
        </div>
      )}

      {/* SVG Map */}
      <svg
        viewBox="0 0 960 960"
        className="w-full"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
      >
        {/* Background */}
        <rect x="0" y="0" width="960" height="960" fill="#e8f4f8" rx="8" />

        {/* States */}
        {geoJson.features.map((feature, idx) => {
          const stateName = feature.properties.NAME_1 || ''
          const stateKey = getStateKey(stateName)
          const isClickable = hasData(stateName)
          const isSelected = selectedState === stateKey
          const isHovered = hovered === stateKey

          const fill = isSelected 
            ? '#f97316'
            : stateColors[stateKey] || '#d1d5db'

          const pathD = pathFromCoordinates(feature.geometry.coordinates)

          return (
            <path
              key={idx}
              d={pathD}
              fill={fill}
              stroke="#ffffff"
              strokeWidth={isSelected ? 2 : 1}
              strokeLinejoin="round"
              opacity={isSelected ? 1 : isHovered && isClickable ? 0.9 : 0.85}
              className={isClickable ? 'cursor-pointer' : 'cursor-default'}
              style={{
                filter: isSelected ? 'drop-shadow(0 0 8px rgba(249,115,22,0.8))' : 'none',
                transition: 'fill 0.2s ease, opacity 0.2s ease, filter 0.2s ease',
              }}
              onClick={() => handleStateClick(stateName)}
              onMouseEnter={(e) => {
                setHovered(stateKey)
                const rect = e.currentTarget.closest('svg').getBoundingClientRect()
                setTooltip({
                  visible: true,
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                  name: stateName,
                })
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.closest('svg').getBoundingClientRect()
                setTooltip(prev => ({
                  ...prev,
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                }))
              }}
              onMouseLeave={() => {
                setHovered(null)
                setTooltip({ visible: false })
              }}
            />
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 justify-center flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-orange-500 inline-block" />
          Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-blue-400 inline-block" />
          Has cultural data
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gray-300 inline-block" />
          Other regions
        </span>
      </div>
    </div>
  )
}

export default memo(ImprovedIndiaMap)
