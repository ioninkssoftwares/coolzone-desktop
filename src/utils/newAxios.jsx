// useAxios.jsx
import axios from "axios";

export const useNewAxios = (token) => {
    console.log(token,"jskdfklsdjflkds")
  const instance = axios.create({
    baseURL: (import.meta.env.VITE_REACT_APP_BASE_URL),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};
