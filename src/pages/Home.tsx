import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-10">
        <div className="w-full rounded-3xl bg-white p-8 shadow-lg">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Country Quiz
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            Pon a prueba tus conocimientos
          </h1>

          <p className="mb-6 text-slate-600">
            Responde preguntas sobre países, banderas y capitales. Tendrás 15
            segundos por pregunta.
          </p>

          <Link
            to="/quiz"
            className="inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Iniciar quiz
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home