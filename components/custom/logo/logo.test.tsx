import { render, screen } from '@testing-library/react'
import { Logo } from './logo'
import { LogoID } from './test.ids'

describe('Logo', () => {
  it('renders the logo', () => {
    render(<Logo />)

    expect(screen.getByTestId(LogoID.root)).toBeInTheDocument()

    expect(screen.getByTestId(LogoID.first)).toBeInTheDocument()

    expect(screen.getByTestId(LogoID.second)).toBeInTheDocument()

    expect(screen.getByTestId(LogoID.third)).toBeInTheDocument()
  })
})