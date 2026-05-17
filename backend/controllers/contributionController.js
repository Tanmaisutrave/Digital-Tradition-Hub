import Contribution from '../models/Contribution.js'

// POST /api/contributions
export const createContribution = async (req, res, next) => {
  try {
    const { title, description, category, region, story, image, videoUrl } = req.body

    if (!title || !description || !category || !region) {
      return res.status(400).json({ message: 'Title, description, category and region are required' })
    }

    const contribution = await Contribution.create({
      title, description, category, region, story, image, videoUrl,
      createdBy: req.user._id,
    })

    res.status(201).json(contribution)
  } catch (err) {
    next(err)
  }
}

// GET /api/contributions
export const getContributions = async (req, res, next) => {
  try {
    const { status, category, page = 1, limit = 20 } = req.query
    const filter = {}

    // Non-admins only see their own or approved contributions
    if (req.user.role === 'user') {
      filter.$or = [{ createdBy: req.user._id }, { status: 'approved' }]
    } else {
      if (status) filter.status = status
    }

    if (category) filter.category = category

    const skip = (Number(page) - 1) * Number(limit)
    const [contributions, total] = await Promise.all([
      Contribution.find(filter)
        .populate('createdBy', 'name email')
        .populate('reviewedBy', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Contribution.countDocuments(filter),
    ])

    res.json({ contributions, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}

// PUT /api/contributions/:id  (approve / reject — moderator or admin)
export const reviewContribution = async (req, res, next) => {
  try {
    const { status, reviewNote } = req.body
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be approved or rejected' })
    }

    const contribution = await Contribution.findByIdAndUpdate(
      req.params.id,
      {
        status,
        reviewNote: reviewNote || '',
        reviewedBy: req.user._id,
        reviewedAt: new Date(),
      },
      { new: true }
    )

    if (!contribution) return res.status(404).json({ message: 'Contribution not found' })
    res.json(contribution)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/contributions/:id
export const deleteContribution = async (req, res, next) => {
  try {
    const contribution = await Contribution.findById(req.params.id)
    if (!contribution) return res.status(404).json({ message: 'Contribution not found' })

    // Owner or admin can delete
    if (
      contribution.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this contribution' })
    }

    await contribution.deleteOne()
    res.json({ message: 'Contribution deleted' })
  } catch (err) {
    next(err)
  }
}
