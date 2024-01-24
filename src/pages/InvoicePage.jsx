import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useLocation } from "react-router-dom";


const InvoicePage = () => {
    const location = useLocation();
    const order = location.state.order;

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-4 border">
            {/* <h1 className="text-2xl font-bold mb-4">Invoice #{order._id}</h1>
            <div className="mb-4">
                <p className="font-semibold">{`Order #: ${order._id}`}</p>
                <p className="font-semibold">{`User: ${order.user.name}`}</p>
                <p className="font-semibold">{`Date: ${new Date(order.createdAt).toLocaleDateString()}`}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
                <p>{order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.country}, {order.shippingInfo.pinCode}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Order Status</h2>
                <p>{order.status}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Order Items</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Product</th>
                            <th className="border border-gray-300 p-2">Quantity</th>
                            <th className="border border-gray-300 p-2">Price</th>
                            <th className="border border-gray-300 p-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.orderItems.map((item) => (
                            <tr key={item._id}>
                                <td className="border border-gray-300 p-2">{item.name}</td>
                                <td className="border border-gray-300 p-2">{item.quantity}</td>
                                <td className="border border-gray-300 p-2">{(item.price)}</td>
                                <td className="border border-gray-300 p-2">{formatCurrency(item.quantity * item.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                <p>Subtotal: {formatCurrency(order.subtotal)}</p>
                <p>Tax: {formatCurrency(order.tax)}</p>
                <p>Shipping Charges: {formatCurrency(order.shippingCharges)}</p>
                <p>Discount: {formatCurrency(order.discount)}</p>
                <p>Total: {formatCurrency(order.total)}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Order Date</h2>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div> */}

            <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded">
                Print Invoice
            </button>

            <InvoicePageContent ref={componentRef} order={order} />
        </div>
    )
}

const InvoicePageContent = React.forwardRef(({ order }, ref) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };
    return (
        <div ref={ref}>
            <div className="max-w-2xl mx-auto mt-8 p-4 border">
                <h1 className="text-2xl font-bold mb-4">Invoice #{order._id}</h1>
                <div className="mb-4">
                    <p className="font-semibold">{`Order #: ${order._id}`}</p>
                    {/* <p className="font-semibold">{`User: ${order.user.name}`}</p> */}
                    <p className="font-semibold">{`Date: ${new Date(order.createdAt).toLocaleDateString()}`}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
                    <p>{order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.country}, {order.shippingInfo.pinCode}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Order Status</h2>
                    <p>{order.status}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Order Items</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Product</th>
                                <th className="border border-gray-300 p-2">Quantity</th>
                                <th className="border border-gray-300 p-2">Price</th>
                                <th className="border border-gray-300 p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItems.map((item) => (
                                <tr key={item._id}>
                                    <td className="border border-gray-300 p-2">{item.name}</td>
                                    <td className="border border-gray-300 p-2">{item.quantity}</td>
                                    <td className="border border-gray-300 p-2">{(item.price)}</td>
                                    <td className="border border-gray-300 p-2">{formatCurrency(item.quantity * item.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                    <p>Subtotal: {formatCurrency(order.subtotal)}</p>
                    <p>Tax: {formatCurrency(order.tax)}</p>
                    <p>Shipping Charges: {formatCurrency(order.shippingCharges)}</p>
                    <p>Discount: {formatCurrency(order.discount)}</p>
                    <p>Total: {formatCurrency(order.total)}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Order Date</h2>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

        </div>
    );
});



export default InvoicePage