import { BiArrowBack } from "react-icons/bi"
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingInfo } from "../redux/reducer/cartReducer"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const ShippingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems, total } = useSelector(
        (state) => state.cartReducer
    );

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

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(saveShippingInfo(shippingInfo));
        // toast.success("Order placed successfully")
        navigate("/checkout")

        // try {
        //     const { data } = await axios.post(
        //         `${server}/payment/create`,
        //         {
        //             amount: total,
        //         },
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //         }
        //     );

        //     navigate("/pay", {
        //         state: data.clientSecret,
        //     });
        // } catch (error) {
        //     console.log(error);
        //     toast.error("Something went wrong");
        // }

    };

    useEffect(() => {
        if (cartItems.length <= 0) {
            toast.error("Cart is empty")
            navigate("/cart");
        }
    }, [cartItems]);

    return (
        <div>
            <Navbar />
            <section>
                <div className="max-w-7xl mx-auto px-5 md:px-10 my-4 ">
                    <div>
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
                    </div>
                </div>

            </section>
            <Footer />
        </div>
    )
}
export default ShippingPage