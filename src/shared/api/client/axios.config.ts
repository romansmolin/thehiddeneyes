import axios from 'axios'

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

apiClient.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            console.warn('[API] Unauthorized request')
        }
        return Promise.reject(error)
    },
)
