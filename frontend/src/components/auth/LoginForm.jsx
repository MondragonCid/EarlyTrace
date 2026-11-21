import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Props:
//   onSwitch - called when the user clicks "Create an account"
function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (email === '' || password === '') {
      setError('Please enter your email and password.')
      return
    }

    setError('')
    setLoading(true)

    try {
      // TEMPORARY: the backend has no login endpoint yet, so we get all users
      // and look for a matching email and password here in the browser.
      const response = await fetch('/api/users/getAllUsers')
      if (!response.ok) {
        throw new Error('Could not reach the server.')
      }
      const users = await response.json()

      const user = users.find(
        (u) => u.email === email && u.passwordHash === password
      )

      if (!user) {
        setError('Wrong email or password.')
        return
      }

      // Remember who is logged in (without the password)
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          roleType: user.roleType,
        })
      )

      // Go to the page for this user's role, e.g. /admin or /student
      navigate('/' + user.roleType.toLowerCase())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4 text-xl font-semibold">Log in</h2>

      <label className="block text-sm font-semibold">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2"
      />

      <label className="block text-sm font-semibold">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2"
      />

      {error && <p className="mb-3 text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-emerald-800 py-2 font-semibold text-white hover:bg-emerald-900 disabled:opacity-60"
      >
        {loading ? 'Logging in...' : 'Log in'}
      </button>

      <p className="mt-4 text-center text-sm">
        No account yet?{' '}
        <button type="button" onClick={onSwitch} className="font-semibold text-emerald-800">
          Create an account
        </button>
      </p>
    </form>
  )
}

export default LoginForm
