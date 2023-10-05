import React from 'react'
import { AiOutlineTags, AiOutlineArrowRight, AiFillStar } from 'react-icons/ai';

const TopRatedCategoryCard = ({ categoryData }) => {
    return (
        <div style={{ width: "375px", height: "150px"}} className=' rounded-lg bg-white font-semibold flex items-center justify-start p-4 gap-8 '>
            <div  className="relative my-4 w-[100px] h-[100px] ml-4  ">
                <img
                    // src={images.length > 0 ? images[0] : null }
                    src={categoryData ? categoryData?.imageSrc : "https://cdn.pixabay.com/photo/2016/01/28/22/07/washing-machine-1167053_1280.jpg"}
                    fill
                    alt="home"
                    className="w-full h-full object-fillr rounded-lg"
                />
            </div>
            <div  className='w-[150px] h-[100px] mb-3 space-y-4'>
                {/* <p>{categoryData?.name}</p> */}
                <p className='text-md font-semibold text-primary-blue'>{categoryData?.name} </p>
                <p className='flex '><AiFillStar className='text-primary-blue w-5 text-xl'/> <AiFillStar className='text-primary-blue w-5 text-xl'/> <AiFillStar className='text-primary-blue w-5 text-xl'/> <AiFillStar className='text-primary-blue w-5 text-xl'/> <AiFillStar className='text-primary-blue w-5 text-xl'/></p>
                <p className='font-bold'>₹42,0000</p>
            </div>
            {/* <div style={{border:"2px solid red"}}> */}
                <p className="w-[28px] relative top-10  h-[28px] rounded-full bg-gray-300 text-white flex items-center justify-center"><AiOutlineArrowRight /></p>
            {/* </div> */}

        </div>
    )
}

export default TopRatedCategoryCard