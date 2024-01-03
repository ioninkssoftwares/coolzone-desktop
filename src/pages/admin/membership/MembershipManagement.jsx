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
import { useCookies } from "react-cookie";
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
const MembershipManagement = () => {
    const navigate = useNavigate();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [token, setToken] = useState("");
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const instance = useAxios(token);
    const [membershipList, setMemberShipList] = useState([]);
    const [pagination, setPagination] = useState(
        null
    );
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 50,
    });
    const [name, setName] = useState("");
    const [selected, setSelected] = useState("All");
    // const router = useRouter();

    const getAllMembershipList = async () => {
        try {
            setLoading(true)
            const res = await instance.get("/admin/membershipslist")
            if (res.data) {
                setLoading(false)
                setMemberShipList(res.data.data)
            }


        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.message || error.message)
        }
    }


    useEffect(() => {
        if (token) {
            getAllMembershipList()
        }
    }, [token])


    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "fdsfsdfsf")
            setToken(cookies.adminToken);
        }
    }, [cookies]);




    const all_customer_columns = [
        {
            flex: 0.25,
            minWidth: 150,

            field: "username",
            headerName: "Customer Name",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {row?.username}
                </Typography>
            ),
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "email",
            headerName: "Email",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "phone",
            headerName: "Phone",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        // {
        //     minWidth: 150,

        //     flex: 0.25,
        //     field: "city",
        //     headerName: "City",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },
        {
            minWidth: 120,

            field: "membershipType",
            headerName: "Membership Type",
            flex: 0.2,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },

        {
            minWidth: 150,
            flex: 0.25,
            field: "memberSince",
            headerName: "Member Since",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true, renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {new Date(row?.memberSince).toLocaleDateString('en-GB')}
                </Typography>
            ),
        },

        {
            minWidth: 120,

            field: "isActiveMembership",
            headerName: "Status",
            flex: 0.2,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        // {
        //     minWidth: 150,

        //     field: "action",
        //     headerName: "ACTION",
        //     flex: 0.15,
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        //     renderCell: ({ row }) => (
        //         <Box>
        //             <Tooltip title="Edit">
        //                 <IconButton
        //                     // onClick={() => router.push(`/admin/customers/${row._id}`)}
        //                     color="primary"
        //                 >
        //                     <BsEyeFill />
        //                 </IconButton>
        //             </Tooltip>
        //             <Tooltip title="Edit">
        //                 <IconButton
        //                     // onClick={() => router.push(`/admin/customers/edit/${row._id}`)}
        //                     color="primary"
        //                 >
        //                     <BsPencilFill />
        //                 </IconButton>
        //             </Tooltip>
        //             <Tooltip title="Delete">
        //                 <IconButton
        //                     onClick={() => {
        //                         setDeleteId(row?._id);
        //                         setDeleteOpen(true);
        //                     }}
        //                     color="error"
        //                 >
        //                     <MdDeleteForever />
        //                 </IconButton>
        //             </Tooltip>
        //         </Box>
        //     ),
        // },
    ];

    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    {/* <main> */}
                    {loading ? <div className="flex items-center justify-center text-3xl h-full">
                        <CircularProgress className="text-3xl" />
                    </div> : <div className='bg-gray-50'>
                        <AdminNavbar />
                        <div className="flex justify-between items-center mt-8 mb-6 px-4">
                            <div className=" text-sm px-3 ">
                                <button
                                    // onClick={() => router.push("/admin/customers/add")}
                                    className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                >
                                    <span>
                                        {/* <TbEdit /> */}
                                    </span>
                                    <span>Membership Management</span>
                                </button>
                            </div>
                            <div className="  basis-[60%] text-sm px-3 flex justify-end gap-4">
                                <button
                                    onClick={() => navigate("/admin/editMembershipPlans")}
                                    className=" px-3 font-medium   border-2 border-primary-blue text-primary-blue rounded-xl py-3  transition transform active:scale-95 duration-200  "
                                >
                                    Edit Membership Details
                                </button>

                                <button
                                    // onClick={() => router.push("/admin/customers/add")}
                                    className=" px-3 text-white font-medium justify-start  bg-primary-blue rounded-lg py-3 flex items-center transition transform active:scale-95 duration-200  "
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

                        <div className="flex md:justify-between md:items-center md:flex-row flex-col justify-center items-center mt-8 mb-6 gap-3 px-8">
                            <div className="basis-[49%] p-4 rounded-2xl bg-white ">
                                <div className="flex justify-between items-center">
                                    <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                        <FiUsers />
                                    </div>
                                    <button className="flex justify-between items-center gap-3 text-gray-400">
                                        This week <FaArrowDown />
                                    </button>
                                </div>
                                <div className="mt-8 flex items-center justify-start gap-28 w-full">
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            All Membership
                                        </p>
                                        <p className="text-xl font-bold">
                                            1,250 <span className="text-green-500 text-sm">+15.80%</span>
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Active
                                        </p>
                                        <p className="text-xl font-bold">
                                            1,190 <span className="text-green-500 text-sm">+85%</span>

                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Inactive
                                        </p>
                                        <p className="text-xl font-bold">
                                            50 <span className="text-red-600 text-sm">-10.80%</span>

                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className="basis-[49%] p-4 rounded-2xl bg-white ">
                                <div className="flex justify-between items-center">
                                    <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                        <FaCartArrowDown />
                                    </div>
                                    <button className="flex justify-between items-center gap-3 text-gray-400">
                                        This week <FaArrowDown />
                                    </button>
                                </div>
                                <div className="mt-8 flex items-center justify-start gap-9 w-full">
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            New Membership
                                        </p>
                                        <p className="text-xl font-bold">
                                            30 <span className="text-red-600 text-sm">-20.80%</span>

                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Cancelled Membership
                                        </p>
                                        <p className="text-xl font-bold">
                                            10
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Suspended Membership
                                        </p>
                                        <p className="text-xl font-bold">
                                            5
                                        </p>
                                    </div>

                                </div>
                            </div>
                            {/* <div className="basis-[25%]  p-4 rounded-2xl bg-white ">
                                <div className="flex justify-between items-center">
                                    <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                        <FiUsers />
                                    </div>
                                    <button className="flex justify-between items-center gap-3 text-gray-400">
                                        This week <FaArrowDown />
                                    </button>
                                </div>
                                <div className="mt-8 flex items-center justify-start gap-20 w-full">
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Abandoned Cart
                                        </p>
                                        <p className="text-xl font-bold">
                                            09% <span className="text-green-400 text-sm">+0.005%</span>
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Customers
                                        </p>
                                        <p className="text-xl font-bold">
                                            45
                                        </p>
                                    </div>


                                </div>

                            </div> */}
                        </div>

                        <div className="flex justify-between items-center mb-8 px-4">
                            <div className="space-x-5">
                                <p className="text-2xl ">Member's List</p>
                            </div>

                            <div className="flex space-x-[12px]">
                                <div className="flex items-center bg-white p-2 rounded-lg space-x-3">
                                    <AiOutlineSearch className="text-xl" />
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        placeholder="search"
                                        className="outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* dashboard caerd */}
                        <Box sx={{ margin: "0 25px" }}>

                            <Grid container spacing={6} sx={{ pb: 38, }}>
                                <Grid item xs={12}>
                                    <Card sx={{ borderRadius: 2 }}>
                                        <DataGrid
                                            rows={membershipList || []}
                                            columns={all_customer_columns}
                                            getRowId={(row) => row._id}
                                            autoHeight
                                            components={{
                                                LoadingOverlay: LinearProgress,
                                            }}
                                            loading={loading}
                                            getRowHeight={() => "auto"}

                                            pagination
                                            paginationModel={paginationModel}
                                            pageSizeOptions={[25, 50, 75, 100]}
                                            rowCount={pagination?.totalUsers}
                                            paginationMode="server"
                                            onPaginationModelChange={setPaginationModel}


                                            // pagination
                                            // rowsPerPageOptions={[5, 10, 25]}
                                            // rowCount={pagination?.totalUsers || 0}
                                            // page={pageState.page - 1}
                                            // pageSize={pageState.pageSize}
                                            // paginationMode="server"
                                            // onPageChange={(newPage: number) => {
                                            //   setPageState((old) => ({ ...old, page: newPage + 1 }));
                                            // }}
                                            // onPageSizeChange={(newPageSize: number) =>
                                            //   setPageState((old) => ({ ...old, pageSize: newPageSize }))
                                            // }
                                            sx={tableStyles}
                                        />
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* {users && <AdminCustomers users={users} />} */}

                        {/* <ConfirmBox
                            title="Customer"
                            name="customer"
                            open={deleteOpen}
                            closeDialog={() => setDeleteOpen(false)}
                            toDoFunction={deleteCustomer}
                            loading={deleteLoading}
                            sx={{ pb: 4, border: "2px solid red" }}
                        /> */}
                    </div>}
                </div>
                {/* </main> */}
            </div>
        </div >

        // </div>
    );
};

export default MembershipManagement;
