import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_REACT_APP_BASE_URL}`,
    }),
    tagTypes: ["orders"],
    endpoints: (builder) => ({
        newOrder: builder.mutation({
            query: (order) => ({
                url: "/order/new",
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["orders"],
        }),

        updateOrder: builder.mutation({
            query: ({ orderId }) => ({
                url: `/order/${orderId}`,
                method: "PUT",
            }),
            invalidatesTags: ["orders"],
        }),

        deleteOrder: builder.mutation({
            query: ({ orderId }) => ({
                url: `/order/${orderId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["orders"],
        }),

        myOrders: builder.query({
            query: (id) => `/orders/my?id=${id}`,
            providesTags: ["orders"],
        }),

        allOrders: builder.query({
            query: () => `/orders/all`,
            providesTags: ["orders"],
        }),

        orderDetails: builder.query({
            query: (id) => `/order/${id}`,
            providesTags: ["orders"],
        }),
    }),
});

export const {
    useNewOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useMyOrdersQuery,
    useAllOrdersQuery,
    useOrderDetailsQuery,
} = orderApi;