
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
      <div className='mt-20 '>
        <Footer />
      </div>
    </>
  );
}

export default Layout