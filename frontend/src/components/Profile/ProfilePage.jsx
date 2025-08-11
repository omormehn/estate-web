import { Button } from "@material-tailwind/react";
import "./profile.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
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

  const handleLogout = async () => {
    await api.post("/auth/logout");
    updateUser(null);
    toast.success("Logged out Successfully.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16">
              <div className="relative mb-4 md:mb-0">
                <img
                  src={currentUser?.user.image || "image.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
              <div className="flex-1 md:pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {currentUser?.user.username}
                    </h1>
                    <p className="text-gray-600 mb-2">
                      {currentUser?.user.email}
                    </p>
                    {isAdmin && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        Administrator
                      </span>
                    )}
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-3">
                    <button
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => setIsOpen(true)}
                    >
                      Update Profile
                    </button>
                    <Button
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {isAdmin && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Admin Actions
              </h3>
              <button
                className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                onClick={() => setOpen(true)}
              >
                <span>Create New Post</span>
              </button>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Saved Items
            </h3>
            <div className="text-gray-600">
              <p>Your bookmarked content will appear here</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        {/* <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {isAdmin ? "Admin Information" : "User Information"}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium w-24">Avatar:</span>
              <img
                src={currentUser?.user.image || "image.png"}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium w-24">Username:</span>
              <span className="font-semibold text-gray-900">
                {currentUser?.user.username}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium w-24">Email:</span>
              <span className="font-semibold text-gray-900">
                {currentUser?.user.email}
              </span>
            </div>
          </div>
        </div> */}
      </div>

      {/* Modals */}
      {isOpen &&
        createPortal(<UpdateModal setIsOpen={setIsOpen} />, document.body)}
      {opened && createPortal(<CreateModal setOpen={setOpen} />, document.body)}
    </div>
  );
}

export default ProfilePage;
