import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200 text-slate-900 transition dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 dark:text-slate-100">
      <section className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-10">
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>

        <div className="grid w-full gap-8 rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur transition dark:bg-slate-900/90 md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-indigo-600">
              Country Quiz
            </p>

            <h1 className="mb-5 text-4xl font-extrabold leading-tight md:text-5xl">
              Pon a prueba tus conocimientos sobre países
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Responde preguntas sobre capitales, banderas y cultura general.
              Tendrás 15 segundos por pregunta, así que piensa rápido.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/quiz"
                className="rounded-2xl bg-indigo-600 px-7 py-4 text-center font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 dark:shadow-none"
              >
                Iniciar quiz
              </Link>

              <div className="rounded-2xl border border-slate-200 px-7 py-4 text-center font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                High Score: 0
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-indigo-600 p-8 text-white shadow-xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-indigo-100">
              Reglas del juego
            </p>

            <ul className="space-y-4 text-indigo-50">
              <li>• 15 segundos por pregunta.</li>
              <li>• Las respuestas correctas suman puntos.</li>
              <li>• Si el tiempo termina, la pregunta cuenta como incorrecta.</li>
              <li>• El mejor puntaje se guardará automáticamente.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home