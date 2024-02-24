import { BiArrowBack } from "react-icons/bi"
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingInfo } from "../redux/reducer/cartReducer"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAxios } from "../utils/axios"
import { useCookies } from "react-cookie"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { TextField, MenuItem, FormControl, InputLabel, Select, CircularProgress, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const ShippingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(["token"]);
    const [token, setToken] = useState("");
    const [savedAddress, setSavedAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    if (selectedAddress) console.log(selectedAddress, "asdfjsakjfhdsaj")


    const { cartItems, total } = useSelector(
        (state) => state.cartReducer
    );


    useEffect(() => {
        if (cookies && cookies.token) {
            console.log(cookies.token, "dslfjadslk")
            setToken(cookies.token);
        }
    }, [cookies]);


    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    });

    const changeHandler = (e) => {
        setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (selectedAddress) {
            const paymentAddress = {
                address: selectedAddress?.address,
                city: selectedAddress?.city,
                country: selectedAddress?.country,
                state: selectedAddress?.state,
                pinCode: selectedAddress?.pinCode,
            };
            console.log(paymentAddress, "sdahkasdj");
            dispatch(saveShippingInfo(paymentAddress));
            // toast.success("Order placed successfully");
            navigate("/checkout");
        } else {

            console.error("Please select an address before proceeding.");
        }
    };

    useEffect(() => {
        if (cartItems.length <= 0) {
            toast.error("Cart is empty")
            navigate("/cart");
        }
    }, [cartItems]);


    const getUserAddress = async (event) => {
        const instance = useAxios(token)
        try {
            const response = await instance.get("/me/getMyAddress")
            setSavedAddress(response.data.addresses)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getUserAddress()
    }, [token])


    const handleCheckbox = (curElem) => {

        // Update the state to the selected address
        setSelectedAddress(curElem);
        // Your other logic here...
    };


    {/* <EditCalendarOutlinedIcon onClick={() => handleEditAddress(curElem)} sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }} /> */ }
    {/* <DeleteOutlineOutlinedIcon onClick={() => handleDeleteAddress(curElem._id)} sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }} /> */ }

    return (
        <div>
            <Navbar />
            <section>
                <div className="max-w-7xl mx-auto px-5 md:px-10 my-4 ">
                    {/* <div>
                        <div className="flex justify-end">
                            <button onClick={() => navigate("/cart")}>
                                <BiArrowBack className="text-2xl" />
                            </button>
                        </div>


                        <form className=" w-full flex gap-4 flex-col items-center justify-center p-8" onSubmit={submitHandler}>
                            <h1 className="heading-2px mb-8 text-center">Shipping Address</h1>

                            <input
                                className="border w-[60%] border-gray-300 p-4 outline-none rounded"
                                required
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={shippingInfo.address}
                                onChange={changeHandler}
                            />

                            <input
                                className="border w-[60%] border-gray-300 p-4 outline-none rounded"
                                required
                                type="text"
                                placeholder="City"
                                name="city"
                                value={shippingInfo.city}
                                onChange={changeHandler}
                            />

                            <input
                                className="border w-[60%] border-gray-300 p-4 outline-none rounded"
                                required
                                type="text"
                                placeholder="State"
                                name="state"
                                value={shippingInfo.state}
                                onChange={changeHandler}
                            />

                            <select
                                className="border w-[60%] border-gray-300 p-4 outline-none rounded"
                                name="country"
                                required
                                value={shippingInfo.country}
                                onChange={changeHandler}
                            >
                                <option value="">Choose Country</option>
                                <option value="india">India</option>
                            </select>

                            <input
                                className="border w-[60%] border-gray-300 p-4 outline-none rounded mt-4"
                                required
                                type="number"
                                placeholder="Pin Code"
                                name="pinCode"
                                value={shippingInfo.pinCode}
                                onChange={changeHandler}
                            />

                            <button className="bg-primary-blue font-semibold hover:bg-indigo-600 py-3 text-sm text-white rounded-md uppercase px-6"
                                type="submit">Pay Now</button>
                        </form>
                    </div> */}

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
                                    {/* <p>Phone Number- {curElem.phoneNo} </p> */}
                                </div>
                                <div className='basis-[5%] flex gap-4'>

                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={() => handleCheckbox(curElem)}
                                                    checked={selectedAddress === curElem}
                                                />
                                            }
                                        // label="Male"
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </>
                    )) : <div className="flex items-center justify-center my-8">
                        <p className="font-semibold text-lg">Please add your address, <span onClick={() => navigate("/address")} className="text-blue-800 cursor-pointer">Click here</span></p>
                    </div>}

                    <div className="flex justify-end">
                        <button onClick={handleSubmit} className="bg-primary-blue font-semibold hover:bg-indigo-600 py-3 text-sm text-white rounded-md  uppercase px-6"
                            disabled={!selectedAddress}

                        >Pay Now</button>
                    </div>

                </div>

            </section>
            <Footer />
        </div>
    )
}
export default ShippingPage