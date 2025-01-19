import { Button } from "@material-tailwind/react";
import "./profile.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { createPortal } from "react-dom";
import CreateModal from "../Modal/CreateModal";
import UpdateModal from "../Modal/UpdateModal";
import { api } from "../../utils/api";


function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [opened, setOpen] = useState(false);
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);
  const isAdmin = currentUser && currentUser.user.role === "ADMIN";

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])



  const handleLogout = async () => {
    await api.post("/auth/logout");
    updateUser(null);
    toast.success("Logged out Successfully.");
    navigate("/login");
  };

  return (
    <div className="profilePage container pt-32">
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
              className="mt-6  max-w-48 pt-2 text-black primary-btn  "
              onClick={handleLogout}
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
    </div>
  );
}

export default ProfilePage;
