import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { api } from "../utils/api";
import { toast } from "react-toastify";

const useFavorites = (cardId) => {
  const [fav, setFav] = useState(false);
  const { currentUser } = useContext(AuthContext);

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
        setFav(favIds.includes(cardId));
      } catch (error) {
        console.error("error in all fav", error);
        throw new error();
      }
    };
    fetchFav();
  }, [currentUser, cardId]);

  const addToFav = async () => {
    const email = currentUser.user.email;
    setFav((prevFav) => !prevFav);
    try {
      const response = await api.post(`/to-fav/${cardId}`, {
        email,
      });
      console.log(response.data)
    } catch (error) {
      toast.error("Something went wrong");
      console.error(
        "Error adding to favorites:",
        error.response ? error.response.data : error.message
      );
      setFav((prevFav) => !prevFav);
    }
  };
  return { fav, addToFav };
};

export default useFavorites;
