import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const { loggedIn, userType } = useSelector((state) => state.session);

  // Not logged in → redirect to login page
  if (!loggedIn) {
    return <Navigate to="/Login" replace />;
  }

  // Logged in but wrong role → show error
  if (requiredRole && userType !== requiredRole) {
    return <h2>Access denied: {requiredRole} only</h2>;
  }

  // Otherwise, show the requested page
  return children;
}
