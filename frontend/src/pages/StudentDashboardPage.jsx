import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentHeader from '../components/student/StudentHeader.jsx'
import CourseCard from '../components/student/CourseCard.jsx'

function StudentDashboardPage() {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const [enrollments, setEnrollments] = useState([])
  const [riskScores, setRiskScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load this student's courses and risk scores when the page opens
  useEffect(() => {
    async function loadData() {
      if (!currentUser) return

      try {
        // 1. The courses this student is enrolled in
        const enrollmentResponse = await fetch(
          `/api/enrollments/getEnrollmentsByStudent/student/${currentUser.id}`
        )
        if (!enrollmentResponse.ok) {
          throw new Error('Could not load your courses.')
        }
        const enrollmentData = await enrollmentResponse.json()

        // 2. All risk scores, then keep only this student's
        const scoreResponse = await fetch('/api/riskscores/getAllRiskScores')
        if (!scoreResponse.ok) {
          throw new Error('Could not load your risk scores.')
        }
        const scoreData = await scoreResponse.json()
        const myScores = scoreData.filter((s) => s.studentId === currentUser.id)

        setEnrollments(enrollmentData)
        setRiskScores(myScores)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Only students can see this page
  if (!currentUser || currentUser.roleType !== 'STUDENT') {
    return (
      <div className="p-8">
        <p className="mb-4">You need to log in as a student to see this page.</p>
        <button onClick={() => navigate('/login')} className="rounded-md border px-4 py-2">
          Go to login
        </button>
      </div>
    )
  }

  // The newest risk score for one course (the one with the highest id)
  function latestScoreFor(courseId) {
    const scoresForCourse = riskScores.filter((s) => s.courseId === courseId)
    if (scoresForCourse.length === 0) return null
    return scoresForCourse[scoresForCourse.length - 1]
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <StudentHeader name={currentUser.fullName} />

      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-3xl font-bold">My standing</h1>
        <p className="mb-6 text-slate-600">Your risk tier in each course you are enrolled in.</p>

        {loading && <p>Loading your courses...</p>}
        {error && <p className="text-red-600">{error} Make sure the backend is running.</p>}

        {!loading && !error && enrollments.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
            You are not enrolled in any course yet.
          </p>
        )}

        <div className="grid gap-4">
          {enrollments.map((enrollment) => (
            <CourseCard
              key={enrollment.id}
              course={enrollment.course}
              tier={enrollment.currentRiskTier}
              latestScore={latestScoreFor(enrollment.course.courseId)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default StudentDashboardPage
