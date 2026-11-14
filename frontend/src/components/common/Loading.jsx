// Shown while data is being fetched.
// role="status" makes screen readers announce the message.
function Loading({ message = 'Loading...' }) {
  return (
    <div className="my-4 rounded-lg border border-line bg-white p-5 text-center" role="status">
      <span
        className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-line border-t-primary"
        aria-hidden="true"
      ></span>
      <p className="my-1">{message}</p>
    </div>
  );
}

export default Loading;
