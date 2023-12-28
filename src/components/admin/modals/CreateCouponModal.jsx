import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CircularProgress, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { Textarea } from '@mui/joy';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useAxios } from '../../../utils/axios';
// import { useAxios } from '../../utills/axios';




// function SearchDropdown({ options, onSelect, propertyData }) {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedOption, setSelectedOption] = useState(null);



//     useEffect(() => {
//       if (propertyData) {
//         setSearchQuery(propertyData?.location.name);
//         setSelectedOption(null);
//       }
//     }, [propertyData]);


//     const filteredOptions = options?.filter((option) =>
//       option.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleSearchChange = (e) => {
//       setSearchQuery(e.target.value);
//       setSelectedOption(null);
//     };

//     const handleOptionSelect = (optionName) => {
//       onSelect(optionName);
//       setSelectedOption(optionName);
//       setSearchQuery('');
//       setIsOpen(false);
//     };

//     const placeholder = selectedOption ? selectedOption : "Search locations";


//     return (

//       <div style={{ margin: "20px 0" }} className="relative">
//         <div
//           className={`relative z-10 ${isOpen ? "border-blue-500" : ""
//             } transition-all duration-300 group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd `}
//         >
//           <input
//             style={{ borderRadius: "18px" }}
//             type="text"
//             className="inputField"
//             placeholder={placeholder}
//             value={searchQuery}
//             onChange={handleSearchChange}
//             onClick={() => setIsOpen(true)}
//           />
//         </div>

//         {isOpen && (
//           <div className="absolute left-0 bg-white border rounded-md w-full z-20 max-h-60 overflow-y-auto">
//             {filteredOptions.map((option) => (
//               <div
//                 key={option._id}
//                 className="px-4 py-2 cursor-pointer hover:bg-blue-100"
//                 onClick={() => handleOptionSelect(option.name)}
//               >
//                 {option.name}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//     );
//   }





