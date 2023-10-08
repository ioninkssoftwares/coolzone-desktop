import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Button, Checkbox, MenuItem, Select, TextField, Typography } from '@mui/material'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CircleIcon from '@mui/icons-material/Circle';
import { Circle } from '@mui/icons-material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import HomeSectionTitle from '../components/features/HomeSectionTittle';

const Checkout = () => {

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
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div>
            <Navbar />
            <section className="pt-5 mb-5">
                <div className="max-w-7xl mx-auto px-5 md:px-10 mt-10">
                    <div className='flex items-center justify-center'>
                    <HomeSectionTitle text="Checkout" />
                    </div>
                    <div className="flex md:flex-row flex-col my-10 gap-8 justify-between">
                        <div style={{ border: "2px solid gray" }} className="md:w-[65%] w-full bg-white px-10 py-10 rounded-lg">
                            {/* <p className='my-4'>Customer Information</p> */}

                            <p className='text-lg font-semibold'>
                                Customer Information
                            </p>
                            <form className='w-full'>

                                <TextField
                                    label="Your Name"
                                    fullWidth
                                    margin="normal"
                                // value={clientData.clientName}
                                // onChange={(e) =>
                                //     setClientData({ ...clientData, clientName: e.target.value })
                                // }
                                />

                                <div className='flex gap-4 my-4'>
                                    <TextField
                                        label="Contact Number"
                                        fullWidth
                                        margin="normal"
                                    // value={clientData.clientEmail}
                                    // onChange={(e) =>
                                    //     setClientData({ ...clientData, clientEmail: e.target.value })
                                    // }
                                    />
                                    <TextField
                                        label="Email Address"
                                        fullWidth
                                        margin="normal"
                                        sx={{
                                            outline: "none",
                                            border: "none"
                                            // backgroundColor:"red"
                                        }}
                                    />

                                </div>
                                <div className='flex gap-6 mb-4 mt-8'>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        // multiple
                                        // value={personName}
                                        // onChange={handleChange}
                                        // input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                        sx={{
                                            width: "50%"
                                        }}
                                    >
                                        {names.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                            // style={getStyles(name, personName, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        // multiple
                                        // value={personName}
                                        // onChange={handleChange}
                                        // input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                        sx={{
                                            width: "50%"
                                        }}
                                    >
                                        {names.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                            // style={getStyles(name, personName, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* <TextField
                                        label="Client Mobile Number"
                                        fullWidth
                                        margin="normal"

                                    /> */}

                                </div>

                                <div className='flex gap-4 my-4'>
                                    <TextField
                                        label="Address"
                                        fullWidth
                                        margin="normal"
                                    // value={clientData.clientEmail}
                                    // onChange={(e) =>
                                    //     setClientData({ ...clientData, clientEmail: e.target.value })
                                    // }
                                    />
                                    <TextField
                                        label="Landmark"
                                        fullWidth
                                        margin="normal"
                                        sx={{
                                            outline: "none",
                                            border: "none"
                                            // backgroundColor:"red"
                                        }}
                                    />

                                </div>

                                <div className='flex gap-4 my-4'>
                                    <TextField
                                        label="Locality"
                                        fullWidth
                                        margin="normal"
                                    // value={clientData.clientEmail}
                                    // onChange={(e) =>
                                    //     setClientData({ ...clientData, clientEmail: e.target.value })
                                    // }
                                    />
                                    <TextField
                                        label="Pincode"
                                        fullWidth
                                        margin="normal"
                                        sx={{
                                            outline: "none",
                                            border: "none"
                                            // backgroundColor:"red"
                                        }}
                                    />

                                </div>
                                <p className='mb-4 text-lg font-semibold'>Address Type</p>
                                <div className='flex'>
                                 
                                    <div className='flex items-center mr-8'>
                                        <Checkbox {...label} icon={<PanoramaFishEyeIcon />} checkedIcon={<CircleIcon />} />
                                    <p>Home</p>
                                    </div>
                                    <div className='flex items-center mr-8'>
                                        <Checkbox {...label} icon={<PanoramaFishEyeIcon />} checkedIcon={<CircleIcon />} />
                                    <p>Office</p>
                                    </div>
                                    <div className='flex items-center mr-8'>
                                        <Checkbox {...label} icon={<PanoramaFishEyeIcon />} checkedIcon={<CircleIcon />} />
                                    <p>Other</p>
                                    </div>
                                </div>
                                <p className='my-4 text-lg font-semibold'>Billing Address</p>
                                <div>
                                <div className='flex items-center mr-8'>
                                <Checkbox {...label} defaultChecked />
                                    <p>Same as Shipping address</p>
                                    </div>
                                </div>






                                <TextField
                                    label="Company Name"
                                    fullWidth
                                    margin="normal"
                                // value={clientData.companyName}
                                // onChange={(e) =>
                                //     setClientData({ ...clientData, companyName: e.target.value })
                                // }
                                />

                                <Button
                                    variant="contained"
                                    // onClick={handleSubmit}
                                    sx={{
                                        marginTop: 2,
                                        backgroundColor: '#FF730F', // Set the background color
                                        '&:hover': {
                                            backgroundColor: '#db8e57', // Set the hover background color
                                        },
                                        color: 'white', // Set the text color
                                    }}
                                    className="bg-[#FF730F] text-white hover:bg-[#db8e57]"
                                >
                                    Submit
                                </Button>
                            </form>
                            <div className='w-full'>


                            </div>
                        </div>
                        {/* Summary section */}

                        <div style={{ border: "2px solid gray" }} id="summary" className="md:w-[30%] w-full px-8 py-10 rounded-lg">
                            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                            <div className="flex justify-between mt-10 mb-5">
                                <span className="font-semibold text-sm uppercase">Subtotal</span>
                                <span className="font-semibold text-sm">590$</span>
                            </div>
                            <div>
                                <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                                <select className="block p-2 text-gray-600 w-full text-sm">
                                    <option>Standard shipping - $10.00</option>
                                </select>
                            </div>
                            {/* <div className="py-10">
                                <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                                <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                            </div> */}
                            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase my-4">Apply</button>
                            <div className="border-t mt-8">
                                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                    <span>Total cost</span>
                                    <span>$600</span>
                                </div>
                                {/* <button className="bg-primary-blue font-semibold hover:bg-indigo-600 py-3 text-sm text-white rounded-md uppercase w-full">Checkout</button> */}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Checkout