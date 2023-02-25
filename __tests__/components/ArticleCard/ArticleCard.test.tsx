import { ArticleCard } from "@/components/ArticleCard/ArticleCard"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { useRouter } from "next/router"

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))
const mockedUseRouter = useRouter as jest.Mock

const pushMock = jest.fn()

describe('article card', () => {
    let mockArticle = {
        id: 1,
        subjectId: 1,
        text: "123",
        title: '123',
        userId: 1,
        articleImage: 'super-image.png',
        views: 1
    }
    beforeEach(() => {
        mockedUseRouter.mockReturnValue({query: {}, push: pushMock})
    })

    test('renders title and the button', () => {
        act(() => render(<ArticleCard {...mockArticle} />))

        const button = screen.getByRole('button')
        const title = screen.getByRole('heading')

        expect(button).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(title).toContainHTML(mockArticle.title)
    })

    test('redirects when clicked', () => {
        act(() => render(<ArticleCard {...mockArticle} />))

        const articleCard = screen.getByTestId('article-card')

        act(() => fireEvent.click(articleCard))
        expect(pushMock).toHaveBeenCalled()
        expect(pushMock.mock.calls[0]).toEqual(['/articles/1'])
    })

    test('image scales up when hovering over it', () => {
        act(() => render(<ArticleCard {...mockArticle} />))

        const image = screen.getByRole('img')

        act(() => {
            fireEvent.load(image)
            fireEvent.mouseEnter(image)
        })
        
        expect(image).toHaveStyle({transform: 'scale(1.3)'})

        act(() => {
            fireEvent.mouseLeave(image)
        })

        expect(image).not.toHaveStyle({transform: 'scale(1.3)'})
    })
})