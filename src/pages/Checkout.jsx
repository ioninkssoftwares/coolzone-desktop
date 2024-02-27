import React, { useState } from 'react';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../components/auth/authSlice';
import { useNewOrderMutation } from '../redux/api/orderApi';
import { toast } from 'react-toastify';
import { resetCart } from '../redux/reducer/cartReducer';
import { CircularProgress } from '@mui/material';

// Todo-localStorageUsed
const userId = localStorage.getItem("userId");


const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useSelector(selectLoggedInUser);

    if (userId) console.log(userId, "dsjhfafsk")

    if (!userId) {
        // userId is undefined or null, handle this case accordingly
        toast.error("User id is not available");
        navigate("/")
    }


    const {
        shippingInfo,
        cartItems,
        subtotal,
        tax,
        discount,
        shippingCharges,
        total,
    } = useSelector((state) => state.cartReducer);


    const [newOrder] = useNewOrderMutation()

    const orderHandler = async () => {
        setLoading(true)


        // Check if all required fields are present
        // if (!shippingInfo || !cartItems ) {
        //     setLoading(false);
        //     toast.error("Some required fields are missing");
        //     return;
        // }

        if (cartItems.length === 0 && Object.values(shippingInfo).some(value => value === '')) {
            setLoading(false);
            toast.error("Don't refresh while doing checkout; fields are missing.");
            navigate("/")
            return;
        }


        const orderData = {
            shippingInfo,
            orderItems: cartItems,
            subtotal,
            tax,
            discount,
            shippingCharges,
            total,
            user: userId,
        };
        const res = await newOrder(orderData)
        setLoading(false)
        toast.success("Order Placed Successfully")
        dispatch(resetCart())
        navigate("/")
    }




    return (
        <div>
            <Navbar />
            <section className="pt-5 mb-5">
                <div className="max-w-7xl mx-auto px-5 md:px-10 mt-10">
                    <h1 className='text-center text-2xl font-semibold'>Payment Page</h1>
                    {loading ? <CircularProgress className='ml-[560px]' /> : <button onClick={orderHandler} className='md:ml-[560px] ml-[135px] bg-primary-blue cursor-pointer text-white rounded-lg p-4 hover:bg-blue-500 text-2xl mt-64 font-semibold'>Pay</button>}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Checkout