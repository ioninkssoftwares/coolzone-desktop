import React from 'react'
import { GrYoutube, GrFacebookOption, GrTwitter, GrInstagram } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const productSamples = [
    { name: 'AIR CONDITIONER', imageSrc: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg', href: "" },
    { name: 'MICROWAVE', imageSrc: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/tv-310801_1280.png', href: "" },
    { name: 'TELEVISIONS', imageSrc: 'https://i.dummyjson.com/data/products/6/thumbnail.png', href: "" },
    { name: 'GEYSERS', imageSrc: 'https://i.dummyjson.com/data/products/27/thumbnail.webp', href: "" },
    { name: 'AIR PURIFIER', imageSrc: 'https://cdn.pixabay.com/photo/2015/08/02/10/29/camera-871052_1280.png', href: "" },
    { name: 'LAPTOP', imageSrc: 'https://cdn.pixabay.com/photo/2013/07/12/15/40/present-150291_1280.png', href: "" },
    { name: 'COOLERS', imageSrc: 'https://cdn.pixabay.com/photo/2017/01/31/00/09/books-2022464_1280.png', href: "" },
    { name: 'AUDIO DEVICES', imageSrc: 'https://cdn.pixabay.com/photo/2012/04/13/21/32/rocking-horse-33719_1280.png', href: "" },
  ];
  const usefulLinks = [
    { name: 'About', imageSrc: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg' },
    { name: 'Contact', imageSrc: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/tv-310801_1280.png' },
    { name: 'Wishlist', imageSrc: 'https://i.dummyjson.com/data/products/6/thumbnail.png' },
    { name: 'Compare', imageSrc: 'https://i.dummyjson.com/data/products/27/thumbnail.webp' },
    { name: 'FAQ', imageSrc: 'https://cdn.pixabay.com/photo/2015/08/02/10/29/camera-871052_1280.png' },
    { name: 'Terms & Conditions', imageSrc: 'https://cdn.pixabay.com/photo/2013/07/12/15/40/present-150291_1280.png' },
    { name: 'Privacy Policy', imageSrc: 'https://cdn.pixabay.com/photo/2017/01/31/00/09/books-2022464_1280.png' },
    { name: 'Cookie Policy', imageSrc: 'https://cdn.pixabay.com/photo/2012/04/13/21/32/rocking-horse-33719_1280.png' },
  ];
  const customerService = [
    { name: 'My Account', imageSrc: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg' },
    { name: 'My Cart', imageSrc: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/tv-310801_1280.png' },
    { name: 'Track Order', imageSrc: 'https://i.dummyjson.com/data/products/6/thumbnail.png' },
    { name: 'Returns & Exchanges', imageSrc: 'https://i.dummyjson.com/data/products/27/thumbnail.webp' },
    { name: 'Repair Services', imageSrc: 'https://cdn.pixabay.com/photo/2015/08/02/10/29/camera-871052_1280.png' },
    { name: 'Support', imageSrc: 'https://cdn.pixabay.com/photo/2015/08/02/10/29/camera-871052_1280.png' },

  ];

  const navigateToProducts = (categoryName) => {
    // Navigate to products page and set the search state with the category name
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, '-');
    // console.log(categoryName, "dsfjhdsjkhfk")
    navigate(`/products?flyoutOnlyCategory=${encodeURIComponent(formattedCategory)}`);
  }


  return (
    <div>
      <footer className="grid grid-cols-1 md:grid-cols-4 gap-y-16 px-32 pt-16 pb-16 bg-gray-100">
        <div className="space-y-8">
          <p className="font-bold text-black max-w-xs leading-normal pl-2">
            {/* We provide information about properties such as houses, villas and
        apartments to help people find their dream home */}
            Categories
          </p>

          <div className="flex flex-col pl-2 space-y-4">
            {productSamples.map((curElem) => (<p onClick={() => navigateToProducts(curElem.name)} className='cursor-pointer'>{curElem.name}</p>)
            )}
          </div>

        </div>


        <div className="space-y-8 ">
          <h1 className="font-semibold text-black ">Useful Links</h1>
          <div className="flex flex-col space-y-4">
            {usefulLinks.map((curElem) => (<p>{curElem.name}</p>)
            )}
          </div>
        </div>

        <div className="space-y-8">
          <h1 className="font-semibold text-black">Customer Service</h1>
          <div className="flex flex-col space-y-4">
            {customerService.map((curElem) => (<p>{curElem.name}</p>)
            )}
          </div>
        </div>

        <div className="space-y-5">
          <h1 className="font-bold text-primary-blue mb-4">COOLZONE</h1>
          <div>
            <p className="text-xs text-black/75 max-w-xs leading-normal py-4">
              Contact - 08712287222
            </p>
            {/* <p className="text-xs text-black/75 max-w-xs leading-normal">
          Monday - Saturday (9:00AM to 11:00PM IST)
        </p> */}
          </div>
          <div>
            <p className="text-xs text-black/75 max-w-xs leading-normal">
              Email us-
            </p>
            <p className="text-xs text-black/75 max-w-xs leading-normal">
              sdcoolzonevizag@gmail.com
            </p>
          </div>



          <div className="flex text-2xl space-x-4 items-center py-8">
            <GrFacebookOption
              onClick={() => window.open("https:google.com", "_blank")}
              className="text-primary-blue cursor-pointer"
            />
            <GrTwitter
              onClick={() => window.open("https:google.com", "_blank")}
              className="text-primary-blue cursor-pointer"
            />
            <GrInstagram
              onClick={() => window.open("https:google.com", "_blank")}
              className="text-primary-blue cursor-pointer"
            />
            <GrYoutube
              onClick={() => window.open("https:google.com", "_blank")}
              className="text-primary-blue cursor-pointer"
            />
          </div>
          <p className="font-bold text-primary-blue">© Coolzone 2023 - All rights reserved</p>
        </div>
      </footer>

    </div>
  )
}

export default Footer