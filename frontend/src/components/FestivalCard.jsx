import { useNavigate } from 'react-router-dom'

const regionColors = {
  North: 'bg-orange-100 text-orange-700',
  South: 'bg-green-100 text-green-700',
  East:  'bg-blue-100 text-blue-700',
  West:  'bg-purple-100 text-purple-700',
}

const FestivalCard = ({ festival }) => {
  const navigate = useNavigate()
  const { id, _id, name, title, region, description, color, images, image } = festival
  const festId = _id || id
  const festName = title || name
  const festImage = (images && images[0]) || image || null

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col
                 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 group"
    >
      {/* Image or gradient */}
      <div className={`relative h-44 overflow-hidden ${!festImage ? `bg-gradient-to-br ${color}` : ''}`}>
        {festImage ? (
          <img
            src={festImage}
            alt={festName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.classList.add(`bg-gradient-to-br`, color || 'from-orange-400', 'to-yellow-300')
            }}
          />
        ) : null}
        <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full
                          ${regionColors[region] ?? 'bg-gray-100 text-gray-600'} shadow-sm`}>
          {region}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="text-lg font-extrabold text-gray-800 group-hover:text-orange-500
                       transition-colors duration-300">
          {festName}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>
        <button
          onClick={() => navigate(`/festivals/${festId}`)}
          className="mt-auto w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-400
                     text-white text-sm font-semibold rounded-xl shadow-sm
                     hover:shadow-md hover:from-orange-600 hover:to-amber-500
                     transition-all duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default FestivalCard
