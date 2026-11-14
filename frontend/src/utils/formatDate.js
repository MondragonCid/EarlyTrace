// Turns a backend date like "2026-11-13T09:30:00" into "Nov 13, 2026".
// Returns a dash when the date is missing or invalid.
export function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (isNaN(date)) return '—';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
