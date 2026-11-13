// Shows a risk tier with a text label AND a color, so the meaning
// does not depend on color alone. The backend decides the tier.
const TIER_LABELS = {
  GREEN: 'Safe',
  YELLOW: 'Moderate Risk',
  RED: 'Critical Risk',
};

function RiskTierBadge({ tier }) {
  const label = TIER_LABELS[tier];

  if (!label) {
    return <span className="badge badge-none">No tier yet</span>;
  }

  return <span className={`badge badge-${tier.toLowerCase()}`}>{label}</span>;
}

export default RiskTierBadge;
