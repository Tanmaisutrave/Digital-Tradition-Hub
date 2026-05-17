import { useEffect, useCallback } from 'react'
import upcomingFestivals from '../data/remindersData'

const NOTIFIED_KEY = 'dth_notified'
const REMIND_DAYS_BEFORE = 3 // notify 3 days before + on the day

const getDaysLeft = (dateStr) => {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const fest = new Date(dateStr); fest.setHours(0, 0, 0, 0)
  return Math.round((fest - today) / 86400000)
}

const getNotifiedIds = () => {
  try { return JSON.parse(localStorage.getItem(NOTIFIED_KEY)) || {} } catch { return {} }
}

const markNotified = (id, dateStr) => {
  const map = getNotifiedIds()
  map[id] = dateStr
  localStorage.setItem(NOTIFIED_KEY, JSON.stringify(map))
}

const wasNotifiedToday = (id, dateStr) => {
  const map = getNotifiedIds()
  return map[id] === dateStr
}

const requestPermission = async () => {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission !== 'denied') {
    const result = await Notification.requestPermission()
    return result === 'granted'
  }
  return false
}

const sendBrowserNotification = (festival, daysLeft) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return

  const title = daysLeft === 0
    ? `🎉 ${festival.name} is TODAY!`
    : daysLeft === 1
    ? `🔔 ${festival.name} is TOMORROW!`
    : `📅 ${festival.name} in ${daysLeft} days`

  const body = festival.description

  try {
    const n = new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: festival.id,
    })
    // Auto-close after 8 seconds
    setTimeout(() => n.close(), 8000)
  } catch {}
}

/**
 * useNotifications
 * - Requests browser notification permission on first call
 * - Checks all festivals with reminders set
 * - Fires browser notification + returns in-app alerts
 * - Only notifies once per day per festival (stored in localStorage)
 */
const useNotifications = (reminders) => {
  const checkAndNotify = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0]
    const granted = await requestPermission()

    const alerts = []

    upcomingFestivals.forEach((festival) => {
      const days = getDaysLeft(festival.date)

      // Only alert for festivals within REMIND_DAYS_BEFORE days (and not past)
      if (days < 0 || days > REMIND_DAYS_BEFORE) return

      // Only alert if user has set a reminder OR it's the day itself
      const hasReminder = reminders.includes(festival.id)
      if (!hasReminder && days > 0) return

      // Don't re-notify today if already done
      if (wasNotifiedToday(festival.id, today)) return

      // Fire browser notification
      if (granted) {
        sendBrowserNotification(festival, days)
      }

      markNotified(festival.id, today)
      alerts.push({ ...festival, days })
    })

    return alerts
  }, [reminders])

  useEffect(() => {
    checkAndNotify()
  }, [checkAndNotify])

  return { checkAndNotify, requestPermission }
}

export default useNotifications
