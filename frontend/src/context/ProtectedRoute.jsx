import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

const ProtectedRoute = createContext();

// eslint-disable-next-line react/prop-types
export const ProtectedRouteProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await api.post("/verify");
      setIsAuthenticated(true);
      if (res.status === 401) navigate("/login");
      console.log(res);
    };
    checkAuth();
  }, [isAuthenticated, navigate]);

  return (
    <ProtectedRoute.Provider value={{ isAuthenticated }}>
      {children}
    </ProtectedRoute.Provider>
  );
};

export default ProtectedRoute;
