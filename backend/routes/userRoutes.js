import express from 'express'
import {
  getProfile,
  updateProfile,
  toggleSaveFestival,
  getAllUsers,
  updateUserRole,
} from '../controllers/userController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.post('/save', protect, toggleSaveFestival)

// Admin routes
router.get('/', protect, adminOnly, getAllUsers)
router.put('/:id/role', protect, adminOnly, updateUserRole)

export default router
