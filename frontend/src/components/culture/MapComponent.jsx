import { useState } from 'react'
import cultureData from '../../data/cultureData'

// Official India SVG map paths (public domain, Survey of India based)
// ViewBox: 0 0 1000 1100
const states = [
  {
    id: 'jammukashmir',
    name: 'Jammu & Kashmir',
    labelX: 220, labelY: 95,
    d: 'M 168,22 L 195,18 L 228,24 L 262,18 L 295,22 L 318,35 L 335,52 L 342,72 L 328,88 L 308,98 L 288,105 L 268,112 L 248,118 L 228,122 L 208,118 L 192,108 L 178,95 L 165,80 L 158,62 L 162,42 Z',
    color: '#e74c3c',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    labelX: 370, labelY: 65,
    d: 'M 295,22 L 338,15 L 378,18 L 415,28 L 442,45 L 448,68 L 435,88 L 415,98 L 392,105 L 368,108 L 345,102 L 328,88 L 342,72 L 335,52 L 318,35 Z',
    color: '#c0392b',
  },
  {
    id: 'himachalpradesh',
    name: 'Himachal Pradesh',
    labelX: 248, labelY: 148,
    d: 'M 208,118 L 228,122 L 248,118 L 268,112 L 288,105 L 308,98 L 318,112 L 312,128 L 298,142 L 278,152 L 258,158 L 238,155 L 220,145 L 208,132 Z',
    color: '#27ae60',
  },
  {
    id: 'punjab',
    name: 'Punjab',
    labelX: 188, labelY: 148,
    d: 'M 165,118 L 192,108 L 208,118 L 208,132 L 200,148 L 185,158 L 168,155 L 155,142 L 152,128 Z',
    color: '#e67e22',
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    labelX: 318, labelY: 155,
    d: 'M 278,152 L 298,142 L 318,128 L 338,132 L 355,145 L 358,162 L 345,175 L 325,182 L 305,178 L 288,168 Z',
    color: '#16a085',
  },
  {
    id: 'haryana',
    name: 'Haryana',
    labelX: 195, labelY: 178,
    d: 'M 168,155 L 185,158 L 200,148 L 208,162 L 205,178 L 195,192 L 178,198 L 162,192 L 155,178 L 158,162 Z',
    color: '#8e44ad',
  },
  {
    id: 'delhi',
    name: 'Delhi',
    labelX: 215, labelY: 185,
    d: 'M 205,178 L 215,172 L 225,178 L 222,188 L 212,192 L 205,188 Z',
    color: '#2c3e50',
  },
  {
    id: 'uttarpradesh',
    name: 'Uttar Pradesh',
    labelX: 318, labelY: 215,
    d: 'M 205,192 L 222,188 L 238,192 L 258,188 L 288,182 L 305,178 L 325,182 L 345,175 L 365,182 L 382,198 L 392,218 L 388,238 L 372,252 L 348,262 L 318,268 L 288,265 L 262,258 L 238,248 L 218,235 L 205,218 Z',
    color: '#9b59b6',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    labelX: 168, labelY: 248,
    d: 'M 108,168 L 135,158 L 155,162 L 162,178 L 178,198 L 195,208 L 205,218 L 205,238 L 195,258 L 178,278 L 158,295 L 135,308 L 112,312 L 92,302 L 78,282 L 72,258 L 75,232 L 85,208 L 95,188 Z',
    color: '#8e44ad',
  },
  {
    id: 'bihar',
    name: 'Bihar',
    labelX: 428, labelY: 228,
    d: 'M 388,205 L 412,198 L 438,202 L 458,215 L 465,232 L 458,248 L 442,258 L 418,262 L 395,258 L 378,245 L 375,228 L 382,212 Z',
    color: '#f39c12',
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    labelX: 488, labelY: 215,
    d: 'M 478,205 L 492,200 L 502,210 L 498,222 L 485,225 L 475,218 Z',
    color: '#1abc9c',
  },
  {
    id: 'arunachalpradesh',
    name: 'Arunachal Pradesh',
    labelX: 588, labelY: 178,
    d: 'M 502,162 L 538,155 L 572,152 L 608,158 L 638,168 L 648,185 L 635,198 L 608,205 L 578,208 L 548,205 L 522,198 L 505,185 Z',
    color: '#e74c3c',
  },
  {
    id: 'nagaland',
    name: 'Nagaland',
    labelX: 618, labelY: 218,
    d: 'M 608,205 L 635,198 L 648,212 L 645,228 L 628,238 L 608,235 L 598,222 Z',
    color: '#e67e22',
  },
  {
    id: 'manipur',
    name: 'Manipur',
    labelX: 622, labelY: 252,
    d: 'M 608,235 L 628,238 L 638,252 L 632,268 L 615,275 L 598,268 L 595,252 Z',
    color: '#27ae60',
  },
  {
    id: 'mizoram',
    name: 'Mizoram',
    labelX: 608, labelY: 292,
    d: 'M 598,268 L 615,275 L 618,292 L 608,305 L 592,308 L 582,295 L 585,278 Z',
    color: '#2980b9',
  },
  {
    id: 'tripura',
    name: 'Tripura',
    labelX: 572, labelY: 278,
    d: 'M 562,265 L 578,262 L 588,275 L 582,288 L 568,292 L 558,282 Z',
    color: '#8e44ad',
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    labelX: 548, labelY: 242,
    d: 'M 502,232 L 528,228 L 552,232 L 568,245 L 562,258 L 542,265 L 518,262 L 502,250 Z',
    color: '#f1c40f',
  },
  {
    id: 'assam',
    name: 'Assam',
    labelX: 558, labelY: 215,
    d: 'M 502,210 L 522,205 L 548,205 L 578,208 L 608,205 L 598,222 L 578,232 L 552,232 L 528,228 L 505,222 Z',
    color: '#27ae60',
  },
  {
    id: 'westbengal',
    name: 'West Bengal',
    labelX: 468, labelY: 268,
    d: 'M 458,215 L 478,212 L 498,222 L 502,238 L 498,258 L 488,278 L 472,295 L 455,305 L 442,295 L 438,275 L 442,255 L 452,238 Z',
    color: '#e74c3c',
  },
  {
    id: 'jharkhand',
    name: 'Jharkhand',
    labelX: 418, labelY: 285,
    d: 'M 378,262 L 395,258 L 418,262 L 442,258 L 452,272 L 448,292 L 432,308 L 408,315 L 385,308 L 372,292 L 372,275 Z',
    color: '#3498db',
  },
  {
    id: 'odisha',
    name: 'Odisha',
    labelX: 438, labelY: 338,
    d: 'M 408,315 L 432,308 L 452,312 L 468,328 L 472,348 L 462,368 L 442,382 L 418,385 L 398,375 L 385,355 L 385,335 L 395,318 Z',
    color: '#e67e22',
  },
  {
    id: 'madhyapradesh',
    name: 'Madhya Pradesh',
    labelX: 278, labelY: 308,
    d: 'M 178,278 L 205,268 L 238,265 L 268,268 L 295,272 L 318,278 L 342,285 L 362,298 L 372,315 L 368,335 L 348,348 L 318,355 L 285,355 L 255,348 L 225,338 L 198,322 L 178,305 Z',
    color: '#bdc3c7',
  },
  {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    labelX: 368, labelY: 335,
    d: 'M 362,298 L 385,308 L 395,318 L 385,335 L 385,355 L 372,368 L 352,375 L 332,368 L 318,352 L 318,335 L 328,318 L 345,305 Z',
    color: '#3498db',
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    labelX: 118, labelY: 318,
    d: 'M 72,258 L 92,248 L 112,248 L 132,255 L 148,268 L 155,285 L 152,305 L 138,322 L 118,332 L 98,328 L 78,315 L 65,298 L 62,278 Z M 62,338 L 78,332 L 92,342 L 88,358 L 72,362 L 58,352 Z',
    color: '#f0e68c',
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    labelX: 228, labelY: 388,
    d: 'M 148,305 L 178,305 L 198,322 L 225,338 L 255,348 L 285,355 L 318,355 L 332,368 L 328,388 L 312,408 L 288,422 L 258,428 L 228,425 L 198,415 L 172,398 L 152,378 L 142,355 L 142,332 L 148,315 Z',
    color: '#e8b4b8',
  },
  {
    id: 'telangana',
    name: 'Telangana',
    labelX: 335, labelY: 408,
    d: 'M 318,375 L 338,368 L 358,375 L 372,392 L 368,412 L 352,428 L 328,432 L 308,425 L 298,408 L 302,390 Z',
    color: '#2980b9',
  },
  {
    id: 'andhrapradesh',
    name: 'Andhra Pradesh',
    labelX: 358, labelY: 455,
    d: 'M 352,428 L 368,412 L 385,398 L 402,408 L 415,428 L 412,452 L 395,472 L 372,482 L 348,478 L 328,462 L 322,442 L 328,428 Z',
    color: '#27ae60',
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    labelX: 248, labelY: 455,
    d: 'M 198,415 L 228,425 L 258,428 L 288,422 L 308,425 L 322,442 L 318,462 L 302,478 L 278,492 L 252,498 L 225,492 L 202,475 L 185,452 L 182,428 L 192,412 Z',
    color: '#e74c3c',
  },
  {
    id: 'goa',
    name: 'Goa',
    labelX: 182, labelY: 468,
    d: 'M 178,458 L 188,452 L 195,462 L 192,472 L 182,475 L 175,468 Z',
    color: '#1abc9c',
  },
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    labelX: 295, labelY: 528,
    d: 'M 252,498 L 278,492 L 302,498 L 318,515 L 322,538 L 312,562 L 295,582 L 272,592 L 252,582 L 238,562 L 235,538 L 242,515 Z',
    color: '#27ae60',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    labelX: 228, labelY: 528,
    d: 'M 225,492 L 252,498 L 242,515 L 235,538 L 232,562 L 222,578 L 208,572 L 198,552 L 198,528 L 205,508 Z',
    color: '#e67e22',
  },
]

