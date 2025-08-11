import About from "../components/About/About";
import Hero from "../components/Hero/Hero";
import Property from "../components/Property/Property";
import Services from "../components/services/Services";
import Value from "../components/value/Value";


const Website = () => {

  return (
    <div className="overflow-x-hidden">
      <div>
        <Hero />
        <Property />
        <About />
        <Services />
        <Value />
      </div>
    </div>
  );
};
export default Website;
