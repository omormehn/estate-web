import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import data from "../../utils/slider.json";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import useInViewHook from "../../utils/inView";
import { motion } from "framer-motion";
import { FadeInFromTop } from "../../utils/motion";



const badgeColors = {
  "For Sale": " bg-red-500",
  "For Lease": "bg-green-500",
  "For Rent": "bg-blue",
};


const Property = () => {
  const { ref, inView } = useInViewHook({ threshold: 0 });  

  return (
    <section ref={ref} id="property">
      <motion.div
        variants={FadeInFromTop(1)}
        initial="initial"
        animate={inView ? "animate" : "initial"}
        className="container py-12 "
      >
        <div>
          <h1 className="section-subtitle text-end">Our Listings</h1>
        </div>

        <Swiper
          spaceBetween={20}
          breakpoints={{
            480: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            750: { slidesPerView: 2 },
            1100: { slidesPerView: 4 },
          }}
        >
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="slider-card mx-4">
                <figure>
                  <img
                    src={card.image}
                    alt=""
                    className="my-8 relative z-0 rounded-lg h-52"
                  />
                  <div className={`card-badge ${badgeColors[card.service]}`}>
                    {card.service}
                  </div>
                  <div className="banner-actions text-white font-bold">
                    <button className="flex gap-2">
                      <MdOutlineLocationOn className="mt-1" />
                      <address>Gwarinpa, Abuja</address>
                    </button>
                  </div>
                </figure>

                <div className="mt-4 flexColStart leading-5">
                  <p className="text-xl lg:text-2xl">₦ {card.price}</p>
                  <h2 className="font-semibold text-xl">{card.name}</h2>
                  <p>{card.detail}</p>
                  <ul className="card-list">
                    <li className="card-item">
                      <strong>{card.bedroom}</strong>
                      <IoBedOutline className="icon" />
                      <br />
                      <span>Bedrooms</span>
                    </li>

                    <li className="card-item">
                      <strong>{card.bathroom}</strong>

                      <FaShower className="icon" />
                      <br />
                      <span>Bathrooms</span>
                    </li>

                    <li className="card-item">
                      <strong>{card.sqrfeet}</strong>
                      <TbRulerMeasure className="icon" />
                      <br />
                      <span>Square Ft</span>
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="text-end container pt-8">
            <a href="" className="border-b  border-black">
              Show More
            </a>
          </div>
          <SliderButton />
        </Swiper>
      </motion.div>
    </section>
  );
}

export default Property;


const SliderButton = () => {
    const slider = useSwiper();
    return (
      <div className="flex mt-10 justify-center text-4xl lg:text-4xl gap-8">
        <div className="arrow-container" onClick={() => slider.slidePrev(1000)}>
          <IoIosArrowBack />
        </div>
        <div className="arrow-container" onClick={() => slider.slideNext(1000)}>
          <IoIosArrowForward />
        </div>
      </div>
    );
}
