import { useNavigate } from 'react-router-dom'

// Top bar for the student pages.
// Props:
//   name - the logged-in student's name
function StudentHeader({ name }) {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between bg-emerald-900 px-6 py-4 text-white">
      <div>
        <p className="text-xl font-bold">EarlyTrace</p>
        <p className="text-sm text-emerald-200">Student</p>
      </div>
      <div className="flex items-center gap-4">
        <span>{name}</span>
        <button onClick={handleLogout} className="rounded-md bg-white px-3 py-1 font-semibold text-emerald-900">
          Log out
        </button>
      </div>
    </header>
  )
}

export default StudentHeader
