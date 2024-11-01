import { Button } from "@material-tailwind/react";
import Chat from "../Chat/Chat";
import "./profile.scss"
import {api} from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function ProfilePage() {
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await api.post("/user/auth/logout");
    updateUser(null)
    toast.success("Logged out Successfully.");
    navigate('/')
  }


  return (
    <div className="profilePage container pt-32">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.image || "image.png"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.user.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.user.email}</b>
            </span>
            <Button
              onClick={handleLogout}
              className="mt-6 px-20 pt-2 text-slate-700 "
            >
               Logout
            </Button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>

          <div className="title">
            <h1>Saved List</h1>
          </div>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
