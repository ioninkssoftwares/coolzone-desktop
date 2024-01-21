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
// import { tableStyles } from "../../components/admin/shared/ConfirmDialog";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/navbar/AdminNavbar";
import { FaArrowDown, FaCartArrowDown } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import AddCouponPartnerModal from "../../../components/admin/modals/AddCouponPartnerModal";
import { useNavigate } from "react-router-dom";
import CouponDetailsModal from "../../../components/admin/modals/CouponDetailsModal";
import { useCookies } from "react-cookie";
import CreateCouponModal from "../../../components/admin/modals/CreateCouponModal";
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
const PartnerCouponManagement = () => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [token, setToken] = useState("");
    const [coupons, setCoupons] = useState([]);
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const [pagination, setPagination] = useState(
        null
    );
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 50,
    });
    const [name, setName] = useState("");
    const [selected, setSelected] = useState("All");
    const navigate = useNavigate();
    const instance = useAxios(token);
    const [couponAdded, setCouponAdded] = useState(false)

    async function getAllCoupons() {

        try {
            setLoading(true);
            const res = await instance.get(
                `/admin/coupons`
            );
            if (res.data) {
                setCoupons(res.data.allCouponList);
                // setPagination(res?.data?.pagination);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(() => {
        if (token) getAllCoupons();
    }, [token]);


    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "fdsfsdfsf")
            setToken(cookies.adminToken);
        }
    }, [cookies]);


    async function deleteCoupon() {
        try {
            setDeleteLoading(true);
            const res = await instance.delete("/coupon/" + deleteId);
            if (res.data) {
                toast.success("Coupon Deleted Successfully");
                setDeleteLoading(false);
                setDeleteOpen(false);
                getAllCoupons()
                // getAllUsers();
            }
        } catch (e) {
            setDeleteLoading(false);
            // ErrorDispaly(e);
        }
    }

    useEffect(() => {
        if (couponAdded === true) {
            getAllCoupons()
        }
    }, [couponAdded])



    const all_customer_columns = [
        // {
        //     flex: 0.25,
        //     minWidth: 150,
        //     field: "name",
        //     headerName: "Coupon Name",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        //     renderCell: ({ row }) => (
        //         <Typography variant="body1" fontWeight={500}>
        //             {row?.name}
        //         </Typography>
        //     ),
        // },

        // {
        //     minWidth: 150,
        //     flex: 0.25,
        //     field: "coupontype",
        //     headerName: "Coupon Type",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },
        {
            minWidth: 150,
            flex: 0.25,
            field: "code",
            headerName: "Coupon Code",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },

        // {
        //     minWidth: 150,
        //     flex: 0.25,
        //     field: "amount",
        //     headerName: "Discount",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true, renderCell: ({ row }) => (
        //         <Typography variant="body1" fontWeight={500}>
        //             {`${row?.discount} ${row.percentage ? "%" : "RS"}`}
        //         </Typography>
        //     ),
        // },

        {
            minWidth: 150,
            flex: 0.25,
            field: "amount",
            headerName: "Discount",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },


        // {
        //     minWidth: 150,
        //     flex: 0.25,
        //     field: "expiry",
        //     headerName: "Expiry",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true, renderCell: ({ row }) => (
        //         <Typography variant="body1" fontWeight={500}>
        //             {new Date(row?.expiry).toLocaleDateString('en-GB')}
        //         </Typography>
        //     ),
        // },
        // {
        //     minWidth: 150,
        //     flex: 0.25,
        //     field: "coupontype",
        //     headerName: "Coupon Type",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },
        // {
        //     minWidth: 150,
        //     flex: 0.25,
        //     field: "couponSegment",
        //     headerName: "Coupon Segment",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },
        // {
        //     minWidth: 150,
        //     flex: 0.25,
        //     field: "maxUsePerCustomer",
        //     headerName: "Max User",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },
        // {
        //     minWidth: 150,
        //     flex: 0.25,
        //     field: "discription",
        //     headerName: "Coupon Description",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },



        // {
        //     minWidth: 120,

        //     field: "status",
        //     headerName: "Status",
        //     flex: 0.2,
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        // },
        {
            minWidth: 150,

            field: "action",
            headerName: "ACTION",
            flex: 0.15,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Box>
                    {/* <Tooltip title="Edit">
                        <IconButton
                            // onClick={() => router.push(`/admin/customers/${row._id}`)}
                            color="primary"
                        >
                            <BsEyeFill />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton
                            // onClick={() => router.push(`/admin/customers/edit/${row._id}`)}
                            color="primary"
                        >
                            <BsPencilFill />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => {
                                setDeleteId(row?._id);
                                setDeleteOpen(true);
                            }}
                            color="error"
                        >
                            <MdDeleteForever />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
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
                            <div className=" text-sm w-[30%] flex gap-2 px-3">
                                {/* <button
                                    className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                >
                                    <span>
                                  
                                    </span>
                                    <span onClick={() => navigate("/admin/createCoupon")}>Coupon Codes</span>
                                </button> */}
                                {/* <button
                                    className=" px-3  text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                >
                                    <span>
                                   
                                    </span>
                                    <span >Coupon Codes</span>
                                    <CouponDetailsModal
                                        buttonText="Coupon Details"
                                        modalTitle="Coupon Details " />
                                </button> */}
                            </div>
                            <div className=" text-sm px-3">
                                <button
                                    // onClick={() => router.push("/admin/customers/add")}
                                    className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                >
                                    <span>
                                        <TbEdit />
                                    </span>
                                    {/* <span>Add a new Affiliated Partner</span> */}
                                    {/* <AddCouponPartnerModal
                                        buttonText="Add a new Affiliated Partner"
                                        modalTitle="Add a New Partner"
                                    // onSubmit={projectSubmit}
                                    /> */}
                                    <CreateCouponModal
                                        buttonText="Create a Coupon"
                                        modalTitle="Add a New Coupon "
                                        isCouponAdded={setCouponAdded}
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
                                <div className="mt-8 flex items-center justify-start gap-36 w-full">
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            All Coupons
                                        </p>
                                        <p className="text-xl font-bold">
                                            25
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Active Coupons
                                        </p>
                                        <p className="text-xl font-bold">
                                            21
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Inactive Coupons
                                        </p>
                                        <p className="text-xl font-bold">
                                            4

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
                                <div className="mt-8 flex items-center justify-start gap-28 w-full">
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Total Purchasing
                                        </p>
                                        <p className="text-xl font-bold">
                                            6,56,567

                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            Cashback Given
                                        </p>
                                        <p className="text-xl font-bold">
                                            63,500
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-xl text-gray-400">
                                            No. of times Coupon Used
                                        </p>
                                        <p className="text-xl font-bold">
                                            95
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
                                <p className="text-2xl ">Affiliated Partners</p>
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

                        <Grid container spacing={6} >
                            <Grid item xs={12}>
                                <Card sx={{ borderRadius: 2 }}>
                                    <DataGrid
                                        rows={coupons || []}
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

                        {/* {users && <AdminCustomers users={users} />} */}

                        <ConfirmBox
                            title="Coupon"
                            name="coupon"
                            open={deleteOpen}
                            closeDialog={() => setDeleteOpen(false)}
                            toDoFunction={deleteCoupon}
                            loading={deleteLoading}
                            sx={{ pb: 4, border: "2px solid red" }}
                        />
                    </div>}
                </div>
                {/* </main> */}
            </div>
        </div >

        // </div>
    );
};

export default PartnerCouponManagement;
