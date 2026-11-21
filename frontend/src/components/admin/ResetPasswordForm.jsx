import { useState } from 'react'

// Form for typing a new password for one user.
// Props:
//   user     - the user whose password is being reset
//   onSave   - called with the new password after validation passes
//   onCancel - called when Cancel is clicked
function ResetPasswordForm({ user, onSave, onCancel }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setError('')
    onSave(password)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-md rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">Reset password for {user.fullName}</h2>
      <p className="mb-4 text-sm text-slate-500">{user.email}</p>

      <label className="block text-sm font-semibold">New password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2"
      />

      <label className="block text-sm font-semibold">Confirm new password</label>
      <input
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2"
      />

      {error && <p className="mb-3 text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" className="rounded-md bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900">
          Save
        </button>
        <button type="button" onClick={onCancel} className="rounded-md border border-slate-300 px-4 py-2">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ResetPasswordForm
