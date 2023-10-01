
import { FaRupeeSign } from "react-icons/fa";
import { GrStar } from "react-icons/gr";
import { BsBagFill } from "react-icons/bs";
// import Link from "next/link";
import { HiLocationMarker } from "react-icons/hi";
import PropertyCost from "./ProductCost";
// import generateSlug from "../slug/generateSlug";

const MediumHouseCard = ({images, category, price, title}) => {
    // console.log(props,"cproj")
  const imageSource = "https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80";
//   const imageSource = primaryImage || (propertyImages && propertyImages[0]) || "/bighouse.png";


  // const slug = generateSlug(toggle, name:undefined, BHKconfig, propertyType, availableFor, location.name, _id);

  // if(slug){
  //   console.log(slug,"slug")
  // }

  return (
    // <Link href={`/details/${_id}`}>
    // <Link href={`/details/`}>
      <div style={{border:"2px solid GRAY"}} className=" p-4 min-w-[280px] md:min-w-[280px] relative max-w-sm grow  rounded-lg font-manrope">
         <p className="text-md font-semibold text-primary-blue mb-4">{category}</p>
         <h1 className="text-xl font-semibold text-primary-blue my-4">{title}</h1>
   <div className="flex items-center justify-center">
   <div  className="relative my-10 w-[200px] h-[150px]">
          <img
            src={images.length > 0 ? images[0] : null }
            fill
            alt="home"
            className="w-full h-full object-fillr rounded-lg"
          />
        </div>
   </div>
        <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">${price}</p>
            <p className="w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center"><BsBagFill/></p>
        </div>
        {/* <div className="space-y-1 px-3 ">
          <h1 className="text-2xl font-semibold text-TitleColor">{title}</h1>
          <h1 className="text-lg font-semibold text-TitleColor">{`${BHKconfig ? `${BHKconfig}Bhk ` : ''}${propertyType} for ${availableFor} in ...`}</h1>
          <h1 className="text-lg font-semibold text-TitleColor">    {availableFor === "Development"
            ? `${availableFor} site...`
            :`${BHKconfig ? `${BHKconfig}Bhk ` : ''}${propertyType} for ${availableFor} in ...`}</h1>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
                <p>Rupees</p>
              <p className="flex items-center text-md "><HiLocationMarker style={{ marginRight: "5px" }} />location</p>
              <p className="flex items-center text-primaryBlue text-lg">
                <FaRupeeSign />
                <span className="font-normal "><PropertyCost  /></span>
              </p>
            </div>
            <div className="flex flex-col mb-2">
              <p className="flex items-center justify-center space-x-2 text-right">
           
                <span className="text-md font-medium mb-1">₹{areaValue}/Sq.Yd</span>
              </p>
              <p className="text-xs font-medium">Area:{size} Sq.Yd</p>
            </div>
          </div>
        </div> */}
      </div>
    // </Link>
  );
};

export default MediumHouseCard;



