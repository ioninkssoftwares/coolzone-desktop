import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CircularProgress,
    Grid,
    IconButton,
    LinearProgress,
    Tooltip,
    // Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';
// import { Search } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { FiUser, FiUsers } from 'react-icons/fi';
import { FaArrowDown } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { tableStyles } from "../../../components/admin/shared/ConfirmDialog";
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../../components/sidebar/Sidebar';
import AdminNavbar from '../../../components/navbar/AdminNavbar';
import { useCookies } from 'react-cookie';
import { useAxios } from '../../../utils/axios';
// import { useAxios } from '../../utills/axios';




const EditOrderById = ({ }) => {
    // const instance = useAxios();
    const { id } = useParams();
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["adminToken"]);
    // const theme = useTheme();
    const [status, setStatus] = useState('');
    const [token, setToken] = useState("");
    const [selectedClient, setSelectedClient] = useState('');
    const [clients, setClients] = useState(null)
    const [clientNames, setClientNames] = useState([]);
    const [orderData, setOrderData] = useState([]);
    // const [orderData, setOrderData] = useState([
    //     {
    //         _id: "unique-id-123",
    //         orderType: "Online",
    //         trackingId: "ABC123",
    //         totalPrice: 336,
    //         createdAt: "2023-10-02T05:23:38.671Z",
    //     }
    // ]);
    const [gridOrderData, setGridOrderData] = useState([]);
    const [users, setUsers] = useState([]);
    const instance = useAxios(token);

    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState({
        project_name: '',
        status: '',
        clientEmail: '',
        startDate: '',
        endDate: '',
        project_company: '',
        project_categories: '',
    });

    const [pagination, setPagination] = useState(
        null
    );

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 50,
    });


    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "fdsfsdfsf")
            setToken(cookies.adminToken);
        }
    }, [cookies]);


    useEffect(() => {
        if (orderData) {
            setGridOrderData(orderData)
        }
    }, [orderData])



    const getOrderDetailsById = async (orderId) => {
        setLoading(true)
        try {
            const res = await instance.get(`/order/${orderId}`)
            if (res.data) {
                setLoading(false)
                console.log(res.data.order, "djshfkjsa")
                setOrderData([res.data.order])
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token && id) {
            getOrderDetailsById(id)
        }
    }, [token])


    const handleSubmit = async () => {
        try {

            const res = await instance.post("/project/addProject/admin", projectData);

            if (res.data) {
                console.log(res.data)
            }

        } catch (error) {
            console.log(error)
        }

    };



    // const getProductDetailsById = async (productId) => {
    //     setLoading(true)
    //     try {
    //         const res = await instance.get(`/product/${productId}`)
    //         if (res.data) {
    //             setLoading(false)
    //             console.log(res.data.product, "djshfkjsa")
    //             setProductData(res.data.product)
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //     }
    // }
    // useEffect(() => {
    //     if (id) {
    //         getProductDetailsById(id)
    //     }
    // }, [id])

    const all_customer_columns = [
        // {
        //     flex: 0.25,
        //     minWidth: 150,

        //     field: "name",
        //     headerName: "Customer Name",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        //     renderCell: ({ row }) => (
        //         <Typography variant="body1" fontWeight={500}>
        //             {row?.name}
        //         </Typography>
        //     ),
        // },
        {
            minWidth: 150,

            flex: 0.25,
            field: "createdAt",
            headerName: "Order Date",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true, renderCell: ({ row }) => (
                <Typography variant="body1" fontWeight={500}>
                    {new Date(row?.createdAt).toLocaleDateString('en-GB')}
                </Typography>
            ),
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "orderType",
            headerName: "Order Type",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 150,

            flex: 0.25,
            field: "trackingId",
            headerName: "Tracking ID",
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            minWidth: 120,

            field: "totalPrice",
            headerName: "Order Total",
            flex: 0.2,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },

        {
            minWidth: 120,

            field: "orderStatus",
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
        <>
            <div>
                <div className='flex h-screen overflow-hidden'>
                    <Sidebar />
                    <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                        {/* <main> */}
                        {loading ? <div className="flex items-center justify-center text-3xl h-full">
                            <CircularProgress className="text-3xl" />
                        </div> : <div className='bg-gray-50'>
                            <AdminNavbar />
                            <Box sx={{ m: 5 }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Edit Order Details
                                </Typography>


                                <div className="flex m-7 ">
                                    <p className="mr-9 flex gap-3">
                                        {orderData && orderData.length > 0 ? orderData[0]?.orderItems?.map((item, index) => {

                                            return <span key={index} className="mr-3 font-bold ">{item.name}</span>
                                        }) : "No order items"}
                                    </p>

                                    <p className="mr-2">Date Added</p>
                                    <span className="text-gray-400 mr-12"> 01-Jan-2023 - 03:21 pm</span>
                                    <p className="mr-2">Product URL</p>
                                    <span className="text-blue-600 mr-12">coolzone.in/samsung-fu..</span>


                                </div>


                                <div className="flex  gap-10 ">

                                    <div className="basis-[33%]  p-3 bg-white rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-5">
                                                <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                                    <FiUsers />
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">{orderData && orderData.length > 0 ? orderData[0].user?.name : ""}</p>
                                                    <p className='text-xs'>Customer Since 12 Sept 2023</p>
                                                </div>
                                            </div>

                                            <button className="flex px-3 py-2 text-xs justify-between items-center gap-3 rounded-xl bg-red-100 text-black">
                                                Pending
                                            </button>
                                        </div>
                                        <div className="mt-8 flex items-center justify-start gap-20 w-full">
                                            <div className="flex flex-col items-start justify-center">
                                                <p className="text-gray-400">
                                                    Phone
                                                </p>
                                                <p className=" font-bold text-">
                                                    {orderData && orderData.length > 0 ? orderData[0].shippingInfo?.phoneNo : ""}                             </p>
                                            </div>
                                            <div className="flex flex-col items-start justify-center">
                                                <p className=" text-gray-400">
                                                    Email
                                                </p>
                                                <p className=" font-bold">
                                                    {orderData && orderData.length > 0 ? orderData[0].user?.email : ""}
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="basis-[33%]  p-3 bg-white rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-5">
                                                <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                                    <FiUsers />
                                                </div>
                                                {/* <div>
                                        <p className="text-gray-400">Sravan Kumar</p>
                                        <p>Last Order 12 Sept 2023</p>
                                    </div> */}
                                            </div>


                                        </div>
                                        <div className="mt-8 flex items-center justify-start  w-full">
                                            <div className="flex  w-full flex-col items-start justify-center">
                                                <p className="text-gray-400">
                                                    Home Address
                                                </p>
                                                {orderData && orderData.length > 0 ? (
                                                    <div>
                                                        <span className='mr-1 font-bold'> {orderData[0].shippingInfo?.address}</span>
                                                        <span className='mr-1 font-bold'>, {orderData[0].shippingInfo?.city}</span>
                                                        <span className='mr-1 font-bold'>, {orderData[0].shippingInfo?.state}</span>
                                                        <span className='mr-1 font-bold'>, {orderData[0].shippingInfo?.country}</span>
                                                        <span className='mr-1 font-bold'>, {orderData[0].shippingInfo?.pinCode}</span>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="basis-[33%]  p-3 bg-white rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-5">
                                                <div className="bg-[#04A7FF29] p-4 text-primary-blue rounded-xl text-xl">
                                                    <FiUsers />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="mt-8 flex items-center justify-start gap-20 w-full">
                                            <div className="flex flex-col items-start justify-center">
                                                <p className="text-gray-400">
                                                    Payment Method
                                                </p>
                                                <p className=" font-bold">
                                                    Master Card                                </p>
                                            </div>
                                            <div className="flex flex-col items-start justify-center">
                                                <p className=" text-gray-400">
                                                    Order Type
                                                </p>
                                                <p className=" font-bold">
                                                    Home Delivery
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-8 px-4">
                                    <div className="space-x-5">
                                        <p className="text-2xl ">Item's <span className='text-blue-600'>3</span></p>
                                    </div>

                                    <div className="flex my-6 space-x-[12px]">
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

                                <Grid container spacing={6} sx={{}}>
                                    <Grid item xs={12}>
                                        <Card sx={{ borderRadius: 2 }}>
                                            <DataGrid
                                                rows={orderData || []}
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
                                                sx={tableStyles}
                                            />
                                        </Card>
                                    </Grid>
                                </Grid>



                                <div className="flex justify-end gap-12 my-7">

                                    <button
                                        // onClick={() => router.push("/admin/customers/add")}
                                        className=" px-7 text-white font-medium bg-primary-blue rounded-lg py-3  items-center transition transform active:scale-95 duration-200  "
                                    >
                                        Mark as Complete
                                    </button>
                                    <button
                                        // onClick={() => router.push("/admin/customers/add")}
                                        className=" px-7 text-white font-medium bg-red-600 rounded-lg py-3  items-center transition transform active:scale-95 duration-200  "
                                    >
                                        Cancel Order
                                    </button>
                                </div>


                            </Box>


                        </div>}
                    </div>
                    {/* </main> */}
                </div>
            </div >

        </>
    );
};

export default EditOrderById;
