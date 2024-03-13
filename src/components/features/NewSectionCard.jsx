
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

const NewSectionCard = (c) => {
    console.log(c, "cdsfadf")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(["token"]);
    const [token, setToken] = useState("");
    // console.log(imageSrc, name, "imageSrc")
    const navigateToProducts = (category) => {
        const formattedCategory = category.toLowerCase().replace(/\s+/g, '-');
        console.log(formattedCategory, "formattedCategory")
        navigate(`/products?filterCategory=${encodeURIComponent(formattedCategory)}`);
    };
    return (

        <div onClick={() => navigateToProducts(c?.category)} className="p-8 w-[500px] flex items-center justify-around bg-gradient-to-b from-blue-100 to-blue-500 gap-4  cursor-pointer">
            <div className="">
                <p className="text-lg font-semibold">PORTABLE {c?.category.toUpperCase()} COLLECTION</p>
            </div>
            <div>
                <div
                    //  onClick={() => navigate(`/product/${_id}`)}
                    className=" relative  w-[200px] h-[75px] ">
                    <img
                        src={c?.bannerImage ? c.bannerImage : "https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_1280.png"}
                        fill
                        alt="home"
                        className="w-full h-full object-contain rounded-lg "
                    />
                </div>
            </div>
        </div>
        // <div style={{ border: "2px solid #E2E2E2" }} className=" p-4 min-w-[200px] md:min-w-[160px] relative max-w-sm grow  rounded-lg font-manrope hover:scale-105">
        //     <div className="flex items-center justify-between mb-4">
        //         <p className="text-sm font-semibold text-primary-blue ">
        //             {/* {category && category.length > 13 ? `${category.slice(0, 13).toUpperCase()}...` : category.toUpperCase()} */}
        //             {category.length > 15
        //                 ? category.slice(0, 12).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + '...'
        //                 : category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

        //         </p>
        //         <div onClick={handleWishlist} className="  p-2 flex justify-center bg-primary-blue items-center rounded-full cursor-pointer">
        //             <BsFillHeartFill className="text-sm text-white" />
        //         </div>

        //     </div>
        //     <p className="text-start text-xs font-semibold">  {name.length > 20 ? name.slice(0, 17) + '...' : name}</p>
        //     <div className="flex items-center justify-center mt-6">
        //         <div onClick={() => navigate(`/product/${_id}`)} className=" cursor-pointer relative mb-6 w-[150px] h-[75px]">
        //             <img
        //                 src={productImages.length > 0 ? productImages[0] : "https://cdn.pixabay.com/photo/2016/03/21/20/05/image-1271454_1280.png"}
        //                 fill
        //                 alt="home"
        //                 className="w-full h-full object-cover rounded-lg "
        //             />
        //         </div>
        //     </div>
        //     <div className="  flex items-center justify-between">
        //         <p className="text-xl font-semibold">₹{price}</p>
        //         <p onClick={handleCart} className="w-[40px] h-[40px] cursor-pointer rounded-full bg-gray-300 flex items-center justify-center"><BsBagFill /></p>
        //     </div>

        // </div>
    );
};

export default NewSectionCard;



