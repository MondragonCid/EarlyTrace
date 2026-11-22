import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import WelcomePage from './pages/WelcomePage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import StudentDashboardPage from './pages/StudentDashboardPage.jsx'
import CourseDetailsPage from './pages/CourseDetailsPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/student" element={<StudentDashboardPage />} />
      <Route path="/student/courses/:courseId" element={<CourseDetailsPage />} />

      {/* TEMPORARY until the instructor pages are built */}
      <Route path="/instructor" element={<WelcomePage />} />
    </Routes>
  )
}

export default App
