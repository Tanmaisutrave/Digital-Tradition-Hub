import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const loadUser = () => {
  try { return JSON.parse(localStorage.getItem('dth_user')) } catch { return null }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadUser)
  const [token, setToken] = useState(() => localStorage.getItem('dth_token'))

  const login = useCallback((userData, jwt) => {
    setUser(userData)
    setToken(jwt)
    localStorage.setItem('dth_user', JSON.stringify(userData))
    localStorage.setItem('dth_token', jwt)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('dth_user')
    localStorage.removeItem('dth_token')
  }, [])

  const updateUser = useCallback((updated) => {
    setUser(updated)
    localStorage.setItem('dth_user', JSON.stringify(updated))
  }, [])

  const isAdmin = user?.role === 'admin'
  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isAdmin, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
