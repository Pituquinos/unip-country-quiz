import { act } from 'react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('Country Quiz UI', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    vi.useRealTimers()
  })

  test('muestra la pantalla inicial del quiz con el high score guardado', () => {
    localStorage.setItem('country-quiz-high-score', '3')

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: /pon a prueba tus conocimientos sobre paises/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText(/high score: 3/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /iniciar quiz/i }),
    ).toBeInTheDocument()
  })

  test('permite cambiar entre modo oscuro y modo claro', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    const toggleButton = screen.getByRole('switch', {
      name: /cambiar a modo oscuro/i,
    })

    await user.click(toggleButton)

    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(
      screen.getByRole('switch', { name: /cambiar a modo claro/i }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('switch', { name: /cambiar a modo claro/i }),
    )

    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  test('suma puntos al responder correctamente y persiste el resultado final', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/quiz']}>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /bogota/i }))
    expect(screen.getByText(/puntaje actual: 1 \/ 5/i)).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /siguiente pregunta/i }),
    )

    expect(
      screen.getByRole('heading', {
        name: /que pais tiene como capital a ottawa/i,
      }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /canada/i }))
    await user.click(
      screen.getByRole('button', { name: /siguiente pregunta/i }),
    )
    await user.click(screen.getByRole('button', { name: /japon/i }))
    await user.click(
      screen.getByRole('button', { name: /siguiente pregunta/i }),
    )
    await user.click(screen.getByRole('button', { name: /africa/i }))
    await user.click(
      screen.getByRole('button', { name: /siguiente pregunta/i }),
    )
    await user.click(
      screen.getByRole('button', { name: /libra esterlina/i }),
    )
    await user.click(screen.getByRole('button', { name: /ver resultado/i }))

    expect(
      screen.getByRole('heading', { name: /quiz finalizado/i }),
    ).toBeInTheDocument()
    expect(localStorage.getItem('country-quiz-high-score')).toBe('5')
    expect(localStorage.getItem('country-quiz-last-score')).toBe('5')
  })

  test('marca la pregunta como erronea cuando el temporizador llega a cero', async () => {
    vi.useFakeTimers()
    render(
      <MemoryRouter initialEntries={['/quiz']}>
        <App />
      </MemoryRouter>,
    )

    act(() => {
      vi.advanceTimersByTime(15_000)
    })

    expect(screen.getByText('0s')).toBeInTheDocument()
    expect(screen.getByText(/puntaje actual: 0 \/ 5/i)).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: /siguiente pregunta/i }),
    )

    expect(
      screen.getByRole('heading', {
        name: /que pais tiene como capital a ottawa/i,
      }),
    ).toBeInTheDocument()
  })

  test('reproduce feedback de error al seleccionar una respuesta incorrecta', async () => {
    const user = userEvent.setup()
    const playedFrequencies: number[] = []

    Object.defineProperty(window, 'AudioContext', {
      configurable: true,
      value: class {
        currentTime = 0
        destination = {}
        state = 'running'

        createOscillator() {
          return {
            type: 'sine' as OscillatorType,
            frequency: {
              setValueAtTime: (frequency: number) => {
                playedFrequencies.push(frequency)
              },
            },
            connect: vi.fn(),
            start: vi.fn(),
            stop: vi.fn(),
          }
        }

        createGain() {
          return {
            gain: {
              setValueAtTime: vi.fn(),
              exponentialRampToValueAtTime: vi.fn(),
            },
            connect: vi.fn(),
          }
        }

        close() {
          return Promise.resolve()
        }

        resume() {
          return Promise.resolve()
        }
      },
    })

    render(
      <MemoryRouter initialEntries={['/quiz']}>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /medellin/i }))

    expect(screen.getByText(/puntaje actual: 0 \/ 5/i)).toBeInTheDocument()
    expect(playedFrequencies).toEqual([293.66, 196])
  })
})
