/* eslint-disable react/prop-types */
import { MdOutlineLocationOn } from "react-icons/md";
import { badgeColors } from "../Property/badgeColor";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useContext} from "react";
import AuthContext from "../../context/AuthContext";
import useFavorites from "../../hooks/useFavorites";


export const PropertyCard = ({ card }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const {fav, addToFav} = useFavorites(card.id);




  return (
    <div className="slider-card mx-4 cursor-pointer">
      <figure>
        <img src={card.image} alt="" className="my-8 rounded-lg w-full h-60" />
        <div className={`card-badge ${badgeColors[card.service]}`}>
          {card.service}
        </div>
        <div className="banner-actions text-white font-bold">
          <button className="flex gap-2 mt-8">
            <MdOutlineLocationOn className="mt-1" />
            <address>{card.location}</address>
          </button>
        </div>
      </figure>

      <div className="mt-4 flexColStart leading-5">
        <div className="flex justify-between">
          <p className="text-xl lg:text-2xl">₦ {card.price}</p>

          {currentUser && (
            <div
              className={`flex items-center justify-center rounded-full ${
                fav ? "text-red-500" : "bg-transparent"
              } p-1 cursor-pointer`}
              onClick={addToFav}
            >
              <LuHeart size={23} />
            </div>
          )}
        </div>
        <h2
          onClick={() => {
            if (currentUser === null) {
              navigate('/login', { state: { from: `/properties/${card.id}` } });   
              return;
            }
            navigate(`../properties/${card.id}`);
          }}
          className="font-semibold text-xl"
        >
          {card.title}
        </h2>
        <a href="">
          <p className={`flex flex-wrap`}>{card.detail}</p>
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

export default PropertyCard;
