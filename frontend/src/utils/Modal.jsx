/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { PuffLoader } from "react-spinners";
import "./modal.css";
import AuthContext from "../context/AuthContext";
import { api } from "./api";
import { toast } from "react-toastify";

const Modal = ({ setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleUpload = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData(e.target);
      const file = e.target.file;

      if ( file.files[0]) {
        formData.append("image", file.files[0]);
      }


      const username = formData.get("username");
      const email = formData.get("email");
        if (e.target.password.value) {
          formData.append("password", e.target.password.value);
        }

      await api.put(`/user/update-user/${currentUser.user.id}`, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
       formData
      });
      toast.success("Profile Updated Successfully.");
    } catch (error) {
      console.log("error in update", error);
    } finally {
      setLoading(false);
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

          <form onSubmit={handleUpload} className="flex flex-col gap-y-4 pt-10">
            <div className="flex gap-5">
              <img
                className="w-7"
                src={currentUser.user.image || "image.png"}
                alt=""
              />
              <input name="file" type="file" />
            </div>
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
    </>
  );
};

export default Modal;
