// Shows one number with a label, e.g. "12 Students".
// Props:
//   label - the text under the number
//   value - the number to show
function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="font-semibold text-slate-600">{label}</p>
    </div>
  )
}

export default StatCard
