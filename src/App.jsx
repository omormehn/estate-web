import About from "./components/About/About";
import Footer from "./components/footer/Footer";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Owner from "./components/Owner/Owner";
import Property from "./components/Property/Property";
import Services from "./components/services/Services";
import Value from "./components/value/Value";



function App() {

  return <>
    <Navbar />
    <Hero />
    <About/>
    <Services/>
    <Value />
    <Property />
    <Owner />
    <Footer />
  </>
  
}

export default App
