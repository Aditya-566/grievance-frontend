import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message)

    if (error.code === 'NETWORK_ERROR') {
      console.error('Network Error - Check if backend is running and CORS is configured')
    }

    if (error.response?.status === 403 && error.response?.data?.error === 'CORS policy violation') {
      console.error('CORS Error - Origin not allowed:', error.response.data.origin)
    }

    return Promise.reject(error)
  }
)

export default api
