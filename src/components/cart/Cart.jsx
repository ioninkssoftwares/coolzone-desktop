import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchItemsByUserIdAsync, selectCartLoaded, selectCartStatus, selectItems } from './cartSlice';
import { Grid } from 'react-loader-spinner';

const Cart = () => {
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(["token"]);
  const [token, setToken] = useState("");
  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectCartLoaded)


useEffect(() => {
  if(items){
    console.log(items,"sdjfksdkl")
  }
}, [items,dispatch])



  useEffect(() => {
    if (cookies && cookies.token) {
      console.log(cookies.token, "dslfjadslk")
      setToken(cookies.token);
    }
  }, [cookies]);

  useEffect(() => {
    if (token) {
      // console.log(token,"fjkdsfjkd")
      dispatch(fetchItemsByUserIdAsync(token))
    }

  }, [dispatch, token])

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
          ) :  <div  className="flex md:flex-row flex-col my-10 gap-8 justify-between">
          <div style={{ border: "2px solid gray" }} className="md:w-[65%] w-full bg-white px-10 py-10 rounded-lg">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">3 Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
            </div>

            {items?.products?.length > 0  &&  items.products.map((item) => (<>
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-24" src={item.product.images.length > 0 ? item.product.images[0].url : ""} alt="" />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{item.product.name}</span>
                    <span className="text-red-500 text-xs">{item.product.category}</span>
                    <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>

                  <input className="mx-2 border text-center w-8" type="text" value={item.product.quantity} />

                  <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">${item.product.price}</span>
                <span className="text-center w-1/5 font-semibold text-sm">${item.product.price}</span>
              </div>
            </>))}
            <a href="#" className="flex font-semibold text-primary-blue text-sm mt-10">

              <svg className="fill-current mr-2 text-primary-blue w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
              Continue Shopping
            </a>
          </div>
          {/* Summary section */}

          <div style={{ border: "2px solid gray" }} id="summary" className="md:w-[30%] w-full px-8 py-10 rounded-lg">
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Subtotal</span>
              <span className="font-semibold text-sm">${items.cartTotal}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div className="py-10">
              <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
              <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${items.cartTotal}</span>
              </div>
              <Link to="/checkout"> <button className="bg-primary-blue font-semibold hover:bg-indigo-600 py-3 text-sm text-white rounded-md uppercase w-full">Checkout</button> </Link>
            </div>
          </div>

        </div>}
         
        </div>
      </section>

    </>

  )
}

export default Cart