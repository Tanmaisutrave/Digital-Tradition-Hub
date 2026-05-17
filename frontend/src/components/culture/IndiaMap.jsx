import { useState, memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const GEO_URL = '/india-states.json'

const nameToKey = {
  'Andhra Pradesh': 'andhrapradesh',
  'Arunachal Pradesh': 'arunachalpradesh',
  'Assam': 'assam',
  'Bihar': 'bihar',
  'Chhattisgarh': 'chhattisgarh',
  'Goa': 'goa',
  'Gujarat': 'gujarat',
  'Haryana': 'haryana',
  'Himachal Pradesh': 'himachalpradesh',
  'Jharkhand': 'jharkhand',
  'Karnataka': 'karnataka',
  'Kerala': 'kerala',
  'Madhya Pradesh': 'madhyapradesh',
  'Maharashtra': 'maharashtra',
  'Manipur': 'manipur',
  'Meghalaya': 'meghalaya',
  'Mizoram': 'mizoram',
  'Nagaland': 'nagaland',
  'Odisha': 'odisha',
  'Punjab': 'punjab',
  'Rajasthan': 'rajasthan',
  'Sikkim': 'sikkim',
  'Tamil Nadu': 'tamilnadu',
  'Telangana': 'telangana',
  'Tripura': 'tripura',
  'Uttar Pradesh': 'uttarpradesh',
  'Uttarakhand': 'uttarakhand',
  'West Bengal': 'westbengal',
  'Jammu and Kashmir': 'jammukashmir',
  'Jammu & Kashmir': 'jammukashmir',
}

const stateColors = {
  'Andhra Pradesh': '#4CAF50',
  'Arunachal Pradesh': '#E53935',
  'Assam': '#43A047',
  'Bihar': '#FB8C00',
  'Chhattisgarh': '#00ACC1',
  'Goa': '#26C6DA',
  'Gujarat': '#F9A825',
  'Haryana': '#8E24AA',
  'Himachal Pradesh': '#00897B',
  'Jharkhand': '#039BE5',
  'Karnataka': '#E53935',
  'Kerala': '#F4511E',
  'Madhya Pradesh': '#C0CA33',
  'Maharashtra': '#F06292',
  'Manipur': '#FF7043',
  'Meghalaya': '#FFD54F',
  'Mizoram': '#4DB6AC',
  'Nagaland': '#FF8A65',
  'Odisha': '#FFA726',
  'Punjab': '#7E57C2',
  'Rajasthan': '#AB47BC',
  'Sikkim': '#26A69A',
  'Tamil Nadu': '#66BB6A',
  'Telangana': '#FFA000',
  'Tripura': '#8D6E63',
  'Uttar Pradesh': '#9575CD',
  'Uttarakhand': '#26C6DA',
  'West Bengal': '#EF5350',
  'Jammu and Kashmir': '#5C6BC0',
  'Jammu & Kashmir': '#5C6BC0',
  'Ladakh': '#78909C',
  'Delhi': '#EC407A',
  'Andaman and Nicobar': '#00BCD4',
  'Chandigarh': '#FF7043',
  'Dadra and Nagar Haveli': '#8BC34A',
  'Daman and Diu': '#03A9F4',
  'Lakshadweep': '#009688',
  'Puducherry': '#FF5722',
}

const getColor = (name) => stateColors[name] || '#90A4AE'

const IndiaMap = ({ selectedState, onStateSelect, cultureData }) => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, name: '' })

  const hasData = (name) => {
    const key = nameToKey[name]
    return key && !!cultureData[key]
  }

  const handleClick = (name) => {
    const key = nameToKey[name]
    if (key && cultureData[key]) {
      onStateSelect(selectedState === key ? null : key)
    }
  }

  return (
    <div className="relative w-full">
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute z-20 pointer-events-none bg-gray-900 text-white text-xs font-semibold
                     px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap"
          style={{ left: tooltip.x + 10, top: tooltip.y - 40 }}
        >
          {tooltip.name}
          {hasData(tooltip.name) && (
            <span className="ml-2 text-orange-300 font-normal">click to explore</span>
          )}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [83.5, 26.5], scale: 1050 }}
        width={800}
        height={950}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.NAME_1
              const key = nameToKey[name]
              const isSelected = selectedState === key
              const clickable = hasData(name)

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleClick(name)}
                  onMouseEnter={(e) => {
                    const rect = e.target.closest('svg').getBoundingClientRect()
                    setTooltip({
                      visible: true,
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                      name,
                    })
                  }}
                  onMouseLeave={() => setTooltip({ visible: false })}
                  style={{
                    default: {
                      fill: isSelected ? '#f97316' : getColor(name),
                      stroke: '#ffffff',
                      strokeWidth: 0.5,
                      outline: 'none',
                      opacity: isSelected ? 1 : 0.85,
                      filter: isSelected ? 'drop-shadow(0 0 6px rgba(249,115,22,0.8))' : 'none',
                      cursor: clickable ? 'pointer' : 'default',
                      transition: 'fill 0.2s ease',
                    },
                    hover: {
                      fill: isSelected ? '#ea580c' : clickable ? '#f97316' : '#b0bec5',
                      stroke: '#ffffff',
                      strokeWidth: 0.8,
                      outline: 'none',
                      opacity: 1,
                      cursor: clickable ? 'pointer' : 'default',
                    },
                    pressed: {
                      fill: '#ea580c',
                      stroke: '#ffffff',
                      strokeWidth: 1,
                      outline: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 justify-center flex-wrap">
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

export default memo(IndiaMap)
