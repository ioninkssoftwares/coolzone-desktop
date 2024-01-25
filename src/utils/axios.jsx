
import axios from "axios";

export const useAxios = (token) => {
  const instance = axios.create({
    // baseURL: "http://localhost:9000/api/v1",
    baseURL: (import.meta.env.VITE_REACT_APP_BASE_URL),
    headers: {
      Authorization: `Bearer ${token || ''}`,
    },
  });
  return instance;
};
