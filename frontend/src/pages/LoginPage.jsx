import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm.jsx'
import RegisterForm from '../components/auth/RegisterForm.jsx'

function LoginPage() {
  // 'login' shows the login form, 'register' shows the registration form
  const [mode, setMode] = useState('login')
  const [message, setMessage] = useState('')

  function handleRegistered(name) {
    setMessage(`Account created for ${name}. You can now log in.`)
    setMode('login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-emerald-800">EarlyTrace</h1>
        <p className="mb-6 text-slate-600">Early-warning platform for instructors</p>

        {message && (
          <p className="mb-4 rounded-md bg-emerald-50 p-3 text-emerald-800">{message}</p>
        )}

        {mode === 'login' ? (
          <LoginForm onSwitch={() => setMode('register')} />
        ) : (
          <RegisterForm
            onRegistered={handleRegistered}
            onSwitch={() => setMode('login')}
          />
        )}
      </div>
    </div>
  )
}

export default LoginPage
