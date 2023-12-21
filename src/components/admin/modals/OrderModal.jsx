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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginTop: 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));



const OrderModal = ({ buttonText, modalTitle, onSubmit }) => {
    // const instance = useAxios();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(dayjs('2022-04-17'));
    // const theme = useTheme();
    const [status, setStatus] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [clients, setClients] = useState(null)
    const [clientNames, setClientNames] = useState([]);
    const [projectData, setProjectData] = useState({
        project_name: '',
        status: '',
        clientEmail: '',
        startDate: '',
        endDate: '',
        project_company: '',
        project_categories: '',
    });

    // const [switchState, setSwitchState] = useState(false);

    // const handleSwitchChange = (event) => {
    //     setSwitchState(event.target.checked);
    // };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        // onSubmit(projectData);
        // setOpen(false);
        try {

            const res = await instance.post("/project/addProject/admin", projectData);

            if (res.data) {
                console.log(res.data)
            }

        } catch (error) {
            console.log(error)
        }

    };

    const style = {
        position: 'absolute',
        display: "flex",
        gap: 7,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'white', // Changed background color to white
        boxShadow: 24,
        p: 3, // Adjust padding as needed
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
        setProjectData({
            ...projectData,
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
        setProjectData({
            ...projectData,
            clientEmail: event.target.value.clientEmail
        });
    };




    // if (projectData) {
    //     console.log(projectData, "project")
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

                    <Box sx={{ flexBasis: "45%" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {modalTitle}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                            <Typography sx={{ my: 1, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                                Customer Information
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    label="New Customer"
                                    control={<Switch defaultChecked />}

                                />
                            </FormGroup>
                        </Box>

                        <form>
                            {/* Add margin-bottom to separate form fields */}


                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Customer</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={clients}
                                    label="Select Customer"
                                // onChange={handleClient}
                                >
                                    {/* { clients && clients.map((name) => (
                                            <MenuItem
                                                key={name?.clientName}
                                                value={name?.clientName}
                                            // style={getStyles(name, personName, theme)}
                                            >
                                                {name?.clientName}
                                            </MenuItem>
                                        ))} */}
                                </Select>
                            </FormControl>

                            <Box sx={{ display: "flex", marginTop: 2, gap: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={clients}
                                        label="Select Customer"
                                    // onChange={handleClient}
                                    >
                                        {/* { clients && clients.map((name) => (
                                            <MenuItem
                                                key={name?.clientName}
                                                value={name?.clientName}
                                            // style={getStyles(name, personName, theme)}
                                            >
                                                {name?.clientName}
                                            </MenuItem>
                                        ))} */}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Order Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={clients}
                                        label="Select Customer"
                                    // onChange={handleClient}
                                    >
                                        {/* { clients && clients.map((name) => (
                                            <MenuItem
                                                key={name?.clientName}
                                                value={name?.clientName}
                                            // style={getStyles(name, personName, theme)}
                                            >
                                                {name?.clientName}
                                            </MenuItem>
                                        ))} */}
                                    </Select>
                                </FormControl>

                            </Box>
                            <Typography sx={{ marginTop: 2 }}>
                                Order Time and Date
                            </Typography>

                            <Box sx={{ display: "flex", marginTop: 2, gap: 2 }}>
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
                            </Box>

                            <FormControl fullWidth sx={{ marginTop: 2 }}>
                                <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={clients}
                                    label="Order Status"
                                // onChange={handleClient}
                                >
                                    {/* { clients && clients.map((name) => (
                                            <MenuItem
                                                key={name?.clientName}
                                                value={name?.clientName}
                                            // style={getStyles(name, personName, theme)}
                                            >
                                                {name?.clientName}
                                            </MenuItem>
                                        ))} */}
                                </Select>
                            </FormControl>



                            <TextField
                                label="Order Note"
                                fullWidth
                                margin="normal"
                                value={projectData.project_name}
                                onChange={(e) =>
                                    setProjectData({ ...projectData, project_name: e.target.value })
                                }
                            />





                            {/* Add margin-top to separate form fields and button */}
                            <Box sx={{ display: "flex", justifyContent: "end" }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{
                                        marginTop: 2,
                                        padding: 2,
                                        textAlign: "end",
                                        backgroundColor: '#04a7ff', // Set the background color
                                        // '&:hover': {
                                        //     backgroundColor: '#db8e57', // Set the hover background color
                                        // },
                                        color: 'white', // Set the text color
                                    }}
                                    className="bg-[#04a7ff] text-white"
                                >
                                    Submit
                                </Button>
                            </Box>

                        </form>
                    </Box>

                    <Box sx={{ flexBasis: "45%" }}>
                        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                            {modalTitle}
                        </Typography> */}
                        <Typography sx={{ mt: 5, mb: 2, color: "gray" }} id="modal-modal-title" variant="p" component="p">
                            Items
                        </Typography>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>




                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    <li className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href="#">Throwback Hip Bag</a>
                                                    </h3>
                                                    <p className="ml-4">$90.00</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">Salmon</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty 1</p>

                                                <div className="flex">
                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg" alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." className="h-full w-full object-cover object-center" />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href="#">Medium Stuff Satchel</a>
                                                    </h3>
                                                    <p className="ml-4">$32.00</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">Blue</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty 1</p>

                                                <div className="flex">
                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>$262.00</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        </div>

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                marginTop: 2,
                                padding: 2,
                                backgroundColor: '#04a7ff', // Set the background color
                                // '&:hover': {
                                //     backgroundColor: '#db8e57', // Set the hover background color
                                // },
                                color: 'white', // Set the text color
                            }}
                            className="bg-[#04a7ff] text-white"
                        >
                            Create Order
                        </Button>

                    </Box>





                </Box>
            </Modal>
        </>
    );
};

export default OrderModal;
