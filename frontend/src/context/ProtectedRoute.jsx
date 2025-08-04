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
      try {
        const res = await api.post("/verify");

        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        navigate("/login");
        setIsAuthenticated(false);
        console.error("Authentication check failed:", error);
        throw new Error(error);
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <ProtectedRoute.Provider
      value={{
        isAuthenticated,
      }}
    >
      {children}
    </ProtectedRoute.Provider>
  );
};

export default ProtectedRoute;
