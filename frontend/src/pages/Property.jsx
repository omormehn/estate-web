import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../utils/api";
import { PuffLoader } from "react-spinners";
import { LuHeart } from "react-icons/lu";
import { FaShower } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";


const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0]
  console.log(id);

  const { data, isLoading, isError } = useQuery(["resd", id], () => getProperty(id));

  console.log(data)

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

     if (isError) {
       return (
         <div>
           <h1>Error while fetching data</h1>
         </div>
       );
     }

  
  return (
    <div className="container mt-40">
      <h2 className="font-semibold text-2xl text-blue my-8">{data.title}</h2>
      {/* image */}
      <div>
        <img
          src={data?.image}
          alt="property image"
          className="self-center rounded-lg max-h-[35rem] w-full object-cover"
        />
      </div>
      <div className="grid  gap-4">
        {/* property details left */}
        <div className="mt-8 flexColStart">
          <div className="flex justify-between  ">
            <p className="text-2xl text-start font-semibold  tracking-wide">
              ₦ {data.price}
            </p>
            <LuHeart size={24} className="cursor-pointer " />
          </div>

          <a href="">
            <p className={`flex flex-wrap text-justify leading-6`}>
              {data.description}
            </p>
          </a>

          {/* facilities */}
          <ul className="card-list">
            <li className="card-item">
              <strong>{data?.facilities?.bedrooms}</strong>
              <IoBedOutline className="icon" />
              <br />
              <span>Bedrooms</span>
            </li>

            <li className="card-item">
              <strong>{data?.facilities.bathrooms}</strong>

              <FaShower size={18} className="icon " />
              <br />
              <span>Bathrooms</span>
            </li>

            <li className="card-item">
              <strong>{data?.facilities.squareft}</strong>
              <TbRulerMeasure className="icon" />
              <br />
              <span>Square Ft</span>
            </li>
          </ul>

          {/* Address */}
          <div className="flex gap-2 mt-8">
            <MdOutlineLocationOn className="mt-[0.15rem]" size={20} />
            <address className="font-bold">
              {data?.address}, {data?.city}
            </address>
          </div>

          {/* book visit */}
          <button className="primary-btn mt-4 lg:w-[30vw]">Book Visit</button>
        </div>

     
        
      </div>
    </div>
  );
}

export default Property