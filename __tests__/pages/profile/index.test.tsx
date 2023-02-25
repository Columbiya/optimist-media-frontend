import ProfilePage from "@/pages/profile"
import { useAuthStore } from "@/store/authStore"
import { render } from "@testing-library/react"
import { useRouter } from "next/router"

jest.mock('@/store/authStore', () => ({
    useAuthStore: jest.fn()
}))
jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

const mockedUseAuthStore = useAuthStore as any
const mockedUseRouter = useRouter as jest.Mock
const pushMock = jest.fn()

describe('profile page', () => {
    beforeEach(() => {{
        jest.clearAllMocks()

        mockedUseRouter.mockReturnValue({query: {}, push: pushMock})
    }})

    test('redirects', () => {
        mockedUseAuthStore.mockReturnValue({loaded: true, isAuthenticated: false, user: null})
        render(<ProfilePage />)

        expect(pushMock).toHaveBeenCalled()
    })

    test('redirects', () => {
        mockedUseAuthStore.mockReturnValue({loaded: true, isAuthenticated: false, user: null})
        render(<ProfilePage />)

        expect(pushMock).toHaveBeenCalled()
    })
})