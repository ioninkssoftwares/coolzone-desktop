
import axios from "axios";

export const useAxios = (token) => {
  const instance = axios.create({
    baseURL: (import.meta.env.VITE_REACT_APP_BASE_URL),
    headers: {
      Authorization: `Bearer ${token || ''}`,
    },
  });
  return instance;
};
