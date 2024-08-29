import useInViewHook from "../../utils/inView";
import { motion } from "framer-motion";
import {  FadeInFromLeft, FadeInFromRight, FadeInFromTop } from "../../utils/motion";

const Services = () => {
  const { ref, inView } = useInViewHook({threshold : 0})
  return (
    <section className="">
      <div ref={ref} className="container py-12">
        <div className="container text-start pb-8">
          <h1 className="dark:text-white section-subtitle">OUR SERVICES</h1>
        </div>
        <ul className="service-list  lg:flex-row  md:mt-auto">
          <li>
            <motion.div
              variants={FadeInFromLeft(0.5)}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              className="service-card so"
            >
              <div className="card-icon">
                <img src="./services/service1.png" alt="Service icon" />
              </div>

              <div className="service-hov">
                <h3 className="h3 card-title">
                  <a href="#">Buy a home</a>
                </h3>

                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
              </div>
              <a href="#" className="card-link">
                <span>Find A Home</span>

                <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>
            </motion.div>
          </li>

          <li>
            <motion.div
              variants={FadeInFromTop(0.7)}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              className="service-card"
            >
              <div className="card-icon">
                <img src="./services/service2.png" alt="Service icon" />
              </div>

              <div className="service-hov">
                <h3 className="h3 card-title">
                  <a href="#">Rent a home</a>
                </h3>

                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
              </div>

              <a href="#" className="card-link">
                <span>Find A Home</span>

                <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>
            </motion.div>
          </li>

          <li>
            <motion.div
              variants={FadeInFromRight(0.9)}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              className="service-card"
            >
              <div className="card-icon">
                <img src="./services/service3.png" alt="Service icon" />
              </div>
              <div className="service-hov">
                <h3 className="h3 card-title">
                  <a href="#">Sell a home</a>
                </h3>

                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we
                  can match you with a house you will want to call home.
                </p>
              </div>

              <a href="#" className="card-link">
                <span>Find A Home</span>

                <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>
            </motion.div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Services;
