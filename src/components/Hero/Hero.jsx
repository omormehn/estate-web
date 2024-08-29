import { MdOutlineAddHomeWork } from "react-icons/md";
import { motion } from "framer-motion";
import { FadeInFromTop, FadeInFromLeft, FadeInFromRight } from "../../utils/motion";
import useInViewHook from "../../utils/inView";

const Hero = () => {
  const { ref, inView } = useInViewHook({ threshold: 0 });

  return (
    <section className=" ">
      <div className="bg-section dark:bg-black">
        {/* top part */}
        <div ref={ref} className="container text-center pt-40 dark:text-white">
          <motion.h1
            variants={FadeInFromTop(0.6)}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            className="flex text-xl  font-serif leading-9 whitespace-normal lg:whitespace-wrap"
          >
            Transforming Real Estate Experiences Through Innovative Solutions,
            We Empower Seamless Property Management And Elevate Investment
            Success
          </motion.h1>

         
          <h1 className="typewrite text-2xl font-bold tracking-[2rem] md:text-5xl md:tracking-[4rem] lg:text-7xl lg:tracking-[7rem] mt-10 text-wrap">
            DAMISA
          </h1>
         

          <div className="container">
            <p
              className="text-center md:text-right md:text-2xl lg:text-3xl font-poppins
        text-xl mr-4 md:mr-28 lg:-mr-16 tracking-[1rem] lg:tracking-[2rem] lg:whitespace-nowrap"
            >
              Global
            </p>
          </div>
        </div>

        <div ref={ref} className="container py-16 grid lg:grid-cols-2">
          {/* Hero bottom right */}
          <motion.img
            variants={FadeInFromRight(0.6)}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            src="./hero/house1.png"
            className="rounded-lg pt-12 lg:order-1"
            alt=""
          />
          {/* Hero bottom left */}
          <motion.div
            variants={FadeInFromLeft(0.6)}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            className="py-[20px] dark:text-white"
          >
            <p className="gap-1 mb-5 ">
              <MdOutlineAddHomeWork className="text-3xl" />
              <span className="font-bold text-sm  ">Real Estate Agency</span>
            </p>

            <h2 className="font-poppins leading-[1.3] mb-5 text-3xl md:text-[2.5rem] lg:text-6xl font-semibold">
              Discover Your Dream House Today
            </h2>

            <p className="text-sm md:text-lg lg:text-xl pl-4 border-l-[1px] border-solid leading-6 font-light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, eiusmod
              tempor incididunt .
            </p>

            <a href="{{ url_for('property') }}" className="primary-btn mt-10">
              {" "}
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero