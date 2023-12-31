import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
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
import PaymentManagement from './pages/admin/payment/PaymentManagement';
import ProductManagement from './pages/admin/products/ProductManagement';
import EditCustomer from './pages/admin/customer/EditCustomer';
import AddProductByAdmin from './pages/admin/products/AddProductByAdmin';
// import EditProductDetails from './pages/admin/products/EditProductDetails';
// import CouponManagement from './pages/admin/coupon/PartnerCouponManagement';
import AdminLogin from './pages/admin/AdminLogin';
import EditProductById from './pages/admin/products/EditProductById';
import EditMembershipPlans from './pages/admin/membership/EditMembershipPlans';
import AnalyticsAndReports from './pages/admin/analytics/AnalyticsAndReports';
import PartnerCouponManagement from './pages/admin/coupon/PartnerCouponManagement';
import CreateCoupon from './pages/admin/coupon/CreateCoupon';
import Admin404 from './pages/admin/Admin404';
import EditOrderById from './pages/admin/orders/EditOrderById';

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
    path: '/admin/login',
    element: <AdminLogin></AdminLogin>,
  },
  {
    path: '/admin',
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    path: "/admin/*",
    element: (
      // Nested Routes for "/admin/*"
      <Routes>
        {/* Add specific admin routes here */}
        {/* If no admin routes match, show the NotFound component */}
        <Route path="*" element={<Admin404 tittle={"Go to Admin Dashboard"} source={"/admin"} />} />
      </Routes>
    ),
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
    path: '/admin/order/:id',
    element: <EditOrderById></EditOrderById>,
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
    path: '/admin/editMembershipPlans',
    element: <EditMembershipPlans></EditMembershipPlans>,
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
    path: '/admin/editProductDetails/:id',
    element: <EditProductById></EditProductById>,
  },
  {
    path: '/admin/partnerCoupon',
    element: <PartnerCouponManagement></PartnerCouponManagement>,
  },
  {
    path: '/admin/createCoupon',
    element: <CreateCoupon></CreateCoupon>,
  },
  {
    path: '/admin/siteSettings',
    element: <AnalyticsAndReports></AnalyticsAndReports>,
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
