import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import festivalRoutes from './routes/festivalRoutes.js'
import contributionRoutes from './routes/contributionRoutes.js'
import reminderRoutes from './routes/reminderRoutes.js'

// Connect to MongoDB
connectDB()

const app = express()

// ── Middleware ──────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://digital-tradition-hub.vercel.app'
  ],
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Home Route ──────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Digital Tradition Hub Backend is Running 🚀')
})

// ── Routes ──────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/festivals', festivalRoutes)
app.use('/api/contributions', contributionRoutes)
app.use('/api/reminders', reminderRoutes)

// ── Health Check ────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Digital Tradition Hub API is running',
  })
})

// ── Error Handling ──────────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})