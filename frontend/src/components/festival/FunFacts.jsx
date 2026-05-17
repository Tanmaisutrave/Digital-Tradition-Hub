const FunFacts = ({ facts }) => {
  if (!facts?.length) return null

  return (
    <div>
      <h2 className="text-xl font-extrabold text-gray-800 mb-4">Fun Facts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {facts.map(({ fact, color }, i) => (
          <div
            key={i}
            className={`${color} border rounded-2xl p-5 flex gap-3 items-start
                        hover:shadow-md transition-all duration-300`}
          >
            <span className="text-lg mt-0.5 flex-shrink-0">💡</span>
            <p className="text-sm text-gray-700 leading-relaxed">{fact}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FunFacts
