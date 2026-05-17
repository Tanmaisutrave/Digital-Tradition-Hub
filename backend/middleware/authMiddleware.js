import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' })
    }

    next()
  } catch {
    res.status(401).json({ message: 'Not authorized, token invalid' })
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user?.role === 'admin') return next()
  res.status(403).json({ message: 'Access denied: admins only' })
}

export const moderatorOrAdmin = (req, res, next) => {
  if (req.user?.role === 'admin' || req.user?.role === 'moderator') return next()
  res.status(403).json({ message: 'Access denied: insufficient permissions' })
}
