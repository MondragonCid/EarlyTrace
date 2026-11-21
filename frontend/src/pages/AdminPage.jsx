import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '../components/admin/StatCard.jsx'
import UserTable from '../components/admin/UserTable.jsx'
import ResetPasswordForm from '../components/admin/ResetPasswordForm.jsx'

function AdminPage() {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  // Data from the backend
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Filters
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')

  // Reset password
  const [selectedUser, setSelectedUser] = useState(null)
  const [message, setMessage] = useState('')

  // Load all users once when the page opens
  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch('/api/users/getAllUsers')
        if (!response.ok) {
          throw new Error('Could not load users.')
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  // Called by ResetPasswordForm after its validation passes
  async function handleSavePassword(newPassword) {
    // The backend replaces all four fields, so we send the whole user
    const updatedUser = {
      email: selectedUser.email,
      fullName: selectedUser.fullName,
      roleType: selectedUser.roleType,
      passwordHash: newPassword,
    }

    try {
      const response = await fetch(`/api/users/updateUser/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      })
      if (!response.ok) {
        throw new Error('Could not reset the password.')
      }
      setMessage(`Password reset for ${selectedUser.fullName}.`)
      setSelectedUser(null)
    } catch (err) {
      setMessage(err.message)
    }
  }

  function handleLogout() {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  // Only admins can see this page
  if (!currentUser || currentUser.roleType !== 'ADMIN') {
    return (
      <div className="p-8">
        <p className="mb-4">You need to log in as an admin to see this page.</p>
        <button onClick={() => navigate('/login')} className="rounded-md border px-4 py-2">
          Go to login
        </button>
      </div>
    )
  }

  // Count users per role for the stat cards
  const admins = users.filter((u) => u.roleType === 'ADMIN').length
  const instructors = users.filter((u) => u.roleType === 'INSTRUCTOR').length
  const students = users.filter((u) => u.roleType === 'STUDENT').length

  // Keep only the users that match the search text and role
  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === 'ALL' || user.roleType === roleFilter
    const matchesSearch =
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    return matchesRole && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="flex items-center justify-between bg-emerald-900 px-6 py-4 text-white">
        <div>
          <p className="text-xl font-bold">EarlyTrace</p>
          <p className="text-sm text-emerald-200">Admin</p>
        </div>
        <div className="flex items-center gap-4">
          <span>{currentUser.fullName}</span>
          <button onClick={handleLogout} className="rounded-md bg-white px-3 py-1 font-semibold text-emerald-900">
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-bold">Admin dashboard</h1>
        <p className="mb-6 text-slate-600">Manage EarlyTrace accounts.</p>

        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-600">{error} Make sure the backend is running.</p>}

        {!loading && !error && (
          <>
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatCard label="Total users" value={users.length} />
              <StatCard label="Admins" value={admins} />
              <StatCard label="Instructors" value={instructors} />
              <StatCard label="Students" value={students} />
            </div>

            <h2 className="mb-3 text-xl font-bold">User management</h2>

            <div className="mb-4 flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-md border border-slate-300 bg-white px-3 py-2"
              />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-md border border-slate-300 bg-white px-3 py-2"
              >
                <option value="ALL">All roles</option>
                <option value="ADMIN">Admin</option>
                <option value="INSTRUCTOR">Instructor</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>

            {message && <p className="mb-4 rounded-md bg-emerald-50 p-3 text-emerald-800">{message}</p>}

            {selectedUser && (
              <ResetPasswordForm
                user={selectedUser}
                onSave={handleSavePassword}
                onCancel={() => setSelectedUser(null)}
              />
            )}

            {filteredUsers.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
                No users found.
              </p>
            ) : (
              <UserTable
                users={filteredUsers}
                onResetPassword={(user) => {
                  setSelectedUser(user)
                  setMessage('')
                }}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default AdminPage
