import {
    Box,
    Card,
    CircularProgress,
    Grid,
    IconButton,
    LinearProgress,
    Tooltip,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import Link from "next/link";
// import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsEyeFill, BsPencil, BsPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import { toast } from "react-toastify";

// import DashBoardLayout from "src/Layout/DasboardsLayout";
// import { useFetch } from "src/lib/hooks/useFetch";
// import { useAxios } from "../../utils/axios";

// import Sidebar from "../../../components/sidebar/Sidebar";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/navbar/AdminNavbar";
import { FaArrowDown, FaCartArrowDown, FaUser } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { LuLayoutDashboard, LuContact } from "react-icons/lu";
import { TbBrandProducthunt, TbLogout } from "react-icons/tb";
import { PiUsersFourLight } from "react-icons/pi";
import { RiInboxArchiveFill } from "react-icons/ri";
import { LiaFileInvoiceSolid } from "react-icons/lia";

const AnalyticsAndReports = () => {

    const [loading, setLoading] = useState(false);
    const [menuStates, setMenuStates] = useState({
        personalInformation: true,
        siteSettings: false,
        activityMonitor: false,
        securitySettings: false,
        passwordChange: false,
    });

    if (menuStates) {
        console.log(menuStates, "sdkjfhjk")
    }

    const menuItems = [
        {
            id: "personalInformation",
            label: "Personal Information",
            // path: "/client",
            icon: <LuLayoutDashboard size={25} />,
        },
        {
            id: "siteSettings",
            label: "Site Settings",
            // path: "/client/clientProject",
            icon: <TbBrandProducthunt size={25} />,
        },

        {
            id: "activityMonitor",
            label: "Activity Monitor",
            // path: "/",
            icon: <RiInboxArchiveFill size={25} />,
        },
        {
            id: "securitySettings",
            label: "Security Settings",
            // path: "/client/clientInvoice",
            icon: <LiaFileInvoiceSolid size={25} />,
        },
        {
            id: "passwordChange",
            label: "Password Change",
            // path: "/client/clientInvoice",
            icon: <LiaFileInvoiceSolid size={25} />,
        },

    ];
    const handlenavigate = (menuItem) => {
        const updatedStates = {
            personalInformation: false,
            siteSettings: false,
            activityMonitor: false,
            securitySettings: false,
            passwordChange: false,
        };

        updatedStates[menuItem.id] = true;
        setMenuStates(updatedStates);
    };


    // const instance = useAxios();

    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    {/* <main> */}
                    {loading ? <div className="flex items-center justify-center text-3xl h-full">
                        <CircularProgress className="text-3xl" />
                    </div> : <div className=''>
                        <AdminNavbar />

                        <div className="flex">
                            <div className="basis-[20%] border-r-4 border-gray-100 flex flex-col">

                                <div className="px-8 py-16 flex items-center flex-col gap-4 hover:bg-blue-50">
                                    <img src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                        className="w-16 aspect-square object-cover border-2 border-sky-600 p-1 rounded-full" alt="" />
                                    <div className="whitespace-nowrap sidebar-user-profile">
                                        <h3 className="text-lg font-semibold mb-1 text-center">Mohsin B.W.</h3>
                                        <span
                                            className="py-1 px-2 rounded-full text-sm font-medium text-center">moshin532@ioninks.com</span>
                                    </div>
                                </div>
                                <div>
                                    <ul className="mb-6 flex flex-col gap-1.5">
                                        {menuItems.map((menuItem) => (
                                            <li key={menuItem.id}>
                                                <label
                                                    onClick={() => handlenavigate(menuItem)}
                                                    className={`group relative cursor-pointer flex items-center gap-2.5  py-4 px-4 font-medium text-black duration-300 ease-in-out hover:bg-[#F9F5F6] hover:text-primary-blue ${menuStates[menuItem.id]
                                                        ? 'bg-[#F9F5F6] text-primary-blue'
                                                        : ''
                                                        } `}
                                                >
                                                    {menuItem.icon}
                                                    {menuItem.label}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>


                            </div>

                            <div className="basis-[80%]">







                                {/* <!-- Personal Information --> */}

                                {menuStates.personalInformation && <div className="p-8 tab-content" id="personal-information">
                                    <div className="flex items-center">
                                        <div>
                                            <h1 className="text-3xl leading-9 tracking-tight text-gray-900 max-sm:text-2xl">Personal Information
                                            </h1>
                                            <p className="leading-9 tracking-tight text-gray-500">Set a unique
                                                password to protect your account, Set a unique
                                                password to protect your account Here is your last 10 login activities log.</p>
                                        </div>
                                    </div>
                                    <hr className="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-200 max-sm:my-4" />
                                    <div className="flex items-center mt-4">
                                        <div>
                                            <h1 className="text-3xl leading-9 tracking-tight text-gray-900 max-sm:text-2xl">About</h1>
                                            <p className="leading-9 tracking-tight text-gray-500">Set a unique
                                                password to protect your account, Set a unique
                                                password to protect your account Here is your last 10 login activities log. Set a unique
                                                password to protect your account, Set a unique
                                                password to protect your account Here is your last 10 login activities log.
                                                <p className="leading-9 tracking-tight text-gray-500">Here is your last 10 login activities log.</p>
                                            </p>
                                        </div>
                                    </div>
                                    <hr className="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-200 max-sm:my-4" />
                                    <div className="flex items-center mt-4">
                                        <div>

                                            <div className="flex justify-between w-full">
                                                <h1 className="text-3xl leading-9 tracking-tight text-gray-900 max-sm:text-2xl">Contact</h1>
                                                <button className="py-1 px-4 rounded-lg bg-gray-200 text-primary-blue">
                                                    Edit
                                                </button>
                                            </div>
                                            <div>
                                                <div className="mt-2 border-t border-gray-100">
                                                    <dl className="divide-y divide-gray-100">
                                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Full Name</dt>
                                                            <dt
                                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                Mohsin
                                                                Zakir Baringwala</dt>
                                                        </div>
                                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Display Name</dt>
                                                            <dt
                                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                Mohsin.B.W.</dt>
                                                        </div>
                                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                                            <dt
                                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                mohsin532@gmail.com</dt>
                                                        </div>
                                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
                                                            <dt
                                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                +91-1452365214</dt>
                                                        </div>
                                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Date of Birth</dt>
                                                            <dt
                                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                08/07/1988</dt>
                                                        </div>

                                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                                                            <dt
                                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                Lorem ipsum dolor sit amat, consectatur itae</dt>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200 max-sm:my-4" />

                                    <div className="flex items-center mt-12">
                                        <div>
                                            <div className="flex justify-between w-full">
                                                <h1 className="text-3xl leading-9 tracking-tight text-gray-900 max-sm:text-2xl">Preferance</h1>
                                                <button className="py-1 px-4 rounded-lg bg-gray-200 text-primary-blue">
                                                    Edit
                                                </button>
                                            </div>

                                            <div>
                                                <div className="mt-2 border-t border-gray-100">
                                                    <dl className="divide-y divide-gray-100">
                                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Language</dt>
                                                            <dt
                                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                English</dt>
                                                        </div>
                                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Date Format</dt>
                                                            <dt
                                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                DD.MM.YYYY</dt>
                                                        </div>
                                                        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                            <dt className="text-sm font-medium leading-6 text-gray-900">Timezone</dt>
                                                            <dt
                                                                className="text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                Kolkata (GMT+5.30)</dt>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>}

                                {/* <!-- Personal Information --> */}

                                {/* <!-- Site Settings --> */}
                                {menuStates.siteSettings && <div className="p-4 tab-content " id="site-settings">
                                    <div className="flex items-center">
                                        <div>
                                            <h1 className="text-3xl leading-9 tracking-tight text-gray-900 max-sm:text-2xl">Payment
                                                Configuration</h1>
                                            <p className="leading-9 tracking-tight text-gray-500">Set a unique
                                                password to protect your account, Set a unique
                                                password to protect your account Here is your last 10 login activities log, Here is your
                                                last 10 login activities log, Here is your last 10 login activities log.</p>
                                        </div>
                                    </div>
                                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200 max-sm:my-4" />

                                    <div className="mt-4 mb-8">
                                        <div>
                                            <h1 className="text-2xl leading-9 tracking-tight text-gray-900">Payment Options</h1>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Cash On Delivery
                                                    (C.O.D)
                                                </h1>
                                            </div>
                                            <label for="check0" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check0" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Credit Card & Debit
                                                    Card
                                                </h1>
                                            </div>
                                            <label for="check1" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check1" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">E.M.I with redit
                                                    Card
                                                </h1>
                                            </div>
                                            <label for="check2" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check2" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Unified Payments
                                                    Interface (UPI)
                                                </h1>
                                            </div>
                                            <label for="check3" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check3" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Payment Via PAYPAL
                                                </h1>
                                            </div>
                                            <label for="check4" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check4" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Payment via Crypto
                                                    Currency
                                                </h1>
                                            </div>
                                            <label for="check5" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check5" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200 max-sm:my-4" />

                                    <div className="flex mt-4 items-center">
                                        <div>
                                            <h1 className="text-3xl leading-9 tracking-tight text-gray-900 max-sm:text-2xl">Tax Configuration
                                            </h1>
                                            <p className="leading-9 tracking-tight text-gray-500">Set a unique
                                                password to protect your account, Set a unique
                                                password to protect your account Here is your last 10 login activities log, Here is your
                                                last 10 login activities log, Here is your last 10 login activities log.</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 mb-8">
                                        <div className="flex w-1/2 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div className="max-sm:w-1/2">
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Tax
                                                    amount based on
                                                    shipping
                                                    charges
                                                </h1>
                                            </div>
                                            <div className="max-sm:w-1/2">
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input type="text" name="price" id="price"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:pl-4 pr-4"
                                                        placeholder="18%" />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="flex w-1/2 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div className="max-sm:w-1/2">
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Tax amount for T.V.
                                                </h1>
                                            </div>
                                            <div className="max-sm:w-1/2">
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input type="text" name="price" id="price"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:pl-4 pr-4"
                                                        placeholder="18%" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-1/2 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div className="max-sm:w-1/2">
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Tax amount for
                                                    Electronics
                                                </h1>
                                            </div>
                                            <div className="max-sm:w-1/2">
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input type="text" name="price" id="price"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:pl-4 pr-4"
                                                        placeholder="18%" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-1/2 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div className="max-sm:w-1/2">
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Tax amount for Air
                                                    Conditioners
                                                </h1>
                                            </div>
                                            <div className="max-sm:w-1/2">
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input type="text" name="price" id="price"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:pl-4 pr-4"
                                                        placeholder="18%" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-1/2 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div className="max-sm:w-1/2">
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Tax amount for
                                                    Washing Machine
                                                </h1>
                                            </div>
                                            <div className="max-sm:w-1/2">
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input type="text" name="price" id="price"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:pl-4 pr-4"
                                                        placeholder="18%" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-1/2 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div className="max-sm:w-1/2">
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Tax amount for
                                                </h1>
                                            </div>
                                            <div className="max-sm:w-1/2">
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input type="text" name="price" id="price"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-sm:pl-4 pr-4"
                                                        placeholder="18%" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200 max-sm:my-4" />

                                    <div className="flex mt-4 items-center">
                                        <div>
                                            <h1 className="text-3xl leading-9 tracking-tight text-gray-900 max-sm:text-2xl">Shipping Options
                                            </h1>
                                            <p className="leading-9 tracking-tight text-gray-500">Set a unique
                                                password to protect your account, Set a unique
                                                password to protect your account Here is your last 10 login activities log, Here is your
                                                last 10 login activities log, Here is your last 10 login activities log.</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 mb-8">
                                        <div>
                                            <h1 className="text-2xl leading-9 tracking-tight text-gray-900">Shipping Types</h1>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">In store pickup
                                                </h1>
                                            </div>
                                            <label for="check6" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check6" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Normal Delivery
                                                </h1>
                                            </div>
                                            <label for="check7" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check7" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Express Delivery
                                                </h1>
                                            </div>
                                            <label for="check8" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check8" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">By AIR Delivery
                                                </h1>
                                            </div>
                                            <label for="check9" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check9" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">By AIR Express
                                                    Delivery
                                                </h1>
                                            </div>
                                            <label for="check10" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check10" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                        <div className="flex w-1/3 items-center justify-between gap-4 mt-4 max-sm:w-full">
                                            <div>
                                                <h1 className="text-1xl font-medium leading-6 text-gray-500 max-sm:text-xs">Via indian Railways
                                                    (Self Pickup)
                                                </h1>
                                            </div>
                                            <label for="check11" className="bg-gray-100 cursor-pointer relative w-10 h-5 rounded-full">
                                                <input type="checkbox" id="check11" className="sr-only peer" />
                                                <span
                                                    className="w-2/5 h-3/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-5 transition-all duration-500"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>}

                                {/* <!-- Site Settings --> */}

                                {/* <!-- Activity Monitor --> */}

                                {menuStates.activityMonitor && <div class="p-16 w-full tab-content " id="activity-monitor">
                                    <div class="flex items-center">
                                        <div>
                                            <h1 class="text-3xl leading-9 tracking-tight text-gray-900 max-sm:text-2xl">Login Activity</h1>
                                            <p class="leading-9 tracking-tight text-gray-500">Here is your last 10 login activities log.</p>
                                        </div>
                                    </div>
                                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200 max-sm:my-4" />

                                    <table class="mt-5 font-[Poppins] border-2 border-grey-200 w-full">
                                        <thead class="">
                                            <tr>
                                                <th class="py-3 bg-sky-200">Name</th>
                                                <th class="py-3 bg-sky-200">IP</th>
                                                <th class="py-3 bg-sky-200">Time</th>
                                                <th class="py-3 bg-sky-200">#</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-cyan-900 text-center">
                                            <tr class="border-2 border-grey-200 cursor-pointer duration-300">
                                                <td class="py-3">Chrome</td>
                                                <td class="py-3">125</td>
                                                <td class="py-3">Depatment</td>
                                                <td class="py-3 font-semibold">Delete</td>
                                            </tr>
                                            <tr class="border-2 border-grey-200 cursor-pointer duration-300">
                                                <td class="py-3">Chrome</td>
                                                <td class="py-3">125</td>
                                                <td class="py-3">Depatment</td>
                                                <td class="py-3 font-semibold">Delete</td>
                                            </tr>
                                            <tr class="border-2 border-grey-200 cursor-pointer duration-300">
                                                <td class="py-3">Chrome</td>
                                                <td class="py-3">125</td>
                                                <td class="py-3">Depatment</td>
                                                <td class="py-3 font-semibold">Delete</td>
                                            </tr>
                                            <tr class="border-2 border-grey-200 cursor-pointer duration-300">
                                                <td class="py-3">Chrome</td>
                                                <td class="py-3">125</td>
                                                <td class="py-3">Depatment</td>
                                                <td class="py-3 font-semibold">Delete</td>
                                            </tr>
                                            <tr class="border-2 border-grey-200 cursor-pointer duration-300">
                                                <td class="py-3">Chrome</td>
                                                <td class="py-3">125</td>
                                                <td class="py-3">Depatment</td>
                                                <td class="py-3 font-semibold">Delete</td>
                                            </tr>
                                            <tr class="border-2 border-grey-200 cursor-pointer duration-300">
                                                <td class="py-3">Chrome</td>
                                                <td class="py-3">125</td>
                                                <td class="py-3">Depatment</td>
                                                <td class="py-3 font-semibold">Delete</td>
                                            </tr>
                                            <tr class="border-2 border-grey-200 cursor-pointer duration-300">
                                                <td class="py-3">Chrome</td>
                                                <td class="py-3">125</td>
                                                <td class="py-3">Depatment</td>
                                                <td class="py-3 font-semibold">Delete</td>
                                            </tr>
                                            <tr class="border-2 border-grey-200 cursor-pointer duration-300">
                                                <td class="py-3">Chrome</td>
                                                <td class="py-3">125</td>
                                                <td class="py-3">Depatment</td>
                                                <td class="py-3 font-semibold">Delete</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>}


                                {/* <!-- Activity Monitor --> */}



                                {/* <!-- Security Settings --> */}

                                {menuStates.securitySettings && <div class="p-16 w-full tab-content " id="security-settings">
                                    <div class="flex items-center gap-4">
                                        <div>
                                            <h1 class="text-3xl leading-9 tracking-tight text-gray-900 max-sm:text-2xl">Security Settings
                                            </h1>
                                            <p class="leading-9 tracking-tight text-gray-500">These settings are help you keep your account
                                                secure</p>
                                        </div>
                                    </div>
                                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200 max-sm:my-4" />

                                    <div class="flex justify-between items-center gap-4 mt-4">
                                        <div>
                                            <h1 class="text-2xl leading-9 tracking-tight text-gray-900">Save my Acitvity Logs</h1>
                                            <p class="leading-9 tracking-tight text-gray-500">You can save your all activity logs including
                                                unusual activity delected</p>
                                        </div>
                                        <label for="check12"
                                            class="bg-gray-100 cursor-pointer relative w-20 h-10 rounded-full max-sm:w-15 max-sm:h-5">
                                            <input type="checkbox" id="check12" class="sr-only peer" />
                                            <span
                                                class="w-2/5 h-4/5 bg-indigo-300 absolute rounded-full left-1 top-1 peer-checked:bg-indigo-600 peer-checked:left-11 transition-all duration-500 max-sm:peer-checked:left-4 max-sm:h-3/5"></span>
                                        </label>
                                    </div>
                                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200 max-sm:my-4" />

                                    <div class="flex items-center gap-4 mt-4">
                                        <div>
                                            <h1 class="text-2xl leading-9 tracking-tight text-gray-900">2 Factor Auth</h1>
                                            <p class="leading-9 tracking-tight text-gray-500">You can save your all activity logs including
                                                unusual activity delected, You can save your all activity logs including
                                                unusual activity delected, You can save your all activity logs including
                                                unusual activity delected, You can save your all activity logs including
                                                unusual activity delected</p>
                                        </div>
                                        <a href="#"
                                            class="py-2 px-4 rounded bg-blue-600 sm:flex items-center gap-2 text-white hover:bg-blue-700 ml-auto hidden">
                                            Disable
                                        </a>
                                    </div>
                                </div>}

                                {/* <!-- Security Settings --> */}


                                {/* <!-- Password Change --> */}

                                {menuStates.passwordChange && <div class="p-16 w-full tab-content " id="password-change">
                                    <div class="">
                                        <div class="sm:w-full sm:max-w-sm">
                                            <h1 class="text-3xl leading-9 tracking-tight text-gray-900 max-sm:text-2xl">Change Password</h1>
                                            <p class="leading-9 tracking-tight text-gray-500">Set a unique
                                                password to protect your account</p>
                                        </div>
                                        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200 max-sm:my-4" />

                                        <div class="sm:w-full sm:max-w-sm">
                                            <form class="space-y-6" action="#" method="POST">
                                                <div>
                                                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Old
                                                        Password :</label>
                                                    <div class="mt-2">
                                                        <input id="email" name="email" type="email" placeholder="Type Old Password"
                                                            autocomplete="email" required
                                                            class="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div class="flex items-center justify-between">
                                                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">New
                                                            Password :</label>
                                                    </div>
                                                    <div class="mt-2">
                                                        <input id="password" name="password" type="password" placeholder="Type New Password"
                                                            autocomplete="current-password" required
                                                            class="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div class="flex items-center justify-between">
                                                        <label for="password"
                                                            class="block text-sm font-medium leading-6 text-gray-900">Confirm New Password
                                                            :</label>
                                                    </div>
                                                    <div class="mt-2">
                                                        <input id="password" name="password" type="password"
                                                            placeholder="Re-Type New Password" autocomplete="current-password" required
                                                            class="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <button type="submit"
                                                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Change
                                                        Password</button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>}

                                {/* <!-- Password Change --> */}

                            </div>

                        </div>
                    </div>}
                </div>
                {/* </main> */}
            </div>
        </div >

        // </div>
    );
};

export default AnalyticsAndReports;
