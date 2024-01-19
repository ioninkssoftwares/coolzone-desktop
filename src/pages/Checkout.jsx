import React from 'react';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../components/auth/authSlice';
import { useNewOrderMutation } from '../redux/api/orderApi';
import { toast } from 'react-toastify';
import { resetCart } from '../redux/reducer/cartReducer';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    const userId = localStorage.getItem("userId");

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
                    <button onClick={orderHandler} className='ml-[560px] bg-primary-blue cursor-pointer text-white rounded-lg p-4 hover:bg-blue-500 text-2xl mt-64 font-semibold'>Pay</button>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Checkout