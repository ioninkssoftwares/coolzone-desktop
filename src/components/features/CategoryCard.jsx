import React from 'react'
import { AiOutlineTags, AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ categoryData }) => {
  const navigate = useNavigate();

  const navigateToProducts = (categoryName) => {
    // Navigate to products page and set the search state with the category name
    console.log(categoryName, "dsfjhdsjkhfk")
    navigate(`/products?filterCategory=${encodeURIComponent(categoryName)}`);
  }
  return (
    <div key={categoryData.id} style={{ width: "275px", height: "280px" }} className=' rounded-lg bg-white font-semibold flex flex-col items-center p-4 '>
      <p>{categoryData?.name}</p>
      <div onClick={() => navigateToProducts(categoryData?.name)} className="relative cursor-pointer my-4 w-[180px] h-[150px]">
        <img
          // src={images.length > 0 ? images[0] : null }
          src={categoryData ? categoryData?.imageSrc : "https://cdn.pixabay.com/photo/2016/01/28/22/07/washing-machine-1167053_1280.jpg"}
          fill
          alt="home"
          className="w-full h-full object-fillr rounded-lg"
        />
      </div>
      <p className="w-[28px] ml-52 h-[28px] rounded-full bg-gray-300 text-white flex items-center justify-center"><AiOutlineArrowRight /></p>
    </div>
  )
}

export default CategoryCard