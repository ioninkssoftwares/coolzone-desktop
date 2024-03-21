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
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'

// import ProductDetails from '../components/product/productDetails'



const OrdersPage = () => {
    const productss = useSelector(selectAllProducts);
    const isPending = useSelector(selectProductListStatus);
    const [loading, setLoading] = useState(false);
    const [myOrders, setMyOrders] = useState([]);
    const [token, setToken] = useState("");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate()
    const [cookies, setCookies] = useCookies(["token"]);
    const [userDetails, setUserDetails] = useState({});




    useEffect(() => {
        if (cookies.token === undefined) {
            toast.error("Please Login")
            navigate('/otp/login')
        }
    }, [])


    useEffect(() => {
        if (cookies && cookies.token) {
            console.log(cookies.token, "dslfjadslk")
            setToken(cookies.token);
        }
    }, [cookies]);




    const getUserDetails = async () => {
        const instance = useAxios(token)
        try {
            setLoading(true)
            const res = await instance.get("/me")
            if (res.data) {
                setUserDetails(res.data.user)
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [token])

    if (userDetails) console.log(userDetails._id, "dfhdsjhfjkdshkjfsdkdsfhkjdfsk")

    const getMyOrders = async () => {
        const instance = useAxios(token)
        setLoading(true);
        try {
            setLoading(true);
            const res = await instance.get(`/orders/my?id=${userDetails._id}`);
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
    }, [userDetails]);




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
            <section className="max-w-7xl mx-auto px-5 md:px-10 mt-8">
                <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Orders Section</p>
                <div>
                    {myOrders && myOrders.length < 1 ? <div className=" w-screen h-screen flex items-center justify-center bg-white  ">
                        <CircularProgress />
                    </div> : myOrders.map((order, index) => (
                        <div key={index} className='mt-8'>
                            <div className='flex justify-between'>
                                <p className=' text-xl font-bold'>Order #{order._id}</p>

                                <Tooltip title="Download Invoice">
                                    <IconButton>
                                        <FaFileInvoice onClick={() => navigateToOrder(order)} className='text-2xl cursor-pointer' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className='flex justify-between'>
                                <p className='font-semibold mb-3'>Date of Purchase: {formatDate(new Date(order.createdAt))}</p>

                                {/* <p className='font-semibold mb-3'>{`Warranty: ${order.warrantyPeriod} from the date of purchase `}</p> */}
                                {/* <p className='font-semibold mb-3'>Warranty till: {calculateWarrantyEndDate(order.createdAt)}</p> */}


                            </div>
                            {order.orderItems.map((item) => (
                                <div key={item._id} className='flex md:flex-row flex-col p-6 items-center justify-between border-b-2 border-t-2'>
                                    <div className='flex flex-col md:gap-6 gap-2 basis-[20%]'>
                                        <p className='font-bold'>{item.name}</p>


                                        <div className='flex gap-5 items-center'>
                                            <div className='w-[80px] h-[60px]'>
                                                <img className='w-full h-full object-contain' src={item.photo} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:gap-6 md:mt-0 mt-4 basis-[15%]'>
                                        <p className='font-semibold'>Warranty</p>
                                        <p className='font-semibold mb-3'>{`Warranty: ${item.warrantyPeriod} from the date of purchase `}</p>
                                    </div>
                                    <div className='flex flex-col md:gap-6 md:mt-0 mt-4 basis-[15%]'>
                                        <p className='font-semibold'>Status</p>
                                        <p className='font-semibold text-primary-blue'>{order.status}</p>
                                    </div>
                                    <div className='flex flex-col md:gap-6 md:mt-0 mt-4 md:mr-0 mr-5 basis-[15%]'>
                                        <p className='font-semibold'>Price</p>
                                        <p>{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>

    )
}

export default OrdersPage

