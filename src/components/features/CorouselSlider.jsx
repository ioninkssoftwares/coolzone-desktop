import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';

const CorouselSlider = ({ bannerCategory }) => {
    const navigate = useNavigate();
    console.log(bannerCategory, "asdasdasds")
    // bannerData
    if (!bannerCategory || bannerCategory.length === 0) {
        // If bannerCategory is falsy, doesn't have the first index, or bannerImages array is empty, handle appropriately.
        return <div>Loading banner images...</div>;
    }

    // const navigateToProducts = (category) => {
    //     const formattedCategory = category.toLowerCase().replace(/\s+/g, '-');
    //     console.log(formattedCategory, "formattedCategory")
    //     navigate(`/products?filterCategory=${encodeURIComponent(formattedCategory)}`);
    // };
    const navigateToProducts = (category) => {
        console.log(category, "jlfdskjhfdkh");
        // const formattedBrand = brand.toLowerCase().replace(/\s+/g, '-');
        const formattedCategory = category.trim().toLowerCase().replace(/\s+/g, '-');
        console.log(formattedCategory, "jlfdskjhfdkh");
        navigate(`/products?flyoutOnlyCategory=${encodeURIComponent(formattedCategory)}`);
    };

    return (
        <Carousel interval={2000} autoPlay infiniteLoop showThumbs={false} >
            {bannerCategory.map((curElem, index) => {
                return (
                    <div key={index} onClick={() => navigateToProducts(curElem.category)} className='relative h-full w-full cursor-pointer'>
                        <img className='w-full h-full object-contain ' src={curElem.bannerImage} alt="Image 1" />
                    </div>
                );

            })}
        </Carousel>
    );
};


export default CorouselSlider;
