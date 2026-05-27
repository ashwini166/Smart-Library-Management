function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <h1>Please login first</h1>;
  }

  return children;
}

export default ProtectedRoute;