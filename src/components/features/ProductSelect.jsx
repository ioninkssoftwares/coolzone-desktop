import React, { useState, useEffect } from 'react';

const ProductSelect = ({ products, onSelectChange, defaultValue, productsPage }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  // Update the selected value if the default value changes
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleSelectChange = (e) => {
    const selectedProduct = e.target.value;
    setSelectedValue(selectedProduct);
    onSelectChange(selectedProduct);
  };

  return (
    <div style={{borderRight:"1px solid gray",paddingRight:"25px"}} className={`${productsPage ? "w-full" : "w-fit"}`}>
      <select
        
        id="products"
        onChange={handleSelectChange}
        value={selectedValue}
        // style={{border:"2px solid red"}} 
        className={`  text-sm py-2 ${productsPage ? "bg-gray-200 text-black w-full" : "bg-primary-blue text-white w-fit"} border-none `}
      >
        {products.map((product, index) => (
            <>
          <option key={index} value={product}>
            {product}
          </option>
          </>
        ))}
      </select>
    </div>
  );
};

export default ProductSelect;
