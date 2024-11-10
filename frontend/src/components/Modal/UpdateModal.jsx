/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { PuffLoader } from "react-spinners";
import "./modal.css";
import AuthContext from "../../context/AuthContext";
import { api } from "../../utils/api";
import { toast } from "react-toastify";
import UploadWidget from "../UploadWidget/UploadWidget";

const UpdateModal = ({ setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const [ avatar, setAvatar ] = useState(currentUser.user.image);

  const handleUpload = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);
    try {
     

      const res = await api.put(`/user/update-user/${currentUser.user.id}`, {
        username,
        email,
        password,
        image: avatar
      });
      updateUser(res.data);
      toast.success("Profile Updated Successfully.");
    } catch (error) {
      console.log("error in update", error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className={`darkBG `} onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal xs:w-[80vw] lg:w-[70vw] h-[90vh] md:h-[70vh] lg:h-[80vh] ">
          <div className="flex justify-between gap-x-16 z-20">
            <h5 className="text-black font-bold">Update Profile</h5>
            <button className="" onClick={() => setIsOpen(false)}>
              <RiCloseLine size={23} style={{ marginBottom: "-3px" }} />
            </button>
          </div>
          <div className=" pt-4">
            <div className="flex gap-10">
              <img className="w-14 rounded-full" src={avatar ? (avatar) : ("../../public/image.png")} alt="" />
              <UploadWidget
                uwConfig={{
                  cloudName: "omormehn",
                  uploadPreset: "estate",
                  multiple: false,
                  maxImageSize: 2000000,
                  folder: "avatars",
                }}
                setAvatar={setAvatar}
              />
            </div>

            <form onSubmit={handleUpload} className="flex flex-col gap-y-4 pt-6">
              <input
                name="username"
                type="text"
                defaultValue={currentUser.user.username}
                className="w-full p-2 border border-gray-400 rounded-md"
              />
              <input
                name="email"
                type="email"
                defaultValue={currentUser.user.email}
                className="w-full p-2 border border-gray-400 rounded-md"
              />
              <input
                name="password"
                placeholder="Password"
                type="password"
                className="w-full p-2 border border-gray-400 rounded-md"
              />

              {loading ? (
                <PuffLoader
                  color={"#123abc"}
                  size={50}
                  radius={1}
                  aria-label="puff-loading"
                  className="z-50"
                />
              ) : (
                <button
                  type="submit"
                  className="primary-btn w-44 flex justify-center "
                >
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
