import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ProductDetails from '../components/product/productDetails'

const ProductDetailsPage = () => {
    return (
        <div>
            <Navbar />

            <ProductDetails />
            <Footer />
        </div>

    )
}

export default ProductDetailsPage