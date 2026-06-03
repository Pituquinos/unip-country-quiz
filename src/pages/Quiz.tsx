import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

const options = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla']

function Quiz() {
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
                Pregunta 1 de 5
              </p>

              <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
                ¿Cuál es la capital de Colombia?
              </h1>
            </div>

            <div className="rounded-2xl bg-indigo-100 px-5 py-3 text-center font-bold text-indigo-700 dark:bg-slate-800 dark:text-indigo-300">
              15s
            </div>
          </div>

          <div className="grid gap-4">
            {options.map((option, index) => (
              <button
                key={option}
                type="button"
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left font-semibold text-slate-700 shadow-sm transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
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
              Selecciona una respuesta para continuar.
            </p>

            <Link
              to="/result"
              className="rounded-2xl bg-indigo-600 px-6 py-3 text-center font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 dark:shadow-none"
            >
              Ver resultado
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Quiz