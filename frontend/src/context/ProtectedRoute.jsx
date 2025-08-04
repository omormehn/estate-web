import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

const ProtectedRoute = createContext();

export const ProtectedRouteProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await api.post("/verify");
      setIsAuth(true);
      if (res.status === 401) navigate("/login");
      console.log(res);
    };
    checkAuth();
  }, [isAuth]);

  return (
    <ProtectedRoute.Provider value={{ isAuth }}>
      {children}
    </ProtectedRoute.Provider>
  );
};

export default ProtectedRoute;
