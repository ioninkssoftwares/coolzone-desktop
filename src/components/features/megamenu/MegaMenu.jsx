import React from 'react';
import { useNavigate } from 'react-router-dom';

const MegaMenu = ({ categories }) => {
    const navigate = useNavigate();

    const navigateToProducts = (category, brand) => {
        const formattedCategory = category.toLowerCase().replace(/\s+/g, '-');
        // const formattedBrand = brand.toLowerCase().replace(/\s+/g, '-');
        const formattedBrand = brand.toLowerCase().replace(/\s+/g, '-').replace(/%26/g, '&');
        navigate(`/products?flyoutCategory=${encodeURIComponent(formattedCategory)}&flyoutBrand=${encodeURIComponent(formattedBrand)}`);
    };

    const navigateToProductsOnlyCategory = (brand) => {
        console.log(brand, "jlfdsxcxcxkjhfdkh");
        // const formattedBrand = brand.toLowerCase().replace(/\s+/g, '-');
        const formattedBrand = brand.trim().toLowerCase().replace(/\s+/g, '-');
        console.log(formattedBrand, "jlfdskjhfdkh");
        navigate(`/products?flyoutOnlyCategory=${encodeURIComponent(formattedBrand)}`);
    };


    const handleCategoryClick = (categoryName) => {
        if (
            categoryName === 'HOME APPLIANCES' ||
            categoryName === 'KITCHEN APPLIANCES' ||
            categoryName === 'CUSTOMER SERVICE'
        ) {
            // Do nothing
            return;
        }
        // Navigate to products for other categories
        navigateToProductsOnlyCategory(categoryName);
    };

    const handleBrandClick = (categoryName, brand) => {
        if (categoryName === 'CUSTOMER SERVICE') {
            // Do nothing for 'CUSTOMER SERVICE'
            return;
        } else if (
            categoryName === 'HOME APPLIANCES' ||
            categoryName === 'KITCHEN APPLIANCES'
        ) {
            // Navigate for only category
            navigateToProductsOnlyCategory(brand);
        } else {
            // Navigate for category and brand
            navigateToProducts(categoryName, brand);
        }
    };
    return (
        <div className='flex gap-2 w-full justify-center items-center'>
            {categories.map((category, index) => (
                <div key={index} className="group relative cursor-pointer py-1">
                    <div onClick={() => handleCategoryClick(category.name)} className="bg-primary-blue px-2 ">
                        <p
                            className="menu-hover py-2 font-medium text-md text-white"
                        >
                            {category.name}
                        </p>

                    </div>

                    <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                        {category.brands.map((brand, brandIndex) => (
                            <p
                                onClick={() => handleBrandClick(category.name, brand)}
                                key={brandIndex} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                                {brand}
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MegaMenu;
