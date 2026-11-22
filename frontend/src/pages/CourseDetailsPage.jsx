import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StudentHeader from '../components/student/StudentHeader.jsx'
import TierBadge from '../components/student/TierBadge.jsx'
import RiskChart from '../components/student/RiskChart.jsx'

function CourseDetailsPage() {
  const navigate = useNavigate()
  const { courseId } = useParams() // the course id from the URL, e.g. /student/courses/1
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const [enrollment, setEnrollment] = useState(null)
  const [assessments, setAssessments] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [riskScores, setRiskScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      if (!currentUser) return

      try {
        // 1. Check that this student is enrolled in this course
        const enrollmentResponse = await fetch(
          `/api/enrollments/getEnrollmentsByStudent/student/${currentUser.id}`
        )
        if (!enrollmentResponse.ok) throw new Error('Could not load your courses.')
        const enrollmentData = await enrollmentResponse.json()
        const myEnrollment = enrollmentData.find((e) => e.course.courseId === Number(courseId))

        // 2. The assessments in this course
        const assessmentResponse = await fetch(`/api/assessments/getAllAssessments?courseId=${courseId}`)
        if (!assessmentResponse.ok) throw new Error('Could not load assessments.')
        const assessmentData = await assessmentResponse.json()

        // 3. All submissions, then keep only this student's
        const submissionResponse = await fetch('/api/submissions/getAllSubmissions')
        if (!submissionResponse.ok) throw new Error('Could not load submissions.')
        const submissionData = await submissionResponse.json()
        const mySubmissions = submissionData.filter((s) => s.studentId === currentUser.id)

        // 4. All risk scores, then keep only this student's for this course
        const scoreResponse = await fetch('/api/riskscores/getAllRiskScores')
        if (!scoreResponse.ok) throw new Error('Could not load risk scores.')
        const scoreData = await scoreResponse.json()
        const myScores = scoreData.filter(
          (s) => s.studentId === currentUser.id && s.courseId === Number(courseId)
        )

        setEnrollment(myEnrollment)
        setAssessments(assessmentData)
        setSubmissions(mySubmissions)
        setRiskScores(myScores)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [courseId])

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

  // Find this student's submission for one assessment, if there is one
  function findSubmission(assessmentId) {
    return submissions.find((s) => s.assessmentId === assessmentId)
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <StudentHeader name={currentUser.fullName} />

      <main className="mx-auto max-w-4xl p-6">
        <Link to="/student" className="font-semibold text-emerald-800">
          ← Back to My standing
        </Link>

        {loading && <p className="mt-4">Loading course...</p>}
        {error && <p className="mt-4 text-red-600">{error} Make sure the backend is running.</p>}

        {!loading && !error && !enrollment && (
          <p className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
            You are not enrolled in this course.
          </p>
        )}

        {!loading && !error && enrollment && (
          <>
            <div className="mt-4 mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{enrollment.course.courseTitle}</h1>
                <p className="text-slate-600">
                  {enrollment.course.courseCode} · Section {enrollment.course.sectionCode}
                </p>
              </div>
              <TierBadge tier={enrollment.currentRiskTier} />
            </div>

            <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="mb-4 text-xl font-semibold">Risk trajectory</h2>
              <RiskChart scores={riskScores} />
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="mb-4 text-xl font-semibold">My scores and submissions</h2>

              {assessments.length === 0 ? (
                <p className="text-slate-500">No assessments in this course yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-sm text-slate-600">
                      <tr>
                        <th className="p-3">Assessment</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Score</th>
                        <th className="p-3">Weight</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessments.map((assessment) => {
                        const submission = findSubmission(assessment.assessmentId)
                        return (
                          <tr key={assessment.assessmentId} className="border-t border-slate-200">
                            <td className="p-3">{assessment.title}</td>
                            <td className="p-3">{assessment.assessmentType}</td>
                            <td className="p-3">
                              {submission ? `${submission.scoreObtained} / ${assessment.maxScore}` : '—'}
                            </td>
                            <td className="p-3">{assessment.weightPercentage}%</td>
                            <td className="p-3">{submission ? submission.submissionStatus : 'No record'}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default CourseDetailsPage
