import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('Main Page', () => {
    test('Renders Optimist Media heading', () => {
        render(<Home />)

        const title = screen.getByRole('heading')

        expect(title).toBeInTheDocument()
    })
})