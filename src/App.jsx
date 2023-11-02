import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import MembershipPage from './pages/MembershipPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WishListPage from './pages/WishListPage';
import OrdersPage from './pages/OrdersPage';
import MyAccountPage from './pages/MyAccountPage';
import ProfilePage from './pages/ProfilePage';
import AddressPage from './pages/AddressPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
   <Home></Home>
    ),
  },
  {
    path: "/products",
    element: (
      <Products/>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <ProductDetailsPage/>
    ),
  },
  {
    path: "/cart",
    element: (
      <CartPage/>
    ),
  },
  {
    path: "/checkout",
    element: (
     <Checkout/>
    ),
  },
  {
    path: "/membership",
    element: (
     <MembershipPage/>
    ),
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  {
    path: '/wishlist',
    element: <WishListPage></WishListPage>,
  },
  {
    path: '/orders',
    element: <OrdersPage></OrdersPage>,
  },
  {
    path: '/myAccount',
    element: <MyAccountPage></MyAccountPage>,
  },
  {
    path: '/profile',
    element: <ProfilePage></ProfilePage>,
  },
  {
    path: '/address',
    element: <AddressPage></AddressPage>,
  },
]);

function App() {
  return (
    <>
<div className='App'>
<RouterProvider router={router} />
<ToastContainer />
</div>
    </>
  )
}

export default App
