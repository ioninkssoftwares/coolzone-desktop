import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { fetchItemsByUserIdAsync, selectCartLoaded, selectCartStatus, selectItems } from './cartSlice';
import { Grid } from 'react-loader-spinner';
import { useAxios } from '../../utils/axios';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { addToCart, calculatePrice, discountApplied, removeCartItem, addReferralCode } from '../../redux/reducer/cartReducer';
import axios from 'axios';
import { VscError } from 'react-icons/vsc';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const instance = useAxios()
  const [cookies, setCookies] = useCookies(["token"]);
  const [token, setToken] = useState("");
  // const items = useSelector(selectItems);
  // const status = useSelector(selectCartStatus);
  // const cartLoaded = useSelector(selectCartLoaded)
  const [couponCode, setCouponCode] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isValidCouponCode, setIsValidCouponCode] = useState(false);
  const [apiLoading, setApiLoading] = useState(false)

  const status = ""


  const { cartItems, discount, loading: cartLoading, shippingCharges, subtotal, tax, total } = useSelector((state) => state.cartReducer)


  if (cartItems) console.log(cartItems, "cart items")

  const increamentHandler = (cartItem) => {
    if (cartItem.quantity >= cartItem.stock) return toast.error("Max quantity reached");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }))
  }


  const decrementHandler = (cartItem) => {
    console.log(cartItem, "fdhkjsdf")
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }))
  }


  const removeHandler = (productId) => {
    dispatch(removeCartItem(productId))
  }


  useEffect(() => {
    if (cookies.token === undefined) {
      toast.error("Please Login")
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    if (cookies && cookies.token) {
      console.log(cookies.token, "dslfjadslk")
      setToken(cookies.token);
    }
  }, [cookies]);

  // useEffect(() => {
  //   if (token) {
  //     // console.log(token,"fjkdsfjkd")
  //     dispatch(fetchItemsByUserIdAsync(token))
  //   }

  // }, [dispatch, token])

  // TODO:Redux is not implemented
  // const handleCoupon = async () => {
  //   setApiLoading(true)
  //   const instance = useAxios(token);

  //   try {
  //     const newCoupon = { coupon: coupons }
  //     const response = await instance.post('/applycoupon', newCoupon);
  //     // return { data: response.data };
  //     dispatch(fetchItemsByUserIdAsync(token))
  //     setApiLoading(false)

  //     console.log(response, "fdlshjs")
  //   } catch (error) {
  //     console.error('Error in login:', error);
  //     setApiLoading(false)
  //     throw error;
  //   }
  // }

  // Coupon Handling

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();
    const timeOutID = setTimeout(() => {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/discount?coupon=${couponCode}&total=${total}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);




  useEffect(() => {
    console.log("dsfhsdkj")
    dispatch(calculatePrice())
  }, [cartItems])

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);


  const handleShipping = () => {
    let latestReferral = referralCode;
    dispatch(addReferralCode(latestReferral))
    navigate("/shipping")
  }



  return (
    <>
      <section className="pt-5 mb-5">
        <div className="max-w-7xl mx-auto px-5 md:px-10 mt-10">
          {status === 'loading' ? (
            <div className=' flex items-center justify-center h-[600px]'>
              <Grid
                height="80"
                width="80"
                color="rgb(79, 70, 229) "
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : <div className="flex md:flex-row flex-col my-10 gap-8 justify-between">
            <div style={{ border: "2px solid gray" }} className="md:w-[65%] w-full bg-white px-10 py-10 rounded-lg">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">
                  {/* {Array.isArray(items?.products) ? items.products.length : 0} */}
                </h2>
              </div>
              <div className="flex justify-between mt-10 mb-5 md:mr-7 mr-0 ">
                <h3 className="font-semibold text-gray-600 text-xs uppercase ">Product Details</h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase  text-center">Quantity</h3>
                {/* <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3> */}
                {/* <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3> */}
              </div>

              {cartItems.length > 0 ? (
                cartItems.map((item, idx) => (
                  <>
                    <div className="flex items-center md:justify-between hover:bg-gray-100 -mx-8 px-6 py-5">
                      <div className="flex w-2/5">
                        {/* onClick={() => navigate(`/product/${item._id}`)} */}
                        <div className="w-20">
                          <img className="w-full h-full object-cover" src={item.photo} alt="cartImage" />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">{item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name}</span>
                          <span className="text-red-500 text-xs">{item.category}</span>
                          <a onClick={() => removeHandler(item.productId)} className="font-semibold mt-4 cursor-pointer hover:text-red-500 hover:font-bold text-gray-500 text-xs">Remove</a>
                          <span className='mt-10 font-medium font-semibold'>₹{item.price}</span>
                        </div>
                      </div>
                      <div className="flex md:flex-row flex-col md:justify-center justify-center md:items-baseline items-center w-1/5">
                        <svg onClick={() => decrementHandler(item)} className="fill-current cursor-pointer text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>

                        <input className="mx-2 border text-center w-12" type="text" value={item?.quantity} />

                        <svg onClick={() => increamentHandler(item)} className="fill-current cursor-pointer text-gray-600 w-3" viewBox="0 0 448 512">
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </div>
                      {/* <span className="text-center w-1/5 font-semibold text-sm">₹{item?.price}</span> */}
                      {/* <span className="text-center w-1/5 font-semibold text-sm">₹{item.price}</span> */}
                    </div>
                  </>))
              ) : (
                <h1>No Items Added</h1>
              )}

              {/* {items?.products?.length > 0 && items.products.map((item) => (
              ))} */}
              <p onClick={() => navigate("/")} className="flex font-semibold text-primary-blue cursor-pointer text-sm mt-10">

                <svg className="fill-current mr-2 text-primary-blue w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                Continue Shopping
              </p>
            </div>
            {/* Summary section */}

            <div style={{ border: "2px solid gray" }} id="summary" className="md:w-[30%] w-full px-8 py-10 rounded-lg">
              <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">Subtotal</span>
                <span className="font-semibold text-sm">  ₹{subtotal}</span>
              </div>
              {/* <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">Tax</span>
                <span className="font-semibold text-sm">  ₹{tax}</span>
              </div> */}
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">Shipping Charges</span>
                <span className="font-semibold text-sm">{cartItems && cartItems.length > 0 ? `₹${shippingCharges}` : "₹0"}</span>
              </div>
              {/* <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                <p>Shipping Charges: ₹{shippingCharges}</p>
              </div> */}
              <div className="py-2">
                <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Coupon Code</label>
                {/* <input type="text" id="promo" onChange={(e) => setCoupons(e.target.value)} placeholder="Enter your code" className="p-2 text-sm w-full" /> */}
                <input
                  className="p-2 text-sm w-full"
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />

                {couponCode &&
                  (isValidCouponCode ? (
                    <span className="text-green-500">
                      ₹{discount} off using the <code>{couponCode}</code>
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-2 justify-center">
                      Invalid Coupon <VscError />
                    </span>
                  ))}

                {/* {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>} */}
              </div>

              <div className="py-2">
                <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Referral Code</label>
                {/* <input type="text" id="promo" onChange={(e) => setCoupons(e.target.value)} placeholder="Enter your code" className="p-2 text-sm w-full" /> */}
                <input
                  className="p-2 text-sm w-full"
                  type="text"
                  placeholder="Referral Code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
              </div>

              {/* {loading === false ? <button onClick={handleCoupon} className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button> : <CircularProgress />} */}
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  {/* <b> ₹{total}</b> */}
                  <b >{cartItems && cartItems.length > 0 ? `₹${total}` : `₹0`}</b>
                </div>
                {cartItems.length > 0 && <button onClick={handleShipping} className="bg-primary-blue font-semibold hover:bg-indigo-600 py-3 text-sm text-white rounded-md uppercase w-full">Checkout</button>}
                {/* {cartItems.length > 0 && <Link to="/shipping"> <button className="bg-primary-blue font-semibold hover:bg-indigo-600 py-3 text-sm text-white rounded-md uppercase w-full">Checkout</button> </Link>} */}
              </div>
            </div>

          </div>}

        </div>
      </section>

    </>

  )
}

export default Cart