import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsAPI = createApi({
    reducerPath: "productsApi",
    // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/` }),
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:9000/api/v1/` }),
    tagTypes: ["products"],
    endpoints: (builder) => ({
        latestProducts: builder.query({
            query: () => "latest-products",
            providesTags: ["products"],
        }),
        allProducts: builder.query({
            query: (id) => `admin-products?id=${id}`,
            providesTags: ["products"],

        }),
        categories: builder.query({
            query: () => `categories`,
            providesTags: ["products"],

        }),
        searchProducts: builder.query({
            query: ({ price, search, sort, category, page }) => {
                let base = `products?search=${search}&page=${page}`

                if (price) base += `&price=${price}`
                if (sort) base += `&sort=${sort}`
                if (category) base += `&category=${category}`

                return base
            },
            providesTags: ["products"],

        }),
        newProduct: builder.mutation({
            query: ({ formData, id }) => ({
                url: `admin/product/new`,
                // url: `new?id=${id}`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["products"]
        }),
        productDetails: builder.query({
            query: (id) => id,
            providesTags: ["products"],
        }),
        updateProduct: builder.mutation({
            query: ({ formData, userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ["products"]
        }),
        deleteProduct: builder.mutation({
            query: ({ userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: "DELETE",

            }),
            invalidatesTags: ["products"]
        }),

    })
});


export const { useLatestProductsQuery,
    useAllProductsQuery,
    useCategoriesQuery,
    useSearchProductsQuery,
    useNewProductMutation,
    useProductDetailsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation
} = productsAPI