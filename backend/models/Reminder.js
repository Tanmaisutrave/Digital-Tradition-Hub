import mongoose from 'mongoose'

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  festivalId: { type: String, required: true }, // supports both ObjectId and slug keys
  festivalName: { type: String, required: true },
  festivalDate: { type: Date, required: true },
  reminderDate: { type: Date, required: true },
  notified: { type: Boolean, default: false },
}, { timestamps: true })

// One reminder per user per festival
reminderSchema.index({ userId: 1, festivalId: 1 }, { unique: true })

export default mongoose.model('Reminder', reminderSchema)
