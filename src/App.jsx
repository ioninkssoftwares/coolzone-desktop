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
]);

function App() {
  return (
    <>
<div className='App'>
<RouterProvider router={router} />
</div>
    </>
  )
}

export default App
