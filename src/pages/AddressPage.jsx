import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { data } from '../test'
import MediumHouseCard from '../components/features/MediumHomeCard'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import HomeSectionTitle from '../components/features/HomeSectionTittle'
import CardCarousel from '../components/features/CardCarousel'
import { useSelector } from 'react-redux'
import { selectAllProducts, selectProductListStatus } from '../components/product/productSlice'
import { scrollLeft, scrollRight } from './Home'
import { selectCurrentUserDetails } from '../components/auth/authSlice'
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useAxios } from '../utils/axios'
import { useCookies } from 'react-cookie'
// import ProductDetails from '../components/product/productDetails'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',

};
const AddressPage = () => {
    const productss = useSelector(selectAllProducts);
    const isPending = useSelector(selectProductListStatus);
    const [cookies, setCookies] = useCookies(["token"]);
    const [token, setToken] = useState("");
    const [open, setOpen] = useState(false);
    // const [state, setState] = useState('');
    const [addNewOpen, setAddNewOpen] = useState(false);
    const [savedAddress, setSavedAddress] = useState([]);
    const userDetails = useSelector(selectCurrentUserDetails);
    const [address, setAddress] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNo: "",
    })

    const [updateAddress, setUpdateAddress] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNo: "",
    })


    if (savedAddress) {
        console.log(savedAddress, "fdlsjfkds")
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleNewOpen = () => setAddNewOpen(true);
    const handleNewClose = () => setAddNewOpen(false);



    useEffect(() => {
        if (cookies && cookies.token) {
            console.log(cookies.token, "dslfjadslk")
            setToken(cookies.token);
        }
    }, [cookies]);

    const states = [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal',
    ];



    const handleChange = (event) => {
        setAddress({ ...address, state: event.target.value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(address, "jkdljlkdjkfsl")
        const instance = useAxios(token)
        try {
            const response = await instance.post("/me/address/new", address)
            console.log(response.data, "jvkdjk")
            handleNewClose()
            setAddress({
                address: "",
                city: "",
                state: "",
                country: "",
                pinCode: "",
                phoneNo: "",
            })
        } catch (error) {
            console.log(error)
        }
    };


    const handleUpdateAddress = async (id) => {
        const instance = useAxios(token)
        try {
            const response = await instance.put(`/me/address/${id}`, updateAddress)
            console.log(response.data, "jvkdjk")
            handleClose()
            setUpdateAddress({
                address: "",
                city: "",
                state: "",
                country: "",
                pinCode: "",
                phoneNo: "",
            })
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    };
    const handleDeleteAddress = async (id) => {
        const instance = useAxios(token)
        try {
            const response = await instance.delete(`/me/address/${id}`)
            console.log(response.data, "jvkdjk")
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    };
    const getUserAddress = async (event) => {
        const instance = useAxios(token)
        try {
            const response = await instance.get("/me/getmyaddress")
            setSavedAddress(response.data.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getUserAddress()
    }, [token])

    const handleEditAddress = (curElem) => {
        // Set the initial values based on curElem
        setUpdateAddress({
          phoneNo: curElem.phoneNo,
          address: curElem.address,
          city: curElem.city,
          pinCode: curElem.pinCode,
          state: curElem.state,
          country: curElem.country,
        });
        handleOpen();
      }
      
    return (
        <div>
            <Navbar />
            <section>
                <div className="max-w-7xl mx-auto px-5 md:px-10 my-4 ">
                    <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Manage Address Section</p>
                    <div className='my-4'>
                        <p className='text-xl font-semibold'>Manage Address</p>
                        {savedAddress && savedAddress.length > 0 ? savedAddress.map((curElem) => (<>
                            <div className='my-4 border-b-2 border-gray-400 pb-4'>
                                <div className='flex gap-2'>
                                    <HomeOutlinedIcon />
                                    <p>Home</p>
                                </div>
                                <div className='flex justify-between my-2'>
                                    <div className='basis-[90%] flex flex-col'>
                                        <p>{curElem.address}</p>
                                        <p>{curElem.city}, {curElem.state}, {curElem.country}, {curElem.pinCode}</p>
                                        <p>Phone Number- {curElem.phoneNo} </p>
                                    </div>
                                    <div className='basis-[5%] flex gap-4'>
                                        <EditCalendarOutlinedIcon onClick={() => handleEditAddress(curElem)} sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }} />
                                        <DeleteOutlineOutlinedIcon onClick={() => handleDeleteAddress(curElem._id)} sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }} id="modal-modal-title" variant="h6" component="h2">
                                            Edit your Address
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            You can edit your below address
                                        </Typography>
                                        <div className='flex items-center justify-between gap-2 my-4'>
                                            <div>
                                                <p>Phone Number</p>
                                                <TextField value={updateAddress.phoneNo} onChange={(e) => setUpdateAddress({...updateAddress,phoneNo:e.target.value})} fullWidth margin="normal" required />
                                                <p>Address</p>
                                                <TextField value={updateAddress.address} onChange={(e) => setUpdateAddress({...updateAddress,address:e.target.value})}  fullWidth margin="normal" required />
                                                <p>City</p>
                                                <TextField value={updateAddress.city} onChange={(e) => setUpdateAddress({...updateAddress,city:e.target.value})}  fullWidth margin="normal" required />
                                            </div>
                                            <div>
                                                <p>Pin Code</p>
                                                <TextField value={updateAddress.pinCode} onChange={(e) => setUpdateAddress({...updateAddress,pinCode:e.target.value})}  fullWidth margin="normal" required />
                                                <p>State</p>
                                                <TextField value={updateAddress.state} onChange={(e) => setUpdateAddress({...updateAddress,state:e.target.value})}  fullWidth margin="normal" required />
                                                <p>Country</p>
                                                <TextField value={updateAddress.country} onChange={(e) => setUpdateAddress({...updateAddress,country:e.target.value})} fullWidth margin="normal" required />
                                            </div>
                                        </div>

                                        <div className='flex justify-end'>
                                            <button
                                                onClick={() => handleUpdateAddress(curElem._id)}
                                                className="px-4 py-2 m-2 rounded-lg bg-primary-blue text-white"
                                            >
                                                <EditCalendarOutlinedIcon sx={{marginRight:"5px"}} /> Edit Address
                                            </button>
                                        </div>

                                    </Box>
                                </Modal>
                            </div>
                        </>
                        )) : ""}
                        <div className="flex justify-end">
                            {/* Other elements */}

                            <button
                                onClick={handleNewOpen}
                                className="px-4 py-2 m-2 rounded-lg bg-primary-blue text-white"
                            >
                                <AddOutlinedIcon /> Add New Address
                            </button>
                        </div>


                        <Modal
                            open={addNewOpen}
                            onClose={handleNewClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: "bold", fontSize: "25px" }}>
                                    Add New Address
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    You can add your new address
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    {/* <TextField label="Full Name" fullWidth margin="normal" required /> */}
                                    <TextField onChange={(e) => setAddress({ ...address, phoneNo: e.target.value })} label="Mobile Number" fullWidth margin="normal" required />
                                    <TextField onChange={(e) => setAddress({ ...address, pinCode: e.target.value })} label="Pincode" fullWidth margin="normal" required />
                                    {/* <TextField label="Flat, House no., Building, Apartment" fullWidth margin="normal" required /> */}
                                    <TextField onChange={(e) => setAddress({ ...address, address: e.target.value })} label="Address" fullWidth margin="normal" required />
                                    {/* <TextField label="Landmark" fullWidth margin="normal" /> */}
                                    <TextField onChange={(e) => setAddress({ ...address, city: e.target.value })} label="Town/City" fullWidth margin="normal" required />
                                    <TextField onChange={(e) => setAddress({ ...address, country: e.target.value })} label="Country" fullWidth margin="normal" required />

                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>State</InputLabel>
                                        <Select value={address?.state} onChange={handleChange} label="State" required>
                                            {states.map((state) => (
                                                <MenuItem key={state} value={state}>
                                                    {state}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {/* <TextField label="Delivery Instructions" fullWidth margin="normal" multiline /> */}

                                    <Button type="submit" variant="contained" color="primary">
                                        Save Address
                                    </Button>
                                </form>
                            </Box>
                        </Modal>


                    </div>
                </div>
            </section>
            <Footer />
        </div>

    )
}

export default AddressPage