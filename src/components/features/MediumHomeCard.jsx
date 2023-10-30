
import { FaRupeeSign } from "react-icons/fa";
import { GrStar } from "react-icons/gr";
import { BsBagFill, BsFillHeartFill } from "react-icons/bs";
// import Link from "next/link";
import { HiLocationMarker } from "react-icons/hi";
import PropertyCost from "./ProductCost";
// import generateSlug from "../slug/generateSlug";

const MediumHouseCard = ({ images, category, price, title }) => {
  // console.log(props,"cproj")
  const imageSource = "https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80";
  //   const imageSource = primaryImage || (propertyImages && propertyImages[0]) || "/bighouse.png";


  // const slug = generateSlug(toggle, name:undefined, BHKconfig, propertyType, availableFor, location.name, _id);

  // if(slug){
  //   console.log(slug,"slug")
  // }

  return (
    <div style={{ border: "2px solid GRAY" }} className=" p-4 min-w-[280px] md:min-w-[280px] relative max-w-sm grow  rounded-lg font-manrope">
      <div  className="flex items-center justify-between">
        <p className="text-md font-semibold text-primary-blue mb-4">{category}</p>
        <div onCLick={() => handleWishlist()} className=" p-1.5 flex justify-center bg-primary-blue items-center rounded-full cursor-pointer">
          <BsFillHeartFill className="text-sm text-white" />
        </div>

      </div>

      <h1 className="text-xl font-semibold text-primary-blue my-4">{title}</h1>
      <div className="flex items-center justify-center">
        <div className="relative my-10 w-[200px] h-[150px]">
          <img
            src={images.length > 0 ? images[0].url : null}
            fill
            alt="home"
            className="w-full h-full object-fillr rounded-lg"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">${price}</p>
        <p className="w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center"><BsBagFill /></p>
      </div>

    </div>
  );
};

export default MediumHouseCard;



