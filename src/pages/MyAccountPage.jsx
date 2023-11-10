import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import MediumHouseCard from '../components/features/MediumHomeCard'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import HomeSectionTitle from '../components/features/HomeSectionTittle'
import CardCarousel from '../components/features/CardCarousel'
import { useSelector } from 'react-redux'
import { selectAllProducts, selectProductListStatus } from '../components/product/productSlice'
import { scrollLeft, scrollRight } from './Home'
import { BiSolidCoupon, BiSolidUser } from 'react-icons/bi';
import { AiOutlineOrderedList } from 'react-icons/ai'
import { MdArtTrack } from 'react-icons/md'
import { FaAddressBook } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
// import ProductDetails from '../components/product/productDetails'

const MyAccountPage = () => {
    const navigate = useNavigate();
    const productss = useSelector(selectAllProducts);
    const isPending = useSelector(selectProductListStatus);
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto px-5 md:px-10 my-4 ">
                <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit '>My Account</p>
                <div className='flex flex-wrap md:flex-row flex-col gap-12 my-6'>
                    <div onClick={() => navigate("/profile")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer  flex rounded-lg p-4 gap-6 '>
                        <BiSolidUser className='mt-4 text-2xl' />
                        <div className='flex flex-col gap-2 '>
                            <p className = 'text-lg font-semibold'>My Profile</p>
                            <p>Edit your basic profile</p>
                        </div>
                    </div>
                    <div onClick={() => navigate("/orders")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                        <AiOutlineOrderedList className='mt-4 text-2xl' />
                        <div className='flex flex-col gap-2 '>
                            <p className = 'text-lg font-semibold'>My Orders</p>
                            <p>View, cancel orders and buy again</p>
                        </div>
                    </div>
                    <div onClick={() => navigate("/ordersTracking")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                        <MdArtTrack className='mt-4 text-2xl' />
                        <div className='flex flex-col gap-2 '>
                            <p className = 'text-lg font-semibold'>Order Tracking</p>
                            <p>Track your order status</p>
                        </div>
                    </div>
                    <div onClick={() => navigate("/address")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                        <FaAddressBook className='mt-4 text-2xl' />
                        <div className='flex flex-col gap-2 '>
                            <p className = 'text-lg font-semibold'>My Address</p>
                            <p>Manage your saved address</p>
                        </div>
                    </div>
                    <div onClick={() => navigate("/coupon")}  style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                        <BiSolidCoupon className='mt-4 text-2xl' />
                        <div className='flex flex-col gap-2 '>
                            <p className = 'text-lg font-semibold'>My Coupon</p>
                            <p>Manage your discount coupon </p>
                        </div>
                    </div>
                    <div onClick={() => navigate("/coupon")}  style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                        <BiSolidCoupon className='mt-4 text-2xl' />
                        <div className='flex flex-col gap-2 '>
                            <p className = 'text-lg font-semibold'>My Coupon</p>
                            <p>Manage your discount coupon </p>
                        </div>
                    </div>
                    <div onClick={() => navigate("/membership")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                        <BiSolidCoupon className='mt-4 text-2xl' />
                        <div className='flex flex-col gap-2 '>
                            <p className = 'text-lg font-semibold'>Membership</p>
                            <p>Manage your Membership </p>
                        </div>
                    </div>
                    <div style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                        <BiSolidUser className='mt-4 text-2xl text-red-500' />
                       <p className='mt-3 text-lg font-semibold text-red-500 '>Logout</p>
                    </div>

                </div>
            </div>
            <Footer />
            gap-2    </div>

    )
}

export default MyAccountPage