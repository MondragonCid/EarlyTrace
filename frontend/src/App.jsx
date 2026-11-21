import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import WelcomePage from './pages/WelcomePage.jsx'
import AdminPage from './pages/AdminPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />

      {/* TEMPORARY until the real dashboards are built */}
      <Route path="/instructor" element={<WelcomePage />} />
      <Route path="/student" element={<WelcomePage />} />
    </Routes>
  )
}

export default App
