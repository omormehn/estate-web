import PropertyCards from "../components/PropertyCard/PropertyCards";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { api } from "../utils/api";
import { FaArrowLeftLong } from "react-icons/fa6";

const BookMarks = () => {
  const [bookMarks, setBookMarks] = useState([]);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBookmarks = async () => {
      try {
        const response = await api.post("get-bookmark", {
          email: currentUser.user.email,
        });
        setBookMarks(response.data.residencies || []);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setError(true);
      }
    };
    if (currentUser && currentUser.user) {
      fetchBookmarks();
    }
  }, [currentUser]);

  const route = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <FaArrowLeftLong className="cursor-pointer " onClick={route} />

        <h1 className="text-2xl font-bold my-6">Your Bookmarks</h1>
        {bookMarks.length > 0 ? (
          <ul className="space-y-4">
            {bookMarks.map((bookmark) => (
              <PropertyCards key={bookmark.id} card={bookmark} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have no bookmarks yet.</p>
        )}
        {error && (
          <div className="text-red-500 mt-4">
            Error fetching bookmarks. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookMarks;
