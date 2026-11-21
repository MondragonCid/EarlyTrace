import { useState } from 'react'

// Props:
//   onRegistered - called with the new user's name after saving
//   onSwitch     - called when the user clicks "Log in"
function RegisterForm({ onRegistered, onSwitch }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('STUDENT')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    // Validation
    if (fullName === '' || email === '') {
      setError('Please fill in your name and email.')
      return
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/users/postUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          passwordHash: password,
          roleType: role,
        }),
      })

      if (!response.ok) {
        throw new Error('Could not create the account. The email may already be used.')
      }

      onRegistered(fullName)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4 text-xl font-semibold">Create an account</h2>

      <label className="block text-sm font-semibold">Full name</label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2"
      />

      <label className="block text-sm font-semibold">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2"
      />

      <label className="block text-sm font-semibold">I am a</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2"
      >
        <option value="STUDENT">Student</option>
        <option value="INSTRUCTOR">Instructor</option>
      </select>

      <label className="block text-sm font-semibold">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2"
      />

      <label className="block text-sm font-semibold">Confirm password</label>
      <input
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2"
      />

      {error && <p className="mb-3 text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-emerald-800 py-2 font-semibold text-white hover:bg-emerald-900 disabled:opacity-60"
      >
        {loading ? 'Creating account...' : 'Create account'}
      </button>

      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="font-semibold text-emerald-800">
          Log in
        </button>
      </p>
    </form>
  )
}

export default RegisterForm
