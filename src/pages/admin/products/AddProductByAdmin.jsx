
import React, { ReactElement, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsEyeFill, BsPencil, BsPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import { toast } from "react-toastify";
import { AiOutlineClose } from 'react-icons/ai';

// import ConfirmBox from "../../../components/admin/shared/ConfirmDialog";
import { useAxios } from "../../../utils/axios";
// import { tableStyles } from "../../../components/admin/shared/ConfirmDialog";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/navbar/AdminNavbar";
import { FaArrowDown, FaCartArrowDown } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CircularProgress, FormControlLabel, FormGroup, Switch } from '@mui/material';
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
import Textarea from '@mui/joy/Textarea';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/InputField";


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
const AddProductByAdmin = () => {
    const navigate = useNavigate();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [value, setValue] = useState(dayjs('2022-04-17'));
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const instance = useAxios(token);
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
    const [filesToupload, setFilesToUpload] = useState([]);
    const [product, setProduct] = useState({
        Discount: false,
        ratings: 0,
        Stock: 1,
        name: "",
        price: 0,
        description: "",
        category: "",
        brand: "",
        specification: "",
        featured: true,
        best_seller: true,
        shortDescription: "",
        costPrice: 0,
        returnPolicy: true
    })
    const [returnSwitch, setReturnSwitch] = useState(true);
    const [discountSwitch, setDiscountSwitch] = useState(true);
    const [featuredSwitch, setFeaturedSwitch] = useState(true);
    const [bestSellerSwitch, setBestSellerSwitch] = useState(true);

    // Handler function to update the switch state
    const handleReturnSwitch = (event) => {
        setReturnSwitch(event.target.checked);
        console.log(event.target.checked, "jfhasdjkfhsdajk")
        setProduct({ ...product, returnPolicy: event.target.checked })
    };
    const handleDiscountSwitch = (event) => {
        setDiscountSwitch(event.target.checked);
        setProduct({ ...product, Discount: event.target.checked })
    };
    const handleFeaturedSwitch = (event) => {
        setFeaturedSwitch(event.target.checked);
        setProduct({ ...product, featured: event.target.checked })
    };
    const handleBestSellerSwitch = (event) => {
        setBestSellerSwitch(event.target.checked);
        setProduct({ ...product, best_seller: event.target.checked })
    };



    if (product) {
        console.log(product, "dsfhdkjf")
    }

    const productCategories = [
        'Smartphones',
        'TV & Audio',
        'Laptops & PCs',
        'Gadgets',
        'Photo & Video',
        'Gifts',
        'Books',
        'Toys',
    ];


    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "fdsfsdfsf")
            setToken(cookies.adminToken);
        }
    }, [cookies]);

    // const router = useRouter();

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

    // useEffect(() => {
    //     getAllUsers();
    // }, [selected, name, paginationModel?.page, paginationModel?.pageSize]);

    // async function deleteCustomer() {
    //     try {
    //         setDeleteLoading(true);
    //         const res = await instance.delete("/admin/user/deleteUser/" + deleteId);
    //         if (res.data) {
    //             toast.success("Customer Deleted Successfully");
    //             setDeleteLoading(false);
    //             setDeleteOpen(false);
    //             getAllUsers();
    //         }
    //     } catch (e) {
    //         setDeleteLoading(false);
    //         // ErrorDispaly(e);
    //     }
    // }




    const handleCategory = (event) => {
        console.log(event.target.value, "sjfhsdhfk")
        setProduct({
            ...product,
            category: event.target.value
        });
    };

    const handleProductSubmit = async () => {
        setLoading(true)
        var ProductFormData = new FormData();
        for (let i of filesToupload) {
            ProductFormData.append('images', i);
        }

        ProductFormData.append('name', product.name);
        ProductFormData.append('category', product.category);
        ProductFormData.append('description', product.description);
        ProductFormData.append('shortDescription', product.shortDescription);
        // ProductFormData.append('sellingPrice', product.sellingPrice);
        ProductFormData.append('costPrice', product.costPrice);
        ProductFormData.append('Stock', product.Stock);
        // ProductFormData.append('shortDescription', product.shortDescription);
        ProductFormData.append('price', product.price);
        ProductFormData.append('brand', product.brand);
        ProductFormData.append('specification', product.specification);
        ProductFormData.append('featured', product.featured);
        ProductFormData.append('best_seller', product.best_seller);
        ProductFormData.append('returnPolicy', product.returnPolicy);
        ProductFormData.append('Discount', product.Discount);

        try {
            const res = await instance.post("/admin/product/new", ProductFormData)
            if (res.data) {
                setLoading(false)
                console.log(res.data, "sdfhadjkf")
                toast("Product has been added")
                navigate("/admin/productManagement")
                setProduct({
                    Discount: false,
                    ratings: 0,
                    Stock: 1,
                    name: "",
                    price: 0,
                    description: "",
                    category: "",
                    brand: "",
                    specification: "",
                    featured: true,
                    best_seller: true,
                    shortDescription: "",
                    costPrice: 0,
                    returnPolicy: true
                })
            }
        } catch (error) {
            console.log(error, "skdfhsjdf")
            setLoading(false)
            toast(error?.response?.data?.message)
        }
    }




    // Image Upload FUnction

    useEffect(() => {
        console.log(filesToupload, "mainImage")
    }, [filesToupload])


    const handleImageChange = (e) => {
        if (e.target.files) {
            setFilesToUpload((prev) => {
                let prevs = [...filesToupload];
                console.log(e.target.files);
                prevs.push(e.target.files[0]);
                console.log(prevs);
                return prevs;
            });
        }
        e.target.files = null;
    };
    const dleteImage = (file) => {
        setFilesToUpload((prev) => {
            let imgs = [...filesToupload];
            const index = imgs.indexOf(file);
            if (index > -1) {
                imgs.splice(index, 1);
            }
            return imgs;
        });
    };

    const renderPhotos = (source) => {

        return source.map((photo, index) => {
            return (
                <div
                    className="w-max h-40 flex justify-center items-center  relative max-w-[200px]"
                    key={index}
                >
                    <button
                        onClick={() => {
                            dleteImage(photo);
                        }}
                        className="text-white bg-red-500 h-6 w-6 flex rounded-full items-center justify-center absolute top-1 right-0"
                    >
                        <AiOutlineClose />
                    </button>
                    <img
                        className=" h-full object-cover"
                        src={URL.createObjectURL(photo)}
                        alt=""
                        key={photo}
                    />
                </div>
            );
        });
    };

    // Validation Logics


    const validateProductName = (value) => {
        // Add specific validation logic for product name
        const regex = /^[a-zA-Z ]+$/; // Only allow letters and spaces
        return regex.test(value) ? null : 'Invalid characters in product name';
    };
    const validateBrandName = (value) => {
        // Add specific validation logic for product name
        const regex = /^[a-zA-Z ]+$/; // Only allow letters and spaces
        return regex.test(value) ? null : 'Invalid characters in brand name';
    };

    // Numeric Regex Logic
    const validateSellingPrice = (value) => {
        const floatValue = parseFloat(value);

        // Add specific validation logic for product price
        if (isNaN(floatValue) || floatValue <= 0) {
            return 'Invalid selling price';
        }

        return null;
    };
    const validateCostPrice = (value) => {
        const floatValue = parseFloat(value);

        // Add specific validation logic for product price
        if (isNaN(floatValue) || floatValue <= 0) {
            return 'Invalid cost price';
        }

        return null;
    };
    const validateQuantity = (value) => {
        const floatValue = parseFloat(value);

        // Add specific validation logic for product price
        if (isNaN(floatValue) || floatValue <= 0) {
            return 'Invalid quantity';
        }

        return null;
    };


    return (
        <div>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    {/* <main> */}
                    <div className='bg-gray-50'>
                        <AdminNavbar />
                        <div className="flex items-center justify-between mx-10 my-5">
                            <p>Add Product Details</p>
                            <div className="flex gap-7">
                                <button className="px-4 py-2 rounded-lg text-white bg-black">
                                    Save as Draft
                                </button>
                                {loading ? <CircularProgress /> : <button onClick={handleProductSubmit} className="px-4 py-2 rounded-lg text-white bg-primary-blue">
                                    Save & Publish
                                </button>}
                            </div>
                        </div>

                        <div className="bg-white mx-10  flex  gap-5 ">
                            <div className="basis-[70%] flex gap-10">
                                <div className="basis-[45%] p-10">
                                    <Typography sx={{ my: 1, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                                        Product Name
                                    </Typography>

                                    <InputField
                                        label="Product Name"
                                        type="text"
                                        value={product?.name}
                                        onChange={(e) => setProduct({ ...product, name: e })}
                                        validate={validateProductName}
                                    />



                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Product Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={product?.category}
                                            label="Select Customer"
                                            onChange={handleCategory}
                                        >
                                            {productCategories && productCategories.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                // style={getStyles(name, personName, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <Box sx={{ display: "flex", marginTop: 2, gap: 2 }}>

                                        <InputField label="Selling Price" type="number" value={product.sellingPrice} onChange={(e) => setProduct({ ...product, price: e })} validate={validateSellingPrice} />

                                        <InputField label="Cost Price" type="number" value={product.costPrice} onChange={(e) => setProduct({ ...product, costPrice: e })} validate={validateCostPrice} />


                                        <InputField label="Quantity" type="number" value={product.Stock} onChange={(e) => setProduct({ ...product, Stock: e })} validate={validateQuantity} />


                                    </Box>

                                    <InputField
                                        label="Brand"
                                        type="text"
                                        value={product?.brand}
                                        onChange={(e) => setProduct({ ...product, brand: e })}
                                        validate={validateBrandName}
                                    />


                                    <Box sx={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                                        <Typography sx={{ my: 1, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                                            Discount
                                        </Typography>
                                        <FormGroup>
                                            <FormControlLabel
                                                label="Add Discount"
                                                control={<Switch checked={discountSwitch}
                                                    onChange={handleDiscountSwitch} />}

                                            />
                                        </FormGroup>
                                    </Box>

                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <FormGroup>
                                            <FormControlLabel
                                                label="Featured"
                                                control={<Switch checked={featuredSwitch}
                                                    onChange={handleFeaturedSwitch} />}

                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControlLabel
                                                label="Best Seller"
                                                control={<Switch checked={bestSellerSwitch}
                                                    onChange={handleBestSellerSwitch} />}

                                            />
                                        </FormGroup>
                                    </Box>



                                    {/* <Box sx={{ display: "flex", marginTop: 2, gap: 2 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={clients}
                                                label="Select Customer"
                                            onChange={handleClient}
                                            >
                                                { clients && clients.map((name) => (
                                            <MenuItem
                                                key={name?.clientName}
                                                value={name?.clientName}
                                            style={getStyles(name, personName, theme)}
                                            >
                                                {name?.clientName}
                                            </MenuItem>
                                        ))}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            label="Value"
                                            fullWidth
                                            margin="normal"
                                        value={projectData.project_name}
                                        onChange={(e) =>
                                            setProjectData({ ...projectData, project_name: e.target.value })
                                        }
                                        />

                                    </Box> */}

                                    {/* <Box sx={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                                        <Typography sx={{ my: 1, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                                            Expiry Date
                                        </Typography>
                                        <FormGroup>
                                            <FormControlLabel
                                                label="Add Expiry Date"
                                                control={<Switch defaultChecked />}

                                            />
                                        </FormGroup>
                                    </Box> */}
                                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            <DatePicker
                                                sx={{ width: "100%" }}
                                                label="Pick a Date"
                                                value={value}
                                                onChange={(newValue) => setValue(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider> */}



                                </div>
                                <div className="basis-[45%] p-10">
                                    <Textarea onChange={(event) => setProduct({
                                        ...product,
                                        shortDescription: event.target.value
                                    })} placeholder="Short Description" minRows={3} />


                                    <TextField
                                        label="Specification"
                                        fullWidth
                                        margin="normal"
                                        value={product.specification}
                                        onChange={(e) =>
                                            setProduct({ ...product, specification: e.target.value })
                                        }
                                    />
                                    <Typography sx={{ my: 1, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                                        Product Long Description
                                    </Typography>

                                    <Textarea onChange={(event) => setProduct({ ...product, description: event.target.value })} placeholder="Your text goes here" minRows={5} />
                                    <Typography sx={{ color: "gray" }} id="modal-modal-title" variant="p" component="p">
                                        Add a long description for your product
                                    </Typography>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2, marginTop: 2 }}>
                                        <Typography sx={{ my: 1, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                                            Return Policy
                                        </Typography>
                                        <FormGroup>
                                            <FormControlLabel
                                                label="Add Deduction"
                                                control={
                                                    <Switch
                                                        checked={returnSwitch}
                                                        onChange={handleReturnSwitch}
                                                    />
                                                }
                                            />
                                        </FormGroup>
                                    </Box>

                                    {/* <Typography sx={{ marginTop: 2 }}>
                                        Date Added
                                    </Typography> */}

                                    {/* <Box sx={{ display: "flex", marginTop: 2, gap: 2 }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                <DatePicker
                                                    label="Pick a Date"
                                                    value={value}
                                                    onChange={(newValue) => setValue(newValue)}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                <TimePicker
                                                    label="Pick a Time"
                                                    value={value}
                                                    onChange={(newValue) => setValue(newValue)}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Box> */}

                                </div>
                            </div>
                            <div className="basis-[25%] max-w-[380px]  px-7 ">
                                <div>
                                    {/* <p className='text-center text-xl my-8 '>Add Images</p> */}

                                    <div className="mt-12">
                                        {/* <label className="inline-block mb-2 text-gray-500">
                            Select Product Images (for Multiple images please upload one after one)
                        </label> */}
                                        <div className="flex items-center flex-col gap-4  w-full ">

                                            <label className=" pb-4 flex flex-col w-full border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                <div className="flex flex-col items-center justify-center py-7 ">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                        Upload Image
                                                    </p>
                                                    <p className="pt-3 text-sm tracking-wider text-gray-400 group-hover:text-gray-600 text-center">Upload a cover image for your product.</p>
                                                    <p className="  text-sm tracking-wider text-gray-400 group-hover:text-gray-600 text-center">File Format jpeg, png Recommened Size 600x600 (1:1)</p>
                                                </div>
                                                <input
                                                    onChange={handleImageChange}
                                                    type="file"
                                                    className="opacity-0"
                                                />
                                            </label>
                                            <p>Additional Images</p>
                                            <div className="w-full flex items-center justify-center gap-4 max-w-md flex-wrap">
                                                {renderPhotos(filesToupload)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
                {/* </main> */}
            </div>
        </div >

        // </div>
    );
};

export default AddProductByAdmin;
