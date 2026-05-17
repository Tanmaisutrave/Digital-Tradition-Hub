import { useState, useEffect } from 'react'

const STORAGE_KEY = 'dth_reminders'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

const useReminders = () => {
  const [reminders, setReminders] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders))
  }, [reminders])

  const addReminder = (id) => {
    if (!reminders.includes(id)) setReminders((p) => [...p, id])
  }

  const removeReminder = (id) => {
    setReminders((p) => p.filter((r) => r !== id))
  }

  const hasReminder = (id) => reminders.includes(id)

  return { reminders, addReminder, removeReminder, hasReminder }
}

export default useReminders
