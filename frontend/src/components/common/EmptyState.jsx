// Shown when a request worked but there is nothing to list.
function EmptyState({ title, message }) {
  return (
    <div className="my-4 rounded-lg border border-line bg-white p-5 text-center">
      <p className="my-1 font-semibold">{title}</p>
      {message && <p className="my-1">{message}</p>}
    </div>
  );
}

export default EmptyState;
