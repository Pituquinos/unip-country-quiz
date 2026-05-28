import { Link } from 'react-router-dom'

function Result() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-10">
        <div className="w-full rounded-3xl bg-white p-8 text-center shadow-lg">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Resultado final
          </p>

          <h1 className="mb-4 text-4xl font-bold">Quiz finalizado</h1>

          <p className="mb-6 text-slate-600">
            Tu puntaje aparecerá aquí cuando integremos la lógica del quiz.
          </p>

          <Link
            to="/"
            className="inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Result