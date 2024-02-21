import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CorouselSlider = ({ bannerCategory }) => {
    // console.log(bannerCategory[0]?.bannerImages, "asdasdasds")
    if (!bannerCategory || !bannerCategory[0] || !bannerCategory[0].bannerImages || bannerCategory[0].bannerImages.length === 0) {
        // If bannerCategory is falsy, doesn't have the first index, or bannerImages array is empty, handle appropriately.
        return <div>Loading banner images...</div>;
    }

    return (
        <Carousel interval={2000} autoPlay infiniteLoop showThumbs={false} >
            {bannerCategory[0]?.bannerImages.map((curElem, index) => {
                return (
                    <div key={index} className='relative sm:h-64 md:h-80 lg:h-96 xl:h-112'>
                        <img className='w-full h-full object-contain' src={curElem} alt="Image 1" />
                    </div>
                );

            })}
        </Carousel>
    );
};


export default CorouselSlider;
