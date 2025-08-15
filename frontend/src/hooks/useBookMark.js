import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useBookMark = (resId) => {
  const [bookmarked, setBookmarked] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmark = async () => {
      if (!currentUser) {
        return;
      }
      try {
        const res = await api.post("get-bookmark", {
          email: currentUser.user.email,
        });
        const bookMarks = res.data.ids || [];
        setBookmarked(bookMarks.includes(resId));
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        throw new Error("Failed to fetch bookmarks", error);
      }
    };
    fetchBookmark();
  }, [currentUser, resId]);

  const toggleBookmark = async () => {
    if (!currentUser || !currentUser.user) {
      toast.error("Please login to add to bookmarks");
      navigate(`/login`, { state: { from: `/properties/${resId}` } });
      return;
    }
    console.log("clicked bookmark", resId);
    setBookmarked((prev) => !prev);
    try {
      await api.post("/toggle-bookmark", {
        email: currentUser.user.email,
        residencyId: resId,
      });
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setBookmarked((prev) => !prev);
      throw new Error("Failed to toggle bookmark", error);
    }
  };

  return { toggleBookmark, bookmarked };
};
