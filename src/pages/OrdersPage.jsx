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
// import ProductDetails from '../components/product/productDetails'

const OrdersPage = () => {
    const productss = useSelector(selectAllProducts);
    const isPending = useSelector(selectProductListStatus);
    return (
        <div>
            <Navbar />
            <section>
                <div className="max-w-7xl mx-auto px-5 md:px-10 ">
                    <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Orders Section</p>
                    <div>
                    </div>
                    {/* <section className="pt-5 mb-5">
                        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
                            <div className="w-full flex items-center justify-between">
                                <HomeSectionTitle text="Top Deals (Today)" />
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
                    <section>
 
                        <div className='mt-3'>
                            <p className='font-semibold  '>Order #00000</p>
                            <p className='font-semibold mb-3 '>Date Added: 06 Nov 2023</p>
                            <div className='flex md:flex-row flex-col p-6 items-center justify-between border-b-2 border-t-2 '>
                                <div className='flex flex-col md:gap-6 gap-2 basis-[20%]'>
                                    <p className='font-semibold '>Samsung Refrigeration</p>
                                    <div className='flex gap-5 items-center '>
                                        <div className='w-[80px] h-[60px]'>
                                            <img className='w-full h-full object-cover' src="https://cdn.pixabay.com/photo/2021/09/08/07/20/air-conditioner-6605973_1280.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div    className='flex flex-col md:gap-6 md:mt-0 mt-4 basis-[15%]'>
                                    <p className='font-semibold'>Status</p>
                                    <p>Processing</p>
                                </div>
                                <div  className='flex flex-col md:gap-6 md:mt-0 mt-4 md:mr-0 mr-5 basis-[15%]'>
                                    <p className='font-semibold'>Price</p>
                                    <p>95,000</p>
                                </div>
                                <div className=' flex-col gap-6 hidden md:flex basis-[15%]'>
                                    <p className='font-semibold'>View Details</p>
                                    <button className='p-2 rounded-lg bg-primary-blue text-white'>View Details</button>
                                </div>
                            </div>
                        </div>
 
                        <div className='mt-3'>
                            <p className='font-semibold  '>Order #00000</p>
                            <p className='font-semibold mb-3 '>Date Added: 06 Nov 2023</p>
                            <div className='flex md:flex-row flex-col p-6 items-center justify-between border-b-2 border-t-2 '>
                                <div className='flex flex-col md:gap-6 gap-2 basis-[20%]'>
                                    <p className='font-semibold '>AC</p>
                                    <div className='flex gap-5 items-center '>
                                        <div className='w-[80px] h-[60px]'>
                                            <img className='w-full h-full object-cover' src="https://cdn.pixabay.com/photo/2021/09/08/07/20/air-conditioner-6605973_1280.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div  className='flex flex-col md:gap-6 md:mt-0 mt-4 basis-[15%]'>
                                    <p className='font-semibold'>Status</p>
                                    <p>Hold</p>
                                </div>
                                <div  className='flex flex-col md:gap-6 md:mt-0 mt-4 md:mr-0 mr-5 basis-[15%]'>
                                    <p className='font-semibold'>Price</p>
                                    <p>55,000</p>
                                </div>
                                <div className=' flex-col gap-6 hidden md:flex basis-[15%]'>
                                    <p className='font-semibold'>View Details</p>
                                    <button className='p-2 rounded-lg bg-primary-blue text-white'>View Details</button>
                                </div>
                            </div>
                        </div>
 
                        <div className='mt-3'>
                            <p className='font-semibold  '>Order #00000</p>
                            <p className='font-semibold mb-3 '>Date Added: 06 Nov 2023</p>
                            <div className='flex md:flex-row flex-col p-6 items-center justify-between border-b-2 border-t-2 '>
                                <div className='flex flex-col md:gap-6 gap-2 basis-[20%]'>
                                    <p className='font-semibold '>Washing Machine</p>
                                    <div className='flex gap-5 items-center '>
                                        <div className='w-[80px] h-[60px]'>
                                            <img className='w-full h-full object-cover' src="https://cdn.pixabay.com/photo/2021/09/08/07/20/air-conditioner-6605973_1280.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div   className='flex flex-col md:gap-6 md:mt-0 mt-4 basis-[15%]'>
                                    <p className='font-semibold'>Status</p>
                                    <p>Delivered</p>
                                </div>
                                <div  className='flex flex-col md:gap-6 md:mt-0 mt-4 md:mr-0 mr-5 basis-[15%]'>
                                    <p className='font-semibold'>Price</p>
                                    <p>75,000</p>
                                </div>
                                <div className=' flex-col gap-6 hidden md:flex basis-[15%]'>
                                    <p className='font-semibold'>View Details</p>
                                    <button className='p-2 rounded-lg bg-primary-blue text-white'>View Details</button>
                                </div>
                            </div>
                        </div>
       
                    </section>
                </div>
            </section>
            <Footer />
        </div>

    )
}

export default OrdersPage