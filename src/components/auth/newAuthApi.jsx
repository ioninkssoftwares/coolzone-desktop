





// authApi.jsx
import useNewAxios from "../../utils/newAxios";

const AuthAPI = () => {
  const instance = useNewAxios();

  const loginUser = async (loginInfo) => {
    try {
      const response = await instance.post('/login', loginInfo);
      return { data: response.data };
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  };

  // ... other functions

  return {
    loginUser,
    // ... other functions
  };
};

export default AuthAPI;
