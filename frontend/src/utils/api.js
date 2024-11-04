import axios from "axios";


export const api = axios.create({
  baseURL: `http://localhost:5000/api`,
  withCredentials: true,
});

const getAllProperties = async() => {
    try {
        const response = await api.get("/residency/allresd/", {
            timeout: 5 * 1000,
        });

        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        throw new error;
    }
}
const getProperty = async (id) => {
    try {
        const response = await api.get(`/residency/${id}`, {
            timeout: 5 * 1000,
        })
         if (response.status === 400 || response.status === 500) {
           throw response.data;
         }
         return response.data;
    } catch (error) {
        throw new error;
    }
}

export {getAllProperties}

export { getProperty };
