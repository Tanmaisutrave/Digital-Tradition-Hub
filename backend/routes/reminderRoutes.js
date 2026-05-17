import express from 'express'
import {
  createReminder,
  getReminders,
  deleteReminder,
  deleteReminderByFestival,
} from '../controllers/reminderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createReminder)
router.get('/', protect, getReminders)
router.delete('/festival/:festivalId', protect, deleteReminderByFestival)
router.delete('/:id', protect, deleteReminder)

export default router
