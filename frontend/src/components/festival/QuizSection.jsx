import { useState } from 'react'

const QuizSection = ({ quiz }) => {
  const [answers, setAnswers] = useState({})

  if (!quiz?.length) return null

  const select = (qIdx, oIdx) => {
    if (answers[qIdx] !== undefined) return
    setAnswers(prev => ({ ...prev, [qIdx]: oIdx }))
  }

  const score = Object.entries(answers).filter(
    ([qIdx, oIdx]) => quiz[Number(qIdx)].answer === oIdx
  ).length

  const allAnswered = Object.keys(answers).length === quiz.length

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
          🎯
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-800">Quick Quiz</h2>
          <p className="text-xs text-gray-400">Test what you've learned!</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {quiz.map((q, qIdx) => {
          const selected = answers[qIdx]
          const answered = selected !== undefined

          return (
            <div key={qIdx}>
              <p className="text-sm font-bold text-gray-800 mb-3">
                <span className="text-orange-500 mr-2">Q{qIdx + 1}.</span>
                {q.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, oIdx) => {
                  const isCorrect = oIdx === q.answer
                  const isSelected = selected === oIdx

                  let style = 'border-gray-200 bg-gray-50 text-gray-700 hover:border-orange-300 hover:bg-orange-50'
                  if (answered) {
                    if (isCorrect) style = 'border-green-400 bg-green-50 text-green-700'
                    else if (isSelected) style = 'border-red-400 bg-red-50 text-red-600'
                    else style = 'border-gray-200 bg-gray-50 text-gray-400'
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => select(qIdx, oIdx)}
                      disabled={answered}
                      className={`text-left px-4 py-2.5 rounded-xl border text-sm font-medium
                                  transition-all duration-200 flex items-center gap-2
                                  ${style} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <span className="w-5 h-5 rounded-full border flex-shrink-0 flex items-center
                                       justify-center text-xs font-bold
                                       ${answered && isCorrect ? 'border-green-400 text-green-600' : 'border-current'}">
                        {answered && isCorrect ? '✓' : answered && isSelected ? '✗' : String.fromCharCode(65 + oIdx)}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
              {answered && (
                <p className={`text-xs mt-2 font-semibold ${selected === q.answer ? 'text-green-600' : 'text-red-500'}`}>
                  {selected === q.answer ? '🎉 Correct!' : `Not quite — the answer is "${q.options[q.answer]}"`}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Score */}
      {allAnswered && (
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200
                        rounded-xl flex items-center gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-sm font-bold text-gray-800">
              You scored {score} out of {quiz.length}!
            </p>
            <p className="text-xs text-gray-500">
              {score === quiz.length ? 'Perfect score! You\'re a tradition expert.' : 'Keep exploring to learn more!'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizSection
