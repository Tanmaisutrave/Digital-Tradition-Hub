import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import NotificationBell from './reminders/NotificationBell'
import { useAuth } from '../context/AuthContext'
import icon2 from '../assets/icon2.png'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Festivals', to: '/festivals' },
  { label: 'Traditions', to: '/traditions' },
  { label: 'Culture Map', to: '/culture-map' },
  { label: 'Contribute', to: '/contribute' },
  { label: 'Reminders', to: '/reminders' },
  { label: 'About', to: '/about' },
]

const linkClass = ({ isActive }) =>
  `relative text-sm font-medium px-3 py-2 rounded-lg transition-all duration-300
  ${isActive
    ? 'text-orange-600 bg-orange-100 font-semibold'
    : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
  }`

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const navigate = useNavigate()
  const userMenuRef = useRef(null)

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    setUserMenuOpen(false)
    navigate('/')
  }

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0" onClick={() => setMenuOpen(false)}>
          <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-sm bg-white flex items-center justify-center">
            <img
              src={icon2}
              alt="Digital Tradition Hub logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-base font-bold text-gray-800 group-hover:text-orange-500 transition-all duration-300 hidden sm:block">
            Digital Tradition Hub
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map(({ label, to }) => (
            <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <NotificationBell />

          {isAuthenticated ? (
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setUserMenuOpen(p => !p)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-orange-50
                           transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-300
                                flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {initials}
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[80px] truncate">
                  {user?.name?.split(' ')[0]}
                </span>
                <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl
                                border border-orange-100 overflow-hidden z-50 animate-scaleIn">
                  <div className="px-4 py-3 border-b border-orange-50">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full
                      ${user?.role === 'admin' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>
                      {user?.role}
                    </span>
                  </div>
                  <div className="py-1">
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700
                                 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150">
                      👤 My Profile
                    </Link>
                    <Link to="/contribute" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700
                                 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150">
                      ✍️ Contribute
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-orange-600
                                   font-semibold hover:bg-orange-50 transition-colors duration-150">
                        🔐 Admin Dashboard
                      </Link>
                    )}
                  </div>
                  <div className="border-t border-orange-50 py-1">
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500
                                 hover:bg-red-50 transition-colors duration-150">
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-400 text-white
                         text-sm font-semibold rounded-lg shadow-md hover:from-orange-600
                         hover:to-amber-500 hover:shadow-lg hover:scale-105 transition-all duration-300">
              Login
            </Link>
          )}
        </div>

        {/* Mobile right */}
        <div className="flex lg:hidden items-center gap-2">
          <NotificationBell />
          <button
            className="flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
                       ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 pt-2 flex flex-col gap-1 border-t border-orange-50 bg-white">
          {navLinks.map(({ label, to }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <div className="mt-2 pt-2 border-t border-orange-100 flex flex-col gap-1">
              <Link to="/profile" onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg">
                👤 My Profile
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-orange-600 font-semibold hover:bg-orange-50 rounded-lg">
                  🔐 Admin Dashboard
                </Link>
              )}
              <button onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg text-left">
                🚪 Logout
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}
              className="mt-2 px-5 py-2 text-center bg-gradient-to-r from-orange-500 to-amber-400
                         text-white text-sm font-semibold rounded-lg shadow-md hover:from-orange-600
                         hover:to-amber-500 transition-all duration-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
