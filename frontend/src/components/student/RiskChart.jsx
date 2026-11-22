// Shows how the student's risk score changed, one bar per calculation.
// A longer bar means a higher risk score (out of 100).
// Props:
//   scores - the student's risk scores for one course, oldest first
function RiskChart({ scores }) {
  if (scores.length === 0) {
    return <p className="text-slate-500">No risk scores for this course yet.</p>
  }

  return (
    <div>
      {scores.map((score, index) => (
        <div key={score.riskScoreId} className="mb-3">
          <div className="mb-1 flex justify-between text-sm">
            <span>
              Calculation {index + 1} ({new Date(score.calculatedAt).toLocaleDateString()})
            </span>
            <span className="font-semibold">
              {score.compositeRiskScore} ({score.riskTier})
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-200">
            <div
              className="h-3 rounded-full bg-emerald-700"
              style={{ width: `${Math.min(score.compositeRiskScore, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default RiskChart
