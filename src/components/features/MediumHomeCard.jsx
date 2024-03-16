
import { FaRupeeSign } from "react-icons/fa";
import { GrStar } from "react-icons/gr";
import { BsBagFill, BsFillHeartFill } from "react-icons/bs";
// import Link from "next/link";
import { HiLocationMarker } from "react-icons/hi";
import PropertyCost from "./ProductCost";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/reducer/cartReducer";
import { toast } from "react-toastify";
import { useAxios } from "../../utils/axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
// import generateSlug from "../slug/generateSlug";

const MediumHouseCard = ({ productImages, category, price, title, _id, name, stock, warrantyPeriod }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(["token"]);
  const [token, setToken] = useState("");

  const { cartItems, loading: cartLoading } = useSelector((state) => state.cartReducer)


  //   const imageSource = primaryImage || (propertyImages && propertyImages[0]) || "/bighouse.png";


  // const slug = generateSlug(toggle, name:undefined, BHKconfig, propertyType, availableFor, location.name, _id);

  // if(slug){
  //   console.log(slug,"slug")
  // }

  useEffect(() => {
    if (cookies && cookies.token) {
      console.log(cookies.token, "dslfjadslk")
      setToken(cookies.token);
    }
  }, [cookies]);



  // Handle Cart funciton

  const handleCart = () => {
    // e.preventDefault();

    const isProductInCart = cartItems.some(item => item.productId === _id);

    // If the product is already in the cart, show a toast message and return
    if (isProductInCart) {
      toast.error("Product is already present in the cart");
      return;
    }


    if (stock < 1) return toast.error("Out of Stock")
    const newItem = {
      productId: _id,
      price: price,
      name: name,
      photo: productImages[0],
      stock: stock,
      quantity: 1,
      warrantyPeriod: warrantyPeriod
    };
    dispatch(addToCart(newItem))
    toast.success("Added to Cart")
  };


  // handle wishlist function
  const handleWishlist = async () => {
    const instances = useAxios(token);
    const data = {
      productId: _id,
    };

    try {
      const response = await instances.post('addToWishlist', data);
      if (response.data) {
        toast.success("Product has been added to wishlist")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      // Handle the error as needed
    }
  };

  return (
    <div style={{ border: "2px solid #E2E2E2" }} className=" p-4 min-w-[200px] md:min-w-[215px] relative max-w-sm grow  rounded-lg font-manrope hover:scale-105">
      <div className="flex items-center justify-end mb-4">
        {/* <p className="text-sm font-semibold text-primary-blue ">

          {category.length > 15
            ? category.slice(0, 12).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + '...'
            : category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

        </p> */}
        <div onClick={handleWishlist} className="  p-2 flex justify-center bg-primary-blue items-center rounded-full cursor-pointer">
          <BsFillHeartFill className="text-sm text-white" />
        </div>

      </div>
      <div className="flex items-center justify-center mt-6">
        <div onClick={() => navigate(`/product/${_id}`)} className=" cursor-pointer relative  w-[170px] h-[120px]">
          <img
            src={productImages.length > 0 ? productImages[0] : "https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_1280.png"}
            fill
            alt="home"
            className="w-full h-full object-contain rounded-lg "
          />
        </div>
      </div>
      <p className="text-start text-sm font-semibold my-4">  {name.length > 21 ? name.slice(0, 18) + '...' : name}</p>
      <div className="  flex items-center justify-between">
        <p className="text-xl font-semibold">₹{price}</p>
        <p onClick={handleCart} className="w-[40px] h-[40px] cursor-pointer rounded-full bg-gray-300 flex items-center justify-center"><BsBagFill /></p>
      </div>

    </div>
  );
};

export default MediumHouseCard;



