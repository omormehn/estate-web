import axios from "axios";

export const api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
    res => res,
    error => {
        if (error.response.status === 401) {
            console.error("Unauthorized access - redirecting to login");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)

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
