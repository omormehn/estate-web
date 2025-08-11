
import { Navigate, useLocation } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children, currentUser }) => {
  const location = useLocation();

  if (!currentUser) {
    // Redirect to login and remember where they tried to go
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
