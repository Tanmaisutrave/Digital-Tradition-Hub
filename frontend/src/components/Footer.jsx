import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Festivals', to: '/festivals' },
  { label: 'Traditions', to: '/traditions' },
  { label: 'Culture Map', to: '/culture-map' },
  { label: 'Reminders', to: '/reminders' },
  { label: 'About', to: '/about' },
]

const features = [
  { label: 'Story Mode', to: '/festivals' },
  { label: 'Culture Map', to: '/culture-map' },
  { label: 'Contributions', to: '/contribute' },
  { label: 'Ask Grandpa', to: '/' },
  { label: 'Admin Panel', to: '/admin' },
]

const socials = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
]

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const Footer = () => (
  <footer className="bg-gradient-to-br from-gray-900 via-orange-950 to-gray-900 text-gray-300">
    {/* Back to top */}
    <div className="flex justify-center -mt-0">
      <button
        onClick={scrollToTop}
        className="bg-gradient-to-r from-orange-500 to-amber-400 text-white text-xs font-semibold
                   px-5 py-2 rounded-b-xl shadow-lg hover:from-orange-600 hover:to-amber-500
                   hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5
                   flex items-center gap-1.5"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        Back to top
      </button>
    </div>

    {/* Main grid */}
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400
                            flex items-center justify-center shadow-md shadow-orange-500/30">
              <span className="text-white font-bold text-base">D</span>
            </div>
            <span className="text-white font-bold text-base leading-tight">
              Digital Tradition Hub
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Preserving culture through stories, traditions, and technology — one festival at a time.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center
                           justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/10
                           hover:border-orange-500/30 hover:scale-110 transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-500 to-amber-400 inline-block" />
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {quickLinks.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200
                             flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-orange-500/50 group-hover:bg-orange-400
                                   group-hover:scale-150 transition-all duration-200" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-500 to-amber-400 inline-block" />
            Features
          </h4>
          <ul className="space-y-2.5">
            {features.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200
                             flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-orange-500/50 group-hover:bg-orange-400
                                   group-hover:scale-150 transition-all duration-200" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-500 to-amber-400 inline-block" />
            Contact Us
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-orange-400 mt-0.5 shrink-0">✉️</span>
              <a
                href="mailto:hello@digitaltraditionhub.com"
                className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 break-all"
              >
                hello@digitaltraditionhub.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-400 mt-0.5 shrink-0">📍</span>
              <span className="text-sm text-gray-400">India 🇮🇳</span>
            </li>
          </ul>

          {/* Newsletter mini */}
          <div className="mt-5">
            <p className="text-xs text-gray-500 mb-2">Get festival updates</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10
                           text-xs text-gray-300 placeholder-gray-600
                           focus:outline-none focus:border-orange-500/50 transition-colors duration-200"
              />
              <button
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-400
                           text-white text-xs font-semibold hover:from-orange-600 hover:to-amber-500
                           transition-all duration-200 shrink-0"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider + copyright */}
      <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center
                      justify-between gap-3">
        <p className="text-xs text-gray-500 text-center sm:text-left">
          © 2026 Digital Tradition Hub. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs text-gray-600 hover:text-orange-400 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
