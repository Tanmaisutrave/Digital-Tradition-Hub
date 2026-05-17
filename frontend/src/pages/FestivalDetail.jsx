import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { festivalAPI } from '../services/api'
import StorySection from '../components/festival/StorySection'
import FunFacts from '../components/festival/FunFacts'
import QuizSection from '../components/festival/QuizSection'
import localFestivals from '../data/festivals'

const FestivalDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [festival, setFestival] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Try API first (MongoDB _id)
    festivalAPI.getById(id)
      .then(({ data }) => setFestival(data))
      .catch(() => {
        // Fall back to local data (numeric id from frontend)
        const local = localFestivals.find(f => String(f.id) === String(id))
        if (local) {
          setFestival({ ...local, title: local.name })
        } else {
          setError('Festival not found')
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex justify-center py-20">
      <svg className="animate-spin w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
    </div>
  )

  if (error || !festival) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl">🔍</div>
      <h2 className="text-xl font-bold text-gray-700">Festival not found</h2>
      <button onClick={() => navigate('/festivals')}
        className="px-5 py-2 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-all">
        Back to Festivals
      </button>
    </div>
  )

  const { title, tagline, color, whyCelebrate, traditions, funFacts, quiz, story } = festival

  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <div className={`relative bg-gradient-to-br ${color || 'from-orange-400 to-yellow-300'} py-24 px-6 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto">
          <button onClick={() => navigate('/festivals')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Festivals
          </button>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-md mb-4">{title}</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">{tagline}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
        {story && <StorySection story={story} />}

        {whyCelebrate && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-extrabold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-base">🌟</span>
              Why We Celebrate
            </h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">{whyCelebrate}</p>
          </div>
        )}

        {traditions?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-extrabold text-gray-800 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-base">🎊</span>
              Traditions & Customs
            </h2>
            <ul className="flex flex-col gap-3">
              {traditions.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold flex-shrink-0">{i + 1}</span>
                  <span className="text-gray-700 text-sm leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <FunFacts facts={funFacts} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-extrabold text-gray-800 mb-5 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-base">🎥</span>
            Watch &amp; Learn
          </h2>
          {festival.videos?.length > 0 ? (
            <div className="rounded-xl overflow-hidden aspect-video">
              <iframe src={festival.videos[0]} title="Festival video" allowFullScreen className="w-full h-full" />
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 h-56 flex flex-col items-center justify-center gap-3 border border-gray-200">
              <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <p className="text-sm text-gray-400 font-medium">Video coming soon</p>
            </div>
          )}
        </div>

        <QuizSection quiz={quiz} />
      </div>
    </div>
  )
}

export default FestivalDetail
