import React, { useState, useEffect } from 'react';

const ProductSelect = ({ products, onSelectChange, defaultValue }) => {
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
    <div style={{borderRight:"1px solid gray",paddingRight:"25px"}} className="w-fit">
      <select
        
        id="products"
        onChange={handleSelectChange}
        value={selectedValue}
        // style={{border:"2px solid red"}} 
        className="text-white w-fit text-sm py-2  bg-primary-blue "
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
