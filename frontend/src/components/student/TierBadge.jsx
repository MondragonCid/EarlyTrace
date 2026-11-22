// Shows a risk tier (GREEN, YELLOW or RED) as a colored label.
// Props:
//   tier - the tier text from the backend
function TierBadge({ tier }) {
  if (tier === 'GREEN') {
    return <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">Safe</span>
  }
  if (tier === 'YELLOW') {
    return <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">Moderate risk</span>
  }
  if (tier === 'RED') {
    return <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">Critical risk</span>
  }
  return <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">Not rated yet</span>
}

export default TierBadge
