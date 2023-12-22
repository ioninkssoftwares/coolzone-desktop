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
import CouponPage from './pages/CouponPage';
import OrdersTrackingPage from './pages/OrdersTrackingPage';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import ProductForm from './components/product/productForm';
import AdminOrdersPage from './pages/admin/orders/AdminOrdersPage';
import UserManagement from './pages/admin/customer/UserManagement';
import MembershipManagement from './pages/admin/membership/MembershipManagement';
import InventoryManagement from './pages/admin/InventoryManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import ProductManagement from './pages/admin/products/ProductManagement';
import EditCustomer from './pages/admin/customer/EditCustomer';
import AddProductByAdmin from './pages/admin/products/AddProductByAdmin';
import EditProductDetails from './pages/admin/products/EditProductDetails';
import CouponManagement from './pages/admin/coupon/CouponManagement';

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
      <Products />
    ),
  },
  {
    path: "/product/:id",
    element: (
      <ProductDetailsPage />
    ),
  },
  {
    path: "/cart",
    element: (
      <CartPage />
    ),
  },
  {
    path: "/checkout",
    element: (
      <Checkout />
    ),
  },
  {
    path: "/membership",
    element: (
      <MembershipPage />
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
  {
    path: '/coupon',
    element: <CouponPage></CouponPage>,
  },
  {
    path: '/ordersTracking',
    element: <OrdersTrackingPage></OrdersTrackingPage>,
  },
  {
    path: '/admin',
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    path: '/admin/addProducts',
    element: <ProductForm></ProductForm>,
  },
  {
    path: '/admin/orders',
    element: <AdminOrdersPage></AdminOrdersPage>,
  },
  {
    path: '/admin/userManagement',
    element: <UserManagement></UserManagement>,
  },
  {
    path: '/admin/editCustomer',
    element: <EditCustomer></EditCustomer>,
  },
  {
    path: '/admin/membership',
    element: <MembershipManagement></MembershipManagement>,
  },
  {
    path: '/admin/inventory',
    element: <InventoryManagement></InventoryManagement>,
  },
  {
    path: '/admin/payment',
    element: <PaymentManagement></PaymentManagement>,
  },
  {
    path: '/admin/productManagement',
    element: <ProductManagement></ProductManagement>,
  },
  {
    path: '/admin/addProduct',
    element: <AddProductByAdmin></AddProductByAdmin>,
  },
  {
    path: '/admin/editProductDetails',
    element: <EditProductDetails></EditProductDetails>,
  },
  {
    path: '/admin/coupon',
    element: <CouponManagement></CouponManagement>,
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
