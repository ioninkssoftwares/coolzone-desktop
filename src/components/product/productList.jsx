import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { RxCross2 } from 'react-icons/rx';
import { MdOutlineSecurity } from 'react-icons/md';
import { AiOutlineDown, AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { BsFillHeartFill, BsFunnel } from 'react-icons/bs';
import { HiMiniSquaresPlus, HiOutlineSquaresPlus } from 'react-icons/hi2';
import ProductSelect from '../features/ProductSelect';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { scrollLeft, scrollRight } from '../../pages/Home';
import MediumHouseCard from '../features/MediumHomeCard';
import { data } from '../../test';
import CardCarousel from '../features/CardCarousel';
import { BsBagFill } from "react-icons/bs";
import Pagination from '../features/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsAsync, fetchBannerAsync, fetchCategoriesAsync, fetchProductsByFiltersAsync, selectAllProducts, selectCategories, selectProductListStatus, selectTotalItems } from './productSlice';
import { CastForEducation } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../utils/axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
    { name: 'Laptop', href: '#' },
    { name: 'Desktop', href: '#' },
    { name: 'Refurbished Laptops', href: '#' },
    { name: 'Printers', href: '#' },
    { name: 'Moniter', href: '#' },
    { name: 'Refurbished Moniter', href: '#' },
    { name: 'Show More', href: '#' },
]
const filters = [

    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'Smartphones', label: 'Smartphones', checked: false },
            { value: 'TV & Audio', label: 'TV & Audio', checked: false },
            { value: 'Laptop', label: 'Laptops & PCs', checked: false },
            { value: 'Gadgets', label: 'Gadgets', checked: false },
            { value: 'Shoes', label: 'Shoes', checked: false },
            { value: 'Gifts', label: 'Gifts', checked: false },
            { value: 'Books', label: 'Books', checked: false },
            { value: 'Toys', label: 'Toys', checked: false },
        ],
    },
    {
        id: 'brand',
        name: 'Brands',
        options: [
            { value: 'Nike', label: 'Nike', checked: false },
            { value: 'samsung', label: 'Samsung', checked: false },
            { value: 'dell', label: 'Dell', checked: true },
            { value: 'asus', label: 'Asus', checked: false },
            { value: 'lenovo', label: 'Lenovo', checked: false },
            { value: 'hp', label: 'HP', checked: false },
            // { value: 'showMore', label: 'Show More', checked: false },
        ],
    },

    {
        id: 'priceRange',
        name: 'Price Range',
        options: [
            { value: '2l', label: '<15,000', checked: false },
            { value: '6l', label: '15,000 t0 25,000', checked: false },
            { value: '12l', label: '25,000 t0 50,000', checked: false },
            { value: '18l', label: '50,000 t0 74,999', checked: false },
            { value: '20l', label: '75,000 t0 99,999', checked: false },
            { value: '40l', label: '>1,00,000', checked: true },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["token"]);
    const [token, setToken] = useState("");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const productss = useSelector(selectAllProducts);
    const totalItems = useSelector(selectTotalItems)
    const categories = useSelector(selectCategories);
    const isPending = useSelector(selectProductListStatus);
    const [page, setPage] = useState(1)

    // const filters = [
    //     {
    //       id: 'category',
    //       name: 'Category',
    //       options: categories,
    //     },
    //     {
    //       id: 'brand',
    //       name: 'Brands',
    //       options: brands,
    //     },
    //   ];


    useEffect(() => {
        if (cookies && cookies.token) {
            console.log(cookies.token, "dslfjadslk")
            setToken(cookies.token);
        }
    }, [cookies]);



    if (isPending) {
        console.log(isPending, "prkjf")
    }
    const [filter, setFilter] = useState({});



    const handlePage = (page) => {
        setPage(page)

    }

    useEffect(() => {
        const pagination = { page: page }
        console.log(pagination, "kgjkjlh")
        dispatch(fetchProductsByFiltersAsync({ filter, pagination }))
    }, [dispatch, page, filter])


    const handleFilter = (e, section, option) => {
        console.log(section.id, option.value, "handleFilter");
        const newFilter = { ...filter, [section.id]: option.value };
        setFilter(newFilter)

        // dispatch(fetchProductsByFiltersAsync(newFilter))
        // const newFilter = { ...filter };
        // if (e.target.checked) {
        //   if (newFilter[section.id]) {
        //     newFilter[section.id].push(option.value);
        //   } else {
        //     newFilter[section.id] = [option.value];
        //   }
        // } else {
        //   const index = newFilter[section.id].findIndex(
        //     (el) => el === option.value
        //   );
        //   newFilter[section.id].splice(index, 1);
        // }
        // console.log({ newFilter });

        // setFilter(newFilter);
    };

    // useEffect(() => {
    //     const ITEMS_PER_PAGE  = 8
    //     const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    //     dispatch(fetchProductsByFiltersAsync({ filter }));
    // }, [dispatch, filter]);


    useEffect(() => {
        // dispatch(fetchBrandsAsync());
        dispatch(fetchCategoriesAsync());
        // dispatch(fetchBannerAsync())
        // dispatch(fetchAllProductsAsync())
    }, []);


    const products = [
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        // More products...
    ]

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

    const items = [
        { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
        { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
        { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
    ]


    const handleWishlist = async (productId) => {

        const instances = useAxios(token)
        try {
            const response = await instances.put(`/product/wishlist/${productId}`)
            console.log(response.data)
            toast("Product has been added to wishlist")
            // setMembership(true)
            // window.location.reload();
        } catch (error) {
            console.log(error)

        }
    }

    return (

        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4 mt-[100px]">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <RxCross2 className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Mobile Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        {/* <div className='w-full p-4 rounded-lg' style={{ border: "2px solid gray" }}>
                                            <h2 className="font-bold my-4">Categories</h2>

                                            <ProductSelect products={sampleProducts} defaultValue="Laptops & PCs" productsPage={true} />
                                            <h2 className="font-bold my-4">Subcategories</h2>

                                            <ul role="list" className="space-y-4  text-sm font-medium text-gray-900 my-4">
                                                {subCategories.map((category) => (
                                                    <li key={category.name}>
                                                        <a href={category.href}>{category.name}</a>
                                                    </li>
                                                ))}
                                            </ul>

                                        </div> */}

                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <AiOutlineMinus className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <AiOutlinePlus className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-4">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="radio"
                                                                            defaultChecked={option.checked}
                                                                            onChange={(e) => handleFilter(e, section, option)}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                            className="ml-3 text-sm text-gray-600"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-md tracking-tight text-gray-500">Computers & Tablets  /  Laptop  / Windows Laptop</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <AiOutlineDown
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <HiOutlineSquaresPlus className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <BsFunnel className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className=" pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                {/* <div className='w-full p-4 rounded-lg' style={{ border: "2px solid gray" }}>
                                    <h2 className="font-bold my-4">Categories</h2>

                                    <ProductSelect products={sampleProducts} defaultValue="Laptops & PCs" productsPage={true} />
                                    <h2 className="font-bold my-4">Subcategories</h2>

                                    <ul role="list" className="space-y-4  text-sm font-medium text-gray-900 my-4">
                                        {subCategories.map((category) => (
                                            <li key={category.name}>
                                                <a onClick={() => handleFilter(category)} href={category.href}>{category.name}</a>
                                            </li>
                                        ))}
                                    </ul>

                                </div> */}

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <AiOutlineMinus className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <AiOutlinePlus className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    {/* <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="radio"
                                                                    defaultChecked={option.checked}
                                                                    onChange={(e) => handleFilter(e, section, option)}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div> */}

                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    onChange={(e) =>
                                                                        handleFilter(e, section, option)
                                                                    }
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                {/* Your content */}
                                <div className="bg-white">
                                    <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                                        <h2 className="text-3xl font-semibold tracking-tight text-primary-blue">Products</h2>

                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                            {isPending === 'idle' ? productss.map((product) => (
                                                <div style={{ border: "2px solid GRAY" }} key={product._id} className="group p-4 min-w-[260px] md:min-w-[260px] relative max-w-sm grow  rounded-lg font-manrope">
                                                    <p className="text-md font-semibold text-black mb-4">{product.category}</p>
                                                    <div className='flex items-center justify-between'>
                                                        <h1 className="text-xl font-semibold text-primary-blue my-4">{product.name}</h1>
                                                        <div
                                                            onClick={() => handleWishlist(product._id)}
                                                            className="p-1.5 flex justify-center bg-primary-blue items-center rounded-full cursor-pointer"
                                                        >
                                                            <BsFillHeartFill className="text-sm text-white" />
                                                        </div>
                                                    </div>

                                                    <div onClick={() => navigate(`/product/${product._id}`)} className="overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 relative my-10 mx-auto w-[200px] h-[150px]">
                                                        <img
                                                            src={product?.images.length > 0 ? product.images[0].url : null}
                                                            // alt={product.imageAlt}
                                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xl font-semibold">${product.price}</p>
                                                        <p className="w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center"><BsBagFill /></p>
                                                    </div>

                                                </div>
                                            )) : <p>Loading...</p>}

                                            <section className=" mb-5">

                                            </section>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </section>

                    {/* Pagination component start here */}

                    {/* <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems} /> */}


                </main>
            </div>
        </div>
    )
}

export default ProductList