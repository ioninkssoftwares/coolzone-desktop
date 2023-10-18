


import { useAxios } from "../../utils/axios";

import { useNewAxios } from "../../utils/newAxios";

// const newInstance = useNewAxios();
const instance = useAxios();


export const loginUser = async (loginInfo) => {
    const { email, password, token } = loginInfo;
    const instance = useAxios(token);
  
    try {
      const response = await instance.post('/login', { email, password });
      return { data: response.data };
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  };
  
export const createUser = async (userData) => {
  
    try {
      const response = await instance.post('/register', userData);
      return { data: response.data };
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  };
  


  // export function createUser(userData) {
  //   return new Promise(async (resolve) => {
  //     const response = await fetch('https://coolzonebackend.onrender.com/api/v1/register', {
  //       method: 'POST',
  //       body: JSON.stringify(userData),
  //       headers: { 'content-type': 'application/json' },
  //     });
  //     const data = await response.json();
  //     resolve({ data });
  //   });
  // }

  
  export function checkAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/auth/check');
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }
  
  
  export function signOut(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/auth/logout');
        if (response.ok) {
          resolve({ data:'success' });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        console.log(error)
        reject( error );
      }
    });
  }
  
  
  export function resetPasswordRequest(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/auth/reset-password-request', {
          method: 'POST',
          body: JSON.stringify({email}),
          headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }
  
  export function resetPassword(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/auth/reset-password', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }
  