import express from 'express'
import {
  createContribution,
  getContributions,
  reviewContribution,
  deleteContribution,
} from '../controllers/contributionController.js'
import { protect, moderatorOrAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createContribution)
router.get('/', protect, getContributions)
router.put('/:id', protect, moderatorOrAdmin, reviewContribution)
router.delete('/:id', protect, deleteContribution)

export default router
