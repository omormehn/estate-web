import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import { PiCrown } from "react-icons/pi";
import { GiButterflyFlower } from "react-icons/gi";
import {  motion } from "framer-motion";
import {  FadeInFromTop } from "../../utils/motion";
import useInViewHook from "../../utils/inView";


const About = () => {
  const { ref, inView } = useInViewHook({ threshold: 0 });

  return (
    <section className=" " id="about">
      <div ref={ref} className=" dark:bg-black">
        <motion.div
          variants={FadeInFromTop(0.6)}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="container py-12 grid lg:grid-cols-2"
        >
          {/* About left */}
          <img src="./about/about.png" className="rounded-3xl pt-8  " alt="" />
          {/* About right */}
          <div ref={ref} className="lg:px-4 dark:text-white">
            <div className="container text-end top-8">
              <h1 className="dark:text-white section-subtitle">About Us</h1>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-5xl font-serif font-semibold lg:leading-snug my-2">
              The Leading Real Estate Rental Marketplace.
            </h2>

            <p className="font-light my-6 ">
              Over 39,000 people work for us in more than 70 countries all over.
              This breadth of global coverage, combined with specialist
              services.
            </p>

            <ul className="grid md:grid-cols-2 ">
              <li className="about-item">
                <div className="about-item-icon">
                  <IoHomeSharp />
                </div>

                <p className="about-item-text">Smart Home Design</p>
              </li>

              <li className="about-item">
                <div className="about-item-icon">
                  <GiButterflyFlower />
                </div>

                <p className="about-item-text">Beautiful Scene Around</p>
              </li>

              <li className="about-item">
                <div className="about-item-icon">
                  <PiCrown />
                </div>

                <p className="about-item-text">Exceptional Lifestyle</p>
              </li>

              <li className="about-item">
                <div className="about-item-icon">
                  <MdOutlineVerified />
                </div>

                <p className="about-item-text">Complete 24/7 Security</p>
              </li>
            </ul>
            <div className="my-4 ">
              <a href="" className="primary-btn">
                Explore Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
