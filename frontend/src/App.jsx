import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-slate-100 p-8">
            <h1 className="text-3xl font-bold text-emerald-800">EarlyTrace</h1>
            <p className="mt-2 text-slate-600">Frontend setup works.</p>
          </div>
        }
      />
    </Routes>
  )
}

export default App