import mongoose from 'mongoose'

const funFactSchema = new mongoose.Schema({
  fact: String,
  color: String,
}, { _id: false })

const quizQuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number,
}, { _id: false })

const festivalSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  region: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['Festival', 'Harvest', 'Religious', 'Cultural', 'Ritual'],
    default: 'Festival',
  },
  tagline: { type: String, default: '' },
  story: { type: String, default: '' },
  whyCelebrate: { type: String, default: '' },
  traditions: [String],
  funFacts: [funFactSchema],
  quiz: [quizQuestionSchema],
  images: [String],
  videos: [String],
  color: { type: String, default: 'from-orange-400 to-yellow-300' },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  festivalDate: { type: Date, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

festivalSchema.index({ title: 'text', region: 'text', category: 'text' })

export default mongoose.model('Festival', festivalSchema)
