// Shown while data is being fetched.
// role="status" makes screen readers announce the message.
function Loading({ message = 'Loading...' }) {
  return (
    <div className="state-box" role="status">
      <span className="spinner" aria-hidden="true"></span>
      <p>{message}</p>
    </div>
  );
}

export default Loading;
