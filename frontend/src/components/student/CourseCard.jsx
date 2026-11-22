import { Link } from 'react-router-dom'
import TierBadge from './TierBadge.jsx'

// One enrolled course on the student dashboard.
// Props:
//   course      - the course (courseId, courseCode, courseTitle, sectionCode)
//   tier        - the student's current risk tier in this course
//   latestScore - the newest risk score for this course, or null if none
function CourseCard({ course, tier, latestScore }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-800">
            {course.courseCode} · Section {course.sectionCode}
          </p>
          <h2 className="text-lg font-semibold">{course.courseTitle}</h2>
        </div>
        <TierBadge tier={tier} />
      </div>

      {latestScore ? (
        <p className="mb-4 text-slate-600">
          Risk score: <span className="font-bold text-slate-900">{latestScore.compositeRiskScore}</span>
        </p>
      ) : (
        <p className="mb-4 text-slate-500">No risk score yet.</p>
      )}

      <Link
        to={`/student/courses/${course.courseId}`}
        className="inline-block rounded-md border border-emerald-800 px-4 py-2 font-semibold text-emerald-800 hover:bg-emerald-50"
      >
        View course details
      </Link>
    </div>
  )
}

export default CourseCard
