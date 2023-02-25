import axios from "axios";
import { create } from "zustand";
import { Article } from '../models/Article'

interface UserState {
    id?: number
    username?: string
    email?: string
    articles?: Article[]
    profilePhoto?: string
    fetchUserDetails: (id: number) => Promise<void>
    setUserProfilePhoto: (image: File | null, userId: number) => Promise<void>
    loaded: boolean
}

type UserResponse = UserState

export const useUserStore = create<UserState>((set) => ({
    id: undefined,
    username: undefined,
    email: undefined,
    articles: undefined,
    loaded: false,
    profilePhoto: undefined,
    async fetchUserDetails(id: number) {
        try {
            const fetchedUser = await axios.get<UserResponse>(`http://localhost:5000/api/users/${id}`).then(res => res.data)
            set(state => ({...fetchedUser, loaded: true}))
        } catch(e) {
            set(state => ({loaded: true}))

            console.log(e)

            throw new Error()
        }
    },
    async setUserProfilePhoto(image = null, userId) {
        try {
            const formData = new FormData()
            formData.append('image', image ? image: "")

            const userWithNewImage = await axios.post<UserResponse>(`http://localhost:5000/api/users/set-image/${userId}`, formData).then(res => res.data)

            set(state => ({profilePhoto: userWithNewImage.profilePhoto}))
        } catch(e) {
            console.log(e)

            throw new Error()
        }
    },
}))