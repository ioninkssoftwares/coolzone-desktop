import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CorouselSlider = ({ bannerCategory }) => {
    if (!bannerCategory || !bannerCategory.images || bannerCategory.images.length === 0) {
        // If bannerCategory is null or images array is empty, you may want to render a placeholder or handle this case appropriately.
        return <div>No banner images to display</div>;
    }
    return (
        <Carousel interval={3000} autoPlay infiniteLoop showThumbs={false} >
            {bannerCategory.images && bannerCategory.images.length > 0 && bannerCategory.images.map((curElem) => {
                return <div key={curElem._id} className='relative' style={{ height: "500px" }}>
                    <img className='h-full w-full object-cover' src={curElem.url} alt="Image 1" />
                </div>
            })}
        </Carousel>
    );
};


export default CorouselSlider;
