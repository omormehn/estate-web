import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useFavorites = (resId) => {
  const [fav, setFav] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFav = async () => {
      if (!currentUser || !currentUser.user) {
        return;
      }
      try {
        const response = await api.post("/all-favorite", {
          email: currentUser.user.email,
        });
        const favIds = response.data.favResidenceID || [];
        setFav(favIds.includes(resId));
      } catch (error) {
        console.error("error in all fav", error);
        throw new error();
      }
    };
    fetchFav();
  }, [currentUser, resId]);

  const addToFav = async () => {
    if (!currentUser || !currentUser.user) {
      toast.error("Please login to add to favorites");
      navigate(`/login`, { state: { from: `/properties/${resId}` } });
      return;
    }
    const email = currentUser.user.email;
    setFav((prevFav) => !prevFav);
    try {
      const response = await api.post(`/to-fav/${resId}`, {
        email,
      });
      console.log(response.data);
    } catch (error) {
      toast.error("Something went wrong");
      setFav((prevFav) => !prevFav);
      throw new Error("Failed to add to favorites", error);
    }
  };
  return { fav, addToFav };
};

export default useFavorites;
