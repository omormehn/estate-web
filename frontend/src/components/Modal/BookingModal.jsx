import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";

import Calendar from "../Calendar/Calendar";

const BookingModal = ({ setShowModal, showModal }) => {
  return (
  <div>
      <div
      className="booking-modal-parent"
    >
      <div className="booking-modal-child ">
        <div className="flex justify-between m-6">
          <h1>Book Visit</h1>
          <MdOutlineClose
            className="cursor-pointer"
            onClick={() => setShowModal(!showModal)}
            size={23}
          />
        </div>
        <div className="flex flex-col m-8 gap-4">
          <Calendar />
          <div className="flex flex-col ">
            <small>Details about visit</small>
            <input
              type="text"
              placeholder="Enter a short note"
              className=" border-2 rounded-lg border-slate-950 px-2"
            />
            <div className="flex items-start gap-2 pt-2">
            <IoMdInformationCircleOutline size={25} /> 
            <p className="text-[0.7rem]">  Describe how you want your visit to the specified house to be. Please note that <br /> it'll be communicated back to you if the date is suitable and convenient for both parties.</p>
            </div>
          </div>
          <button className="primary-btn font-medium">Submit</button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default BookingModal;
