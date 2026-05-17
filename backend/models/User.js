import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const quizScoreSchema = new mongoose.Schema({
  festivalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Festival' },
  score: Number,
  total: Number,
  takenAt: { type: Date, default: Date.now },
}, { _id: false })

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, select: false },
  googleId: { type: String, default: null },
  profilePic: { type: String, default: '' },
  dateOfBirth: { type: Date, default: null },
  gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
  location: { type: String, default: '' },
  bio: { type: String, default: '', maxlength: 300 },
  role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
  savedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Festival' }],
  quizScores: [quizScoreSchema],
}, { timestamps: true })

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password)
}

export default mongoose.model('User', userSchema)
