import React from 'react'
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
// import ProductDetails from '../components/product/productDetails'

const WishListPage = () => {
    const productss = useSelector(selectAllProducts);
    const isPending = useSelector(selectProductListStatus);
    return (
        <div>
            <Navbar />
            <section>
                <div className="max-w-7xl mx-auto px-5 md:px-10 ">
                    <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Wishlist</p>
                    <div>
                    </div>
                    <section className="pt-5 mb-5">
                        {/* <div className="max-w-7xl mx-auto px-5 md:px-10"> */}
                        {/* <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
                        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
                            <div className="w-full flex items-center justify-between">
                                <HomeSectionTitle text="Top Deals (Today)" />
                                {/* Buttons container */}
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
                    </section>
                </div>
            </section>
            <Footer />
        </div>

    )
}

export default WishListPage