import { configureStore, createReducer } from '@reduxjs/toolkit';
import productReducer from '../components/product/productSlice';
import authReducer from '../components/auth/authSlice';
import cartReducer from '../components/cart/cartSlice';
import { productsAPI } from '../redux/api/productApi';
// import orderReducer from '../features/order/orderSlice';
// import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    [productsAPI.reducerPath]: productsAPI.reducer,

    // order: orderReducer,
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware),
});
