export type QuizQuestion = {
  id: number
  prompt: string
  options: string[]
  correctAnswer: string
}

export const questions: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'Cual es la capital de Colombia?',
    options: ['Bogota', 'Medellin', 'Cali', 'Barranquilla'],
    correctAnswer: 'Bogota',
  },
  {
    id: 2,
    prompt: 'Que pais tiene como capital a Ottawa?',
    options: ['Canada', 'Australia', 'Irlanda', 'Noruega'],
    correctAnswer: 'Canada',
  },
  {
    id: 3,
    prompt: 'Que bandera tiene un circulo rojo sobre fondo blanco?',
    options: ['Japon', 'Corea del Sur', 'China', 'Vietnam'],
    correctAnswer: 'Japon',
  },
  {
    id: 4,
    prompt: 'En que continente esta Egipto?',
    options: ['Africa', 'Asia', 'Europa', 'Oceania'],
    correctAnswer: 'Africa',
  },
  {
    id: 5,
    prompt: 'Cual es la moneda oficial de Reino Unido?',
    options: ['Libra esterlina', 'Euro', 'Dolar', 'Franco'],
    correctAnswer: 'Libra esterlina',
  },
]
