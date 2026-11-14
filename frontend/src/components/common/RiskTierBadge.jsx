// Shows a risk tier with a text label AND a color, so the meaning
// does not depend on color alone. The backend decides the tier.
const TIERS = {
  GREEN: { label: 'Safe', colors: 'border-[#9fd8b1] bg-[#e3f5e9] text-[#17602f]' },
  YELLOW: { label: 'Moderate Risk', colors: 'border-[#ebd27a] bg-[#fff6d6] text-[#6e5000]' },
  RED: { label: 'Critical Risk', colors: 'border-[#f0a9a9] bg-[#fde7e7] text-[#8f1a1a]' },
};

const BADGE = 'inline-block rounded-full border px-2.5 py-0.5 text-sm font-semibold';

function RiskTierBadge({ tier }) {
  const info = TIERS[tier];

  if (!info) {
    return <span className={`${BADGE} border-line bg-subtle text-muted`}>No tier yet</span>;
  }

  return <span className={`${BADGE} ${info.colors}`}>{info.label}</span>;
}

export default RiskTierBadge;
