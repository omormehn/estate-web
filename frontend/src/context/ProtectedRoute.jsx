import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);


  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
