import { useState } from 'react'

const roleStyle = {
  admin:     'bg-orange-100 text-orange-700',
  moderator: 'bg-purple-100 text-purple-700',
  user:      'bg-gray-100 text-gray-600',
}

const ROLES = ['user', 'moderator', 'admin']

const UsersSection = ({ data, onRoleChange }) => {
  const [search, setSearch] = useState('')

  const filtered = data.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Users</h2>
          <p className="text-sm text-gray-500 mt-0.5">{data.length} registered users</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-orange-200 bg-white text-sm
                     focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
        />
      </div>

      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-orange-50 border-b border-orange-100">
                {['User', 'Email', 'Role', 'Joined', 'Contributions', 'Change Role'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500
                                         uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-orange-50/50 transition-colors duration-150">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center
                                      justify-center text-sm font-bold text-orange-600 shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{u.email}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${roleStyle[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap">{u.joined}</td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap text-center">
                    {u.contributions}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <select
                      value={u.role}
                      onChange={(e) => onRoleChange(u.id, e.target.value)}
                      disabled={u.role === 'admin'}
                      className="text-xs rounded-lg border border-orange-200 px-2 py-1.5 bg-white
                                 focus:outline-none focus:ring-2 focus:ring-orange-400
                                 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-gray-400 text-sm">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UsersSection
