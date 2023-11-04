import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import { useAxios } from '../utils/axios'
import { useCookies } from 'react-cookie'
import { BiSolidCoupon } from 'react-icons/bi'
// import ProductDetails from '../components/product/productDetails'

const CouponPage = () => {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(["token"]);
    const [coupons, setCoupons] = useState([]);
    const [token, setToken] = useState("");

if(coupons){
    console.log(coupons,"dskldsfafjfk")
}
    useEffect(() => {
        if (cookies && cookies.token) {
            console.log(cookies.token, "dslfjadslk")
            setToken(cookies.token);
        }
    }, [cookies]);


    const getCoupons = async (event) => {

        const instance = useAxios(token)
        try {
            const response = await instance.get("/admin/coupons")
            setCoupons(response.data.allCouponList)
            console.log(response.data.allCouponList,"fdsajl")
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        getCoupons();
    }, [token])


    return (
        <div>
            <Navbar />
            <section>
                <div className="max-w-7xl mx-auto px-5 md:px-10 my-4  ">
                    <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Coupon Section</p>
                    <div style={{ border: "2px solid grey" }} className='my-4'>
                        {coupons && coupons.length > 0 ? coupons.map((curElem) => (

                            <div style={{ borderBottom: "1px solid grey" }} className='flex gap-6 justify-between items-center p-5'>
                                <div className='flex basis-[55%%] gap-4 items-center'>
                                    <BiSolidCoupon className='text-6xl text-primary-blue' />
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-xl text-primary-blue font-semibold'>{curElem.name}</p>
                                        <p>Get flat {curElem.discount} off on the products. (price inclusive of cashback/coupon)</p>
                                    </div>
                                </div>
                                <div className='flex basis-[35%] justify-between items-center'>
                                    <div className='flex flex-col gap-2'>
                                        <p>Valid till {new Date(curElem.expiry).toLocaleDateString("en-GB")}</p>
                                        <p className='text-primary-blue'>View T&C</p>
                                    </div>
                                    <button className='bg-primary-blue text-white px-6 py-2 rounded-lg'>View Coupon & Details</button>
                                </div>
                            </div>)) : ""}

                    </div>
                </div>
            </section>
            <Footer />
        </div>

    )
}

export default CouponPage