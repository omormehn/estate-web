import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import useProperties from "../../hooks/useProperties";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { PuffLoader } from "react-spinners";
import useInViewHook from "../../utils/inView";
import { motion } from "framer-motion";
import { FadeInFromTop } from "../../utils/motion";
import { PropertyCard } from "../PropertyCard/PropertyCard";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";



const Property = () => {
  const [error, setError] = useState(false);
  const { ref, inView } = useInViewHook({ threshold: 0 });

  const { data, isError, isLoading, refetch } = useProperties();

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      setError(true);
    } else {
      setError(false);
    }
  }, [isError]);

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

  const handleRetry = () => {
    setError(false);
    refetch();
  };

  return (
    <section ref={ref} id="property">
      <motion.div
        variants={FadeInFromTop(1)}
        initial="initial"
        animate={inView ? "animate" : "initial"}
        className="container py-12 "
      >
        {!error && <h1 className="section-subtitle text-end">Our Listings</h1>}
        {error ? (
          <div className="flex justify-center items-center flex-col gap-8 mt-8">
            <h1>Error in Fetching Projects</h1>
            <Button className="text-black px-4 py-2" onClick={handleRetry}>Retry</Button>
          </div>
        ) : (
          <Swiper
            spaceBetween={20}
            breakpoints={{
              480: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              750: { slidesPerView: 2 },
              1100: { slidesPerView: 4 },
            }}
          >
            {Array.isArray(data) && data.length > 0 ? (
              data.slice(0, 8).map((card, i) => (
                <SwiperSlide key={i}>
                  <PropertyCard card={card} />
                </SwiperSlide>
              ))
            ) : (
              <div className="flex justify-center items-center flex-col gap-8 mt-8">
                <h1>No Properties Available</h1>
              </div>
            )}
            <div className="text-end container pt-8">
              <a href={currentUser ? ("/properties" ) : navigate( "/login", { state: "/properties" })} className="border-b border-black">
                Show More
              </a>
            </div>
            <SliderButton />
          </Swiper>
        )}
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
