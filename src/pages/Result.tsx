import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

function Result() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200 text-slate-900 transition dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 dark:text-slate-100">
      <section className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-10">
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>

        <div className="w-full rounded-3xl bg-white/90 p-8 text-center shadow-2xl backdrop-blur transition dark:bg-slate-900/90 md:p-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-indigo-600">
            Resultado final
          </p>

          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
            Quiz finalizado
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Aquí se mostrará el puntaje obtenido, el mejor puntaje guardado y la
            opción para volver a intentarlo.
          </p>

          <div className="mx-auto mb-8 grid max-w-md gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-indigo-50 p-5 dark:bg-slate-800">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Puntaje
              </p>
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-300">
                0
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-5 dark:bg-slate-800">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                High Score
              </p>
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-300">
                0
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-block rounded-2xl bg-indigo-600 px-7 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 dark:shadow-none"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Result