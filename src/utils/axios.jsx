
// import axios from "axios";

// export const useAxios = () => {
//   const instance = axios.create({
//     baseURL: (import.meta.env.VITE_REACT_APP_BASE_URL),
//     // headers: {
//     //   Authorization: `Bearer ${token}`,
//     // },
//   });
//   return instance;
// };
// useAxios.jsx
import axios from "axios";

export const useAxios = (token) => {
    console.log(token?.token,"jskdfklsdjflkds")
  const instance = axios.create({
    baseURL: (import.meta.env.VITE_REACT_APP_BASE_URL),
    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
  });
  return instance;
};
