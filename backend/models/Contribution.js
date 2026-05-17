import mongoose from 'mongoose'

const contributionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['Festival', 'Food', 'Clothing', 'Art', 'Ritual', 'Music', 'Dance'],
    required: true,
  },
  region: { type: String, required: true, trim: true },
  story: { type: String, default: '' },
  image: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  reviewNote: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  reviewedAt: { type: Date, default: null },
}, { timestamps: true })

export default mongoose.model('Contribution', contributionSchema)
