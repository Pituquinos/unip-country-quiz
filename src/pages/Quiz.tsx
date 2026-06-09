import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { questions } from '../data/questions'
import { playFeedback } from '../utils/audio'
import { saveScore } from '../utils/storage'

const QUESTION_TIME = 15
const TIMEOUT_ANSWER = '__timeout__'

function shuffleOptions(options: string[]) {
  const shuffledOptions = [...options]

  for (let index = shuffledOptions.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentOption = shuffledOptions[index]

    shuffledOptions[index] = shuffledOptions[randomIndex]
    shuffledOptions[randomIndex] = currentOption
  }

  return shuffledOptions
}

function Quiz() {
  const navigate = useNavigate()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)
  const [shuffledOptions, setShuffledOptions] = useState(() =>
    shuffleOptions(questions[0].options),
  )

  const question = questions[questionIndex]
  const hasAnswered = selectedAnswer !== null
  const isLastQuestion = questionIndex === questions.length - 1

  useEffect(() => {
    if (hasAnswered) {
      return
    }

    const timer = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          window.clearInterval(timer)
          setSelectedAnswer(TIMEOUT_ANSWER)
          playFeedback('error')
          return 0
        }

        return currentTime - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [hasAnswered, questionIndex])

  function handleAnswer(option: string) {
    if (hasAnswered) {
      return
    }

    const isCorrect = option === question.correctAnswer

    setSelectedAnswer(option)
    playFeedback(isCorrect ? 'success' : 'error')

    if (isCorrect) {
      setScore((currentScore) => currentScore + 1)
    }
  }

  function handleNextQuestion() {
    if (isLastQuestion) {
      saveScore(score)
      navigate('/result', { state: { score } })
      return
    }

    setQuestionIndex((currentIndex) => currentIndex + 1)
    setSelectedAnswer(null)
    setTimeLeft(QUESTION_TIME)
    setShuffledOptions(shuffleOptions(questions[questionIndex + 1].options))
  }

  function getOptionClass(option: string) {
    const baseClass =
      'rounded-2xl border px-5 py-4 text-left font-semibold shadow-sm transition dark:text-slate-100'

    if (!hasAnswered) {
      return `${baseClass} border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-300 dark:hover:bg-slate-700 dark:hover:text-white`
    }

    if (option === question.correctAnswer) {
      return `${baseClass} border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-950`
    }

    if (option === selectedAnswer) {
      return `${baseClass} border-rose-500 bg-rose-50 text-rose-800 dark:border-rose-400 dark:bg-rose-950`
    }

    return `${baseClass} border-slate-200 bg-white text-slate-400 opacity-75 dark:border-slate-700 dark:bg-slate-800`
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200 text-slate-900 transition dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 dark:text-slate-100">
      <section className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-10">
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>

        <div className="w-full rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur transition dark:bg-slate-900/90 md:p-10">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-600">
                Pregunta {questionIndex + 1} de {questions.length}
              </p>

              <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
                {question.prompt}
              </h1>
            </div>

            <div
              aria-live="polite"
              className="rounded-2xl bg-indigo-100 px-5 py-3 text-center font-bold text-indigo-700 dark:bg-slate-800 dark:text-indigo-300"
            >
              {timeLeft}s
            </div>
          </div>

          <div className="grid gap-4">
            {shuffledOptions.map((option, index) => (
              <button
                key={option}
                type="button"
                disabled={hasAnswered}
                onClick={() => handleAnswer(option)}
                className={getOptionClass(option)}
              >
                <span className="mr-3 font-bold text-indigo-600 dark:text-indigo-300">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Puntaje actual: {score} / {questions.length}
            </p>

            <button
              type="button"
              disabled={!hasAnswered}
              onClick={handleNextQuestion}
              className="rounded-2xl bg-indigo-600 px-6 py-3 text-center font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:shadow-none dark:disabled:bg-slate-700"
            >
              {isLastQuestion ? 'Ver resultado' : 'Siguiente pregunta'}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Quiz
