import { describe, expect, test, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('Country Quiz UI', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  test('muestra la pantalla inicial del quiz', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: /pon a prueba tus conocimientos sobre países/i,
      }),
    ).toBeInTheDocument()

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

    const toggleButton = screen.getByRole('button', { name: /modo oscuro/i })

    await user.click(toggleButton)

    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(
      screen.getByRole('button', { name: /modo claro/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /modo claro/i }))

    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })
})