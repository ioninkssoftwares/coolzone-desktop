import React, { useState } from 'react'
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
};
const AddressPage = () => {
    const productss = useSelector(selectAllProducts);
    const isPending = useSelector(selectProductListStatus);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const userDetails = useSelector(selectCurrentUserDetails);

    if (userDetails) {
        console.log(userDetails, "fdlsjfkds")
    }



    return (
        <div>
            <Navbar />
            <section>
                <div className="max-w-7xl mx-auto px-5 md:px-10 my-4 ">
                    <p style={{ margin: "0 auto" }} className='font-semibold text-4xl w-fit'>Manage Address Section</p>
                    <div className='my-4'>
                        <p className='text-xl font-semibold'>Manage Address</p>
                        <div className='my-4 border-b-2 border-gray-400 pb-4'>
                            <div className='flex gap-2'>
                                <HomeOutlinedIcon />
                                <p>Home</p>
                            </div>
                            <div className='flex justify-between my-2'>
                                <div className='basis-[90%] flex flex-col'>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, adipisci?</p>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>
                                <div className='basis-[5%] flex gap-2'>
                                    <EditCalendarOutlinedIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} />
                                    <DeleteOutlineOutlinedIcon sx={{ cursor: 'pointer' }} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            {/* Other elements */}

                            <button
                                // onClick={() => scrollLeft("wishlist")}
                                className="px-4 py-2 m-2 rounded-lg bg-primary-blue text-white"
                            >
                                <AddOutlinedIcon /> Add New Address
                            </button>
                        </div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Manage your Address
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
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