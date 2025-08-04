import { useQuery } from "react-query";
import {  useLocation } from "react-router-dom";
import { getProperty } from "../utils/api";
import { PuffLoader } from "react-spinners";
import { LuHeart } from "react-icons/lu";
import { FaShower } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { useEffect, useState } from "react";
import useFavorites from "../hooks/useFavorites";
import "react-datepicker/dist/react-datepicker.css";
import BookingModal from "../components/Modal/BookingModal";
import { Button } from "@material-tailwind/react";




const Property = () => {
  const [showModal, setShowModal] = useState(false);
  const { pathname } = useLocation();


  const id = pathname.split("/").slice(-1)[0]
   const { data, isLoading, isError, refetch } = useQuery(["resd", id], () =>
     getProperty(id)
   );

  const { fav, addToFav } = useFavorites(id)
  useEffect(() => {
    window.scrollTo(0,0)
  }, []);
 
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
      refetch;
       return (
         <div>
           <h1>Error while fetching data</h1>
           <Button>Retry</Button>
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
            <div
              className={`flex items-center justify-center rounded-full ${
                fav ? "text-red-500" : "bg-transparent"
              } transition-all duration-300 ease-in-out p-1 cursor-pointer`}
              onClick={addToFav}
            >
              <LuHeart size={23} />
            </div>
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
          <button className="primary-btn mt-4 lg:w-[30vw]" onClick={() => setShowModal(!showModal)}>Book Visit</button>

           {/* Modal */}
           {showModal && (
            <div className="">
              <BookingModal setShowModal={setShowModal} showModal={showModal}/>
            </div>
          )}

          {isError && (
            <div>Error</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Property