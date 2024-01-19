import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { data } from '../test'
import MediumHouseCard from '../components/features/MediumHomeCard'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import HomeSectionTitle from '../components/features/HomeSectionTittle'
import CardCarousel from '../components/features/CardCarousel'
import { useSelector } from 'react-redux'
import { selectAllProducts, selectProductListStatus } from '../components/product/productSlice'
import { scrollLeft, scrollRight } from './Home'
import { selectCurrentUserDetails } from '../components/auth/authSlice'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAxios } from '../utils/axios'
// import ProductDetails from '../components/product/productDetails'

const WishListPage = () => {
    const navigate = useNavigate();
    const productss = useSelector(selectAllProducts);
    const isPending = useSelector(selectProductListStatus);
    const userDetails = useSelector(selectCurrentUserDetails);
    const [cookies, setCookies] = useCookies(["token"]);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false)
    const [wishlistProducts, setWishlistProducts] = useState([]);




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


    const getWishlist = async () => {
        const instance = useAxios(token)
        setLoading(true)
        try {
            setLoading(true)
            const res = await instance.get("/getWishlist")
            if (res.data) {
                setLoading(false)
                setWishlistProducts(res.data.wishlist)
                // setAllProducts(res.data.products)
            }


        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }


    useEffect(() => {
        if (token) {
            getWishlist()
        }
    }, [token])


    return (
        <div>
            <Navbar />
            <section>
                <div className="max-w-7xl mx-auto px-5 md:px-10 my-4 ">
                    <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Wishlist</p>
                    <div>
                    </div>
                    <section className="pt-5 mb-5">
                        {/* <div className="max-w-7xl mx-auto px-5 md:px-10"> */}
                        {/* <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
                        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
                            <div className="w-full flex items-center justify-between">
                                <HomeSectionTitle text="Wishlist Items" />
                                {/* Buttons container */}
                                <div className="flex space-x-4  md:mt-0">
                                    <button
                                        onClick={() => scrollLeft("wishlist")}
                                        className="p-2 m-2 rounded-full bg-white"
                                    >
                                        <FiChevronLeft />
                                    </button>
                                    <button
                                        onClick={() => scrollRight("wishlist")}
                                        className="p-2 m-2 rounded-full bg-white"
                                    >
                                        <FiChevronRight />
                                    </button>
                                </div>
                            </div>

                            <div id="wishlist" className="flex mt-4 overflow-x-scroll space-x-6 overflow-y-hidden hide-scrollbar">
                                {wishlistProducts.length > 0 ? (
                                    <CardCarousel id="wishlist" data={wishlistProducts} Card={MediumHouseCard} />
                                ) : (
                                    <p>No items in the wishlist</p>
                                )}
                            </div>

                        </div>
                    </section>
                    {/* <section className="pt-5 mb-5">
         
                        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
                            <div className="w-full flex items-center justify-between">
                                <HomeSectionTitle text="Top Deals (Today)" />
                                Buttons container
                                <div className="flex space-x-4  md:mt-0">
                                    <button
                                        onClick={() => scrollLeft("top")}
                                        className="p-2 m-2 rounded-full bg-white"
                                    >
                                        <FiChevronLeft />
                                    </button>
                                    <button
                                        onClick={() => scrollRight("top")}
                                        className="p-2 m-2 rounded-full bg-white"
                                    >
                                        <FiChevronRight />
                                    </button>
                                </div>
                            </div>
                            {productss && (
                                <div id="top" className="flex overflow-x-scroll space-x-6 overflow-y-hidden hide-scrollbar">
                                    <CardCarousel id="top" data={productss} Card={MediumHouseCard} />
                                </div>
                            )}
                        </div>
                    </section> */}
                </div>
            </section>
            <Footer />
        </div>

    )
}

export default WishListPage