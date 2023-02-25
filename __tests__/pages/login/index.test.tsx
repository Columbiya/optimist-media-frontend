import LoginPage from "@/pages/login"
import { useAuthStore } from "@/store/authStore"
import { useToast } from "@chakra-ui/react"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useRouter } from "next/router"

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

jest.mock('@/store/authStore', () => ({
    useAuthStore: jest.fn()
}))

const mockedUseRouter = useRouter as jest.Mock
const mockedUseAuthStore = useAuthStore as any

const prepare = () => {
    act(() => {
        render(
            <LoginPage />
        )
    })
}

const pushMock = jest.fn()
const loginMock = jest.fn()

describe('Login Page', () => {
    beforeEach(() => {
        jest.clearAllMocks()

        act(() => {
            mockedUseRouter.mockReturnValue({query: {}, push: pushMock})
        })
    })

    test('Renders and redirects with auth', () => {
        mockedUseAuthStore.mockReturnValue({isAuthenticated: true})

        prepare()

        expect(pushMock).toBeCalledTimes(1)
    })

    test('login gets called when loggin in', async () => {
        mockedUseAuthStore.mockReturnValue({isAuthenticated: false, login: loginMock})

        prepare()

        const emailInput = screen.getByTestId('email')
        const passwordInput = screen.getByTestId('password')
        const buttonSubmit = screen.getByTestId('submit-button')

        act(() => {
            fireEvent.change(emailInput, {target: {value: "123@mail.ru"}})
            fireEvent.change(passwordInput, {target: {value: "12345678"}})
            fireEvent.click(buttonSubmit)
        })

        expect(emailInput).toHaveValue('123@mail.ru')
        expect(passwordInput).toHaveValue('12345678')
        await waitFor(() => expect(loginMock).toBeCalled()) 

        //handle submit is asynchronous :)
    })

    test('form wont call onsubmit', async () => {
        mockedUseAuthStore.mockReturnValue({isAuthenticated: false, login: loginMock})

        prepare()

        const emailInput = screen.getByTestId('email')
        const passwordInput = screen.getByTestId('password')
        const buttonSubmit = screen.getByTestId('submit-button')

        act(() => {
            fireEvent.change(emailInput, {target: {value: "123@"}})
            fireEvent.click(buttonSubmit)
        })

        await waitFor(() => expect(loginMock).not.toHaveBeenCalled())

        act(() => {
            fireEvent.change(passwordInput, {target: {value: '12345678'}})
            fireEvent.click(buttonSubmit)
        })

        await waitFor(() => expect(loginMock).not.toHaveBeenCalled())

        act(() => {
            fireEvent.change(emailInput, {target: {value: '123@mail.ru'}})
            fireEvent.click(buttonSubmit)
        })

        await waitFor(() => expect(loginMock).toHaveBeenCalled())
    })
})