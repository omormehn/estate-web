import { LuMail } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer id="footer" className="pt-16  bg-black text-white ">
      <div className="container lg:mx-8 grid lg:grid-cols-3 lg:gap-16 pb-8">
        {/* col-1 */}
        <div className="">
          <img src="./logo2.png" alt="" className="w-36 sm:40" />
          <p className="py-4">
            No 57 Gbazango, Kubwa, <br /> Abuja, Nigeria
          </p>
          <a href="tel:+234 9121212119" className="flex gap-4 py-4">
            <BsTelephone className="mt-1" />
            +234 912-121-2119
          </a>

          <a href="mailto:damisaglobalrealty1@gmail.com" className="flex gap-4">
            <LuMail className="mt-1" />
            damisaglobalrealty1@gmail.com
          </a>
        </div>
        {/* col-2 */}
        <div className="py-10 lg:py-0 lg:ml-8 text-lgcode is goo">
          <h1 className="mt-4 text-lg font-bold">Quick Links</h1>
          <div className="grid gap-3 py-8">
            <a href="">Home</a>
            <a href="">About</a>
            <a href="">Services</a>
            <a href="">Properties</a>
            <a href="">Become an Agent</a>
          </div>
        </div>
        {/* Col-3 */}
        <div className="flex justify-center flex-col">
          <h1 className="font-bold">Follow Us on</h1>
          <div className="flex gap-5 py-4 cursor-pointer">
            <FaXTwitter />
            <FaInstagram />
            <FaFacebookF />
          </div>
        </div>
      </div>
      <div className="py-6  bg-[#0f1654]">
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
