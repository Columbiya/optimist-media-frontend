import axios from "axios";
import { create } from "zustand";

interface TokenPair {
    token: string
    refreshToken: string
}

interface RegisterUserPayload {
    email: string
    password: string
}

interface RegisterResponse extends CheckResponse {
    token: string
    refreshToken: string
}

interface User {
    email: string
    id: number
    isAdmin: boolean
}

export interface CheckResponse extends StatusResponse {
    user: User
}

type loginResponse = TokenPair & CheckResponse

export interface StatusResponse {
    status: boolean
}

interface AuthState {
    isAuthenticated: boolean
    user: User | null
    getAuthenticated: () => void
    unauthorize: () => void
    registerUser: (payload: RegisterUserPayload) => Promise<void>
    check: () => Promise<void>
    login: (payload: RegisterUserPayload) => Promise<void>
    loaded: boolean
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    loaded: false,
    email: "123",
    getAuthenticated: () => set((state) => ({ isAuthenticated: true, loaded: true })),
    unauthorize: () => {
        set((state) => ({ isAuthenticated: false }))
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    },
    registerUser: async (payload) =>  {
        const data = await axios.post<RegisterResponse>('http://localhost:5000/api/auth/register', {...payload}).then(res => res.data)

        localStorage.setItem('accessToken', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)

        set(state => ({ isAuthenticated: true, user: data.user, loaded: true }))
    },
    login: async (payload) => {
        const data = await axios.post<loginResponse>('http://localhost:5000/api/auth/login', {...payload}).then(res => res.data)

        localStorage.setItem('accessToken', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        console.log(data.user)
        set(state => ({user: data.user, isAuthenticated: true, loaded: true}))
    },
    check: async () => {
        if (!localStorage.getItem('accessToken') || !localStorage.getItem('refreshToken')) return

        const data = await axios.post<CheckResponse>('http://localhost:5000/api/auth/check', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.data)

        if (data.status) {
            set(state => ({ isAuthenticated: true, user: data.user, loaded: true }))
        }
    }
}))