import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CorouselSlider = () => {
    return (
        // <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
        <Carousel interval={3000} autoPlay infiniteLoop showThumbs={false} >
            <div style={{height:"500px"}}>
                <img className='h-full w-full object-cover' src="https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Image 1" />
                {/* <p className="legend">Legend 1</p> */}
            </div>
            <div style={{height:"500px"}}>
                <img className='h-full w-full object-cover' src="https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt="Image 2" />
                {/* <p className="legend">Legend 2</p> */}
            </div>
            <div style={{height:"500px"}}>
                <img className='h-full w-full object-cover' src="https://images.unsplash.com/photo-1461151304267-38535e780c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1933&q=80" alt="Image 3" />
                {/* <p className="legend">Legend 3</p> */}
            </div>
        </Carousel>
    );
};


export default CorouselSlider;
