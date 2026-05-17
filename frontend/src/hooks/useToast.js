import { useState, useCallback } from 'react'

let id = 0

const useToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const tid = ++id
    setToasts((p) => [...p, { id: tid, message, type }])
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== tid)), 3500)
  }, [])

  const removeToast = useCallback((tid) => {
    setToasts((p) => p.filter((t) => t.id !== tid))
  }, [])

  return { toasts, addToast, removeToast }
}

export default useToast
