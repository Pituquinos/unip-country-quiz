export const HIGH_SCORE_KEY = 'country-quiz-high-score'
export const LAST_SCORE_KEY = 'country-quiz-last-score'

export function readStoredNumber(key: string) {
  const value = Number(localStorage.getItem(key))

  return Number.isFinite(value) ? value : 0
}

export function saveScore(score: number) {
  localStorage.setItem(LAST_SCORE_KEY, String(score))

  const currentHighScore = readStoredNumber(HIGH_SCORE_KEY)

  if (score > currentHighScore) {
    localStorage.setItem(HIGH_SCORE_KEY, String(score))
    return score
  }

  return currentHighScore
}
