import { useUserStore } from "@/store/useUserStore"
import { act, cleanup, renderHook } from "@testing-library/react"
import axios from "axios"

jest.mock('axios')

const mockedPostAxios = axios.post as jest.Mock
const mockedGetAxios = axios.get as jest.Mock

describe('user store', () => {
    let mockDetails = {
        data: {
            id: 1,
            username: "123",
            email: "123",
            articles: [],
            profilePhoto: "123.png"
        }
    }

    let mockPhotoResponse = {
        data: {
            profilePhoto: "555.png"
        }
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('everything is not defined at the start', () => {
        const { result } = renderHook(() => useUserStore())

        expect(result.current.articles).toBeUndefined()
        expect(result.current.username).toBeUndefined()
        expect(result.current.id).toBeUndefined()
        expect(result.current.email).toBeUndefined()
        expect(result.current.profilePhoto).toBeUndefined()
        expect(result.current.loaded).toBeFalsy()
    })

    test('fetches user details', async () => {
        const { result } = renderHook(() => useUserStore())
        
        mockedGetAxios.mockResolvedValue(mockDetails)

        await act(async () => {
            await result.current.fetchUserDetails(1)
        })
        
        expect(mockedGetAxios).toHaveBeenCalled()
        expect(result.current.loaded).toBeTruthy()
        expect(result.current.email).toBe(mockDetails.data.email)
        expect(result.current.id).toBe(mockDetails.data.id)
        expect(result.current.username).toBe(mockDetails.data.username)
        expect(result.current.profilePhoto).toBe(mockDetails.data.profilePhoto)
        expect(result.current.loaded).toBeTruthy()
    })

    test('request is being made when trying to upload profile image', async () => {
        const { result } = renderHook(() => useUserStore())

        mockedPostAxios.mockResolvedValue(mockPhotoResponse)

        await act(async () => {
            await result.current.setUserProfilePhoto(null, mockDetails.data.id)
        })

        expect(mockedPostAxios).toHaveBeenCalled()
        expect(result.current.profilePhoto).toBe(mockPhotoResponse.data.profilePhoto)
    })

    afterEach(() => {
        cleanup()
    })
})