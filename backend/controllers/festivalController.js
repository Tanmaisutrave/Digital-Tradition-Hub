import Festival from '../models/Festival.js'

// GET /api/festivals
export const getFestivals = async (req, res, next) => {
  try {
    const { region, category, status, search, page = 1, limit = 20 } = req.query

    const filter = {}
    if (region) filter.region = new RegExp(region, 'i')
    if (category) filter.category = category
    if (status) filter.status = status
    else filter.status = 'published' // default: only published
    if (search) filter.$text = { $search: search }

    const skip = (Number(page) - 1) * Number(limit)
    const [festivals, total] = await Promise.all([
      Festival.find(filter)
        .populate('createdBy', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Festival.countDocuments(filter),
    ])

    res.json({ festivals, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
}

// GET /api/festivals/:id
export const getFestivalById = async (req, res, next) => {
  try {
    const festival = await Festival.findById(req.params.id).populate('createdBy', 'name')
    if (!festival) return res.status(404).json({ message: 'Festival not found' })
    res.json(festival)
  } catch (err) {
    next(err)
  }
}

// POST /api/festivals  (admin)
export const createFestival = async (req, res, next) => {
  try {
    const festival = await Festival.create({ ...req.body, createdBy: req.user._id })
    res.status(201).json(festival)
  } catch (err) {
    next(err)
  }
}

// PUT /api/festivals/:id  (admin)
export const updateFestival = async (req, res, next) => {
  try {
    const festival = await Festival.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!festival) return res.status(404).json({ message: 'Festival not found' })
    res.json(festival)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/festivals/:id  (admin)
export const deleteFestival = async (req, res, next) => {
  try {
    const festival = await Festival.findByIdAndDelete(req.params.id)
    if (!festival) return res.status(404).json({ message: 'Festival not found' })
    res.json({ message: 'Festival deleted' })
  } catch (err) {
    next(err)
  }
}
