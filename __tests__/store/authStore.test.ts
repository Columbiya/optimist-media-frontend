import { useAuthStore } from "@/store/authStore"
import { act, cleanup, renderHook, waitFor } from "@testing-library/react"
import axios from "axios"

jest.mock('axios')

const mockedPostAxios = axios.post as jest.Mock

describe('Auth store', () => {
    let initialState = useAuthStore.getState()
    let registerResponse = {
        data: {
            user: {
                id: 1, email: "123"
            }, 
            token: "123", 
            refreshToken: "123"
        }
    }


    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('user gets authorized', () => {
        const { result } = renderHook(() => useAuthStore())

        act(() => result.current.getAuthenticated())

        expect(result.current.isAuthenticated).toBeTruthy()
        expect(result.current.loaded).toBeTruthy()

        //current to get the most current value return by the hook
    })

    test('user gets unauthorized', () => {
        const { result } = renderHook(() => useAuthStore())
        act(() => result.current.unauthorize())

        expect(result.current.isAuthenticated).toBeFalsy()
    })

    test('request for register gets called', async () => {
        const { result } = renderHook(() => useAuthStore())

        mockedPostAxios.mockReturnValue(
            Promise.resolve(registerResponse)
        )

        await act(async () => {
            await waitFor(() => 
                result.current.registerUser({email: "123", password: "123"})
            )
        })

        expect(mockedPostAxios).toHaveBeenCalled()
        expect(result.current.isAuthenticated).toBeTruthy()
        expect(result.current.user?.email).toBe("123")
        expect(result.current.user?.id).toBe(1)
    })

    test('login user with request', async () => {
        const { result } = renderHook(() => useAuthStore())

        mockedPostAxios.mockReturnValue(
            Promise.resolve(registerResponse)
        )

        await act(async () => {
            await waitFor(() => 
                result.current.login({email: "1234", password: "123"}))
        })

        expect(mockedPostAxios).toHaveBeenCalled()
        expect(result.current.user?.email).toBe(registerResponse.data.user.email)
        expect(result.current.user?.id).toBe(1)
    })

    afterEach(() => {
        cleanup()
    })
})