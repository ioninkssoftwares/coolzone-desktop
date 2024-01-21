
import { FaRupeeSign } from "react-icons/fa";
import { GrStar } from "react-icons/gr";
import { BsBagFill, BsFillHeartFill } from "react-icons/bs";
// import Link from "next/link";
import { HiLocationMarker } from "react-icons/hi";
import PropertyCost from "./ProductCost";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducer/cartReducer";
import { toast } from "react-toastify";
import { useAxios } from "../../utils/axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
// import generateSlug from "../slug/generateSlug";

const MediumHouseCard = ({ images, category, price, title, _id, name, stock }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(["token"]);
  const [token, setToken] = useState("");
  // console.log(props,"cproj")
  const imageSource = "https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80";
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

    // if (product.product.stock < 1) return toast.error("Out of Stock")

    const newItem = {
      productId: _id,
      price: price,
      name: name,
      // photo: cartProduct._id,
      stock: stock,
      quantity: 1
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
    <div style={{ border: "2px solid GRAY" }} className=" p-4 min-w-[280px] md:min-w-[280px] relative max-w-sm grow  rounded-lg font-manrope">
      <div className="flex items-center justify-between">
        <p className="text-md font-semibold text-primary-blue mb-4">{category}</p>
        <div onClick={handleWishlist} className="  p-2.5 flex justify-center bg-primary-blue items-center rounded-full cursor-pointer">
          <BsFillHeartFill className="text-sm text-white" />
        </div>

      </div>
      <p className="text-center font-semibold">{name}</p>

      <h1 className="text-xl font-semibold text-primary-blue my-4">{title}</h1>
      <div className="flex items-center justify-center">
        <div onClick={() => navigate(`/product/${_id}`)} className=" cursor-pointer relative my-10 w-[200px] h-[150px]">
          {/* <img
            src={images.length > 0 ? images[0].url : null}
            fill
            alt="home"
            className="w-full h-full object-fillr rounded-lg"
          /> */}
        </div>
      </div>
      <div onClick={handleCart} className="cursor-pointer flex items-center justify-between">
        <p className="text-xl font-semibold">₹{price}</p>
        <p className="w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center"><BsBagFill /></p>
      </div>

    </div>
  );
};

export default MediumHouseCard;



