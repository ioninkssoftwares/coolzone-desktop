import React from 'react'
import Navbar from '../components/navbar/Navbar'
import CorouselSlider from '../components/features/CorouselSlider';
import { BsTicketPerforatedFill, BsBagFill } from 'react-icons/bs';
import { MdOutlineSecurity } from 'react-icons/md';
import { AiOutlineTags, AiOutlineArrowRight } from 'react-icons/ai';
import { SiAdguard } from 'react-icons/si';
import { TbTruckDelivery } from 'react-icons/tb';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import HomeSectionTitle from '../components/features/HomeSectionTittle';
import { data } from '../test';
import MediumHouseCard from '../components/features/MediumHomeCard';
import CardCarousel from '../components/features/CardCarousel';
import CategoryCard from '../components/features/CategoryCard';

export const scrollLeft = (id) => {
  const ele = document.getElementById(id);
  if (ele) {
    ele.scrollLeft -= 1010;
  }
};
export const scrollRight = (id) => {
  const ele = document.getElementById(id);
  if (ele) {
    ele.scrollLeft += 1010;
  }
};

const Home = () => {


  const productSamples = [
    { name: 'Smartphones', imageSrc: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg' },
    { name: 'TV & Audio', imageSrc: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/tv-310801_1280.png' },
    { name: 'Laptops & PCs', imageSrc: 'https://i.dummyjson.com/data/products/6/thumbnail.png' },
    { name: 'Gadgets', imageSrc: 'https://i.dummyjson.com/data/products/27/thumbnail.webp' },
    { name: 'Photo & Video', imageSrc: 'https://cdn.pixabay.com/photo/2015/08/02/10/29/camera-871052_1280.png' },
    { name: 'Gifts', imageSrc: 'https://cdn.pixabay.com/photo/2013/07/12/15/40/present-150291_1280.png' },
    { name: 'Books', imageSrc: 'https://cdn.pixabay.com/photo/2017/01/31/00/09/books-2022464_1280.png' },
    { name: 'Toys', imageSrc: 'https://cdn.pixabay.com/photo/2012/04/13/21/32/rocking-horse-33719_1280.png' },
  ];


  return <>
    <Navbar />
    <div className='hide-scrollbar overflow-y-hidden'>
      <section>
        <CorouselSlider />
      </section>
      <section className='flex items-center justify-center my-5'>
        <div style={{ border: "2px solid gray" }} className='rounded-lg flex items-center justify-center w-[79%] p-5'>
          {/* <div style={{ border: "2px solid gray" }} className="max-w-7xl mx-auto p-5 md:px-10 rounded-lg flex items-center justify-center "> */}
          <div style={{ borderRight: "2px solid black" }} className='w-fit flex items-center justify-center gap-3 px-14 py-3'>
            <div className='w-[25px] h-[25px] mt-2'>
              <SiAdguard className='w-full h-full text-blue-950 ' />
            </div>
            <div>
              <p className='font-bold'>Guarantee</p>
              <p className='text-xs'>24 Months</p>
            </div>
          </div>
          <div style={{ borderRight: "2px solid black" }} className='w-fit flex items-center justify-center gap-3 px-14 py-3'>
            <div className='w-[25px] h-[25px] mt-2'>
              <BsTicketPerforatedFill className='w-full h-full text-orange-400' />
            </div>
            <div>
              <p className='font-bold'>Rate Paying</p>
              <p className='text-xs'>4-12 Months</p>
            </div>
          </div>
          <div style={{ borderRight: "2px solid black" }} className='w-fit flex items-center justify-center gap-3 px-14 py-3'>
            <div className='w-[25px] h-[25px] mt-2'>
              <MdOutlineSecurity className='w-full h-full text-primary-blue' />
            </div>
            <div>
              <p className='font-bold'>Payments</p>
              <p className='text-xs'>Secured</p>
            </div>
          </div>
          <div style={{ borderRight: "2px solid black" }} className='w-fit flex items-center justify-center gap-3 px-14 py-3'>
            <div className='w-[25px] h-[25px] mt-2'>
              <TbTruckDelivery className='w-full h-full text-green-500' />
            </div>
            <div>
              <p className='font-bold'>Free Delivery</p>
              <p className='text-xs'>from $449</p>
            </div>
          </div>
          <div className='w-fit flex items-center justify-center gap-3 px-14 py-3'>
            <div className='w-[25px] h-[25px] mt-2'>
              <AiOutlineTags className='w-full h-full text-red-500' />
            </div>
            <div>
              <p className='font-bold'>Brands</p>
              <p className='text-xs'>Only Top</p>
            </div>
          </div>

        </div>
      </section>
      {/* Featured Products section */}
      <section className="pt-5 mb-5">
        {/* <div className="max-w-7xl mx-auto px-5 md:px-10"> */}
        {/* <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="Featured Products" />
            {/* Buttons container */}
            <div className="flex space-x-4  md:mt-0">
              <button
                onClick={() => scrollLeft("feat")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("feat")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          {data && (
            <div id="feat" className="flex overflow-x-scroll space-x-6 overflow-y-hidden hide-scrollbar">
              <CardCarousel id="feat" data={data} Card={MediumHouseCard} />
            </div>
          )}
        </div>
      </section>
      {/* Categories Section */}
      <section className='bg-gray-100 mb-5'>
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-8 ">
          <HomeSectionTitle text="Categories" />
          <div className='flex items-start justify-between flex-wrap mt-7 gap-8'>
            {productSamples?.map((curElem) => (<CategoryCard categoryData={curElem} />))}
          </div>
        </div>
      </section>
      {/* Offers Section */}
      <section className=' mb-5'>
        <div  className="max-w-7xl mx-auto px-5 md:px-10 py-8 flex gap-8 ">
          <div style={{ width: "275px", height: "330px" }} className=' rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 font-semibold flex flex-col items-center p-4 '>       
            <div className='flex flex-col items-center'>
            <span className='text-2xl font-bold text-white'>CZ Offers on </span>
            <span className='text-2xl font-bold text-white'>Audio Devices</span>
            <span className=' text-white'>Start @ ₹299.00 </span>
              </div>
            <div className="relative my-4 w-[180px] h-[150px]">
              <img
                src="https://cdn.pixabay.com/photo/2017/11/06/11/53/music-2923447_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "275px", height: "330px" }} className=' rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 font-semibold flex flex-col items-center p-4 '>       
            <div className='flex flex-col items-center'>
            <span className='text-2xl font-bold text-white'>CZ Offers on </span>
            <span className='text-2xl font-bold text-white'>Students Laptop</span>
            <span className=' text-white'>Start @ ₹299.00 </span>
              </div>
            <div className="relative my-4 w-[180px] h-[150px]">
              <img
                src="https://cdn.pixabay.com/photo/2012/04/13/20/24/laptop-33521_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "275px", height: "330px" }} className=' rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 font-semibold flex flex-col items-center p-4 '>       
            <div className='flex flex-col items-center'>
            <span className='text-2xl font-bold text-white'>CZ Offers on </span>
            <span className='text-2xl font-bold text-white'>Smart Watch</span>
            <span className=' text-white'>Start @ ₹299.00 </span>
              </div>
            <div className="relative my-4 w-[180px] h-[150px]">
              <img
                src="https://cdn.pixabay.com/photo/2018/09/13/14/56/apple-watch-series-4-3674940_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "275px", height: "330px" }} className=' rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 font-semibold flex flex-col items-center p-4 '>       
            <div className='flex flex-col items-center'>
            <span className='text-2xl font-bold text-white'>CZ Offers on </span>
            <span className='text-2xl font-bold text-white'>Accesories</span>
            <span className=' text-white'>Start @ ₹299.00 </span>
              </div>
            <div className="relative my-4 w-[180px] h-[150px]">
              <img
                src="https://cdn.pixabay.com/photo/2013/07/12/19/25/usb-cable-154767_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Best Sellers section */}
      <section className="pt-5 mb-5">
        {/* <div className="max-w-7xl mx-auto px-5 md:px-10"> */}
        {/* <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="Best Sellers" />
            {/* Buttons container */}
            <div className="flex space-x-4  md:mt-0">
              <button
                onClick={() => scrollLeft("feat")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("feat")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          {data && (
            <div id="feat" className="flex overflow-x-scroll space-x-6 overflow-y-hidden hide-scrollbar">
              <CardCarousel id="feat" data={data} Card={MediumHouseCard} />
            </div>
          )}
        </div>
      </section>
      {/* Big Deals section */}
      <section className="pt-5 mb-5">
        {/* <div className="max-w-7xl mx-auto px-5 md:px-10"> */}
        {/* <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
        <div className="max-w-7xl mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="Big Deals" />
            {/* Buttons container */}
            <div className="flex space-x-4  md:mt-0">
              <button
                onClick={() => scrollLeft("feat")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("feat")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          {data && (
            <div id="feat" className="flex overflow-x-scroll space-x-6 overflow-y-hidden hide-scrollbar">
              <CardCarousel id="feat" data={data} Card={MediumHouseCard} />
            </div>
          )}
        </div>
      </section>






    </div>
  </>
}

export default Home