import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BsPencil, BsFillHeartFill } from "react-icons/bs";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { AiOutlineOrderedList, AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidUser } from 'react-icons/bi';
import { TbBrandStackshare } from 'react-icons/tb';
import ProductSelect from '../features/ProductSelect';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsAsync, fetchProductsByNavbarAsync } from '../product/productSlice';
import { Badge } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { cartItemsLength, fetchItemsByUserIdAsync, selectItems } from '../cart/cartSlice';
import { useCookies } from 'react-cookie';
import { FiLogOut } from 'react-icons/fi';
import { CiLogout } from "react-icons/ci";
import { toast } from 'react-toastify';
import { useSearchProductsQuery } from '../../redux/api/productApi';

// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  let location = useLocation();
  const [cookies, setCookies, removeCookies] = useCookies(['token']);
  const [token, setToken] = useState("");
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState("");


  useEffect(() => {
    if (cookies && cookies.token) {
      console.log(cookies.token, "dslfjadslk")
      setToken(cookies.token);
    }
  }, [cookies]);

  // useEffect(() => {
  //   if (token) {
  //     // console.log(token,"fjkdsfjkd")
  //     dispatch(fetchItemsByUserIdAsync(token))
  //   }

  // }, [dispatch, token])

  const navigation = [
    { name: 'Products', href: '/products', current: location.pathname === '/products' },
    { name: 'MyAccount', href: '/myAccount', current: location.pathname === '/myAccount' },
    { name: 'Cart', href: '/cart', current: location.pathname === '/cart' },
    { name: 'Favourite', href: '/favourite', current: location.pathname === '/wishlist' },
    { name: 'Orders', href: '/orders', current: location.pathname === '/orders' },
  ];

  const sampleProducts = [
    'Smartphones',
    'TV & Audio',
    'Laptops & PCs',
    'Gadgets',
    'Photo & Video',
    'Gifts',
    'Books',
    'Toys',
  ];




  const handleProducts = (e) => {
    e.preventDefault();
    navigate('/products')
    dispatch(fetchAllProductsAsync())

  }
  const handleCart = (e) => {
    e.preventDefault();
    navigate('/cart')
  }
  const handleProfile = (e) => {
    e.preventDefault();
    navigate('/myAccount')
  }
  const handleFavourite = (e) => {
    e.preventDefault();
    navigate('/wishlist')
  }
  const handleOrders = (e) => {
    e.preventDefault();
    navigate('/orders')
  }

  const { isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError } = useSearchProductsQuery({ search });

  console.log(searchedData, "hfasdjkhfds")


  // Todo-localStorageUsed
  const userId = localStorage.getItem("userId");

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


  const handleSearch = (e) => {
    navigate(`/products?navbarSearch=${encodeURIComponent(e)}`);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigate(`/products?navbarSearch=${encodeURIComponent(search)}`);
  }

  return (
    <Disclosure as="nav" className="bg-white sticky top-0 z-50 ">
      {({ open }) => (
        <>
          {/* <div className="sticky top-5 z-50"> */}
          <div style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }} className="mx-auto shadow max-w-[100%] px-2 sm:px-6 lg:px-8 -mt-4 ">
            <div className="relative flex h-16 items-center justify-between mt-4">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (

                    <RxCross2 className="block h-6 w-6" />
                  ) : (
                    <GiHamburgerMenu className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex md:flex-1 ml-20 md:ml-0 items-center justify-center sm:items-stretch sm:justify-start">
                <div onClick={() => navigate("/")} className="flex cursor-pointer flex-shrink-0 items-center md:w-[150px] md:h-[50px] w-[60px] h-[50px]">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <span className='cursor-pointer hover:text-primary-blue hover:font-bold ml-2' onClick={() => navigate("/")}>Coolzone</span> */}
                  <img
                    // className="h-8 w-auto"
                    className="h-full w-full object-contain"
                    src="/logo.jpeg"
                    alt="Coolzone"
                  />
                </div>

              </div>

              {/* Default SearchBar */}
              {/* <div style={{ border: "2px solid green" }} >
                <div className="flex md:w-[700px] md:mr-[50px] mr-0 w-[500px] ml-[50px] md:ml-0 ">
                  <form onSubmit={searchSubmitHandler} className='flex' style={{ width: "85%", height: "100%" }}>
                    <div style={{ width: "100%", height: "100%" }}>
                      <input type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 pl-8 border border-primary-blue rounded-l-full focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className='rounded-r-full md:w-[12%] md:h-[42px] '>
                      <button className='w-full h-full flex items-center rounded-r-full bg-primary-blue '>
                        <AiOutlineSearch className='md:ml-6 ml-3  mr-5 md:mr-0 text-white' />
                      </button>
                    </div>
                  </form>


                </div>
              </div> */}

              <div className="relative">
                <div className="flex md:w-[700px] md:mr-[50px] mr-0 w-[200px] ml-[50px] md:ml-0 relative">
                  <form onSubmit={handleSearchSubmit} className='flex ' style={{ width: "85%", height: "100%" }}>
                    <div className="relative w-full">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 pl-8 border border-primary-blue rounded-r-full rounded-l-full focus:outline-none focus:border-blue-500"
                      />
                      <button className='absolute top-0 right-0 w-10 h-full flex items-center rounded-r-full bg-primary-blue'>
                        <AiOutlineSearch className='ml-3 mr-5 text-white' />
                      </button>
                    </div>
                  </form>
                </div>


                {/* Display search results */}
                <div className="absolute left-0 bg-white rounded-md w-[80%] z-20 max-h-60 overflow-y-auto">
                  {search.length > 0 && searchedData && searchedData.products.map((result) => (
                    <div onClick={() => handleSearch(result.name)} key={result._id} className="px-4 py-2 cursor-pointer hover:bg-blue-100">
                      {result.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-y-0 space-x-8 right-0 md:flex hidden items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div onClick={() => navigate("/myAccount")} style={{ width: "28px", height: "28px", borderRadius: "50%" }}>
                  <BiSolidUser className='w-full h-full cursor-pointer hover:text-primary-blue' />
                </div>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", marginRight: "25px" }}>
                  <p onClick={handleProducts} className='w-full h-full cursor-pointer font-bold text-sm hover:text-primary-blue ' > Products</p>
                </div>
                <div onClick={() => navigate("/wishlist")} style={{ width: "28px", height: "28px", borderRadius: "50%" }}>
                  <BsFillHeartFill className='w-full h-full cursor-pointer hover:text-primary-blue' />
                </div>
                {/* <div onClick={() => navigate("/cart")} style={{ width: "28px", height: "28px", borderRadius: "50%" }}>
                  <FaShoppingCart className='w-full h-full cursor-pointer hover:text-primary-blue' />
                </div> */}
                <div className='cursor-pointer' onClick={() => navigate("/cart")} >
                  {/* <Badge color="error">
                    <AddShoppingCart className='w-full h-full cursor-pointer hover:text-primary-blue' />
                  </Badge> */}
                  <Badge badgeContent={cartItems && cartItems.length} color="error">
                    <AddShoppingCart />
                  </Badge>
                </div>
                <div onClick={() => navigate("/orders")} style={{ width: "28px", height: "28px", borderRadius: "50%" }}>
                  <AiOutlineOrderedList className='w-full h-full cursor-pointer hover:text-primary-blue' />
                </div>

                {userId ? (<div onClick={handleLogout} style={{ width: "28px", height: "28px", borderRadius: "50%" }}>
                  <CiLogout className='w-full h-full cursor-pointer hover:text-primary-blue' />
                </div>) : (<div onClick={() => navigate("/login")} style={{ width: "28px", height: "28px", borderRadius: "50%" }}>
                  <FiLogOut className='w-full h-full cursor-pointer hover:text-primary-blue' />
                </div>)}

              </div>
            </div>




          </div>
          {/* Category Section */}
          <section className='w-full md:flex items-center justify-center bg-primary-blue hidden'>
            <div style={{ width: "70%" }} className='flex items-center justify-center  gap-1 '>

              <ProductSelect products={sampleProducts} defaultValue="Smartphones" />
              <ProductSelect products={sampleProducts} defaultValue="TV & Audio" />
              <ProductSelect products={sampleProducts} defaultValue="Laptops & PCs" />
              <ProductSelect products={sampleProducts} defaultValue="Gadgets" />
              <ProductSelect products={sampleProducts} defaultValue="Photo & Video" />
              <ProductSelect products={sampleProducts} defaultValue="Gifts" />
              <ProductSelect products={sampleProducts} defaultValue="Books" />
              <ProductSelect products={sampleProducts} defaultValue="Toys" />


            </div>
          </section>
          {/* </div> */}

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={item.name === 'Products' ? handleProducts : item.name === "Cart" ? handleCart : item.name === "MyAccount" ? handleProfile : item.name === "Favourite" ? handleFavourite : item.name === "Orders" ? handleOrders : null}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
