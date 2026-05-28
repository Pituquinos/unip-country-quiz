import { Link } from 'react-router-dom'

function Quiz() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-10">
        <div className="w-full rounded-3xl bg-white p-8 shadow-lg">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Pregunta 1 de 5
          </p>

          <h1 className="mb-6 text-3xl font-bold">
            ¿Cuál es la capital de Colombia?
          </h1>

          <div className="grid gap-3">
            <button className="rounded-xl border border-slate-300 px-4 py-3 text-left transition hover:bg-indigo-50">
              A. Bogotá
            </button>
            <button className="rounded-xl border border-slate-300 px-4 py-3 text-left transition hover:bg-indigo-50">
              B. Medellín
            </button>
            <button className="rounded-xl border border-slate-300 px-4 py-3 text-left transition hover:bg-indigo-50">
              C. Cali
            </button>
            <button className="rounded-xl border border-slate-300 px-4 py-3 text-left transition hover:bg-indigo-50">
              D. Barranquilla
            </button>
          </div>

          <Link
            to="/result"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Ver resultado
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Quiz