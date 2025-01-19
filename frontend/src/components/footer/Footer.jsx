import { LuMail } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="pt-16">
      <hr className="mb-20 h-0.5 bg-black" />
      <div className="container grid lg:place-items-center lg:grid-cols-2 pb-8">
        {/* col-1 */}
        <div className="">
          <p className="py-4">
            No 57 Gbazango, Kubwa, <br /> Abuja, Nigeria
          </p>
          <a href="tel:+234 8025557683" className="flex gap-4 py-4">
            <BsTelephone className="mt-1" />
            +234 491-121-2119
          </a>

          <a href="mailto:damisaglobalrealty1@gmail.com" className="flex gap-4">
            <LuMail className="mt-1" />
            damisaglobalrealty1@gmail.com
          </a>
        </div>
        {/* col-2 */}
        {/* <div className="py-10 lg:py-0 lg:ml-8 text-lgcode is goo">
          <h1 className="mt-4 text-lg font-bold">Quick Links</h1>
          <div className="grid gap-3 py-8">
            <a href="/">Home</a>
            <a href="#about">About</a>
            <a href="">Services</a>
            <a href="/properties">Properties</a>
            <a href="#contact">Become an Agent</a>
          </div>
        </div> */}
        {/* Col-3 */}
        <div className="flex justify-center flex-col py-5">
          <h1 className="font-bold">Follow Us on</h1>
          <div className="flex gap-5 py-4 socials">
            <Link
              // target="https://"
              // to={"https:"}
            >
              <FaWhatsapp/>
            </Link>
            <Link
              target="https://www.instagram.com/damisaglobalrealty01?igsh=MTkzOW1xbGphZWF0NQ=="
              to={"https://www.instagram.com/damisaglobalreal ty01?igsh=MTkzOW1xbGphZWF0NQ=="}
            >
              <FaInstagram />
            </Link>
            <Link
              // target="https://"
              // to={"https://"}
            >
              <FaFacebook />
            </Link>
          </div>
        </div>
      </div>
      <div className="py-6  ">
        <div className="px-8">
          <p className="text-center">
            &copy; 2024 <a href="#">damisaglobalrealty</a>. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
