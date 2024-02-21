import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { data } from '../test'
import MediumHouseCard from '../components/features/MediumHomeCard'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import HomeSectionTitle from '../components/features/HomeSectionTittle'
import CardCarousel from '../components/features/CardCarousel'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllProducts, selectProductListStatus } from '../components/product/productSlice'
import { scrollLeft, scrollRight } from './Home'
import { getCurrentUserAsync, selectCurrentUserDetails } from '../components/auth/authSlice'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Checkbox, CircularProgress, FormControlLabel, FormGroup, InputAdornment } from '@mui/material'
import { toast } from 'react-toastify'
import { useAxios } from '../utils/axios'
import { useCookies } from 'react-cookie'
import InputField from '../components/InputField'
// import ProductDetails from '../components/product/productDetails'

const ProfilePage = () => {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(["token"]);
    const [token, setToken] = useState("");
    const productss = useSelector(selectAllProducts);
    const isPending = useSelector(selectProductListStatus);
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const instance = useAxios(token)
    const [formErrors, setFormErrors] = useState({});

    // const userDetails = useSelector(selectCurrentUserDetails);


    const [userData, setUserData] = useState({
        email: '',
        name: '',
        lastName: '',
        DOB: '',
        contactNumber: 0,
        gender: ""
    });


    const handleCheckboxChange = (event) => {
        const updatedUserData = {
            ...userData,
            gender: event.target.checked ? event.target.value : '',
        };
        setUserData(updatedUserData);
    };

    if (userDetails) {
        console.log(userDetails, "dsfsd")
    }


    useEffect(() => {
        if (cookies && cookies.token) {
            console.log(cookies.token, "dslfjadslk")
            setToken(cookies.token);
        }
    }, [cookies]);


    const getUserDetails = async () => {
        try {
            setLoading(true)
            const res = await instance.get("/me")
            if (res.data) {
                setUserDetails(res.data.user)
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [token])


    useEffect(() => {
        if (userDetails && Object.keys(userDetails).length > 0) {
            // Pick only the relevant fields from userDetails
            const { email, name, lastName, DOB, contactNumber } = userDetails;

            // Update userData state
            setUserData({
                email: email || '',
                name: name || '',
                lastName: lastName || '',
                DOB: DOB || '',
                contactNumber: contactNumber || '',
                // gender: gender || '',
            });
        }
    }, [userDetails]);



    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userData, "djkshksdjhf")


        try {
            const response = await instance.put("/me/update", userData)
            console.log(response.data, "kjdfklsjfd")
            if (response.data) {
                toast.success("User updated successfully")
                getUserDetails()
            }

            // dispatch(getCurrentUserAsync(token))
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }




    const validateMobileNumber = (value) => {
        const regex = /^[0-9]{10}$/; // Only allow 10 digits
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value); // Check for special characters
        const hasLetters = /[a-zA-Z]/.test(value); // Check for letters

        if (!regex.test(value)) {
            return 'Invalid mobile number (must have exactly 10 digits)';
        } else if (hasSpecialChars) {
            return 'Mobile number cannot contain special characters';
        } else if (hasLetters) {
            return 'Mobile number cannot contain letters';
        }

        return null; // No validation error
    };


    const validateDate = (value) => {
        const regex = /^(0[1-9]|[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2]|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/i; // DD-MM-YYYY or DD-MMM-YYYY format
        return regex.test(value) ? null : 'Invalid date format (DD-MM-YYYY or DD-MMM-YYYY)';
    };

    const validateFirstName = (value) => {
        const regex = /^[a-zA-Z]+$/; // Only allow letters without spaces
        return regex.test(value) ? null : 'Invalid name';
    };


    return (
        <div>
            <Navbar />
            <section>
                <div className="max-w-7xl mx-auto px-5 md:px-10 my-4  ">
                    <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Profile Section</p>
                    <div className='my-4'>
                        <p className='font-semibold text-center text-2xl text-primary-blue w-full mb-8'>My Account Information</p>
                        {loading ? <p> Loading...</p> : <form>
                            <div className='flex items-center justify-center gap-6'>
                                <div className='w-[50%]'>
                                    {/* 
                                    <InputField
                                        label="First Name"
                                        type="text"
                                        required
                                        value={userData?.name}
                                        onChange={(e) => setUserData({ ...userData, name: e })}

                                        validate={validateFirstName}
                                    /> */}
                                    <InputField
                                        label="First Name"
                                        type="text"
                                        required
                                        value={userData?.name}
                                        onChange={(value) => {
                                            setUserData({ ...userData, name: value });
                                            setFormErrors({ ...formErrors, name: validateFirstName(value) });
                                        }}
                                        validate={validateFirstName}
                                    />

                                    <InputField
                                        label="Last Name"
                                        fullWidth
                                        margin="normal"
                                        value={userData?.lastName}
                                        required
                                        // error={!!formErrors.lastName}
                                        onChange={(value) => {
                                            setUserData({ ...userData, lastName: value });
                                            setFormErrors({ ...formErrors, lastName: validateFirstName(value) });
                                        }}
                                        validate={validateFirstName}
                                    />



                                    <InputField
                                        label="Date of Birth"
                                        type="text"
                                        required
                                        value={userData?.DOB}
                                        onChange={(value) => {
                                            setUserData({ ...userData, DOB: value });
                                            setFormErrors({ ...formErrors, DOB: validateDate(value) });
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}

                                        validate={validateDate}

                                    />
                                    <InputField
                                        label="Contact Number"
                                        type="number"
                                        required
                                        value={userData?.contactNumber}

                                        onChange={(value) => {
                                            setUserData({ ...userData, contactNumber: value });
                                            setFormErrors({ ...formErrors, contactNumber: validateFirstName(value) });
                                        }}
                                        validate={validateMobileNumber}

                                    />


                                    <TextField
                                        label="Email Address"
                                        fullWidth
                                        margin="normal"
                                        sx={{
                                            "&:focus": {
                                                outline: 'none !important',
                                                boxShadow: 'none !important',
                                            },
                                        }}
                                        value={userData?.email}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />

                                </div>




                            </div>


                            {/* Add margin-top to separate form fields and button */}
                            {/* {loading ? <CircularProgress /> : <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Button
                                    onClick={handleSubmit}
                                    variant="contained"
                                    sx={{
                                        marginTop: 2,
                                        backgroundColor: '#04a7ff',
                                        '&:hover': {
                                            backgroundColor: '#04a7ff', 
                                        },
                                        color: 'white', // Set the text color
                                    }}
                                    className="bg-primary-blue  text-white "
                                    disabled={Object.values(formErrors).some((error) => Boolean(error))}
                                >
                                    Submit
                                </Button>
                            </Box>} */}

                            {loading ? <CircularProgress /> : Object.values(formErrors).some((error) => Boolean(error)) ? null : (
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Button
                                        onClick={handleSubmit}
                                        variant="contained"
                                        sx={{
                                            marginTop: 2,
                                            backgroundColor: '#04a7ff',
                                            '&:hover': {
                                                backgroundColor: '#04a7ff',
                                            },
                                            color: 'white', // Set the text color
                                        }}
                                        className="bg-primary-blue  text-white "
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            )}

                        </form>}
                    </div>

                </div>
            </section>
            <Footer />
        </div>

    )
}

export default ProfilePage