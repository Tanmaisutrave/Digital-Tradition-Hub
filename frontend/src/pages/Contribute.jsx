import { useState, useRef, useCallback } from 'react'
import { contributionAPI } from '../services/api'
import Toast from '../components/Toast'
import useToast from '../hooks/useToast'

const CATEGORIES = ['Festival', 'Food', 'Clothing', 'Art', 'Ritual', 'Music', 'Dance']
const STATES = ['Andhra Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal']
const STORY_LIMIT = 2000
const DESC_LIMIT = 500

const inputClass = 'w-full rounded-lg border border-orange-200 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200'
const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5'

const Field = ({ label, required, error, children }) => (
  <div>
    <label className={labelClass}>{label}{required && <span className="text-orange-500 ml-1">*</span>}</label>
    {children}
    {error && <p className="mt-1 text-xs text-red-500 flex items-center gap-1">⚠ {error}</p>}
  </div>
)

const initialForm = { title: '', category: '', region: '', description: '', story: '', videoUrl: '' }

const Contribute = () => {
  const { toasts, addToast, removeToast } = useToast()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const processImage = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target.result)
    reader.readAsDataURL(file)
    if (errors.image) setErrors(p => ({ ...p, image: '' }))
  }

  const handleFileChange = (e) => processImage(e.target.files[0])
  const handleDrop = useCallback((e) => { e.preventDefault(); setIsDragging(false); processImage(e.dataTransfer.files[0]) }, [])
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.category) e.category = 'Please select a category'
    if (!form.region) e.region = 'Please select a region'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.story.trim()) e.story = 'Story is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const payload = { ...form, image: imagePreview || '' }
      const { data } = await contributionAPI.create(payload)
      setSubmittedData(data)
      setSubmitted(true)
      addToast('Tradition submitted successfully!')
    } catch (err) {
      addToast(err.response?.data?.message || 'Submission failed. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setImageFile(null)
    setImagePreview(null)
    setSubmitted(false)
    setSubmittedData(null)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fdf6ec] flex items-center justify-center px-4 py-16">
        <Toast toasts={toasts} onRemove={removeToast} />
        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tradition Submitted!</h2>
          <p className="text-gray-500 text-sm mb-6">Thank you for preserving culture. Your submission is under review.</p>
          <div className="bg-orange-50 rounded-xl p-4 text-left mb-6 border border-orange-100">
            <p className="text-xs text-gray-500 mb-1">Submitted</p>
            <p className="font-semibold text-gray-800">{submittedData?.title || form.title}</p>
            <p className="text-sm text-orange-500 mt-1">{submittedData?.category || form.category} · {submittedData?.region || form.region}</p>
          </div>
          <button onClick={handleReset}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold text-sm hover:from-orange-600 hover:to-amber-500 transition-all duration-200 shadow-md">
            Submit Another Tradition
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fdf6ec]">
      <Toast toasts={toasts} onRemove={removeToast} />
      <div className="bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 py-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">✍️ Contribute</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-sm">Share Your Tradition</h1>
        <p className="text-white/90 text-base md:text-lg max-w-xl mx-auto">Help preserve culture by sharing your knowledge with the world</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="bg-orange-50 border-b border-orange-100 px-6 py-3 flex items-center gap-2">
            <span className="text-orange-500 text-sm">📋</span>
            <span className="text-sm text-gray-600">Fields marked <span className="text-orange-500 font-semibold">*</span> are required</span>
          </div>

          <div className="px-6 py-8 space-y-6">
            <Field label="Tradition Title" required error={errors.title}>
              <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Diwali — Festival of Lights" className={inputClass} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Category" required error={errors.category}>
                <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Region / State" required error={errors.region}>
                <select name="region" value={form.region} onChange={handleChange} className={inputClass}>
                  <option value="">Select state</option>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Short Description" required error={errors.description}>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} maxLength={DESC_LIMIT} placeholder="A brief overview..." className={`${inputClass} resize-none`} />
              <p className="mt-1 text-right text-xs text-gray-400">{form.description.length}/{DESC_LIMIT}</p>
            </Field>

            <Field label="Full Story" required error={errors.story}>
              <textarea name="story" value={form.story} onChange={handleChange} rows={6} maxLength={STORY_LIMIT} placeholder="Tell the story behind this tradition..." className={`${inputClass} resize-none`} />
              <div className="mt-1 flex justify-between items-center">
                <span className="text-xs text-gray-400">Write in a storytelling style</span>
                <span className={`text-xs font-medium ${form.story.length > STORY_LIMIT * 0.9 ? 'text-orange-500' : 'text-gray-400'}`}>{form.story.length}/{STORY_LIMIT}</span>
              </div>
            </Field>

            <Field label="Cover Image (optional)">
              <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 ${isDragging ? 'border-orange-400 bg-orange-50 scale-[1.01]' : 'border-orange-200 bg-orange-50/50 hover:border-orange-400 hover:bg-orange-50'}`}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-52 object-cover rounded-xl" />
                    <button type="button" onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null) }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-gray-500 hover:text-red-500 text-xs transition-colors">✕</button>
                  </div>
                ) : (
                  <div className="py-10 flex flex-col items-center gap-2 text-center px-4">
                    <span className="text-4xl">🖼️</span>
                    <p className="text-sm font-medium text-gray-600">Drag & drop or <span className="text-orange-500 underline">browse</span></p>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                )}
              </div>
            </Field>

            <Field label="Video URL (optional)">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🎬</span>
                <input type="url" name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="https://youtube.com/..." className={`${inputClass} pl-9`} />
              </div>
            </Field>
          </div>

          <div className="px-6 pb-8 flex flex-col sm:flex-row gap-3">
            <button type="submit" disabled={loading}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold text-sm shadow-md hover:from-orange-600 hover:to-amber-500 hover:shadow-lg hover:scale-[1.02] active:scale-100 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2">
              {loading ? (
                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>Submitting...</>
              ) : '🌸 Submit Tradition'}
            </button>
            <button type="button" onClick={handleReset}
              className="sm:w-28 py-3 rounded-lg border border-orange-200 text-gray-600 text-sm font-medium hover:bg-orange-50 hover:border-orange-300 transition-all duration-200">
              Reset
            </button>
          </div>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">By submitting, you agree that this content is authentic and culturally respectful.</p>
      </div>
    </div>
  )
}

export default Contribute
