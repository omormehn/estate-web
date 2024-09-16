import axios from "axios";
import { toast } from "react-toastify";


export const api = axios.create({
    baseURL: "http://localhost:8000/api",
})

const getAllProperties = async() => {
    try {
        const response = await api.get("/residency/allresd/", {
            timeout: 10 * 1000,
        });

        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error("Something went wrong")
        throw error;
    }
}
const getProperty = async (id) => {
    try {
        const response = await api.get(`/residency/${id}`, {
            timeout: 10 * 1000,
        })
         if (response.status === 400 || response.status === 500) {
           throw response.data;
         }
         return response.data;
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
}

export {getAllProperties}

export { getProperty };