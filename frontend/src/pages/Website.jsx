import About from "../components/About/About";
import Hero from "../components/Hero/Hero";
import Owner from "../components/Owner/Owner";
import Property from "../components/Property/Property";
import Services from "../components/services/Services";
import Value from "../components/value/Value";


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

export default Website