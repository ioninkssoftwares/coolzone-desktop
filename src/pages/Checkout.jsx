import React, { useState } from "react";
import {
  CardElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../components/auth/authSlice";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { toast } from "react-toastify";
import { resetCart } from "../redux/reducer/cartReducer";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAxios } from "../utils/axios";

// Todo-localStorageUsed
const userId = localStorage.getItem("userId");

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [cookies, setCookies] = useCookies(["token"]);
  const [token, setToken] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const user = useSelector(selectLoggedInUser);

  const instance = useAxios(token);

  console.log(stripe, "stripe");

  useEffect(() => {
    if (cookies && cookies.token) {
      console.log(cookies.token, "dslfjadslk");
      setToken(cookies.token);
    }
  }, [cookies]);

  //   useEffect(() => {
  //     if (!userId) {
  //       // userId is undefined or null, handle this case accordingly
  //       toast.error("User id is not available");
  //       navigate("/");
  //     }
  //   }, [userId]);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/me");
      if (res.data) {
        setUserDetails(res.data.user);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [token]);

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
    referral,
  } = useSelector((state) => state.cartReducer);

  if (shippingInfo) console.log(shippingInfo, "fksdjkldskl");

  const [newOrder] = useNewOrderMutation();

  //   const orderHandler = async (e) => {
  //     e.preventDefault();

  //     if (!stripe || !elements) return;
  //     setIsProcessing(true);

  //     try {
  //       setLoading(true);

  //       if (
  //         cartItems.length === 0 &&
  //         Object.values(shippingInfo).some((value) => value === "")
  //       ) {
  //         setLoading(false);
  //         toast.error("Don't refresh while doing checkout; fields are missing.");
  //         navigate("/");
  //         return;
  //       }

  //       const orderData = {
  //         shippingInfo,
  //         orderItems: cartItems,
  //         subtotal,
  //         discount,
  //         shippingCharges,
  //         total,
  //         user: userId,
  //         referral,
  //       };

  //       const { paymentIntent, error } = await stripe.confirmPayment({
  //         elements,
  //         confirmParams: {
  //           return_url: window.location.origin,
  //         },
  //         redirect: "if_required",
  //       });

  //       if (error) {
  //         setIsProcessing(false);
  //         return toast.error(error.message || "Something Went Wrong");
  //       }

  //       if (paymentIntent.status === "succeeded") {
  //         const res = await newOrder(orderData);
  //         dispatch(resetCart());
  //         toast.success("Order Placed Successfully");
  //         navigate("/");
  //       }

  //       setIsProcessing(false);

  //       //   dispatch(resetCart());
  //       //   navigate("/");
  //     } catch (error) {
  //       console.error("Error creating order:", error);
  //       toast.error("An error occurred while placing the order.");
  //       //   navigate("/");
  //     } finally {
  //       setLoading(false);
  //       setIsProcessing(false);
  //     }
  //   };

  const orderHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return; // Ensure Stripe and elements are loaded
    setIsProcessing(true);

    try {
      setLoading(true);

      // Validate fields and cart items
      if (
        cartItems.length === 0 ||
        Object.values(shippingInfo).some((value) => value === "")
      ) {
        setLoading(false);
        toast.error("Don't refresh while doing checkout; fields are missing.");
        navigate("/");
        return;
      }
      // Prepare order data
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        subtotal,
        discount,
        shippingCharges,
        total,
        user: userDetails?._id,
        referral,
      };
      console.log(orderData, "here");

      // Confirm payment using Stripe
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin, // Or your success URL
        },
        redirect: "if_required", // Optional, can be 'always' or 'if_required'
      });
      console.log("there");
      // Handle errors
      if (error) {
        setIsProcessing(false);
        console.log("Payment error:", error);
        return toast.error(error.message || "Something Went Wrong");
      }

      // Check if payment was successful
      if (paymentIntent.status === "succeeded") {
        const res = await newOrder(orderData);
        dispatch(resetCart());
        toast.success("Order Placed Successfully");
        navigate("/");
      }

      setIsProcessing(false);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("An error occurred while placing the order.");
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[300px] w-full mx-auto">
        <form
          onSubmit={orderHandler}
          className="flex flex-col items-start w-full gap-8"
        >
          <PaymentElement />

          <button
            type="submit"
            className={`w-full py-3 px-6 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();

  const clientSecret = location.state;
  if (clientSecret) console.log(clientSecret, "clientSecret");

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements
      options={{
        clientSecret: clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
};
export default Checkout;
