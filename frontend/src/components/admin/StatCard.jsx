// One number on the dashboard, e.g. "Students: 42".
// Props:
//   label - what is being counted
//   value - the number to show
function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <p className="text-sm font-semibold text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </div>
  );
}

export default StatCard;