// State label positions for text overlay
const stateColors = {
  jammukashmir: '#e74c3c', ladakh: '#c0392b', himachalpradesh: '#27ae60',
  punjab: '#e67e22', uttarakhand: '#16a085', haryana: '#8e44ad',
  delhi: '#2c3e50', uttarpradesh: '#9b59b6', rajasthan: '#8e44ad',
  bihar: '#f39c12', sikkim: '#1abc9c', arunachalpradesh: '#e74c3c',
  nagaland: '#e67e22', manipur: '#27ae60', mizoram: '#2980b9',
  tripura: '#8e44ad', meghalaya: '#f1c40f', assam: '#27ae60',
  westbengal: '#e74c3c', jharkhand: '#3498db', odisha: '#e67e22',
  madhyapradesh: '#95a5a6', chhattisgarh: '#3498db', gujarat: '#d4ac0d',
  maharashtra: '#e8a0a8', telangana: '#2980b9', andhrapradesh: '#27ae60',
  karnataka: '#e74c3c', goa: '#1abc9c', tamilnadu: '#27ae60', kerala: '#e67e22',
}

const MapComponent = ({ selectedState, onStateSelect }) => {
  const [hovered, setHovered] = useState(null)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, name: '' })

  const hasData = (id) => !!cultureData[id]

  const getFill = (id) => {
    if (selectedState === id) return '#f97316'
    if (hovered === id) return hasData(id) ? '#fb923c' : '#9ca3af'
    return stateColors[id] || '#d1d5db'
  }

  const handleMouseMove = (e, id, name) => {
    const rect = e.currentTarget.closest('svg').getBoundingClientRect()
    setTooltip({ visible: true, x: e.clientX - rect.left, y: e.clientY - rect.top, name })
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full">
        <svg
          viewBox="55 15 620 590"
          className="w-full"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
        >
          {/* White background */}
          <rect x="0" y="0" width="1000" height="1100" fill="#e8f4f8" rx="8" />

          {states.map((state) => {
            const id = state.id
            const isSelected = selectedState === id
            const isHovered = hovered === id
            const clickable = hasData(id)

            return (
              <g key={id}>
                <path
                  d={state.d}
                  fill={getFill(id)}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 2.5 : 1.2}
                  strokeLinejoin="round"
                  className={`transition-all duration-200 ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
                  style={{
                    filter: isSelected
                      ? 'drop-shadow(0 0 8px rgba(249,115,22,0.8))'
                      : isHovered && clickable
                      ? 'brightness(1.15)'
                      : 'none',
                    opacity: isSelected ? 1 : isHovered ? 0.9 : 0.85,
                  }}
                  onClick={() => clickable && onStateSelect(id)}
                  onMouseEnter={(e) => { setHovered(id); handleMouseMove(e, id, state.name) }}
                  onMouseMove={(e) => handleMouseMove(e, id, state.name)}
                  onMouseLeave={() => { setHovered(null); setTooltip({ visible: false }) }}
                />
                {/* State name label */}
                <text
                  x={state.labelX}
                  y={state.labelY}
                  textAnchor="middle"
                  fontSize={id === 'delhi' || id === 'goa' || id === 'sikkim' ? '5' : id === 'arunachalpradesh' || id === 'himachalpradesh' || id === 'uttarpradesh' || id === 'madhyapradesh' || id === 'andhrapradesh' ? '6.5' : '7'}
                  fontWeight={isSelected ? '700' : '600'}
                  fill={isSelected ? '#ffffff' : '#1a1a1a'}
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}
                >
                  {state.name.length > 12 ? state.name.replace(' Pradesh', ' Pr.').replace('Arunachal', 'Arunachal').replace('Himachal', 'Himachal').replace('Uttarakhand', 'Uttarakhand') : state.name}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Tooltip */}
        {tooltip.visible && (
          <div
            className="absolute pointer-events-none bg-gray-900 text-white text-xs font-semibold
                       px-3 py-1.5 rounded-lg shadow-xl z-20 whitespace-nowrap"
            style={{ left: tooltip.x + 12, top: tooltip.y - 35 }}
          >
            {tooltip.name}
            {hasData(hovered) && (
              <span className="ml-2 text-orange-300 font-normal">click to explore</span>
            )}
            <div className="absolute top-full left-3 border-4 border-transparent border-t-gray-900" />
          </div>
        )}
      </div>

      {/* Quick select chips — all states with data */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {Object.entries(cultureData).map(([key, data]) => (
          <button
            key={key}
            onClick={() => onStateSelect(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
              ${selectedState === key
                ? 'text-white shadow-md scale-105 border-orange-500'
                : 'bg-white text-gray-600 border-orange-200 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50'
              }`}
            style={selectedState === key ? { backgroundColor: '#f97316' } : {}}
          >
            {data.emoji} {data.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MapComponent
