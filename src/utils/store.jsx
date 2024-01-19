import { configureStore, createReducer } from '@reduxjs/toolkit';
import productReducer from '../components/product/productSlice';
import authReducer from '../components/auth/authSlice';
import { productsAPI } from '../redux/api/productApi';
import { cartReducer } from '../redux/reducer/cartReducer';
import { orderApi } from '../redux/api/orderApi';
// import orderReducer from '../features/order/orderSlice';
// import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    // cart: cartReducer,
    [cartReducer.name]: cartReducer.reducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,

    // order: orderReducer,
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware, orderApi.middleware),
});
