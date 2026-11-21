import { useNavigate } from 'react-router-dom'

// TEMPORARY: replaced by the real Admin, Instructor and Student dashboards later.
function WelcomePage() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('currentUser'))

  function handleLogout() {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  if (!user) {
    return <p className="p-8">You are not logged in.</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user.fullName}</h1>
      <p className="mb-4 text-slate-600">Logged in as {user.roleType}</p>
      <button onClick={handleLogout} className="rounded-md border px-4 py-2">
        Log out
      </button>
    </div>
  )
}

export default WelcomePage
