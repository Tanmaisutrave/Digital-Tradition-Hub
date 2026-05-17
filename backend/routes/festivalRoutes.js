import express from 'express'
import {
  getFestivals,
  getFestivalById,
  createFestival,
  updateFestival,
  deleteFestival,
} from '../controllers/festivalController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getFestivals)
router.get('/:id', getFestivalById)
router.post('/', protect, adminOnly, createFestival)
router.put('/:id', protect, adminOnly, updateFestival)
router.delete('/:id', protect, adminOnly, deleteFestival)

export default router
