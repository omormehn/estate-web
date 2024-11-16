/* eslint-disable react/prop-types */
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { PuffLoader } from "react-spinners";
import "./modal.css";
import { toast } from "react-toastify";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import { api } from "../../utils/api";

const CreateModal = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleUpload = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);

    const { title, description, price, address, city, beds, bathroom, size } =
      Object.fromEntries(formData);
    const facilities = {
      bedrooms: beds,
      bathrooms: bathroom,
      squareft: size,
    };
    const numPrice = parseInt(price);
    try {
      const res = await api.post(`/residency/create`, {
        data: {
          title,
          description,
          price: numPrice,
          address,
          city,
          facilities,
          image: image,
        },
      });
      console.log(res.data);
      toast.success("Residency Added Successfully.");
    } catch (error) {
      console.log("error in Adding residency", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div className={`darkBG `} onClick={() => setOpen(false)} />
      <div className="centered">
        <div className="modal xs:w-[80vw] lg:w-[70vw] h-[90vh] md:h-[70vh] lg:h-[80vh] overflow-auto ">
          <div className="flex justify-between gap-x-16 z-20">
            <h5 className="text-black font-bold">Add Residency</h5>
            <button className="" onClick={() => setOpen(false)}>
              <RiCloseLine size={23} style={{ marginBottom: "-3px" }} />
            </button>
          </div>
          <div className=" pt-4">
            <div className="flex gap-10"></div>

            <form
              onSubmit={handleUpload}
              className="flex flex-col gap-y-4 pt-6"
            >
              <label htmlFor="">Title</label>
              <input
                required
                name="title"
                type="text"
                className="w-full p-2 border border-gray-400 rounded-md"
              />
              <label htmlFor="">Description</label>
              <textarea
                name="description"
                className="w-full resize-none p-2 border border-gray-400 rounded-md"
              />
              <label htmlFor="">Price</label>
              <input
                required
                name="price"
                placeholder="Price"
                type="number"
                className="w-full p-2 border border-gray-400 rounded-md"
              />
              <label htmlFor="">Address</label>
              <input
                required
                name="address"
                type="text"
                className="w-full p-2 border border-gray-400 rounded-md"
              />
              <label htmlFor="">City</label>
              <input
                required
                name="city"
                type="text"
                className="w-full p-2 border border-gray-400 rounded-md"
              />
              <h1>Facilities</h1>
              <input
                required
                name="beds"
                placeholder="Beds"
                type="number"
                className="w-full p-2 border border-gray-400 rounded-md"
              />
              <label htmlFor="">Image</label>
              <UploadWidget
                uwConfig={{
                  cloudName: "omormehn",
                  uploadPreset: "estate",
                  multiple: false,
                  maxImageSize: 2000000,
                  folder: "residency",
                }}
                setAvatar={setImage}
              />
              <input
                required
                name="bathroom"
                placeholder="Bathroom"
                type="number"
                className="w-full p-2 border border-gray-400 rounded-md"
              />
              <input
                required
                name="size"
                placeholder="Square Feet"
                type="number"
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
                  Add
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateModal;
