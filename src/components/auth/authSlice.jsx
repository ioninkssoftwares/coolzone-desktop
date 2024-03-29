import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  createUser,
  signOut,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
  getCurrentUser,
} from '../auth/authApi';
// import { updateUser } from './authApi';



const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  currentUser: null,
  status: 'idle',
  loading: true,
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false
};



export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async ({ userData }) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const checkAuthAsync = createAsyncThunk('user/checkAuth', async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const resetPasswordRequestAsync = createAsyncThunk(
  'user/resetPasswordRequest',
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);

    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);

    }
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async () => {
    const response = await signOut();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const getCurrentUserAsync = createAsyncThunk(
  'user/getCurrentUser',
  async (userToken) => {
    const response = await getCurrentUser(userToken);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.loading = false;
        state.error = action.payload.response.data.message || "Sign up Failed";
        // console.log(action.payload.response.data.message,"dsjfkdjksf")
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';

      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loading = false;
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.loading = false;
        state.error = action.payload.response.data.message;
        // console.log(action.payload.response.data.message,"dsjfkdjksf")
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
      })
      .addCase(getCurrentUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        console.log(state.status, "kgjfkk")
        state.status = 'idle';
        state.loading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(getCurrentUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
        state.loading = false;
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectCurrentUserDetails = (state) => state.auth.currentUser;
export const userLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;

// export const { } = authSlice.actions;

export default authSlice.reducer;
