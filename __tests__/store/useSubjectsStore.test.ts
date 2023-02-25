import { useSubjectsStore } from "@/store/useSubjectsStore"
import { act, cleanup, renderHook, waitFor } from "@testing-library/react"
import axios from "axios"

jest.mock('axios')

const mockedPostAxios = axios.get as jest.Mock

describe('Subjects Store', () => {
    let initialState = useSubjectsStore.getState()
    let responseSubjects = {
        data: [{id: 1, subject: "subject"}]
    }


    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('fetches subjects', async () => {
        const { result } = renderHook(() => useSubjectsStore())

        mockedPostAxios.mockReturnValue(
            Promise.resolve(responseSubjects)
        )

        expect(result.current.subjects.length).toBe(0)

        await act(async () => {
            await result.current.getSubjects()
        })

        expect(mockedPostAxios).toHaveBeenCalled()
        expect(result.current.subjects.length).toBe(1)
        expect(result.current.subjects[0].subject).toBe(responseSubjects.data[0].subject)
    })

    afterEach(() => {
        cleanup()
    })
})