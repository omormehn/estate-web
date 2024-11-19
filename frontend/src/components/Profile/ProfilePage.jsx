import { Button } from "@material-tailwind/react";
import "./profile.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { createPortal } from "react-dom";
import CreateModal from "../Modal/CreateModal";
import UpdateModal from "../Modal/UpdateModal";
import { api } from "../../utils/api";
import Chat from "../Chat/Chat";

function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [opened, setOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chatResponse, setChatResponse] = useState(null);
  const [error, setError] = useState(null);
  const { updateUser, currentUser } = useContext(AuthContext);
  const isAdmin = currentUser && currentUser.user.role === "ADMIN";



  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await api.get("/chat/chats");

        const data = await response.data;
        setChatResponse(data);
      } catch (err) {
        setError(err.message);

        console.log("dat", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    updateUser(null);
    toast.success("Logged out Successfully.");
    navigate("/login");
  };

  return (
    <div className="profilePage  container pt-32">
      <div className="details">
        <div className="wrapper">
          <div className="title flex flex-col md:items-center md:flex-row">
            {currentUser.user.role === "ADMIN" ? (
              <h1>Admin Information:</h1>
            ) : (
              <h1>User Information:</h1>
            )}

            <div className=" lg:block pt-4 ">
              {isOpen &&
                createPortal(
                  <UpdateModal setIsOpen={setIsOpen} />,
                  document.body
                )}
              <button className="py-1 px-6" onClick={() => setIsOpen(true)}>
                Update Profile
              </button>
            </div>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.user.image || "image.png"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.user.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.user.email}</b>
            </span>
            <Button
              onClick={handleLogout}
              className="mt-6 max-w-48 pt-2 text-slate-700 "
            >
              Logout
            </Button>
          </div>
          <div className="title items-center">
            <h1 className="font-bold"></h1>
            {opened &&
              createPortal(<CreateModal setOpen={setOpen} />, document.body)}
            {isAdmin && (
              <button className="py-2 px-2" onClick={() => setOpen(true)}>
                Create Post
              </button>
            )}
          </div>

          <div className="title">
            <h1>Saved List</h1>
          </div>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <h1>Chats</h1>
          {loading ? (
            <p>Loading chats...</p>
          ) : error ? (
            <p>Error loading chats: {error}</p>
          ) : (
            <Chat chats={chatResponse} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
