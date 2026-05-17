import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Global response error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('dth_token')
      localStorage.removeItem('dth_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ── Auth ────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  google: (data) => api.post('/auth/google', data),
}

// ── Users ───────────────────────────────────────────────────────
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  saveFestival: (festivalId) => api.post('/users/save', { festivalId }),
  getAllUsers: () => api.get('/users'),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
}

// ── Festivals ───────────────────────────────────────────────────
export const festivalAPI = {
  getAll: (params) => api.get('/festivals', { params }),
  getById: (id) => api.get(`/festivals/${id}`),
  create: (data) => api.post('/festivals', data),
  update: (id, data) => api.put(`/festivals/${id}`, data),
  delete: (id) => api.delete(`/festivals/${id}`),
}

// ── Contributions ───────────────────────────────────────────────
export const contributionAPI = {
  create: (data) => api.post('/contributions', data),
  getAll: (params) => api.get('/contributions', { params }),
  review: (id, data) => api.put(`/contributions/${id}`, data),
  delete: (id) => api.delete(`/contributions/${id}`),
}

// ── Reminders ───────────────────────────────────────────────────
export const reminderAPI = {
  create: (data) => api.post('/reminders', data),
  getAll: () => api.get('/reminders'),
  delete: (id) => api.delete(`/reminders/${id}`),
  deleteByFestival: (festivalId) => api.delete(`/reminders/festival/${festivalId}`),
}

export default api
