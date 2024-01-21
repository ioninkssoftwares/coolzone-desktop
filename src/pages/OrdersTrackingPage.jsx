import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useAxios } from '../utils/axios'
import { useCookies } from 'react-cookie'
import { BiSolidCoupon } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import ProductDetails from '../components/product/productDetails'
const steps = [
    'Order',
    'Pick Up ',
    'In Transit',
    'Delivered',
];


const OrdersTrackingPage = () => {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(["token"]);
    const [token, setToken] = useState("");



    useEffect(() => {
        if (cookies && cookies.token) {
            console.log(cookies.token, "dslfjadslk")
            setToken(cookies.token);
        }
    }, [cookies]);




    return (
        <div>
            <Navbar />
            {
                myOrders && myOrders.length < 1 ? <p> Loading...</p> : <section>
                    <div className="max-w-7xl mx-auto px-5 md:px-10 my-4  ">
                        <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Orders Tracking Section</p>

                        <div style={{ border: "2px solid grey" }} className='flex p-8 flex-col justify-center items-center my-8'>
                            <p className='mb-4 text-xl font-semibold'>Check Your Order Status</p>
                            <p>To Track Your Please Enter Your Order Id In The Box Below And Press The "Track" Button</p>
                            <div className="flex justify-center my-12 w-full">
                                <form className='flex' style={{ width: "85%", height: "100%" }}>
                                    <div style={{ width: "100%", height: "100%", borderRadius: "5px" }}>
                                        <input type="text"
                                            placeholder="Enter your order Id"
                                            // value={term}
                                            // onChange={(e) => setTerm(e.target.value)}
                                            className="w-full p-2 pl-8 border rounded-l-lg border-primary-blue  focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div className=' md:w-[20%] md:h-[42px] '>
                                        <button className='w-full h-full flex gap-2 items-center rounded-r-lg  bg-primary-blue '>
                                            <AiOutlineSearch className='md:ml-6 ml-3  mr-5 md:mr-0 text-white' />
                                            <span className='text-white'>Track</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className='w-full flex justify-start my-6 pl-[82px]'>
                                <p className='font-semibold text-xl'>Order ID:0000</p>
                            </div>

                            <div className='flex items-start justify-between mb-6 w-[85%]'>
                                <div className='basis-[30%] flex flex-col'>
                                    <p className='font-semibold'>Date:</p>
                                    <p>11-Nov-2023</p>
                                </div>
                                <div className='basis-[30%] flex flex-col'>
                                    <p className='font-semibold'>Current Location:</p>
                                    <p>Vishakapatnam</p>
                                </div>
                                <div className='basis-[30%] flex flex-col'>
                                    <p className='font-semibold'>Delivery Address:</p>
                                    <p>House No. 21-1-1, Ghansi Bazar, Near Charminar, hyderabad -50002</p>
                                </div>
                            </div>

                            <Box sx={{ width: '100%', marginTop: "60px" }}>
                                <Stepper activeStep={1} alternativeLabel>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </div>
                    </div>
                </section>
            }

            <Footer />
        </div>

    )
}

export default OrdersTrackingPage