import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddressPage from './pages/AddressPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import CouponPage from './pages/CouponPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import MembershipPage from './pages/MembershipPage';
import OrdersPage from './pages/OrdersPage';
import OrdersTrackingPage from './pages/OrdersTrackingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Products from './pages/Products';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import WishListPage from './pages/WishListPage';
import InventoryManagement from './pages/admin/inventory/InventoryManagement';
import EditCustomer from './pages/admin/customer/EditCustomer';
import UserManagement from './pages/admin/customer/UserManagement';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import MembershipManagement from './pages/admin/membership/MembershipManagement';
import AdminOrdersPage from './pages/admin/orders/AdminOrdersPage';
import AddProductByAdmin from './pages/admin/products/AddProductByAdmin';
import ProductManagement from './pages/admin/products/ProductManagement';
// import EditProductDetails from './pages/admin/products/EditProductDetails';
// import CouponManagement from './pages/admin/coupon/PartnerCouponManagement';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import { selectCurrentUserDetails, selectLoggedInUser, userLoading } from './components/auth/authSlice';
import NotFound from './pages/NotFount';
import AnalyticsAndReports from './pages/admin/analytics/AnalyticsAndReports';
import CreateCoupon from './pages/admin/coupon/CreateCoupon';
import PartnerCouponManagement from './pages/admin/coupon/PartnerCouponManagement';
import EditMembershipPlans from './pages/admin/membership/EditMembershipPlans';
import EditOrderById from './pages/admin/orders/EditOrderById';
import EditProductById from './pages/admin/products/EditProductById';
import MyAccountPage from './pages/MyAccountPage';
import AdminLogin from './pages/admin/AdminLogin';
import Admin404 from './pages/admin/Admin404';
import ShippingPage from './pages/ShippingPage';
import InvoicePage from './pages/InvoicePage';
import BrandManagement from './pages/admin/inventory/BrandManagement';
import CategoryManagement from './pages/admin/inventory/CategoriesManagement';
import OtpAuthentication from './pages/OtpAuthentication';


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
    path: "/shipping",
    element: (
      <ShippingPage />
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
  // {
  //   path: '/login',
  //   element: <LoginPage></LoginPage>,
  // },
  {
    path: '/otp/login',
    element: <OtpAuthentication></OtpAuthentication>,
  },
  // {
  //   path: '/signup',
  //   element: <SignupPage></SignupPage>,
  // },
  {
    path: '/wishlist',
    element: <WishListPage></WishListPage>,
  },
  {
    path: '/orders',
    element: <OrdersPage></OrdersPage>,
  },
  {
    path: '/orders/:orderId',
    element: <InvoicePage></InvoicePage>,
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
  // {
  //   path: '/admin/addProducts',
  //   element: <ProductForm></ProductForm>,
  // },
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
    path: '/admin/categoryManagement',
    element: <CategoryManagement></CategoryManagement>,
  },
  {
    path: '/admin/brandManagement',
    element: <BrandManagement></BrandManagement>,
  },
  // {
  //   path: '/admin/payment',
  //   element: <PaymentMan,
  // },
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
        <ToastContainer autoClose={300} position="top-left" />
      </div>
    </>
  )
}

export default App



// const App = () => {
//   const user = useSelector(selectCurrentUserDetails);
//   const loading = useSelector(userLoading);

//   if (user) console.log(user, "dsfhdsjhf")
//   // if (loading) console.log(loading, "dsfhdsjhf")
//   const [token, setToken] = useState("");
//   const [cookies, setCookies] = useCookies(["token"]);

//   useEffect(() => {
//     if (cookies && cookies.token) {
//       console.log(cookies.token, "dslfjadslk")
//       setToken(cookies.token);
//     }
//   }, [cookies]);

//   console.log(user, "Dsfjdskfl")
//   return (
//     <Router>
//       {/* Header */}
//       {/* <Header user={user} /> */}
//       {/* <Suspense fallback={<Loader />}> */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/products/:id" element={<ProductDetailsPage />} />
//         <Route path="/cart" element={<CartPage />} />


//         {/* NOt Logged in Route */}
//         <Route path="/login"
//           element={<ProtectedRoute isAuthenticated={user ? false : true}>
//             <LoginPage />
//           </ProtectedRoute>}
//         />
//         <Route path="/signup"
//           element={<ProtectedRoute isAuthenticated={user ? false : true}>
//             <SignupPage />
//           </ProtectedRoute>}
//         />


//         {/* Logged in user Routes */}

//         <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/membership" element={<MembershipPage />} />
//           <Route path="/wishlist" element={<WishListPage />} />
//           <Route path="/orders" element={<OrdersPage />} />
//           <Route path="/myAccount" element={<MyAccountPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/address" element={<AddressPage />} />
//           <Route path="/coupon" element={<CouponPage />} />
//           <Route path="/ordersTracking" element={<OrdersTrackingPage />} />
//         </Route>



//         {/* Admin Routes */}
//         <Route
//           element={
//             <ProtectedRoute isAuthenticated={true}
//               adminOnly={true}
//               admin={user?.role === "admin" ? true : false}
//             />
//           }
//         />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/addProduct" element={<AddProductByAdmin />} />
//         <Route path="/admin/productManagement" element={<ProductManagement />} />
//         <Route path="/admin/editProductDetails/:id" element={<EditProductById />} />
//         <Route path="/admin/orders" element={<AdminOrdersPage />} />
//         <Route path="/admin/order/:id" element={<EditOrderById />} />
//         <Route path="/admin/userManagement" element={<UserManagement />} />
//         <Route path="/admin/editCustomer" element={<EditCustomer />} />
//         <Route path="/admin/membership" element={<MembershipManagement />} />
//         <Route path="/admin/editMembershipPlans" element={<EditMembershipPlans />} />
//         <Route path="/admin/inventory" element={<InventoryManagement />} />
//         <Route path="/admin/partnerCoupon" element={<PartnerCouponManagement />} />
//         <Route path="/admin/createCoupon" element={<CreateCoupon />} />
//         <Route path="/admin/siteSettings" element={<AnalyticsAndReports />} />

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       {/* </Suspense> */}
//       {/* <Toaster position="bottom-center" /> */}
//       <ToastContainer />
//     </Router>
//   )


// }
// export default App
