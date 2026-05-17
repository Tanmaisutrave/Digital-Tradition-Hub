import User from '../models/User.js'
import Festival from '../models/Festival.js'

// GET /api/users/profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('savedItems', 'title region category')
    res.json(user)
  } catch (err) {
    next(err)
  }
}

// PUT /api/users/profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, location, gender, dateOfBirth, profilePic } = req.body

    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    if (name) user.name = name
    if (bio !== undefined) user.bio = bio
    if (location !== undefined) user.location = location
    if (gender !== undefined) user.gender = gender
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth
    if (profilePic !== undefined) user.profilePic = profilePic

    const updated = await user.save()
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      bio: updated.bio,
      location: updated.location,
      gender: updated.gender,
      dateOfBirth: updated.dateOfBirth,
      profilePic: updated.profilePic,
      role: updated.role,
    })
  } catch (err) {
    next(err)
  }
}

// POST /api/users/save  — toggle save/unsave a festival
export const toggleSaveFestival = async (req, res, next) => {
  try {
    const { festivalId } = req.body
    if (!festivalId) return res.status(400).json({ message: 'festivalId is required' })

    const festival = await Festival.findById(festivalId)
    if (!festival) return res.status(404).json({ message: 'Festival not found' })

    const user = await User.findById(req.user._id)
    const idx = user.savedItems.indexOf(festivalId)

    if (idx === -1) {
      user.savedItems.push(festivalId)
    } else {
      user.savedItems.splice(idx, 1)
    }

    await user.save()
    res.json({ saved: idx === -1, savedItems: user.savedItems })
  } catch (err) {
    next(err)
  }
}

// GET /api/users  (admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (err) {
    next(err)
  }
}

// PUT /api/users/:id/role  (admin only)
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body
    const allowed = ['user', 'moderator', 'admin']
    if (!allowed.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, select: '-password' }
    )
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    next(err)
  }
}
