
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

const MediumHouseCard = ({ productImages, category, price, title, _id, name, stock }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(["token"]);
  const [token, setToken] = useState("");

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

      <h1 className="text-xl font-semibold text-primary-blue mt-4">{title}</h1>
      <div className="flex items-center justify-center">
        <div onClick={() => navigate(`/product/${_id}`)} className=" cursor-pointer relative mb-8 w-[220px] h-[150px]">
          <img
            src={productImages.length > 0 ? productImages[0] : "https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_1280.png"}
            fill
            alt="home"
            className="w-full h-full object-cover rounded-lg "
          />
        </div>
      </div>
      <div onClick={handleCart} className=" cursor-pointer flex items-center justify-between">
        <p className="text-xl font-semibold">₹{price}</p>
        <p className="w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center"><BsBagFill /></p>
      </div>

    </div>
  );
};

export default MediumHouseCard;



