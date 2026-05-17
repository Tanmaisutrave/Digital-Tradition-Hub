const StorySection = ({ story }) => {
  if (!story) return null

  const paragraphs = story.split('\n\n').filter(Boolean)

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
          📖
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-800">Story of the Festival</h2>
          <p className="text-xs text-amber-600 font-medium">As told by our grandparents...</p>
        </div>
      </div>

      {/* Decorative quote mark */}
      <div className="text-6xl text-amber-200 font-serif leading-none mb-2 select-none">"</div>

      <div className="flex flex-col gap-4 pl-2">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-gray-700 leading-relaxed text-[15px]">
            {para}
          </p>
        ))}
      </div>
    </div>
  )
}

export default StorySection
