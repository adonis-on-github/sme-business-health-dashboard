import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { AuthFormIds } from '@auth/login/_lib/test.ids'
import { login, signup } from '@/lib/auth/actions'

import { AuthForm } from './auth-form'

vi.mock('@/lib/auth/actions', () => ({
  login: vi.fn(),
  signup: vi.fn(),
}))

vi.mock('@/lib/zod/error-utils', () => ({
  setServerErrors: vi.fn(),
}))

describe('AuthForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders', () => {
    render(<AuthForm />)

    expect(screen.getByTestId(AuthFormIds.form)).toBeInTheDocument()
    expect(screen.getByTestId(AuthFormIds.email)).toBeInTheDocument()
    expect(screen.getByTestId(AuthFormIds.password)).toBeInTheDocument()
    expect(screen.getByTestId(AuthFormIds.login)).toBeInTheDocument()
    expect(screen.getByTestId(AuthFormIds.signup)).toBeInTheDocument()
  })

  describe('login', () => {
    beforeEach(() => {
      vi.mocked(login).mockClear()
    })

    it('calls login action with email and password', async () => {
      const user = userEvent.setup()

      render(<AuthForm />)

      await user.type(screen.getByTestId(AuthFormIds.email), 'test@example.com')
      await user.type(screen.getByTestId(AuthFormIds.password), 'password')
      await user.click(screen.getByTestId(AuthFormIds.login))

      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      })
    })

    it('shows error message when login fails', async () => {
      const user = userEvent.setup()

      vi.mocked(login).mockResolvedValue({
        message: 'Invalid credentials'
      })

      render(<AuthForm />)

      await user.type(screen.getByTestId(AuthFormIds.email), 'test@example.com')
      await user.type(screen.getByTestId(AuthFormIds.password), 'password')
      await user.click(screen.getByTestId(AuthFormIds.login))

      expect(screen.getByTestId(AuthFormIds.error)).toHaveTextContent('Invalid credentials')
    })

    describe('when the input values are invalid', () => {
      it('shows error message', async () => {
        const user = userEvent.setup()

        render(<AuthForm />)

        await user.click(screen.getByTestId(AuthFormIds.login))

        expect(screen.getByTestId(AuthFormIds.emailError)).toHaveTextContent('Invalid email address')
        expect(screen.getByTestId(AuthFormIds.passwordError)).toHaveTextContent('Password must be at least 6 characters long')
      })
    })
  })

  describe('signup', () => {
    beforeEach(() => {
      vi.mocked(signup).mockClear()
    })

    it('calls signup action with email and password', async () => {
      const user = userEvent.setup()

      render(<AuthForm />)

      await user.click(screen.getByTestId(AuthFormIds.signup))
      await user.type(screen.getByTestId(AuthFormIds.email), 'test@example.com')
      await user.type(screen.getByTestId(AuthFormIds.password), 'password')
      await user.click(screen.getByTestId(AuthFormIds.signup))

      expect(signup).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      })
    })

    it('shows error message when signup fails', async () => {
      const user = userEvent.setup()

      vi.mocked(signup).mockResolvedValue({
        message: 'The email is already in use'
      })

      render(<AuthForm />)

      await user.click(screen.getByTestId(AuthFormIds.signup))
      await user.type(screen.getByTestId(AuthFormIds.email), 'test@example.com')
      await user.type(screen.getByTestId(AuthFormIds.password), 'password')
      await user.click(screen.getByTestId(AuthFormIds.signup))

      expect(screen.getByTestId(AuthFormIds.error)).toHaveTextContent('The email is already in use')
    })

    describe('when the input values are invalid', () => {
      it('shows error message', async () => {
        const user = userEvent.setup()

        render(<AuthForm />)

        await user.click(screen.getByTestId(AuthFormIds.signup))

        expect(screen.getByTestId(AuthFormIds.emailError)).toHaveTextContent('Invalid email address')
        expect(screen.getByTestId(AuthFormIds.passwordError)).toHaveTextContent('Password must be at least 6 characters long')
      })
    })
  })
})