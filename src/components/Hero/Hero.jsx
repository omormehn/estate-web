import { MdOutlineAddHomeWork } from "react-icons/md";


const Hero = () => {
  return (
    <section className=" ">
      <div className="dark:bg-black">
        {/* top part */}
        <div className="container text-center pt-40 dark:text-white  ">
          <div className="typewrite  ">
            <h1 className="flex text-xl w-full font-serif leading-9 whitespace-normal lg:whitespace-nowrap">
              Transforming Real Estate Experiences Through Innovative Solutions,
              We Empower Seamless Property Management And Elevate Investment
              Success
            </h1>

            <h1 className="text-2xl font-bold tracking-[2rem] md:text-5xl md:tracking-[4rem] lg:text-9xl lg:tracking-[10rem] mt-10 text-wrap">
              DAMISA
            </h1>
          </div>
          <div className="container">
            <p
              className="text-center md:text-right md:text-2xl lg:text-3xl font-poppins
        text-xl mr-4 md:mr-28 lg:-mr-16 tracking-[1rem] lg:tracking-[2rem] lg:whitespace-nowrap"
            >
              Global
            </p>
          </div>
        </div>
        {/* Hero bottom right */}
        <div className="container py-16 grid lg:grid-cols-2">
          <img
            src="./hero/house1.png"
            className="rounded-lg lg:w-[700px] lg:order-1"
            alt=""
          />
          {/* Hero bottom left */}
          <div className="py-[20px] dark:text-white">
            <p className="gap-1 mb-5 ">
              <MdOutlineAddHomeWork className="text-3xl" />
              <span className="font-bold text-sm  ">Real Estate Agency</span>
            </p>

            <h2 className="font-poppins leading-[1.3] mb-5 text-3xl md:text-[2.5rem] lg:text-6xl font-semibold">
              Discover Your Dream House Today
            </h2>

            <p className="text-sm md:text-xl lg:text-2xl pl-4 border-l-[1px] border-solid leading-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, eiusmod
              tempor incididunt ut labore.
            </p>

            <a href="{{ url_for('property') }}" className="primary-btn mt-10">
              {" "}
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero