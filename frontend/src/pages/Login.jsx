import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

const EyeIcon = ({ open }) => (
  open ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
    </svg>
  )
)

const InputField = ({ label, type = 'text', value, onChange, placeholder, error, rightElement }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white
                    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                    transition-all duration-200 placeholder-gray-400
                    ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-orange-300'}`}
      />
      {rightElement && (
        <button type="button" onClick={rightElement.onClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors">
          {rightElement.icon}
        </button>
      )}
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
)

const Spinner = () => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
)

// ── Login Form ──────────────────────────────────────────────────
const LoginForm = ({ onSwitch }) => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    setApiError('')
  }

  const validate = () => {
    const errs = {}
    if (!form.email) errs.email = 'Email is required'
    if (!form.password) errs.password = 'Password is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      const { data } = await authAPI.login(form)
      login({ _id: data._id, name: data.name, email: data.email, role: data.role, profilePic: data.profilePic }, data.token)
      navigate(from, { replace: true })
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {apiError}
        </div>
      )}
      <InputField label="Email" type="email" value={form.email} onChange={set('email')}
        placeholder="you@example.com" error={errors.email} />
      <InputField label="Password" type={showPass ? 'text' : 'password'} value={form.password}
        onChange={set('password')} placeholder="Enter your password" error={errors.password}
        rightElement={{ icon: <EyeIcon open={showPass} />, onClick: () => setShowPass(!showPass) }} />

      <div className="flex justify-end">
        <button type="button" className="text-xs text-orange-500 hover:underline">Forgot password?</button>
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold
                   rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300
                   disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        {loading ? <><Spinner /> Logging in...</> : 'Login'}
      </button>

      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <p className="text-center text-sm text-gray-500 mt-1">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-orange-500 font-semibold hover:underline">Sign up</button>
      </p>
    </form>
  )
}

// ── Signup Form ─────────────────────────────────────────────────
const SignupForm = ({ onSwitch }) => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    setApiError('')
  }

  const validate = () => {
    const errs = {}
    if (!form.name) errs.name = 'Name is required'
    if (!form.email) errs.email = 'Email is required'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Minimum 6 characters'
    if (!form.confirm) errs.confirm = 'Please confirm your password'
    else if (form.confirm !== form.password) errs.confirm = 'Passwords do not match'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      const { data } = await authAPI.register({ name: form.name, email: form.email, password: form.password })
      login({ _id: data._id, name: data.name, email: data.email, role: data.role }, data.token)
      navigate('/')
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {apiError}
        </div>
      )}
      <InputField label="Full Name" value={form.name} onChange={set('name')} placeholder="Your full name" error={errors.name} />
      <InputField label="Email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" error={errors.email} />
      <InputField label="Password" type={showPass ? 'text' : 'password'} value={form.password}
        onChange={set('password')} placeholder="Create a password" error={errors.password}
        rightElement={{ icon: <EyeIcon open={showPass} />, onClick: () => setShowPass(!showPass) }} />
      <InputField label="Confirm Password" type={showConfirm ? 'text' : 'password'} value={form.confirm}
        onChange={set('confirm')} placeholder="Repeat your password" error={errors.confirm}
        rightElement={{ icon: <EyeIcon open={showConfirm} />, onClick: () => setShowConfirm(!showConfirm) }} />

      <button type="submit" disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold
                   rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 mt-1
                   disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        {loading ? <><Spinner /> Creating account...</> : 'Create Account'}
      </button>

      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <p className="text-center text-sm text-gray-500 mt-1">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-orange-500 font-semibold hover:underline">Login</button>
      </p>
    </form>
  )
}

// ── Page ────────────────────────────────────────────────────────
const Login = () => {
  const [mode, setMode] = useState('login')
  const isLogin = mode === 'login'

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50
                    flex items-center justify-center px-4 py-12">
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-amber-400" />
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl
                            bg-gradient-to-br from-orange-500 to-amber-400 shadow-md mb-3">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <h1 className="text-xl font-extrabold text-gray-800">Digital Tradition Hub</h1>
            <p className="text-sm text-gray-400 mt-1">
              {isLogin ? 'Welcome back! Please login.' : 'Create your account to get started.'}
            </p>
          </div>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {['login', 'signup'].map((tab) => (
              <button key={tab} onClick={() => setMode(tab)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300
                  ${mode === tab ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {tab === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          {isLogin
            ? <LoginForm onSwitch={() => setMode('signup')} />
            : <SignupForm onSwitch={() => setMode('login')} />
          }
        </div>
      </div>
    </div>
  )
}

export default Login
