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
import CreateBannerModel from "../../../components/admin/modals/CreateBannerModel";
import { useCookies } from "react-cookie";
import { Token } from "@mui/icons-material";
import InputField from "../../../components/InputField";
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
const CategoryManagement = () => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    // const [isBannerAdded, SetIsBannerAdded] = useState(false);
    const [isCategoryAdded, setIsBannerAdded] = useState(false);
    const [deleteId, setDeleteId] = useState("");

    // const [allBanners, setAllBanners] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [pagination, setPagination] = useState(
        null
    );
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 50,
    });

    const [category, setCategory] = useState("")
    const [formErrors, setFormErrors] = useState({});

    if (category) console.log(category, "sdfljk")

    // const router = useRouter();

    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "fdsfsdfsf")
            setToken(cookies.adminToken);
        }
    }, [cookies]);



    if (allCategories) console.log(allCategories, "dsflkjkf")

    async function getAllCategories() {
        try {
            console.log(token, "jsakdfjkladsj")
            const instance = useAxios(token);
            setLoading(true);
            const res = await instance.get(
                `/admin/getAllCategories`
            );
            if (res.data) {
                setAllCategories(res.data.categories)
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log(e)
            // ErrorDispaly(e);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [token]);



    useEffect(() => {
        if (isCategoryAdded === true) {
            getAllCategories()
        }
    }, [isCategoryAdded])


    const deleteCategory = async () => {
        const instance = useAxios(token);
        setDeleteLoading(true);
        try {
            const res = await instance.delete("/admin/category/" + deleteId);
            if (res.data) {
                toast.success("Category deleted successfully");
                setDeleteOpen(false);
                setDeleteLoading(false);
                getAllCategories();
            }
        } catch (error) {
            console.log(error)
            setDeleteLoading(false);

        }

    }



    const all_customer_columns = [
        // {
        //     flex: 0.55,
        //     minWidth: 350,

        //     field: "bannerImages",
        //     headerName: "Banner Images",
        //     align: "left",
        //     headerAlign: "left",
        //     disableColumnMenu: true,
        //     renderCell: ({ row }) => (
        //         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}>
        //             {row.bannerImages.map((curELem) => (
        //                 <Box sx={{ width: "100px", height: "100px" }}>
        //                     <img src={curELem} alt="banner" className="object-cover w-full h-full" />
        //                 </Box>
        //             ))}
        //         </Box>
        //     ),
        // },
        {
            minWidth: 150,

            flex: 0.25,
            field: "categoryName",
            headerName: "Category",
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
                    {/* <Tooltip title="Edit">
                        <IconButton
                            // onClick={() => router.push(`/admin/customers/${row._id}`)}
                            color="primary"
                        >
                            <BsEyeFill />
                        </IconButton>
                    </Tooltip> */}
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

    const validateCategoryName = (value) => {
        // Allow letters and hyphens, but not spaces or other symbols
        const regex = /^[a-zA-Z\-]+$/;
        return regex.test(value) ? null : 'Invalid characters in category name';
    };

    const handleSubmit = async () => {
        try {
            const instance = useAxios(token);
            setLoading(true);
            const res = await instance.post(
                `/admin/category/new`,
                { categoryName: category }
            );
            if (res.data && res.data.success === true) {
                toast.success(res.data.message)
                getAllCategories()
                setLoading(false);
            }
        } catch (e) {
            // setLoading(false);
            console.log(e)
            // ErrorDispaly(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    {/* <main> */}
                    <div className='bg-gray-50'>
                        <AdminNavbar />
                        <div className=" mt-8 mb-6 px-4">
                            <p className="text-start mb-4 text-lg font-semibold">Create Category</p>
                            <div className="w-[400px]">
                                <InputField
                                    label="Enter Category Name"
                                    type="text"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e);
                                        setFormErrors({ ...formErrors, amount: validateCategoryName(e) });
                                    }}
                                    // onChange={(e) => setCategory(e)}
                                    validate={validateCategoryName}
                                />
                                {loading ? <CircularProgress /> : Object.values(formErrors).some((error) => Boolean(error)) ? null : <button onClick={handleSubmit} className=" px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  ">Create Category</button>}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-8 mb-6 px-4">



                            <Grid container spacing={6} sx={{ pb: 38, }}>
                                <Grid item xs={12}>
                                    <Card sx={{ borderRadius: 2 }}>
                                        <DataGrid
                                            rows={allCategories || []}
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
                                title="Category"
                                name="category"
                                open={deleteOpen}
                                closeDialog={() => setDeleteOpen(false)}
                                toDoFunction={deleteCategory}
                                loading={deleteLoading}
                                sx={{ pb: 4, border: "2px solid red" }}
                            />
                        </div>
                    </div>
                    {/* </main> */}
                </div>
            </div >

        // </div>
    );
};

export default CategoryManagement;
