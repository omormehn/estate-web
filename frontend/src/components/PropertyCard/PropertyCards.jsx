/* eslint-disable react/prop-types */
import { MdOutlineLocationOn } from "react-icons/md";
import { badgeColors } from "../Property/badgeColor";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import {truncate} from 'lodash';
import { useNavigate } from "react-router-dom";


const PropertyCards = ({ card }) => {
    const navigate = useNavigate();


  return (
    <div
      className="slider-card mx-4 cursor-pointer"
      onClick={() => navigate(`../properties/${card.id}`)}
    >
      <figure>
        <img src={card.image} alt="" className="my-8  rounded-lg w-72 h-60" />
        <div className={`card-badge ${badgeColors[card.service]}`}>
          {card.service}
        </div>
      </figure>

      <div className="mt-4 flexColStart leading-5">
        <div className="flex justify-between">
          <p className="text-xl lg:text-2xl">₦ {card.price}</p>
          <LuHeart size={24} className="cursor-pointer" />
        </div>
        <h2 className="font-semibold text-xl">
          {truncate(card.title, { length: 30 })}
        </h2>
        <a href="">
          <p className={`flex flex-wrap `}>
            {truncate(card.description, { length: 35 })}
          </p>
        </a>
        <ul className="card-list">
          <li className="card-item">
            <strong>{card.facilities.bedrooms}</strong>
            <IoBedOutline className="icon" />
            <br />
            <span>Bedrooms</span>
          </li>

          <li className="card-item">
            <strong>{card.facilities.bathrooms}</strong>

            <FaShower className="icon" />
            <br />
            <span>Bathrooms</span>
          </li>

          <li className="card-item">
            <strong>{card.facilities.squareft}</strong>
            <TbRulerMeasure className="icon" />
            <br />
            <span>Square Ft</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PropertyCards;