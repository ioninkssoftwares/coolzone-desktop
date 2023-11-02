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
import { Checkbox, FormControlLabel, FormGroup, InputAdornment } from '@mui/material'
import { toast } from 'react-toastify'
import { useAxios } from '../utils/axios'
import { useCookies } from 'react-cookie'
// import ProductDetails from '../components/product/productDetails'

const ProfilePage = () => {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(["token"]);
    const [token, setToken] = useState("");
    const productss = useSelector(selectAllProducts);
    const isPending = useSelector(selectProductListStatus);
    const userDetails = useSelector(selectCurrentUserDetails);


    const [userData, setUserData] = useState({
        email: '',
        name: '',
        lastName: '',
        DOB: '',
        contactNumber: '',
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
          console.log(cookies.token,"dslfjadslk")
          setToken(cookies.token);
        }
      }, [cookies]);

      useEffect(() => {
        // Pick only the relevant fields from userDetails
        const { email, name, lastName, DOB, contactNumber, gender } = userDetails;
      
        // Update userData state
        setUserData({
          email: email || '',
          name: name || '',
          lastName: lastName || '',
          DOB: DOB || '',
          contactNumber: contactNumber || '',
          gender: gender || '',
        });
      }, [userDetails, dispatch]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for empty fields
        // const emptyFields = Object.keys(userData).filter((key) => userData[key] === '');
    
        // if (emptyFields.length > 0) {
        //   emptyFields.forEach((field) => {
        //     toast.error(`${field} is empty`, { position: toast.POSITION.TOP_RIGHT });
        //   });
        // } else {
            const instance = useAxios(token)
         try {
            const response = await instance.put("/me/update",userData)
            console.log(response.data,"kjdfklsjfd")
            dispatch(getCurrentUserAsync(token))
         } catch (error) {
            console.log(error)
         }
        // }
      };


      useEffect(() => {
        if (token) {
            dispatch(getCurrentUserAsync(token))
        }

    }, [token])




    return (
        <div>
            <Navbar />
            <section>
                <div className="max-w-7xl mx-auto px-5 md:px-10 my-4  ">
                    <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Profile Section</p>
                    <div className='my-4'>
                        <p className='font-semibold text-2xl text-primary-blue w-fit'>My Account Information</p>
                        <form>
                            <div className='flex items-center justify-between gap-6'>
                                <div className='basis-[48%]'>
                                    <TextField
                                        label="First Name"
                                        fullWidth
                                        margin="normal"
                                        value={userData?.name}
                                        error={userData.name === ''}
                                        onChange={(e) =>
                                            setUserData({ ...userData, name: e.target.value })
                                        }
                                    />
                                    <TextField
                                        label="Date of Birth"
                                        fullWidth
                                        margin="normal"
                                        value={userData?.DOB}
                                        error={userData.DOB === ''}
                                        onChange={(e) =>
                                            setUserData({ ...userData, DOB: e.target.value })
                                        }
                                    />
                                    <TextField
                                        label="Contact Number"
                                        fullWidth
                                        margin="normal"
                                        value={userData?.contactNumber}
                                        error={userData.contactNumber === ''}
                                        onChange={(e) =>
                                            setUserData({ ...userData, contactNumber: e.target.value })
                                        }
                                    />

                                </div>

                                <div className='basis-[48%]'>
                                    <TextField
                                        label="Last Name"
                                        fullWidth
                                        margin="normal"
                                        value={userData?.lastName}
                                        error={userData.lastName === ''}
                                        // error={!!formErrors.lastName}
                                        onChange={(e) =>
                                            setUserData({ ...userData, lastName: e.target.value })
                                        }
                                    />
             
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '20px',
                                            border: '1px solid #c4c4c4',
                                            padding: '6px 10px',
                                            borderRadius: '5px',
                                            marginTop: '15px',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        <p>Gender</p>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        value="Male"
                                                        checked={userData.gender === 'Male'}
                                                        onChange={handleCheckboxChange}
                                                        defaultChecked
                                                    />
                                                }
                                                label="Male"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        value="Female"
                                                        checked={userData.gender === 'Female'}
                                                        onChange={handleCheckboxChange}
                                                        defaultChecked
                                                    />
                                                }
                                                label="Female"
                                            />
                                        </FormGroup>
                                        {/* <span style={{ color: 'red' }}>{formErrors.gender}</span> */}
                                    </Box>


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
                                        error={userData.email === ''} // Built-in validation for required field
                                        // helperText={userData.email === '' ? 'Email is required' : ''}
                                        onChange={(e) =>
                                            setUserData({ ...userData, email: e.target.value })
                                        }
                                    />

                                </div>
                            </div>


                            {/* Add margin-top to separate form fields and button */}
                            <Button
                            onClick={handleSubmit}
                                variant="contained"
                                // onClick={handleSubmit}
                                sx={{
                                    marginTop: 2,
                                    backgroundColor: '#04a7ff', // Set the background color
                                    '&:hover': {
                                        backgroundColor: '#04a7ff', // Set the hover background color
                                    },
                                    color: 'white', // Set the text color
                                }}
                                className="bg-primary-blue text-white "
                            >
                                Submit
                            </Button>
                        </form>
                    </div>

                </div>
            </section>
            <Footer />
        </div>

    )
}

export default ProfilePage