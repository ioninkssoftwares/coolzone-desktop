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
// import CustomPagination from "src/componets/customPagination";
// import { ErrorDispaly } from "../property";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


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
const rows = [
    { id: 1, totalOrder: 10000, name: 'Blutooth Devices', price: 14, totalSales: 123456 },
    { id: 2, totalOrder: 10000, name: 'Airpods', price: 31, totalSales: 123456 },
    { id: 3, totalOrder: 10000, name: 'Neck Band', price: 71, totalSales: 123456 },
    { id: 4, totalOrder: 10000, name: 'IR Remote', price: 31, totalSales: 123456 },
    { id: 5, totalOrder: 10000, name: 'Smart Watch', price: 40, totalSales: 123456 },
    { id: 6, totalOrder: 10000, name: 'Power Bank', price: 150, totalSales: 123456 },
];

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        renderCell: (params) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircleIcon style={{ marginRight: '5px' }} />
                {params.value}
            </div>
        ),
        editable: true,
    },
    {
        field: 'totalOrder',
        headerName: 'Total Order',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'totalSales',
        headerName: 'Total Sales',
        type: 'number',
        width: 110,
        editable: true,
    },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.row.firstName || ''} ${params.row.totalOrder || ''}`,
    // },
];

// give main area a max widht
const ProductManagement = () => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const instance = useAxios(token);
    const [allProducts, setAllProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(
        null
    );
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 50,
    });
    const [name, setName] = useState("");
    const [selected, setSelected] = useState("All");
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const navigate = useNavigate();

    // async function getAllUsers() {
    //     let pr = selected === "All" ? `search=${name || ""}` : `premium=true&&search=${name || ""}`
    //     try {
    //         setLoading(true);
    //         const res = await instance.get(
    //             `/admin/user/getAllUsers?page=${paginationModel?.page + 1 || 1}&&limit=${paginationModel?.pageSize || 50}&&${pr}`
    //         );
    //         if (res.data) {
    //             setUsers(res?.data?.data);
    //             setPagination(res?.data?.pagination);
    //             setLoading(false);
    //         }
    //     } catch (e) {
    //         setLoading(false);
    //         // ErrorDispaly(e);
    //     }
    // }

    useEffect(() => {
        // getAllUsers();
    }, [selected, name, paginationModel?.page, paginationModel?.pageSize]);



    if (allProducts) {
        console.log(allProducts, "dshfsjkdfsjk")
    }


    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "fdsfsdfsf")
            setToken(cookies.adminToken);
        }
    }, [cookies]);



    const getProductsByAdmin = async () => {
        setLoading(true)
        try {

            const res = await instance.get("/admin/products")
            if (res.data) {
                setAllProducts(res.data.products)
                setLoading(false)
            }


        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    useEffect(() => {
        if (token) {

            getProductsByAdmin()
        }
    }, [token])


    async function deleteCustomer() {
        try {
            setDeleteLoading(true);
            const res = await instance.delete("/admin/user/deleteUser/" + deleteId);
            if (res.data) {
                toast.success("Customer Deleted Successfully");
                setDeleteLoading(false);
                setDeleteOpen(false);
                getProductsByAdmin();
                // getAllUsers();
            }
        } catch (e) {
            setDeleteLoading(false);
            // ErrorDispaly(e);
        }
    }



    const all_customer_columns = [
        {
            flex: 0.25,
            minWidth: 150,

            field: "productName",
            headerName: "Product Name",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {row?.name}
                </Typography>
            ),
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "category",
            headerName: "Category",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "price",
            headerName: "Selling Price",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "costPrice",
            headerName: "Cost",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "Stock",
            headerName: "In-Stock",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 120,

            field: "discount",
            headerName: "Discount",
            flex: 0.2,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 120,

            field: "totalValue",
            headerName: "Total Value",
            flex: 0.2,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 120,

            field: "status",
            headerName: "Status",
            flex: 0.2,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
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
                    <Tooltip title="Edit">
                        <IconButton
                            // onClick={() => router.push(`/admin/customers/${row._id}`)}
                            onClick={() => navigate(`/admin/editProductDetails/${row._id}`)}
                            color="primary"
                        >
                            <BsPencilFill />
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Edit">
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
                            <div className=" text-sm px-3">
                                <button
                                    // onClick={() => router.push("/admin/customers/add")}
                                    className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                >
                                    <span>
                                        {/* <TbEdit /> */}
                                    </span>
                                    <span>Product</span>
                                </button>
                            </div>
                            <div className=" text-sm px-3">
                                <button
                                    onClick={() => navigate("/admin/addProduct")}
                                    className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
                                >
                                    <span>
                                        <TbEdit />
                                    </span>
                                    <span>Add Product</span>
                                </button>
                            </div>
                        </div>

                        <Box sx={{ height: 400, width: '50%', margin: "0 auto" }}>
                            <Box sx={{ width: '100%', display: 'flex', alignItems: "center", justifyContent: "space-between", margin: "20px 0px" }}>
                                <Typography variant="h5" >
                                    Top Selling Products
                                </Typography>
                                <Typography variant="body1" sx={{ color: "#04a7ff" }}>
                                    See more
                                </Typography>
                            </Box>

                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>

                        <div className="flex justify-between items-center mb-8 mt-12 px-4">
                            <div className="space-x-5">
                                <p className="text-2xl ">Inventory Items</p>
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

                        <Grid container spacing={6} sx={{ pb: 38, }}>
                            <Grid item xs={12}>
                                <Card sx={{ borderRadius: 2 }}>
                                    <DataGrid
                                        rows={allProducts || []}
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

                        <ConfirmBox
                            title="Product"
                            name="product"
                            open={deleteOpen}
                            closeDialog={() => setDeleteOpen(false)}
                            toDoFunction={deleteCustomer}
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

export default ProductManagement;
