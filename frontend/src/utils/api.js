import axios from "axios";
import { defer } from 'react-router-dom';

export const api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: `https://estate-web-backend3.onrender.com/api/user`,
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

export const getChat = async () => {
    const chats = api('/chat/chats');
    return defer({
        chatRes: chats
    })
}


export {getAllProperties}

export { getProperty };
