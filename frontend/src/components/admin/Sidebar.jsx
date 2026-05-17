const menuItems = [
  { id: 'overview', icon: '📊', label: 'Overview' },
  { id: 'festivals', icon: '🎉', label: 'Festivals' },
  { id: 'contributions', icon: '✍️', label: 'Contributions' },
  { id: 'users', icon: '👥', label: 'Users' },
]

const Sidebar = ({ active, onSelect, open, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-30 w-64 bg-white border-r border-orange-100
                    shadow-xl flex flex-col transition-transform duration-300
                    lg:static lg:translate-x-0 lg:shadow-none lg:z-auto
                    ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo area */}
        <div className="px-5 py-5 border-b border-orange-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400
                            flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-tight">Digital Tradition</p>
              <span className="text-[10px] font-semibold bg-orange-100 text-orange-600
                               px-1.5 py-0.5 rounded-full">Admin Panel</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-gray-600 text-lg"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => { onSelect(id); onClose() }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm
                          font-medium transition-all duration-200 text-left
                ${active === id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-md shadow-orange-200'
                  : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
            >
              <span className="text-base">{icon}</span>
              {label}
              {active === id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm">
              👤
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-700 truncate">Admin User</p>
              <p className="text-[10px] text-gray-400 truncate">admin@digitaltradition.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
