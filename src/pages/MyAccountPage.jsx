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
import { BiSolidCoupon, BiSolidUser } from 'react-icons/bi';
import { AiOutlineOrderedList } from 'react-icons/ai'
import { MdArtTrack } from 'react-icons/md'
import { FaAddressBook } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import ReferralModal from '../components/admin/modals/ReferralModal'
import { useAxios } from '../utils/axios'
import { CircularProgress } from '@mui/material'

// import ProductDetails from '../components/product/productDetails'

const MyAccountPage = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [cookies, setCookies, removeCookies] = useCookies(["token"]);
    const productss = useSelector(selectAllProducts);
    const isPending = useSelector(selectProductListStatus);
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const instance = useAxios(token)

    if (userDetails) console.log(userDetails, "lhkjhkj")

    const [backgroundColor, setBackgroundColor] = useState('');

    useEffect(() => {
        const colors = ['#ff5733', '#33ff57', '#5733ff', '#ff33f9', '#f9ff33', '#ff5733', // Dark orange
            '#33ff57', // Dark green
            '#5733ff', // Dark purple
            '#ff33f9', // Dark pink
            '#f9ff33', // Dark yellow
            '#1a1a1a', // Dark gray
            '#222222', // Charcoal
            '#3d3d3d', // Dark gray
            '#4c4c4c', // Dark gray
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
    }, []);



    useEffect(() => {
        if (cookies.token === undefined) {
            toast.error("Please Login")
            navigate('/login')
        }
    }, [])


    useEffect(() => {
        if (cookies && cookies.token) {
            console.log(cookies.token, "dslfjadslk")
            setToken(cookies.token);
        }
    }, [cookies]);


    const getUserDetails = async () => {
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


    const handleLogout = () => {
        toast("Logout Successfully")
        // Remove cookies
        removeCookies('token');
        // Clear localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        navigate("/")
        // Add any other cleanup code here
    };



    return (
        <div>
            <Navbar />
            <div className=" mx-auto px-5 md:px-10 my-4 ">
                <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit '>My Account</p>
                {loading ? <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", margin: "100px 0" }}><CircularProgress /> </div> : <div className='flex flex-col md:flex-row gap-10'>
                    <div className='shadow-lg w-fit flex items-center justify-center flex-col py-4 px-20'>
                        <div style={{ backgroundColor }} className='w-24 h-24 rounded-full flex items-center justify-center'>
                            <span className='text-white text-4xl '>G</span>
                        </div>
                        <p className='text-xl font-bold mt-2'>Hi, Guest</p>
                        <p className='text-xl text-gray-500 mt-2'>{userDetails?.email}</p>
                        <p className='text-md font-semibold text-[#18957c] mt-2 '>Available Points:{userDetails?.referralCount}</p>
                    </div>
                    <div className='flex flex-wrap  md:flex-row flex-col gap-12 my-6'>
                        <div onClick={() => navigate("/profile")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer  flex rounded-lg p-4 gap-6 '>
                            <BiSolidUser className='mt-4 text-2xl' />
                            <div className='flex flex-col gap-2 '>
                                <p className='text-lg font-semibold'>My Profile</p>
                                <p>Edit your basic profile</p>
                            </div>
                        </div>
                        <div onClick={() => navigate("/orders")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                            <AiOutlineOrderedList className='mt-4 text-2xl' />
                            <div className='flex flex-col gap-2 '>
                                <p className='text-lg font-semibold'>My Orders</p>
                                <p>View, cancel orders and buy again</p>
                            </div>
                        </div>
                        {/* <div onClick={() => navigate("/ordersTracking")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                        <MdArtTrack className='mt-4 text-2xl' />
                        <div className='flex flex-col gap-2 '>
                            <p className='text-lg font-semibold'>Order Tracking</p>
                            <p>Track your order status</p>
                        </div>
                    </div> */}
                        <div onClick={() => navigate("/address")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                            <FaAddressBook className='mt-4 text-2xl' />
                            <div className='flex flex-col gap-2 '>
                                <p className='text-lg font-semibold'>My Address</p>
                                <p>Manage your saved address</p>
                            </div>
                        </div>
                        {/* <div onClick={() => navigate("/coupon")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                        <BiSolidCoupon className='mt-4 text-2xl' />
                        <div className='flex flex-col gap-2 '>
                            <p className='text-lg font-semibold'>My Coupon</p>
                            <p>Manage your discount coupon </p>
                        </div>
                    </div> */}
                        <div onClick={() => navigate("/coupon")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                            <BiSolidCoupon className='mt-4 text-2xl' />
                            <div className='flex flex-col gap-2 '>
                                <p className='text-lg font-semibold'>My Coupon</p>
                                <p>Manage your discount coupon </p>
                            </div>
                        </div>
                        <div onClick={() => navigate("/membership")} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                            <BiSolidCoupon className='mt-4 text-2xl' />
                            <div className='flex flex-col gap-2 '>
                                <p className='text-lg font-semibold'>Membership</p>
                                <p>Manage your Membership </p>
                            </div>
                        </div>
                        <div style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                            <BiSolidCoupon className='mt-4 text-2xl' />
                            {/* <div className='flex flex-col gap-2 '>
                            <p className='text-lg font-semibold'>Refer and Earn</p>
                            <p>Manage your Referrals </p>
                        </div> */}
                            <ReferralModal
                                buttonText="Referral Section"
                                modalTitle="Share and Earn"
                                userDetails={userDetails}
                            />
                        </div>
                        <div onClick={handleLogout} style={{ border: "2px solid grey" }} className='basis-[30%] hover:scale-105 cursor-pointer flex rounded-lg p-4 gap-6 '>
                            <BiSolidUser className='mt-4 text-2xl text-red-500' />
                            <p className='mt-3 text-lg font-semibold text-red-500 '>Logout</p>
                        </div>



                    </div>
                </div>
                }
            </div>
            <Footer />
            gap-2    </div>

    )
}

export default MyAccountPage