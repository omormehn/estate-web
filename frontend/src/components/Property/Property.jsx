import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import useProperties from "../../hooks/useProperties";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { PuffLoader } from "react-spinners";
import useInViewHook from "../../utils/inView";
import { motion } from "framer-motion";
import { FadeInFromTop } from "../../utils/motion";
import { PropertyCard } from "../PropertyCard/PropertyCard";







const Property = () => {
  const { ref, inView } = useInViewHook({ threshold: 0 });  

  const { data, isError, isLoading } = useProperties();

  if (isError) {
    return (
      <div>
        <h1>Error while fetching data</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flexCenter justify-center container h-[60vh]">
        <PuffLoader
          color={"#123abc"}
          size={80}
          radius={1}
          aria-label="puff-loading"
        />
      </div>
    );
  }

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
          {data.slice(0,8).map((card, i) => (
            <SwiperSlide key={i}>
              <PropertyCard card={card}/>
            </SwiperSlide>
          ))}
          <div className="text-end container pt-8">
            <a href="/properties" className="border-b  border-black">
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
