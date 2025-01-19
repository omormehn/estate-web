
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <div className="">
        <Navbar />
        <Outlet />
      </div>
        <Footer />
 
    </>
  );
}

export default Layout