import Reminder from '../models/Reminder.js'

// POST /api/reminders
export const createReminder = async (req, res, next) => {
  try {
    const { festivalId, festivalName, festivalDate, reminderDate } = req.body

    if (!festivalId || !festivalName || !festivalDate) {
      return res.status(400).json({ message: 'festivalId, festivalName and festivalDate are required' })
    }

    // Default reminder: 1 day before festival
    const rDate = reminderDate
      ? new Date(reminderDate)
      : new Date(new Date(festivalDate).getTime() - 86400000)

    const reminder = await Reminder.findOneAndUpdate(
      { userId: req.user._id, festivalId },
      {
        userId: req.user._id,
        festivalId,
        festivalName,
        festivalDate: new Date(festivalDate),
        reminderDate: rDate,
        notified: false,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    res.status(201).json(reminder)
  } catch (err) {
    next(err)
  }
}

// GET /api/reminders
export const getReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ userId: req.user._id }).sort({ festivalDate: 1 })
    res.json(reminders)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/reminders/:id
export const deleteReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    })
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' })
    res.json({ message: 'Reminder removed' })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/reminders/festival/:festivalId
export const deleteReminderByFestival = async (req, res, next) => {
  try {
    await Reminder.findOneAndDelete({
      userId: req.user._id,
      festivalId: req.params.festivalId,
    })
    res.json({ message: 'Reminder removed' })
  } catch (err) {
    next(err)
  }
}
