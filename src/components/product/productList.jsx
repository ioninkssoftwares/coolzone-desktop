import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { RxCross2 } from 'react-icons/rx';
import { MdDeleteForever, MdOutlineSecurity } from 'react-icons/md';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../utils/axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useBrandsQuery, useCategoriesQuery, useSearchProductsQuery, useSubCategoriesQuery } from '../../redux/api/productApi';
import Loader from '../Loader';
import { addToCart } from '../../redux/reducer/cartReducer';
import { IconButton, Tooltip } from '@mui/material';

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
    // {
    //     id: 'brand',
    //     name: 'Brands',
    //     options: [
    //         { value: 'Nike', label: 'Nike', checked: false },
    //         { value: 'samsung', label: 'Samsung', checked: false },
    //         { value: 'dell', label: 'Dell', checked: true },
    //         { value: 'asus', label: 'Asus', checked: false },
    //         { value: 'lenovo', label: 'Lenovo', checked: false },
    //         { value: 'hp', label: 'HP', checked: false },
    //         // { value: 'showMore', label: 'Show More', checked: false },
    //     ],
    // },

    // {
    //     id: 'priceRange',
    //     name: 'Price Range',
    //     options: [
    //         { value: '1500', label: '<15,000', checked: false },
    //         { value: '2500', label: 'upto 25,000', checked: false },
    //         { value: '50000', label: 'upto 50,000', checked: false },
    //         { value: '75000', label: 'upto  74,999', checked: false },
    //         { value: '1000000', label: 'upto 99,999', checked: false },
    //         { value: '1100000', label: '>1,00,000', checked: true },
    //     ],
    // },
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
    // const [page, setPage] = useState(1)
    const [lastSelectedOptions, setLastSelectedOptions] = useState({});
    const [filter, setFilter] = useState({});
    const [filterData, setFilterData] = useState([]);
    // const [selectedBrand, setSelectedBrand] = useState('');
    // const [filter, setFilter] = useState({});

    if (totalItems) {
        console.log(totalItems, "sdjhfjdksafh")
    }



    useEffect(() => {
        if (cookies && cookies.token) {
            console.log(cookies.token, "dslfjadslk")
            setToken(cookies.token);
        }
    }, [cookies]);




    const handleWishlist = async (productId) => {
        const instances = useAxios(token);
        const data = {
            productId: productId,
        };

        try {
            const response = await instances.post('addToWishlist', data);
            if (response.data) {
                toast.success("Product has been added to wishlist")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            // Handle the error as needed
        }
    };


    const { data: categoriesData,
        isLoading: loadingCategories,
    } = useCategoriesQuery("");

    if (categoriesData) console.log(categoriesData, "fsadhkhkj");


    // const uniqueCategories = loadingCategories === false && categoriesData?.categories
    //     ? [...new Set(categoriesData.categories.map(category => category.toLowerCase()))]
    //     : [];



    // const { data: brandsData,
    //     isLoading: loadingBrands,
    // } = useBrandsQuery("");

    const { data: subCategoriesData,
        isLoading: loadingSubCategories,
    } = useSubCategoriesQuery("");




    useEffect(() => {
        if (categoriesData) {
            console.log(categoriesData, "sjfhskdf")
        }
    }, [categoriesData])


    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(300000);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [page, setPage] = useState(1);
    const [featured, setFeatured] = useState("");
    const [bestSeller, setBestSeller] = useState("");


    const { isLoading: productLoading,
        data: searchedData,
        isError: productIsError,
        error: productError } = useSearchProductsQuery({ category, search, sort, page, price: maxPrice, brand, subCategory, featured, bestSeller });

    console.log(searchedData, "hfasdjkhfds")


    useEffect(() => {
        if (category === "") {
            setBrand("")
            setSubCategory("")
        }
    }, [category])


    const isPrevPage = page > 1
    const isNextPage = page < 4

    const removeFilters = () => {
        setCategory("")
        setBrand("")
        setSubCategory("")
        setSearch("")
        setSort("")
        setFeatured("")
        setBestSeller("")
        setMaxPrice(300000)
    }




    // // Assuming products have a 'brand' property
    // const brands = [...new Set(searchedData?.products?.map(product => product.brand))];

    // const handleBrandChange = (event) => {
    //     const brand = event.target.value;
    //     console.log(brand, "sdljfhsadjkhfk")
    //     setSelectedBrand(brand === 'ALL' ? null : brand);
    // };

    // useEffect(() => {
    //     // Filter products based on the selected brand
    //     const filteredProducts = selectedBrand
    //         ? filterData.filter(product => product.brand === selectedBrand)
    //         : filterData;

    //     // Set the filtered products to state
    //     setFilterData(filteredProducts);
    // }, [selectedBrand, filterData]);






    // if (isError) {
    //     const err = error
    //     toast.error(err.data.message)
    // }
    // if (productIsError) {
    //     const err = productError
    //     toast.error(err.data.message)
    // }


    // Handle Cart funciton

    const handleCart = (cartProduct) => {
        // e.preventDefault();
        console.log(cartProduct, "dfs")
        if (cartProduct.stock < 1) return toast.error("Out of Stock")

        const newItem = {
            productId: cartProduct._id,
            price: cartProduct.price,
            name: cartProduct.name,
            photo: cartProduct?.productImages[0],
            stock: cartProduct.stock,
            quantity: 1,
            warrantyPeriod: cartProduct.warrantyPeriod
        };
        dispatch(addToCart(newItem))
        toast.success("Added to Cart")
    };



    // Uisng the history

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const filterCategory = searchParams.get('filterCategory') || '';
    const navbarSearch = searchParams.get('navbarSearch') || '';
    const featuredParam = searchParams.get('featured') || '';
    const bestSellerParam = searchParams.get('bestSeller') || '';
    const flyoutCategory = searchParams.get('flyoutCategory') || '';
    const flyoutBrand = searchParams.get('flyoutBrand') || '';
    const flyoutOnlyCategory = searchParams.get('flyoutOnlyCategory') || '';


    // if (featured) {
    //     console.log(featured, "sdjkfashafkd")
    // }

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo(0, 0);
    }, [filterCategory, navbarSearch]);


    // useEffect(() => {
    //     // Update the state when the category changes
    //     let flyoutCategoryLowerCase = flyoutCategory.toLowerCase();
    //     // console.log(flyoutCategoryLowerCase, "sdjfhkjsad")
    //     setTimeout(() => {
    //         setCategory(flyoutCategoryLowerCase);
    //     }, 2000);
    // }, [flyoutCategory]);

    useEffect(() => {
        // Update the state when the brand changes
        let flyoutBrandLowerCase = flyoutBrand.toLowerCase();
        let flyoutCategoryLowerCase = flyoutCategory.toLowerCase();
        if (flyoutBrandLowerCase.length > 0 && flyoutCategoryLowerCase.length > 0) {
            setCategory(flyoutCategoryLowerCase);
            setBrand(flyoutBrandLowerCase);

        }
    }, [flyoutBrand, flyoutCategory]);

    useEffect(() => {
        let flyoutOnlyCategoryParam = flyoutOnlyCategory.toLowerCase();
        if (flyoutOnlyCategoryParam.length > 0) {
            setBrand("")
            console.log(flyoutOnlyCategoryParam, "FlyoutOnlyCategory")
            setCategory(flyoutOnlyCategoryParam);
        }
    }, [flyoutOnlyCategory]);

    useEffect(() => {
        if (filterCategory.length > 0) {
            console.log("fiterCategory")
            setCategory(filterCategory);
        }

    }, [filterCategory]);

    useEffect(() => {
        // Update the search state when the categoryParam changes
        if (navbarSearch.length > 0) {
            setCategory("")
            setSearch(navbarSearch)
        }
        // setSearch(navbarSearch)
    }, [navbarSearch]);

    useEffect(() => {
        // Update the search state when the categoryParam changes
        setFeatured(featuredParam)
    }, [featuredParam]);

    useEffect(() => {
        // Update the search state when the categoryParam changes
        setBestSeller(bestSellerParam)
    }, [featuredParam]);


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
                                        <div className='flex items-center justify-between'>
                                            {/* Mobile */}
                                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>   <Tooltip title="Remove Filters">
                                                <IconButton
                                                    onClick={removeFilters}
                                                    color="error"
                                                >
                                                    <MdDeleteForever />
                                                </IconButton>
                                            </Tooltip>
                                        </div>

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
                                        {/* {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className=" font-medium text-gray-900">{section.name}</span>
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
                                                                            style={{ border: "2px solid red" }}
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            // defaultValue={true}
                                                                            type="radio"
                                                                            // defaultChecked={true}
                                                                            onChange={(e) => handleFilter(e, section, option)}
                                                                            className="h-4 w-4 rounded  text-indigo-600 focus:ring-indigo-500"
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
                                        ))} */}
                                        <div className="space-y-4">
                                            <div className="flex items-center flex-col justify-center mx-16">
                                                <h4 className="text-lg font-bold text-center">Sort</h4>
                                                <select
                                                    value={sort}
                                                    onChange={(e) => setSort(e.target.value)}
                                                    className="w-fit p-2 border border-gray-300 rounded  "
                                                >
                                                    <option value="">None</option>
                                                    <option value="asc">Price (Low to High)</option>
                                                    <option value="dsc">Price (High to Low)</option>
                                                </select>
                                            </div>

                                            <div className="flex items-center flex-col justify-center mx-20">
                                                <h4 className="text-lg font-bold text-center">Max Price: {maxPrice || ""}</h4>
                                                <input
                                                    type="range"
                                                    min={100}
                                                    max={500000}
                                                    value={maxPrice}
                                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>

                                            <div className="flex items-center flex-col justify-center mx-20">
                                                <h4 className="text-lg font-bold">Category</h4>
                                                <select
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                >
                                                    <option value="">ALL</option>
                                                    {loadingCategories === false && categoriesData?.categories && (
                                                        // Create a set of unique categories
                                                        [...new Set(categoriesData.categories)].map((uniqueCategory) => (
                                                            <option key={uniqueCategory} value={uniqueCategory}>
                                                                {uniqueCategory.toUpperCase()}
                                                            </option>
                                                        ))
                                                    )}
                                                </select>
                                            </div>




                                            {(category || search) && (
                                                <div className="flex items-center flex-col justify-center mx-20">
                                                    <h4 className="text-lg font-bold">Brands</h4>
                                                    <select
                                                        value={brand}
                                                        onChange={(e) => setBrand(e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    >
                                                        <option value="">ALL</option>
                                                        {productLoading === false && searchedData?.products && (
                                                            // Create a set of unique brands
                                                            [...new Set(searchedData.products.map((curElem) => curElem.brand))].map((uniqueBrand) => (
                                                                <option key={uniqueBrand} value={uniqueBrand}>
                                                                    {uniqueBrand.toUpperCase()}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                </div>
                                            )}



                                            {(category || search) && (
                                                <div className="flex items-center flex-col justify-center mx-20">
                                                    <h4 className="text-lg font-bold">Sub Categories</h4>
                                                    <select
                                                        value={subCategory}
                                                        onChange={(e) => setSubCategory(e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    >
                                                        <option value="">ALL</option>
                                                        {searchedData?.products.map((curElem) => (
                                                            <option key={curElem.subCategory} value={curElem.subCategory}>{curElem.subCategory}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto px-4 sm:px-6 lg:px-8  my-3">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 ">
                        <h1 className="text-md tracking-tight text-gray-500 md:block hidden">
                            {category
                                ? `${category.charAt(0).toUpperCase()}${category.slice(1)}/${brand.charAt(0).toUpperCase()}${brand.slice(1)}${subCategory ? `/${subCategory}` : ''}`
                                : ""}
                        </h1>

                        {/* <input
                            type="text"
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        /> */}

                        <div className="flex items-center">
                            {/* <Menu as="div" className="relative inline-block text-left">
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
                            </Menu> */}

                            {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <HiOutlineSquaresPlus className="h-5 w-5" aria-hidden="true" />
                            </button> */}
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

                    <section aria-labelledby="products-heading" className=" pt-6 ">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="flex  ">
                            {/* <div style={{ border: "2px solid red" }} className="grid grid-cols-1 gap-y-10 lg:grid-cols-6"> */}
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <div className="flex">
                                    <aside className="min-w-80 shadow-md p-8 flex flex-col justify-start space-y-4">
                                        <div className='flex items-center justify-between'>
                                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                            {/* <span onClick={removeFilters}><MdDeleteForever className='text-2xl cursor-pointer' /></span> */}
                                            <Tooltip title="Remove Filters">
                                                <IconButton
                                                    onClick={removeFilters}
                                                    color="error"
                                                >
                                                    <MdDeleteForever />
                                                </IconButton>
                                            </Tooltip>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-lg font-bold">Sort</h4>
                                                <select
                                                    value={sort}
                                                    onChange={(e) => setSort(e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                >
                                                    <option value="">None</option>
                                                    <option value="asc">Price (Low to High)</option>
                                                    <option value="dsc">Price (High to Low)</option>
                                                </select>
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-bold">Max Price: {maxPrice || ""}</h4>
                                                <input
                                                    type="range"
                                                    min={100}
                                                    max={500000}
                                                    value={maxPrice}
                                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-bold">Category</h4>
                                                <select
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                >
                                                    <option value="">ALL</option>
                                                    {loadingCategories === false && categoriesData?.categories.map((category) => (
                                                        <option key={category} value={category}>{category.toUpperCase()}</option>
                                                    ))}
                                                </select>
                                            </div>




                                            {(category || search) && (
                                                <div>
                                                    <h4 className="text-lg font-bold">Brands</h4>
                                                    <select
                                                        value={brand}
                                                        onChange={(e) => setBrand(e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    >
                                                        <option value="">ALL</option>
                                                        {productLoading === false && searchedData?.products && (
                                                            // Create a set of unique brands
                                                            [...new Set(searchedData.products.map((curElem) => curElem.brand))].map((uniqueBrand) => (
                                                                <option key={uniqueBrand} value={uniqueBrand}>
                                                                    {uniqueBrand.toUpperCase()}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                </div>
                                            )}



                                            {(category || search) && (
                                                <div>
                                                    <h4 className="text-lg font-bold">Sub Categories</h4>
                                                    <select
                                                        value={subCategory}
                                                        onChange={(e) => setSubCategory(e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    >
                                                        <option value="">ALL</option>
                                                        {searchedData?.products.map((curElem) => (
                                                            <option key={curElem.subCategory} value={curElem.subCategory}>{curElem.subCategory}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </aside>
                                </div>

                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3 w-full ">
                                {/* Your content */}
                                <div className="bg-white md:ml-5 ml-0 ">
                                    <div className="  px-4 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                                        <h2 className="text-3xl font-semibold tracking-tight text-primary-blue">Products</h2>

                                        <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-8 ">
                                            {productLoading ? (
                                                <Loader />
                                            ) : searchedData?.products?.map((product) => (
                                                // ) : filterData?.map((product) => (
                                                <div style={{ border: "2px solid #E2E2E2" }} key={product._id} className="group p-4  relative max-w-sm grow  rounded-lg font-manrope">
                                                    {/* <p className="text-md font-semibold text-black mb-4">{product.category}</p> */}
                                                    <div className="flex items-center justify-between mb-4">
                                                        <p className="text-sm font-semibold text-primary-blue ">
                                                            {/* {category && category.length > 13 ? `${category.slice(0, 13).toUpperCase()}...` : category.toUpperCase()} */}
                                                            {product.category.length > 15
                                                                ? product.category.slice(0, 12).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + '...'
                                                                : product.category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

                                                        </p>
                                                        <div onClick={() => handleWishlist(product._id)} className="  p-2 flex justify-center bg-primary-blue items-center rounded-full cursor-pointer">
                                                            <BsFillHeartFill className="text-sm text-white" />
                                                        </div>

                                                    </div>


                                                    {/* <div className='flex items-center justify-between'>
                                                        <h1 className="text-xl font-semibold text-primary-blue my-4">{product.name.length > 15 ? product.name.slice(0, 15) + '...' : product.name}</h1>
                                                        <div
                                                            onClick={() => handleWishlist(product._id)}
                                                            className="p-1.5 flex justify-center bg-primary-blue items-center rounded-full cursor-pointer"
                                                        >
                                                            <BsFillHeartFill className="text-sm text-white" />
                                                        </div>
                                                    </div> */}

                                                    <div onClick={() => navigate(`/product/${product._id}`)} className="cursor-pointer overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 relative mb-4 mx-auto w-[170px] h-[120px]">
                                                        {/* <div onClick={() => navigate(`/product/${product._id}`)} className="overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 relative mb-4 mx-auto w-[200px] h-[150px]"> */}
                                                        <img
                                                            src={product?.productImages.length > 0 ? product.productImages[0] : null}
                                                            alt="product image"
                                                            className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                                                        />
                                                    </div>
                                                    <p className="text-start text-sm font-semibold my-4">  {product.name.length > 21 ? product.name.slice(0, 18) + '...' : product.name}</p>
                                                    <div onClick={() => handleCart(product)} className="flex cursor-pointer items-center justify-between">
                                                        <p className="text-xl font-semibold">₹{product.price}</p>
                                                        <p className="w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center"><BsBagFill /></p>
                                                    </div>

                                                </div>
                                            ))}

                                            <section className=" mb-5">

                                            </section>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </section>

                    {/* Pagination component start here */}

                    {/* {productss.length > 7 ? <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems} /> : ""} */}

                    {searchedData && searchedData.totalPage > 1 && (
                        <article className="flex items-center justify-center mt-8">
                            <button
                                disabled={!isPrevPage}
                                onClick={() => setPage((prev) => prev - 1)}
                                className={`px-4 py-2 rounded-md mr-4 ${isPrevPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Prev
                            </button>
                            <span className="text-lg font-semibold">
                                {page} of {searchedData.totalPage}
                            </span>
                            <button
                                disabled={!isNextPage}
                                onClick={() => setPage((prev) => prev + 1)}
                                className={`px-4 py-2 rounded-md ml-4 ${isNextPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </article>
                    )}

                    {/* <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems} /> */}


                </main>
            </div>
        </div>
    )
}

export default ProductList

// useEffect(() => {
//     // Update the state when the brand changes
//     // let flyoutOnlyCategoryParam = flyoutOnlyCategory.toLowerCase();
//     // console.log(flyoutOnlyCategoryParam, "sdjfhkjsad")
//     // setCategory(flyoutOnlyCategoryParam);
//     console.log("FlyoutOnlyCategory")
// }, [flyoutOnlyCategory]);

// useEffect(() => {
//     // Update the search state when the categoryParam changes
//     // console.log(filterCategory, "sdjfhkjsad")
//     // setCategory(filterCategory)
//     console.log("fiterCategory")

// }, [filterCategory]);
