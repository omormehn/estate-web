import { createContext, useEffect, useState } from "react";
import { api } from "../utils/api";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        setLoading(true);
        const res = await api.get("/auth/validate-session");
        setCurrentUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (error) {
        setCurrentUser(null);
        localStorage.removeItem("user");
        console.error("Failed to validate session:", error);
      } finally {
        setLoading(false);
      }
    };
    validateSession();
  }, []);

  const updateUser = (data) => {
    setCurrentUser(data);
  };
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);
  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }
  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
