
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
import { useNavigate, useParams } from "react-router-dom";
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
const EditProductById = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [value, setValue] = useState(dayjs('2022-04-17'));
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [uploadedProductImage, setUploadedProductImages] = useState([])
    const instance = useAxios(token);
    const [users, setUsers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const [pagination, setPagination] = useState(
        null
    );
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 50,
    });
    // const [name, setName] = useState("");
    const [selected, setSelected] = useState("All");
    const [filesToupload, setFilesToUpload] = useState([]);
    const [product, setProduct] = useState({
        stock: 0,
        name: "",
        price: 0,
        description: "",
        category: "",
        specification: "",
        featured: true,
        bestSeller: true,
        subCategory: "",
        brand: "",
        // best_seller: true,
        // shortDescription: "",
        // costPrice: 0,
        // returnPolicy: true
    })
    const [returnSwitch, setReturnSwitch] = useState(null);
    const [discountSwitch, setDiscountSwitch] = useState(null);
    const [featuredSwitch, setFeaturedSwitch] = useState(null);
    const [bestSellerSwitch, setBestSellerSwitch] = useState(null);
    const [productData, setProductData] = useState({});


    if (productData) {
        console.log(productData, "dsjfhakjdfh")
    }


    // const handleImageRemove = async (productId, index, url) => {



    //     const removeImages = async () => {
    //       try {
    //         const productImage = {
    //           productId: propertyId,
    //           imageUrl: url
    //         }
    //         const res = await instance.post("/admin/deletePropertyImage", propertyImage);
    //         if (res?.data) {
    //           toast("Image Remove Successfully")

    //           console.log(res.data.data, "dataimage")

    //         }
    //         const updatedImages = uploadedPropertyImages.map((property) => {
    //           if (property.id === propertyId) {
    //             const updatedPropertyImages = property.images[0].filter((_, i) => i !== index);
    //             return { ...property, images: [updatedPropertyImages] };
    //           }
    //           return property;
    //         });
    //         setUploadedPropertyImages(updatedImages);
    //       } catch (e) {
    //         ErrorDispaly(e);
    //       }
    //     };
    //     removeImages();
    //     // const updatedImages = uploadedPropertyImages.map((item) => {
    //     //   if (item.id === propertyId) {
    //     //     const newImages = [...item.images];
    //     //     newImages.splice(index, 1);
    //     //     return { ...item, images: newImages };
    //     //   }
    //     //   return item;
    //     // });
    //     // setUploadedPropertyImages(updatedImages);
    //   };




    // Handler function to update the switch state


    const handleReturnSwitch = (event) => {
        setReturnSwitch(event.target.checked);
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
        setProduct({ ...product, bestSeller: event.target.checked })
    };



    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "fdsfsdfsf")
            setToken(cookies.adminToken);
        }
    }, [cookies]);


    if (id) {
        console.log(id, "dsfhksdjf")
    }

    const getProductDetailsById = async (productId) => {
        setLoading(true)
        try {
            const res = await instance.get(`/product/${productId}`)
            if (res.data) {
                setLoading(false)
                console.log(res.data.product, "djshfkjsa")
                setProductData(res.data.product)
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        if (id) {
            getProductDetailsById(id)
        }
    }, [id])


    // useEffect(() => {

    // }, [productData])



    useEffect(() => {
        // if (productData.Discount) {
        //     setReturnSwitch(true);
        // } else {
        //     setReturnSwitch(false)
        // }
        if (productData.bestSeller) {
            setBestSellerSwitch(true);
        } else {
            setBestSellerSwitch(false)
        }
        if (productData.featured) {
            setFeaturedSwitch(true);
        } else {
            setFeaturedSwitch(false)
        }
        // if (productData.returnPolicy) {
        //     setReturnSwitch(true);
        // } else {
        //     setReturnSwitch(false)
        // }

        // if (productData.images) {
        //     const imageUrls = productData.images.map(image => image.url);
        //     setUploadedProductImages(imageUrls);
        // }
        setProduct({
            // Discount: productData?.Discount,
            // ratings: productData?.ratings,
            stock: productData?.stock,
            name: productData?.name,
            price: productData?.price,
            description: productData?.description,
            category: productData?.category,
            specification: productData?.specification,
            featured: productData?.featured,
            bestSeller: productData?.bestSeller,
            brand: productData?.brand,
            subCategory: productData?.subCategory,
            // specification: productData?.specification,
            // featured: productData?.featured,
            // best_seller: productData?.best_seller,
            // shortDescription: productData?.shortDescription,
            // costPrice: productData?.costPrice,
            // returnPolicy: productData?.returnPolicy
        })
    }, [productData])



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



    useEffect(() => {
        // Update the selected category when productData changes
        setSelectedCategory(productData?.category || '');
    }, [productData]);



    const handleCategory = (event) => {
        console.log(event.target.value, "sjfhsdhfk")
        setProduct({
            ...product,
            category: event.target.value
        });
        setSelectedCategory(event.target.value);
    };

    const handleProductSubmit = async () => {
        setLoading(true)
        var ProductFormData = new FormData();
        for (let i of filesToupload) {
            ProductFormData.append('productImages', i);
        }

        ProductFormData.append('name', product.name);
        ProductFormData.append('category', product.category);
        ProductFormData.append('description', product.description);
        // ProductFormData.append('shortDescription', product.shortDescription);
        // ProductFormData.append('sellingPrice', product.sellingPrice);
        // ProductFormData.append('costPrice', product.costPrice);
        ProductFormData.append('stock', product.stock);
        // ProductFormData.append('shortDescription', product.shortDescription);
        ProductFormData.append('price', product.price);
        // ProductFormData.append('brand', product.brand);
        ProductFormData.append('specification', product.specification);
        ProductFormData.append('featured', product.featured);
        ProductFormData.append('bestSeller', product.bestSeller);
        ProductFormData.append('brand', product.brand);
        ProductFormData.append('subCategory', product.subCategory);
        // ProductFormData.append('returnPolicy', product.returnPolicy);
        // ProductFormData.append('Discount', product.Discount);

        try {
            const res = await instance.put(`/admin/product/${id}`, ProductFormData)
            if (res.data) {
                setLoading(false)
                console.log(res.data, "sdfhadjkf")
                toast("Product has been updated")
                navigate("/admin/productManagement")
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
    const validateCategory = (value) => {
        // Only allow lowercase letters, exclude uppercase, spaces, and symbols
        const regex = /^[a-z]+$/;
        return regex.test(value) ? null : 'Invalid characters in category (Accepts only lowercase letters)';
    };

    const validateBrand = (value) => {
        // Allow letters and white spaces
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(value) ? null : 'Invalid characters in brand';
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
                    {loading ? <div className="flex items-center justify-center text-3xl h-full">
                        <CircularProgress className="text-3xl" />
                    </div> : <div className='bg-gray-50'>
                        <AdminNavbar />
                        <div className="flex items-center justify-between mx-10 my-5">
                            <p>Edit Product Details</p>
                            <div className="flex gap-7">
                                {/* <button className="px-4 py-2 rounded-lg text-white bg-black">
                                    Save as Draft
                                </button> */}
                                {loading ? <CircularProgress /> : Object.values(formErrors).some((error) => Boolean(error)) ? null : (<button onClick={handleProductSubmit} className="px-4 py-2 rounded-lg text-white bg-primary-blue">
                                    Save & Publish
                                </button>)}
                            </div>
                        </div>

                        <div className="bg-white mx-10  flex  gap-5 ">
                            <div className="basis-[70%] flex gap-10">
                                <div className="basis-[45%] p-10">


                                    <InputField
                                        label="Product Name"
                                        type="text"
                                        value={product?.name}
                                        onChange={(e) => setProduct({ ...product, name: e })}
                                    // validate={validateProductName}
                                    />

                                    <InputField
                                        label="Brand"
                                        type="text"
                                        value={product?.brand}
                                        onChange={(value) => {
                                            setProduct({ ...product, brand: value });
                                            setFormErrors({ ...formErrors, brand: validateBrand(value) });
                                        }}
                                        validate={validateBrand}
                                    />




                                    <InputField
                                        label="Category"
                                        type="text"
                                        value={product?.category}
                                        onChange={(value) => {
                                            setProduct({ ...product, category: value });
                                            setFormErrors({ ...formErrors, category: validateCategory(value) });
                                        }}
                                        validate={validateCategory}
                                    />

                                    <InputField
                                        label="Sub Category"
                                        type="text"
                                        value={product?.subCategory}
                                        onChange={(e) => setProduct({ ...product, subCategory: e })}
                                    // validate={validateCategory}
                                    />


                                    {/* <FormControl sx={{ marginTop: 3 }} fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Product Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedCategory}
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
                                    </FormControl> */}

                                    <Box sx={{ display: "flex", marginTop: 2, gap: 2 }}>

                                        <InputField label="Price" type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e })} validate={validateSellingPrice} />

                                        {/* <InputField label="Cost Price" type="number" value={product.costPrice} onChange={(e) => setProduct({ ...product, costPrice: e })} validate={validateCostPrice} /> */}


                                        <InputField label="Stock" type="number" value={product.stock} onChange={(e) => setProduct({ ...product, stock: e })} validate={validateQuantity} />


                                    </Box>
                                    {/* <InputField
                                        label="Brand"
                                        type="text"
                                        value={product?.brand}
                                        onChange={(e) => setProduct({ ...product, brand: e })}
                                        validate={validateBrandName}
                                    /> */}


                                    {/* <Box sx={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
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
                                    </Box> */}




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
                                <div className="basis-[45%] py-4 mt-10">

                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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

                                    <Textarea sx={{ padding: 0, borderRadius: 1 }} value={product?.description} onChange={(event) => setProduct({
                                        ...product,
                                        description: event.target.value
                                    })} placeholder=" Description" minRows={3} />


                                    {/* <TextField
                                        label="Specification"
                                        fullWidth
                                        margin="normal"
                                        value={product.specification}
                                        onChange={(e) =>
                                            setProduct({ ...product, specification: e.target.value })
                                        }
                                        sx={{ marginTop: 4 }}
                                    /> */}

                                    <Typography sx={{ my: 1, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                                        Product Specification
                                    </Typography>

                                    <Textarea sx={{ padding: 0, borderRadius: 1 }} value={product?.specification} onChange={(event) => setProduct({ ...product, specification: event.target.value })} placeholder="Your text goes here" minRows={5} />



                                    {/* <Typography sx={{ color: "gray" }} id="modal-modal-title" variant="p" component="p">
                                        Add a long description for your product
                                    </Typography> */}

                                    {/* <Box sx={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2, marginTop: 2 }}>
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
                                    </Box> */}

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
                                    <p className='text-center text-xl my-8 '>Uploaded Images</p>
                                    <div className="w-full flex flex-col items-center justify-center gap-4 max-w-md flex-wrap">

                                        {productData && productData.productImages && productData.productImages.length > 0 ? productData.productImages.map((curElem, index) => (
                                            <div
                                                className="w-max h-40 flex justify-center items-center  relative max-w-[200px]"
                                                key={index}
                                            >

                                                <img
                                                    className=" h-full object-cover"
                                                    src={curElem}
                                                    alt="image"
                                                    key={curElem}
                                                />
                                            </div>
                                        )) : ""}
                                    </div>


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


                                {/* <div className="m-4">
                                    {uploadedProductImage?.map((product) => (
                                        <div key={product}>
                                            <label className="inline-block mb-2 text-gray-500">
                                                Uploaded Product Images
                                            </label>
                                            <div className="w-full h-40">
                                                <div className="w-full h-40 flex space-x-2 overflow-x-hidden scrollbar-hide">
                                                    {product.images[0] ? (
                                                        product.images[0].map((curElem, index) => (
                                                            <div key={index} className="relative w-[150px] ">
                                                                <img style={{ width: "100%", objectFit: "cover", height: "100%" }} src={curElem} alt="" />
                                                                <button
                                                                    onClick={() => handleImageRemove(property.id, index, curElem)}
                                                                    className="absolute top-1 left-1 bg-red-500 text-white px-2 py-1 rounded-full"
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}

                                <div className="m-4">
                                    <label className="inline-block mb-2 text-gray-500">
                                        Uploaded Product Images
                                    </label>
                                    <div className="w-full h-40">
                                        <div className="w-full h-40 flex space-x-2 overflow-x-hidden scrollbar-hide">
                                            {uploadedProductImage.map((imageUrl, index) => (
                                                <div key={index} className="relative w-[150px]">
                                                    <img
                                                        style={{ width: "100%", objectFit: "cover", height: "100%" }}
                                                        src={imageUrl}
                                                        alt={`Product Image ${index + 1}`}
                                                    />
                                                    <button
                                                        onClick={() => handleImageRemove(/* Pass necessary parameters here */)}
                                                        className="absolute top-1 left-1 bg-red-500 text-white px-2 py-1 rounded-full"
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>


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

export default EditProductById;