const CreateCouponModal = ({ buttonText, modalTitle, onSubmit }) => {
    // const instance = useAxios();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // const theme = useTheme();

    const [status, setStatus] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [clients, setClients] = useState(null)
    const [token, setToken] = useState("");
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const instance = useAxios(token);
    const [clientNames, setClientNames] = useState([]);
    const [couponData, setCouponData] = useState({
        couponName: '',
        couponCode: '',
        couponType: '',
        discount: '',
        couponSegment: '',
        couponExpiry: '',
        maxUser: '',
        couponDescription: '',
    });

    const [switchState, setSwitchState] = useState(false);

    const handleSwitchChange = (event) => {
        setSwitchState(event.target.checked);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        // onSubmit(couponData);
        // setOpen(false);
        setLoading(true)
        try {

            const res = await instance.post("/admin/createCoupon", couponData);

            if (res.data) {
                setLoading(false)

                console.log(res.data)
            }

        } catch (error) {
            setLoading(false)

            console.log(error)
            toast.error(error.response.data.message || error.message)
        }

    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        overflowY: "auto",
        maxHeight: 700,
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'white', // Changed background color to white
        boxShadow: 24,
        p: 4, // Adjust padding as needed
        borderRadius: 4, // Add border radius for rounded corners
        outline: 'none', // Remove default focus outline
    };

    // MUI DropDown

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Completed',
        "Ongoing",
        "Onhold",
        "Pending",
    ];


    // const clientNames = [
    //     'Completed',
    //     "Ongoing",
    //     "Onhold",
    //     "Pending",
    // ];



    const handleChange = (event) => {
        console.log(event.target.value, "clieee")

        setStatus(event.target.value);
        setCouponData({
            ...couponData,
            status: event.target.value
        });
    };



    // Get all Clients
    const getAllClients = async () => {
        // try {
        //     const res = await instance.get("/client/allclientlist/admin");

        //     if (res.data.TaskList) {
        //         setClients(res?.data?.TaskList);

        //         console.log(res.data.TaskList, "task")
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };


    // useEffect(() => {
    //     console.log("API call started");
    //     getAllClients(); // Make the API call
    // }, []);



    const handleClient = (event) => {
        console.log(event.target.value, "clieee")
        setSelectedClient(event.target.value)
        setCouponData({
            ...couponData,
            clientEmail: event.target.value.clientEmail
        });
    };


    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "fdsfsdfsf")
            setToken(cookies.adminToken);
        }
    }, [cookies]);




    // if (couponData) {
    //     console.log(couponData, "project")
    // }

    return (
        <>
            {/* <p></p> */}
            <Button sx={{
                color: "white", borderRadius: "10px", padding: "7px 15px", backgroundColor: "#04a7ff",
                //  "&:hover": {
                //     backgroundColor: '#db8e57'
                // },
            }} className="px-3 text-white font-medium justify-center w-full bg-primary-blue rounded-lg py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200" onClick={handleOpen}>{buttonText}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {modalTitle}
                    </Typography>
                    <Typography sx={{ my: 1, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                        Coupons Information
                    </Typography>
                    <form>
                        {/* Add margin-bottom to separate form fields */}
                        <TextField
                            label="Coupon Name"
                            fullWidth
                            margin="normal"
                            value={couponData.couponName}
                            onChange={(e) =>
                                setCouponData({ ...couponData, couponName: e.target.value })
                            }
                        />
                        <TextField
                            label="Coupon Code"
                            fullWidth
                            margin="normal"
                            value={couponData.couponCode}
                            onChange={(e) =>
                                setCouponData({ ...couponData, couponCode: e.target.value })
                            }
                        />

                        <TextField
                            label="Coupon Type"
                            fullWidth
                            margin="normal"
                            value={couponData.couponType}
                            onChange={(e) =>
                                setCouponData({ ...couponData, couponType: e.target.value })
                            }
                        />

                        <TextField
                            label="Discount (Percentage / Flat Amount)"
                            fullWidth
                            margin="normal"
                            value={couponData.discount}
                            onChange={(e) =>
                                setCouponData({ ...couponData, discount: e.target.value })
                            }
                        />
                        <TextField
                            label="Coupon Segment"
                            fullWidth
                            margin="normal"
                            value={couponData.couponSegment}
                            onChange={(e) =>
                                setCouponData({ ...couponData, couponSegment: e.target.value })
                            }
                        />
                        <TextField
                            label="Coupon Expiry"
                            fullWidth
                            margin="normal"
                            value={couponData.couponExpiry}
                            onChange={(e) =>
                                setCouponData({ ...couponData, couponExpiry: e.target.value })
                            }
                        />
                        <TextField
                            label="Max User Per Customer"
                            fullWidth
                            margin="normal"
                            value={couponData.maxUser}
                            onChange={(e) =>
                                setCouponData({ ...couponData, maxUser: e.target.value })
                            }
                        />

                        <Textarea value={couponData.couponDescription}
                            onChange={(e) =>
                                setCouponData({ ...couponData, couponDescription: e.target.value })
                            } sx={{ marginTop: 2 }} minRows={4} placeholder="Description of Coupon" />
                        {/* <Button
                            variant="contained"
                            // onClick={handleSubmit}
                            sx={{
                                marginTop: 2,
                                display: "block",
                                margin: "0 auto",
                                borderRadius: "15px",
                                backgroundColor: '#04a7ff', // Set the background color
                                // '&:hover': {
                                //     backgroundColor: '#db8e57', // Set the hover background color
                                // },
                                color: 'white', // Set the text color
                            }}
                            className="bg-[#04a7ff] text-white"
                        >
                            Generate Coupon
                        </Button> */}

                        {/* <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={switchState} onChange={handleSwitchChange} />}
                                label="Add a new address"
                            />
                        </FormGroup> */}




                        {/* Add margin-top to separate form fields and button */}

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, mt: 3 }}>
                            {/* <Button
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{
                                    marginTop: 2,
                                    backgroundColor: 'white',
                                    flexBasis: "45%",
                                    color: '#04a7ff',
                                    borderRadius: "15px",
                                    border: "2px solid blue",
                                    padding: "15px 0" // Set the text color
                                }}
                                className="bg-[#04a7ff] text-white"
                            >
                                Cancle
                            </Button> */}
                            {loading ? <CircularProgress /> : <Button
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{
                                    marginTop: 2,
                                    backgroundColor: '#04a7ff',
                                    flexBasis: "45%",
                                    color: 'white',
                                    borderRadius: "15px",
                                    padding: "15px 0" // Set the text color
                                }}
                                className="bg-[#04a7ff] text-white"
                            >
                                Add
                            </Button>}

                        </Box>

                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default CreateCouponModal;
