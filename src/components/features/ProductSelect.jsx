import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchProductsByNavbarAsync } from '../product/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductSelect = ({ products, onSelectChange, defaultValue, productsPage }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [productPath, setProductPath] = useState("")



useEffect(() => {
  if (location) {
    const match = location.pathname.match(/\/product\b/);

    if (match) {
        const newProductPath = match[0];
        setProductPath(newProductPath)
        console.log(productPath,"dkfjdlk");
    }
}

}, [location.pathname])

  // Update the selected value if the default value changes
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedProduct = e.target.value;
    if(location.pathname === '/'){
      navigate("/products");
      dispatch(fetchProductsByNavbarAsync(selectedProduct))
    } else if(location.pathname === '/products'){
      dispatch(fetchProductsByNavbarAsync(selectedProduct))
    } else if (productPath === "/product") {
        navigate("/products");
        // console.log(productPath,"fdjkfjd")
        dispatch(fetchProductsByNavbarAsync(selectedProduct))
      }
    console.log(selectedProduct,"fkdjkf")


    setSelectedValue(selectedProduct);
    // onSelectChange(selectedProduct);
   
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
