import {
    Box,
    Card,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    LinearProgress,
    Switch,
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
// import { location, newResponse, Pagination, response, User } from "src/@types";
// import { AdminCustomers } from "../../../componets/user/adminCustomer";
// import AdminsideNav from "../../../componets/admin/adminDasboardnav";
import ConfirmBox from "../../../components/admin/shared/ConfirmDialog";
// import DashBoardLayout from "src/Layout/DasboardsLayout";
// import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "../../../utils/axios";
import { tableStyles } from "../../../components/admin/shared/ConfirmDialog";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/navbar/AdminNavbar";
import { FaArrowDown, FaCartArrowDown } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddCustomerForMembershipModal from "../../../components/admin/modals/AddCustomerForMembershipModal";
// import CustomPagination from "src/componets/customPagination";
// import { ErrorDispaly } from "../property";


export const Button = ({
    name,
    Icon,
    Color,
}) => {
    return (
        <div
            className={
                Color +
                " bg-white font-bold w-full rounded-sm shadow-sm flex space-x-1 items-center justify-center px-4 p-1 max-w-max border border-[#DEDEDE]"
            }
        >
            <div className="text-xs">{<Icon />}</div>
            <div>
                <p className=" text-[10px]">{name}</p>
            </div>
        </div>
    );
};

const userTypes = ["All", "Premium"];

// give main area a max widht
const EditMembershipPlans = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const instance = useAxios();

    // ---------------------------------------- Bronze Membership States-----------------------------------------

    const televisionTypes = [
        { "L.C.D": true },
        { "L.E.D": true },
        { "Plasma": true },
        { "Smart T.V": true }
    ];
    const fridgeHouseholdTypes = [
        { "Classic Single Door Fridge": true },
        { "Top Freezer": true },
        { "Bottom Freezer": false },
        { "Side by Side": false },
        { "French Door": false }
    ];

    const fridgeCommercialTypes = [
        { "Visi Cooler": true },
        { "Deep Freezer": true },
        { "Confectionery Showcase": false },
        { "Under Counter Chiller": false }
    ];

    const microwaveHouseholdTypes = [
        { "Microwave": true },
        { "O.T.G": true },
        { "Convection Oven": true }
    ];

    const microwaveCommercialTypes = [
        { "Standard Oven": true },
        { "Pizza Oven": false },
        { "Conveyor Oven": false },
        { "Rotisserie Oven": false }
    ];

    const washingMachineTypes = [
        { "Top Load Agitator": true },
        { "Top Load Impeller": true },
        { "Front Load": false },
        { "Fully Automatic Front Load": false }
    ];

    const airConditionerTypes = [
        { "Window A/C": true },
        { "Split A/C": true },
        { "Inverter Split A/C": false },
        { "Cooling Casette": false },
        { "Column A/C": false }
    ];

    const mixedTypes = [
        { "Juicer": true },
        { "Mixer Grinder": true },
        { "Water Purifier": true }
    ];
    // ---------------------------------------- Bronze Membership States-----------------------------------------

    // ---------------------------------------- Silver Membership States-----------------------------------------
    const silverTelevisionTypes = [
        { "L.C.D": true },
        { "L.E.D": true },
        { "Plasma": true },
        { "Smart T.V": true }
    ];
    const silverFridgeHouseholdTypes = [
        { "Classic Single Door Fridge": true },
        { "Top Freezer": true },
        { "Bottom Freezer": true },
        { "Side by Side": false },
        { "French Door": false }
    ];

    const silverFridgeCommercialTypes = [
        { "Visi Cooler": true },
        { "Deep Freezer": true },
        { "Confectionery Showcase": true },
        { "Under Counter Chiller": false }
    ];

    const silverMicrowaveHouseholdTypes = [
        { "Microwave": true },
        { "O.T.G": true },
        { "Convection Oven": true }
    ];

    const silverMicrowaveCommercialTypes = [
        { "Standard Oven": true },
        { "Pizza Oven": true },
        { "Conveyor Oven": false },
        { "Rotisserie Oven": false }
    ];

    const silverWashingMachineTypes = [
        { "Top Load Agitator": true },
        { "Top Load Impeller": true },
        { "Front Load": true },
        { "Fully Automatic Front Load": false }
    ];

    const silverAirConditionerTypes = [
        { "Window A/C": true },
        { "Split A/C": true },
        { "Inverter Split A/C": true },
        { "Cooling Casette": false },
        { "Column A/C": false }
    ];

    const silverMixedTypes = [
        { "Juicer": true },
        { "Mixer Grinder": true },
        { "Water Purifier": true }
    ];



    // ---------------------------------------- Silver Membership States-----------------------------------------


    // ---------------------------------------- Gold Membership States-----------------------------------------
    const goldTelevisionTypes = [
        { "L.C.D": true },
        { "L.E.D": true },
        { "Plasma": true },
        { "Smart T.V": true }
    ];
    const goldFridgeHouseholdTypes = [
        { "Classic Single Door Fridge": true },
        { "Top Freezer": true },
        { "Bottom Freezer": true },
        { "Side by Side": true },
        { "French Door": true }
    ];

    const goldFridgeCommercialTypes = [
        { "Visi Cooler": true },
        { "Deep Freezer": true },
        { "Confectionery Showcase": true },
        { "Under Counter Chiller": true }
    ];

    const goldMicrowaveHouseholdTypes = [
        { "Microwave": true },
        { "O.T.G": true },
        { "Convection Oven": true }
    ];

    const goldMicrowaveCommercialTypes = [
        { "Standard Oven": true },
        { "Pizza Oven": true },
        { "Conveyor Oven": true },
        { "Rotisserie Oven": true }
    ];

    const goldWashingMachineTypes = [
        { "Top Load Agitator": true },
        { "Top Load Impeller": true },
        { "Front Load": true },
        { "Fully Automatic Front Load": true }
    ];

    const goldAirConditionerTypes = [
        { "Window A/C": true },
        { "Split A/C": true },
        { "Inverter Split A/C": true },
        { "Cooling Casette": true },
        { "Column A/C": true }
    ];

    const goldMixedTypes = [
        { "Juicer": true },
        { "Mixer Grinder": true },
        { "Water Purifier": true }
    ];



    // ---------------------------------------- Gold Membership States-----------------------------------------



    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    {/* <main> */}
                    <div className='bg-gray-50'>
                        <AdminNavbar />
                        <div className="flex justify-between items-center mt-8 mb-6 px-4">
                            <div className=" text-sm px-3 basis-[18%]">
                                <button
                                    onClick={() => navigate("/admin/membership")}
                                    className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                >
                                    <span>
                                        {/* <TbEdit /> */}
                                    </span>
                                    <span>Membership Management</span>
                                </button>
                            </div>
                            <div className=" text-sm px-3 flex gap-4">
                                {/* <button
                                    onClick={() => navigate("/admin/editMembershipPlans")}
                                    className=" px-3 font-medium  w-full border-2 border-primary-blue text-primary-blue rounded-xl py-3  transition transform active:scale-95 duration-200  "
                                >
                                    Edit Membership Details
                                </button> */}

                                <button
                                    // onClick={() => router.push("/admin/customers/add")}
                                    className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                >
                                    <span>
                                        <TbEdit />
                                    </span>
                                    {/* <span>Add New Customer</span> */}
                                    <AddCustomerForMembershipModal
                                        buttonText="Add New Customer"
                                        modalTitle="Add New Customer"
                                    // onSubmit={projectSubmit}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-12 mx-8">



                            {/* // ---------------------------------------- Bronze Membership States----------------------------------------- */}
                            <p className="text-center text-4xl font-bold">Bronze Membership</p>


                            <div className="mt-8">
                                <p className="my-4 text-xl font-semibold">Television</p>
                                <p className="mb-4 text-xl font-semibold">20” , 21” - 29” </p>
                                <div className="flex gap-12">
                                    {televisionTypes.map((type, index) => {
                                        const key = Object.keys(type)[0]; // Extract the key (e.g., "L.C.D")
                                        const value = type[key]; // Extract the value (true or false)

                                        return (
                                            <FormControlLabel
                                                key={index}
                                                label={key}
                                                control={
                                                    <Switch
                                                        checked={value}
                                                    // Handle onChange if needed
                                                    />
                                                }
                                                className="mr-4"
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Fridge - Household</p>
                                <div className="flex gap-12">
                                    {fridgeHouseholdTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>

                                <p className="my-4 text-xl font-semibold">Fridge - Commercial</p>
                                <div className="flex gap-12">
                                    {fridgeCommercialTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Washing Machine</p>
                                <div className="flex gap-12">
                                    {washingMachineTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Air Conditioner</p>
                                <div className="flex gap-12">
                                    {airConditionerTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Microwave</p>
                                <p className="mb-4 text-xl font-semibold">HouseHold </p>
                                <div className="flex gap-12">
                                    {microwaveHouseholdTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                                <p className="my-4 text-xl font-semibold">Commercial </p>
                                <div className="flex gap-12">
                                    {microwaveCommercialTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Mixed Types</p>
                                <div className="flex gap-12">
                                    {mixedTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>


                            {/* // ---------------------------------------- Bronze Membership States----------------------------------------- */}





                            {/* // ---------------------------------------- Silver Membership States----------------------------------------- */}


                            <p className="text-center text-4xl font-bold my-8">Silver Membership</p>


                            <div className="mt-8">
                                <p className="my-4 text-xl font-semibold">Television</p>
                                <p className="mb-4 text-xl font-semibold">20” , 21” - 29” , 30”-39” , 40” - 49” </p>
                                <div className="flex gap-12">
                                    {silverTelevisionTypes.map((type, index) => {
                                        const key = Object.keys(type)[0]; // Extract the key (e.g., "L.C.D")
                                        const value = type[key]; // Extract the value (true or false)

                                        return (
                                            <FormControlLabel
                                                key={index}
                                                label={key}
                                                control={
                                                    <Switch
                                                        checked={value}
                                                    // Handle onChange if needed
                                                    />
                                                }
                                                className="mr-4"
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Fridge - Household</p>
                                <div className="flex gap-12">
                                    {silverFridgeHouseholdTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>

                                <p className="my-4 text-xl font-semibold">Fridge - Commercial</p>
                                <div className="flex gap-12">
                                    {silverFridgeCommercialTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Washing Machine</p>
                                <div className="flex gap-12">
                                    {silverWashingMachineTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Air Conditioner</p>
                                <div className="flex gap-12">
                                    {silverAirConditionerTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Microwave</p>
                                <p className="mb-4 text-xl font-semibold">HouseHold </p>
                                <div className="flex gap-12">
                                    {silverMicrowaveHouseholdTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                                <p className="my-4 text-xl font-semibold">Commercial </p>
                                <div className="flex gap-12">
                                    {silverMicrowaveCommercialTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Mixed Types</p>
                                <div className="flex gap-12">
                                    {silverMixedTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>





                            {/* // ---------------------------------------- Silver Membership States----------------------------------------- */}





                            {/* // ---------------------------------------- Gold Membership States----------------------------------------- */}


                            <p className="text-center text-4xl font-bold my-8">Gold Membership</p>


                            <div className="mt-8">
                                <p className="my-4 text-xl font-semibold">Television</p>
                                <p className="mb-4 text-xl font-semibold">20” , 21” - 29” , 30”-39” , 40” - 49” , 50” - 59” , 60” & More </p>
                                <div className="flex gap-12">
                                    {goldTelevisionTypes.map((type, index) => {
                                        const key = Object.keys(type)[0]; // Extract the key (e.g., "L.C.D")
                                        const value = type[key]; // Extract the value (true or false)

                                        return (
                                            <FormControlLabel
                                                key={index}
                                                label={key}
                                                control={
                                                    <Switch
                                                        checked={value}
                                                    // Handle onChange if needed
                                                    />
                                                }
                                                className="mr-4"
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Fridge - Household</p>
                                <div className="flex gap-12">
                                    {goldFridgeHouseholdTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>

                                <p className="my-4 text-xl font-semibold">Fridge - Commercial</p>
                                <div className="flex gap-12">
                                    {goldFridgeCommercialTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Washing Machine</p>
                                <div className="flex gap-12">
                                    {goldWashingMachineTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Air Conditioner</p>
                                <div className="flex gap-12">
                                    {goldAirConditionerTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Microwave</p>
                                <p className="mb-4 text-xl font-semibold">HouseHold </p>
                                <div className="flex gap-12">
                                    {goldMicrowaveHouseholdTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                                <p className="my-4 text-xl font-semibold">Commercial </p>
                                <div className="flex gap-12">
                                    {goldMicrowaveCommercialTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16">
                                <p className="my-4 text-xl font-semibold">Mixed Types</p>
                                <div className="flex gap-12">
                                    {goldMixedTypes.map((type, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={Object.keys(type)[0]}
                                            control={
                                                <Switch
                                                    checked={Object.values(type)[0]}
                                                // Handle onChange if needed
                                                />
                                            }
                                            className="mr-4"
                                        />
                                    ))}
                                </div>
                            </div>




                            {/* // ---------------------------------------- Gold Membership States----------------------------------------- */}



                        </div>


                    </div>
                </div>
                {/* </main> */}
            </div>
        </div >

        // </div>
    );
};

export default EditMembershipPlans;
