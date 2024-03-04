import React from 'react'
import { AiOutlineTags, AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ categoryData }) => {
  const navigate = useNavigate();

  const navigateToProducts = (categoryName) => {
    // Navigate to products page and set the search state with the category name
    console.log(categoryName, "dsfjhdsjkhfk")
    navigate(`/products?filterCategory=${encodeURIComponent(categoryName.toLowerCase())}`);
  }
  return (
    // <div key={categoryData.id} style={{ width: "255px", height: "250px" }} className=' rounded-lg bg-white font-semibold flex flex-col items-center p-4 hover:scale-105 '>
    //   <p>{categoryData?.name.toUpperCase()}</p>
    //   <div onClick={() => navigateToProducts(categoryData?.name)} className="relative cursor-pointer my-4 w-[180px] h-[130px]">
    //     <img
    //       src={categoryData ? categoryData?.imageSrc : "https://cdn.pixabay.com/photo/2016/01/28/22/07/washing-machine-1167053_1280.jpg"}
    //       fill
    //       alt="home"
    //       className="w-full h-full object-fillr rounded-lg"
    //     />
    //   </div>
    //   <p onClick={() => navigateToProducts(categoryData?.name)} className="w-[28px] ml-40 h-[28px] rounded-full bg-gray-300 cursor-pointer text-white flex items-center justify-center"><AiOutlineArrowRight /></p>
    // </div>

    <div key={categoryData.id} className='rounded-lg bg-white font-semibold flex flex-col items-center p-4 hover:scale-105'>
      <p className="text-center">{categoryData?.name.toUpperCase()}</p>

      <div onClick={() => navigateToProducts(categoryData?.name)} className="relative cursor-pointer my-4 w-full md:w-48 h-[130px]">
        <img
          src={categoryData ? categoryData?.imageSrc : "https://cdn.pixabay.com/photo/2016/01/28/22/07/washing-machine-1167053_1280.jpg"}
          fill
          alt="home"
          className="w-full h-full object-fillr rounded-lg"
        />
      </div>

      <p onClick={() => navigateToProducts(categoryData?.name)} className="w-[28px] ml-auto mr-auto md:ml-40 md:mr-auto h-[28px] rounded-full bg-gray-300 cursor-pointer text-white flex items-center justify-center"><AiOutlineArrowRight /></p>
    </div>

  )
}

export default CategoryCard