import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import MediumHouseCard from '../components/features/MediumHomeCard'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import HomeSectionTitle from '../components/features/HomeSectionTittle'
import CardCarousel from '../components/features/CardCarousel'
import { useSelector } from 'react-redux'
import { selectAllProducts, selectProductListStatus } from '../components/product/productSlice'
import { scrollLeft, scrollRight } from './Home'
import { useAxios } from '../utils/axios'
import { FaFileInvoice } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

// import ProductDetails from '../components/product/productDetails'



const OrdersPage = () => {
    const productss = useSelector(selectAllProducts);
    const isPending = useSelector(selectProductListStatus);
    const [loading, setLoading] = useState(false);
    const [myOrders, setMyOrders] = useState([]);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate()

    // Todo-localStorageUsed
    if (!userId) {
        // userId is undefined or null, handle this case accordingly
        console.log("UserId is not available");
    } else {
        const getMyOrders = async () => {
            const instance = useAxios();
            setLoading(true);
            try {
                setLoading(true);
                const res = await instance.get(`/orders/my?id=${userId}`);
                if (res.data) {
                    setLoading(false);
                    setMyOrders(res.data.orders);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        useEffect(() => {
            getMyOrders();
        }, []); // Removed userId from the dependency array since it's not used inside useEffect

        // Rest of your component logic goes here
    }


    // Wanrranty Calculte Function

    function calculateWarrantyEndDate(orderDate) {
        // Create a new Date object from the order date string
        const orderDateObject = new Date(orderDate);

        // Add 1 year to the order date
        const warrantyEndDate = new Date(orderDateObject);
        warrantyEndDate.setFullYear(warrantyEndDate.getFullYear() + 1);

        // Format the warranty end date as a string in the format "DD-MM-YYYY"
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedWarrantyEndDate = warrantyEndDate.toLocaleDateString('en-GB', options);

        return formattedWarrantyEndDate;
    }

    function formatDate(date) {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options);
    }
    const navigateToOrder = (order) => {
        // Use the `navigate` function to navigate to the order details page
        navigate(`/orders/${order._id}`, { state: { order } });
    };
    return (
        <div>
            <Navbar />
            {myOrders && myOrders.length < 1 ? <div className='flex w-screen h-screen items-center justify-center'><CircularProgress /></div> : (<section className="max-w-7xl mx-auto px-5 md:px-10 mt-8">
                <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Orders Section</p>
                <div>
                    {myOrders.map((order, index) => (
                        <div key={index} className='mt-8'>
                            <div className='flex justify-between'>
                                <p className=' text-xl font-bold'>Order #{order._id}</p>
                                <FaFileInvoice onClick={() => navigateToOrder(order)} className='text-2xl cursor-pointer' />
                            </div>
                            <div className='flex justify-between'>
                                <p className='font-semibold mb-3'>Date Added: {formatDate(new Date(order.createdAt))}</p>

                                <p className='font-semibold mb-3'>Warranty till: {calculateWarrantyEndDate(order.createdAt)}</p>


                            </div>
                            {order.orderItems.map((item) => (
                                <div key={item._id} className='flex md:flex-row flex-col p-6 items-center justify-between border-b-2 border-t-2'>
                                    <div className='flex flex-col md:gap-6 gap-2 basis-[20%]'>
                                        <p className='font-bold'>{item.name}</p>
                                        <div className='flex gap-5 items-center'>
                                            {/* <div className='w-[80px] h-[60px]'>
                                                    <img className='w-full h-full object-cover' src="" alt="" />
                                                </div> */}
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:gap-6 md:mt-0 mt-4 basis-[15%]'>
                                        <p className='font-semibold'>Status</p>
                                        <p className='font-semibold text-primary-blue'>{order.status}</p>
                                    </div>
                                    <div className='flex flex-col md:gap-6 md:mt-0 mt-4 md:mr-0 mr-5 basis-[15%]'>
                                        <p className='font-semibold'>Price</p>
                                        <p>{item.price}</p>
                                    </div>
                                    {/* <div className='flex-col gap-6 hidden md:flex basis-[15%]'>
                                        <p className='font-semibold'>View Details</p>
                                        <button className='p-2 rounded-lg bg-primary-blue text-white'>View Details</button>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>)}
            <Footer />
        </div>

    )
}

export default OrdersPage

