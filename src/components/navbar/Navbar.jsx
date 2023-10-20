import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BsPencil, BsFillHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidUser } from 'react-icons/bi';
import { TbBrandStackshare } from 'react-icons/tb';
import ProductSelect from '../features/ProductSelect';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllProductsAsync, fetchProductsByNavbarAsync } from '../product/productSlice';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Products', href: '#', current: true },
  { name: 'Profile', href: '#', current: false },
  { name: 'Cart', href: '#', current: false },
  { name: 'Favourite', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

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

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      navigate("/products");
      dispatch(fetchProductsByNavbarAsync(term))
    } else if (location.pathname === '/products') {
      dispatch(fetchProductsByNavbarAsync(term))
    }
    //  else if (location.pathname === productPath) {
    //   navigate("/products");
    //   dispatch(fetchProductsByNavbarAsync(term))
    // }

    setTerm("")

  }



  return (
    <Disclosure as="nav" className="bg-white sticky top-0 z-50 ">
      {({ open }) => (
        <>
          {/* <div className="sticky top-5 z-50"> */}
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
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
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <span className='cursor-pointer' onClick={() => navigate("/")}>Coolzone</span>
                </div>

              </div>

              {/* <div style={{border:"2px solid green"}} > */}
              <div className="flex md:w-[700px] md:mr-[50px] mr-0 w-[500px] ml-[50px] md:ml-0 ">
                <form onSubmit={searchSubmitHandler} className='flex' style={{ width: "85%", height: "100%" }}>
                  <div style={{ width: "100%", height: "100%" }}>
                    <input type="text"
                      placeholder="Search..."
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      className="w-full p-2 pl-8 border border-primary-blue rounded-l-full focus:outline-none focus:border-blue-500" />
                  </div>
                  <div  className='rounded-r-full md:w-[12%] md:h-[42px] '>
                    <button className='w-full h-full flex items-center rounded-r-full bg-primary-blue '>
                      <AiOutlineSearch className='md:ml-6 ml-3  mr-5 md:mr-0 text-white' />
                    </button>
                  </div>
                </form>


              </div>
              {/* </div> */}

              <div className="absolute inset-y-0 space-x-8 right-0 md:flex hidden items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div style={{ width: "28px", height: "28px", borderRadius: "50%" }}>
                  <BiSolidUser className='w-full h-full' />
                </div>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%",marginRight:"25px" }}>
                  <p onClick={handleProducts} className='w-full h-full cursor-pointer font-bold text-sm text-primary-blue ' > Products</p>
                </div>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%" }}>
                  <BsFillHeartFill className='w-full h-full' />
                </div>
                <div onClick={() => navigate("/cart")} style={{ width: "28px", height: "28px", borderRadius: "50%" }}>
                  <FaShoppingCart className='w-full h-full cursor-pointer' />
                </div>

              </div>
            </div>

          </div>
          <section className='w-full md:flex items-center justify-center bg-primary-blue mt-4 hidden'>
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
                  onClick={item.name === 'Products' ? handleProducts : item.name === "Cart" ? handleCart : null}
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
