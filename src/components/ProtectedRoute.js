import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, mail }) => {
  const token = Cookies.get("sessionToken");

  // Check if user is authenticated (has email and valid session token)
  if (!mail || mail === "" || !token) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
