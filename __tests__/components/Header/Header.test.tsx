import { Header } from "@/components/Header/Header"
import { useAuthStore } from "@/store/authStore"
import { act, render, screen, waitFor } from "@testing-library/react"
import axios from "axios"
import { useRouter } from "next/router"

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

jest.mock('@/store/authStore', () => ({
    useAuthStore: jest.fn()
}))

jest.mock('axios')

const mockedUseRouter = useRouter as jest.Mock
const mockedUseAuthStore = useAuthStore as any
const pushMock = jest.fn()
const mockedAxiosGet = axios.get as jest.Mock

describe('header', () => {
    let subjects = {
        data: [
            {id: 1, subject: "123"}
        ]
    }

    beforeEach(() => {
        jest.clearAllMocks()

        mockedUseRouter.mockReturnValue({query: {}, push: pushMock})
    })
    test('renders header with no auth', async () => {
        mockedUseAuthStore.mockReturnValue({isAuthenticated: false, user: null})
        mockedAxiosGet.mockResolvedValue(subjects)
        act(() => {
            render(<Header />)
        })

        expect(mockedAxiosGet).toHaveBeenCalled()

        const allArticles = screen.getByText(/все статьи/i)
        expect(allArticles).toBeInTheDocument()

        const register = screen.getByText(/Register/i)
        const login = screen.getByText(/login/i)

        expect(register).toBeInTheDocument()
        expect(login).toBeInTheDocument()
    })

    test('renders header with auth', async () => {
        mockedUseAuthStore.mockReturnValue({isAuthenticated: true, user: null})
        mockedAxiosGet.mockResolvedValue(subjects)
        act(() => {
            render(<Header />)
        })

        expect(screen.queryByText(/register/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/login/i)).not.toBeInTheDocument()

        expect(mockedAxiosGet).toHaveBeenCalled()
        await waitFor(async () => expect(await screen.findByText(subjects.data[0].subject)).toBeInTheDocument())
    })

    test('renders email with the max amount of characters', async () => {
        mockedUseAuthStore.mockReturnValue({isAuthenticated: true, user: {email: "volodiabykov216@gmail.com"}})
        mockedAxiosGet.mockResolvedValue(subjects)
        act(() => {
            render(<Header />)
        })
        
        const userEmail = await screen.findByTestId('user-email')

        expect(userEmail).toBeInTheDocument()
        expect(userEmail).toContainHTML("volodiabykov216@gmail.com".slice(0, 20) + "...")
    })
})