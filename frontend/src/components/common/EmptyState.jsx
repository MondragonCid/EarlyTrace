// Shown when a request worked but there is nothing to list.
function EmptyState({ title, message }) {
  return (
    <div className="state-box">
      <p className="state-title">{title}</p>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EmptyState;
