import { useContext } from "react";
import About from "../components/About/About";
import Hero from "../components/Hero/Hero";
import Owner from "../components/Owner/Owner";
import Property from "../components/Property/Property";
import Services from "../components/services/Services";
import Value from "../components/value/Value";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import ProfilePage from "../components/Profile/ProfilePage"

const Website = () => {
  return (
    <div className="overflow-x-hidden">
      
      <Hero />
      <About />
      <Services />
      <Value />
      <Property />
      <Owner />
     
    </div>
  );
}
export const RequiredAuth = () => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? (
    <div>
      <ProfilePage/>
    </div>
  ) : (
    <Navigate to="/login"/>
  )
}
export default Website