import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import CorouselSlider from '../components/features/CorouselSlider';
import { BsTicketPerforatedFill, BsBagFill, BsSendFill } from 'react-icons/bs';
import { MdOutlineSecurity } from 'react-icons/md';
import { AiOutlineTags, AiOutlineArrowRight, AiOutlineSearch } from 'react-icons/ai';
import { SiAdguard } from 'react-icons/si';
import { TbTruckDelivery } from 'react-icons/tb';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import HomeSectionTitle from '../components/features/HomeSectionTittle';
import { data } from '../test';
import MediumHouseCard from '../components/features/MediumHomeCard';
import CardCarousel from '../components/features/CardCarousel';
import CategoryCard from '../components/features/CategoryCard';
import TopRatedCategoryCard from '../components/features/TopRatedCategoryCard';
import Footer from '../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsAsync, fetchBannerAsync, selectAllProducts, selectBanners, selectProductListStatus } from '../components/product/productSlice';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserAsync, selectCurrentUserDetails } from '../components/auth/authSlice';
import NewSectionCard from '../components/features/NewSectionCard';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bannersData, setBannersData] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [fasionBanner, setFasionBanner] = useState({})
  const banners = useSelector(selectBanners);
  const userDetails = useSelector(selectCurrentUserDetails);
  const [cookies, setCookies] = useCookies(["token"]);
  const [token, setToken] = useState("");
  const homeProducts = useSelector(selectAllProducts)

  const isPending = useSelector(selectProductListStatus);

  if (homeProducts) {
    console.log(homeProducts, "cxvvxxv")
  }



  // useEffect(() => {
  //   // setBannersData(data.banners);
  //   if (banners.banners && banners.banners.length > 0) {
  //     setBannersData(banners.banners)
  //     // console.log(banners.banners,"dfjdk")

  //   }

  // }, [banners.banners])


  useEffect(() => {
    const filterBanner = () => {
      const fashionBanners = banners?.allBanner?.filter(banner => banner.category === "fashion");
      // const fashionBannerObject = fashionBanners.reduce((acc, curBanner) => {
      //   const categoryKey = curBanner.category;
      //   acc[categoryKey] = curBanner;
      //   return acc;
      // }, {});
      console.log(fashionBanners, "fjdfkj")
      // setFasionBanner(fashionBannerObject.Fasion)
      setFasionBanner(fashionBanners)

    }

    filterBanner()

  }, [banners])



  useEffect(() => {
    if (cookies && cookies.token) {
      console.log(cookies.token, "dslfjadslk")
      setToken(cookies.token);
    }
  }, [cookies]);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(fetchBannerAsync(token));
  //     dispatch(fetchAllProductsAsync(token))
  //   }
  // }, [token, dispatch]);
  useEffect(() => {

    dispatch(fetchBannerAsync());
    dispatch(fetchAllProductsAsync())

  }, []);


  //  useEffect(() => {
  //         if (cookies.token === undefined) {
  //           toast.error("Please Login")
  //           navigate('/login')
  //         }
  //       }, [])

  // TODO:Add the token to the redux state so dont need to use state everywhere
  useEffect(() => {
    if (token) {
      dispatch(getCurrentUserAsync(token))
    }

  }, [token])

  // Products Filteration 

  useEffect(() => {
    console.log("Filtred in useEffect:", homeProducts);

    const filterProducts = () => {
      // Check if Filtred is available and has length
      if (homeProducts && homeProducts.length > 0) {
        // const filteredProdects = Filtred.filter(
        //   (property) => property.cost < 5000000
        // );
        // console.log("Filtered properties by cost:", filteredProdects);
        // setCostFiltred(filteredProdects);

        const featuredProducts = homeProducts.filter(
          (property) => property.featured
        );
        console.log("Featured properties:", featuredProducts);
        setFeaturedProducts(featuredProducts);

        const bestSellerProducts = homeProducts.filter(
          (property) => property.bestSeller
        );
        console.log("Best Seller Products:", bestSellerProducts);
        setBestSellerProducts(bestSellerProducts);
      }
    };

    filterProducts();
  }, [homeProducts]);





  const productSamples = [
    { name: 'mobile', imageSrc: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg' },
    { name: 'tv', imageSrc: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/tv-310801_1280.png' },
    { name: 'laptop', imageSrc: 'https://i.dummyjson.com/data/products/6/thumbnail.png' },
    { name: 'accessories', imageSrc: 'https://i.dummyjson.com/data/products/27/thumbnail.webp' },
    { name: 'Photography', imageSrc: 'https://cdn.pixabay.com/photo/2015/08/02/10/29/camera-871052_1280.png' },
    { name: 'Gifts', imageSrc: 'https://cdn.pixabay.com/photo/2013/07/12/15/40/present-150291_1280.png' },
    { name: 'books', imageSrc: 'https://cdn.pixabay.com/photo/2017/01/31/00/09/books-2022464_1280.png' },
    { name: 'Toys', imageSrc: 'https://cdn.pixabay.com/photo/2012/04/13/21/32/rocking-horse-33719_1280.png' },
    { name: 'gadgets', imageSrc: 'https://cdn.pixabay.com/photo/2018/03/06/08/31/drone-3202860_960_720.jpg' },
    { name: 'Fridge', imageSrc: 'https://cdn.pixabay.com/photo/2017/06/19/18/03/refrigerator-2420417_960_720.png' },
  ];


  const newProductSamples = [
    { name: 'Smartphones', imageSrc: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg' },
    { name: 'TV & Audio', imageSrc: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/tv-310801_1280.png' },
    { name: 'Laptops & PCs', imageSrc: 'https://i.dummyjson.com/data/products/6/thumbnail.png' },
  ];

  const newSectionSamples = [
    { name: 'PORTABLE SPEAKERS COLLECTION 2023', imageSrc: 'https://www.pngall.com/wp-content/uploads/4/Wireless-Portable-Speaker-PNG-Clipart.png' },
    { name: 'ALL ACCESSORIES FOR GAMERS', imageSrc: 'https://cdn.pixabay.com/photo/2020/06/21/20/43/playstation-5326719_960_720.png' },
    { name: 'ALL ACCESSORIES FOR LAPTOPS', imageSrc: 'https://cdn.pixabay.com/photo/2012/04/02/16/36/memory-stick-24902_1280.png' }
  ]



  if (userDetails) {
    console.log(userDetails, "dsfafadfafddfsasdfdfs")
  }

  // Navigation from home to products

  const navigateToProducts = (categoryName) => {
    // Navigate to products page and set the search state with the category name
    navigate(`/products?filterCategory=${encodeURIComponent(categoryName)}`);
  }
  return <>
    <Navbar />
    <div className='hide-scrollbar overflow-y-hidden'>
      <section>
        <CorouselSlider bannerCategory={fasionBanner} />
      </section>

      {/* New Section */}
      <section className=" mb-5 mt-3">
        {/* <div className="max-w-7xl mx-auto px-5 md:px-10"> */}
        {/* <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
        <div className="max-w-[92rem] mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-end">
            {/* <HomeSectionTitle text="New Products" /> */}
            {/* Buttons container */}
            <div className="flex space-x-4  md:mt-0 mb-0">
              <button
                onClick={() => scrollLeft("newSection")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("newSection")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button>
              {/* <button className='bg-primary-blue cursor-pointer px-3 rounded-md text-white '>VIEW ALL</button> */}
            </div>
          </div>
          {homeProducts && (
            <div id="newSection" className="flex  overflow-x-auto  space-x-6 overflow-y-hidden hide-scrollbar">
              <CardCarousel id="newSection" data={newSectionSamples} Card={NewSectionCard} />
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className='bg-gray-100 mb-5'>
        <div className="max-w-[92rem] mx-auto px-5 md:px-10 py-8 ">
          <HomeSectionTitle text="Categories" />
          {/* <div className='flex md:items-start md:justify-center items-center justify-center flex-wrap mt-7 gap-7'> */}
          <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8'>
            {productSamples?.map((curElem) => (<CategoryCard categoryData={curElem} />))}
          </div>
        </div>
      </section>

      {/* Featured Products section */}
      <section className="pt-5 mb-1">
        {/* <div className="max-w-7xl mx-auto px-5 md:px-10"> */}
        {/* <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
        <div className="max-w-[92rem] mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="Featured Products" />
            {/* Buttons container */}
            <div className="flex space-x-4  md:mt-0 mb-6 ">
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
              <button onClick={() => navigate(`/products?featured=true`)} className='bg-primary-blue cursor-pointer px-3 rounded-md text-white'>VIEW ALL</button>

            </div>
          </div>
          {homeProducts && (
            <div id="feat" className="flex overflow-x-auto space-x-6 overflow-y-hidden hide-scrollbar">
              <CardCarousel id="feat" data={featuredProducts} Card={MediumHouseCard} />
            </div>
          )}
        </div>
      </section>

      {/* Offers Section */}
      <section className=' mb-5'>
        <div className="max-w-[92rem] mx-auto px-5 md:px-10 py-8 flex md:items-center md:justify-center gap-8 overflow-x-auto">
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Audio Devices</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("audio")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
              <img
                src="https://cdn.pixabay.com/photo/2017/11/06/11/53/music-2923447_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Audio Devices</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("audio")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
              <img
                src="https://cdn.pixabay.com/photo/2017/11/06/11/53/music-2923447_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Laptops</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("laptop")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
              <img
                src="https://cdn.pixabay.com/photo/2012/04/13/20/24/laptop-33521_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Smart Watch</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("watch")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
              <img
                src="https://cdn.pixabay.com/photo/2018/09/13/14/56/apple-watch-series-4-3674940_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Accesories</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("accessories")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
              <img
                src="https://cdn.pixabay.com/photo/2013/07/12/19/25/usb-cable-154767_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Accesories</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("accessories")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
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
      <section className="pt-5 ">
        {/* <div className="max-w-7xl mx-auto px-5 md:px-10"> */}
        {/* <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
        <div className="max-w-[92rem] mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="Best Sellers" />
            {/* Buttons container */}
            <div className="flex space-x-4  md:mt-0 mb-6">
              <button
                onClick={() => scrollLeft("best")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("best")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button>
              <button onClick={() => navigate(`/products?bestSeller=true`)} className='bg-primary-blue cursor-pointer px-3 rounded-md text-white '>VIEW ALL</button>
            </div>
          </div>
          {homeProducts && (
            <div id="best" className="flex  overflow-x-auto  space-x-6 overflow-y-hidden hide-scrollbar">
              <CardCarousel id="best" data={bestSellerProducts} Card={MediumHouseCard} />
            </div>
          )}
        </div>
      </section>

      {/* New Products section */}
      <section className="pt-5 mb-5">
        {/* <div className="max-w-7xl mx-auto px-5 md:px-10"> */}
        {/* <div className="w-full flex items-center justify-between flex-col md:flex-row"> */}
        <div className="max-w-[92rem] mx-auto px-5 md:px-10 ">
          <div className="w-full flex items-center justify-between">
            <HomeSectionTitle text="New Products" />
            {/* Buttons container */}
            <div className="flex space-x-4  md:mt-0 mb-6">
              <button
                onClick={() => scrollLeft("big")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scrollRight("big")}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button>
              <button onClick={() => navigate("/products")} className='bg-primary-blue cursor-pointer px-3 rounded-md text-white '>VIEW ALL</button>
            </div>
          </div>
          {homeProducts && (
            <div id="big" className="flex  overflow-x-auto  space-x-6 overflow-y-hidden hide-scrollbar">
              <CardCarousel id="big" data={homeProducts} Card={MediumHouseCard} />
            </div>
          )}
        </div>
      </section>

      {/* Second Offers Section */}
      {/* <section className=' mb-5'>
        <div className="max-w-[92rem] mx-auto px-5 md:px-10 py-8 flex md:items-center md:justify-center gap-8 overflow-x-auto">
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-red-400 to-red-900 font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Audio Devices</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("audio")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
              <img
                src="https://cdn.pixabay.com/photo/2017/11/06/11/53/music-2923447_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-red-400 to-red-900  font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Laptops</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("laptop")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
              <img
                src="https://cdn.pixabay.com/photo/2012/04/13/20/24/laptop-33521_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-red-400 to-red-900  font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Smart Watch</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("watch")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
              <img
                src="https://cdn.pixabay.com/photo/2018/09/13/14/56/apple-watch-series-4-3674940_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-red-400 to-red-900  font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Smart Watch</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("watch")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
              <img
                src="https://cdn.pixabay.com/photo/2018/09/13/14/56/apple-watch-series-4-3674940_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-red-400 to-red-900  font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Accesories</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("accessories")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
              <img
                src="https://cdn.pixabay.com/photo/2013/07/12/19/25/usb-cable-154767_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
          <div style={{ width: "215px", height: "280px" }} className=' rounded-lg bg-gradient-to-r from-red-400 to-red-900  font-semibold cursor-pointer hover:scale-105 flex flex-col items-center p-4 '>
            <div className='flex flex-col items-center'>
              <span className='text-2xl font-bold text-white'>CZ Offers on </span>
              <span className='text-2xl font-bold text-white'>Accesories</span>
              <span className=' text-white'>Start @ ₹299.00 </span>
            </div>
            <div onClick={() => navigateToProducts("accessories")} className="relative cursor-pointer mt-8 w-[130px] h-[100px]">
              <img
                src="https://cdn.pixabay.com/photo/2013/07/12/19/25/usb-cable-154767_1280.png"
                fill
                alt="home"
                className="w-full h-full object-fillr rounded-lg"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/*Top Rated/Mega Offers Categories Section */}
      <section className='bg-gray-100  md:h-[635px] '>
        <div className="max-w-[92rem] mx-auto px-5 md:px-10 pt-4 flex  ">
          <h1 className={`font-semibold w-fit text-3xl font-manrope  border-b-2 border-b-black md:ml-[215px] ml-0 `}>
            Top Rated
          </h1>
          <h1 className={`font-semibold w-fit text-3xl font-manrope md:block hidden  border-b-2 border-b-black ml-[265px] `}>
            Bestsellers
          </h1>
          <h1 className={`font-semibold w-fit text-3xl font-manrope md:block hidden  border-b-2 border-b-black ml-[265px]  `}>
            Mega Offers
          </h1>
        </div>
        <div className="max-w-[92rem] mx-auto  flex md:flex-row flex-col items-center justify-center   space-x-6  ">
          <div className='flex flex-col items-start justify-between flex-wrap mt-7 gap-8'>
            {newProductSamples?.map((curElem) => (<TopRatedCategoryCard categoryData={curElem} />))}
          </div>
          <h1 className={`font-semibold w-fit text-3xl font-manrope md:hidden block  border-b-2 border-b-black relative right-28 py-4 `}>
            Bestsellers
          </h1>
          <div className='flex flex-col items-start justify-between flex-wrap mt-7 gap-8 pr-6 md:pr-0'>
            {newProductSamples?.map((curElem) => (<TopRatedCategoryCard categoryData={curElem} />))}
          </div>
          <h1 className={`font-semibold w-fit text-3xl font-manrope md:hidden block  border-b-2 border-b-black relative right-28 py-4 `}>
            Mega Offers
          </h1>
          <div className='flex flex-col items-start justify-between flex-wrap mt-7 gap-8 pr-6 md:pr-0'>
            {newProductSamples?.map((curElem) => (<TopRatedCategoryCard categoryData={curElem} />))}
          </div>
        </div>
      </section>
      {/* <div className=' bg-[#3b4758] w-full h-24'></div> */}

      {/* Guarantee section */}
      <section className='flex  items-center  justify-center my-5'>
        <div style={{ border: "2px solid gray" }} className='rounded-lg flex md:flex-row flex-col md:items-center md:justify-center justify-start  w-[79%] p-5'>
          {/* <div style={{ border: "2px solid gray" }} className="max-w-7xl mx-auto p-5 md:px-10 rounded-lg flex items-center justify-center "> */}
          <div className='w-fit md:border-r-4  flex items-center justify-center gap-3 px-14 py-3'>
            <div className='w-[25px] h-[25px] mt-2'>
              <SiAdguard className='w-full h-full text-blue-950 ' />
            </div>
            <div>
              <p className='font-bold'>Guarantee</p>
              <p className='text-xs'>12 Months</p>
            </div>
          </div>
          <div className='w-fit md:border-r-4 flex items-center justify-center gap-3 px-14 py-3'>
            <div className='w-[25px] h-[25px] mt-2'>
              <BsTicketPerforatedFill className='w-full h-full text-orange-400' />
            </div>
            <div>
              <p className='font-bold'>Rate Paying</p>
              <p className='text-xs'>4-12 Months</p>
            </div>
          </div>
          <div className='w-fit md:border-r-4 flex items-center justify-center gap-3 px-14 py-3'>
            <div className='w-[25px] h-[25px] mt-2'>
              <MdOutlineSecurity className='w-full h-full text-primary-blue' />
            </div>
            <div>
              <p className='font-bold'>Payments</p>
              <p className='text-xs'>Secured</p>
            </div>
          </div>
          <div className='w-fit md:border-r-4 flex items-center justify-center gap-3 px-14 py-3'>
            <div className='w-[25px] h-[25px] mt-2'>
              <TbTruckDelivery className='w-full h-full text-green-500' />
            </div>
            <div>
              <p className='font-bold'>Free Delivery</p>
              <p className='text-xs'>from ₹449</p>
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


      {/* Newsletter Section */}
      <section className='bg-[#3b4758] '>
        <div className="max-w-[92rem] mx-auto px-5 md:px-10  flex space-x-6 p-6 items-center justify-between ">
          <p className=' text-white '><span className='text-base font-bold text-white '>Subscribe to Our Newsletter</span> - get a <span className=' text-white text-base font-bold underline'>₹500 Coupon</span> for your first order!</p>
          <div style={{ width: "500px" }} className="flex ">
            <div style={{ width: "85%", height: "100%" }}>
              <input type="text"
                placeholder="Enter your email address"
                // value={searchTerm}
                // onChange={handleSearch}
                className="w-full p-2 pl-8 border border-primary-blue rounded-l-full focus:outline-none focus:border-blue-500" />
            </div>
            <div className='rounded-r-full' style={{ width: "12%", height: "42px" }}>
              <button className='w-full h-full flex items-center rounded-r-full bg-primary-blue '>
                <BsSendFill className='ml-6 text-white' />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </>
}

export default Home