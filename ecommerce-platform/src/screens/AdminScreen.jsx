import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    createProduct, 
    deleteProduct, 
    fetchAllOrders, 
    fetchProducts, 
    updateOrderStatus, 
    updateProduct, 
    deleteOrder 
} from '../redux/adminSlice';

const AdminScreen = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.admin);
    const { orders, orderStatus, orderError } = useSelector((state) => state.admin);

    const [formState, setFormState] = useState({
        _id: null,
        name: '',
        image: '',
        description: '',
        brand: '',
        category: '',
        price: '',
        countInStock: ''
    });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
            dispatch(fetchAllOrders());
        }
    }, [dispatch, status]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            name: formState.name,
            image: formState.image,
            description: formState.description,
            brand: formState.brand,
            category: formState.category,
            price: Number(formState.price),
            countInStock: Number(formState.countInStock),
        };

        if (formState._id) {
            await dispatch(updateProduct({ id: formState._id, productData }));
        } else {
            await dispatch(createProduct(productData));
        }

        setFormState({
            _id: null,
            name: '',
            image: '',
            description: '',
            brand: '',
            category: '',
            price: '',
            countInStock: '',
        });
    };

    const handleEdit = (product) => {
        setFormState({
            _id: product._id,
            name: product.name,
            image: product.image,
            description: product.description,
            brand: product.brand,
            category: product.category,
            price: product.price,
            countInStock: product.countInStock,
        });
    };

    const handleDelete = async (id) => {
        await dispatch(deleteProduct(id));
    };

    const handleUpdateOrder = async (orderId, newStatus) => {
        await dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
    };

    const handleDeleteOrder = async (orderId) => {
        await dispatch(deleteOrder(orderId));
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

        {/* Form for creating/updating products */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">{formState._id ? 'Edit Product' : 'Create Product'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input type="text" placeholder="Name" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="border rounded p-2 shadow-sm" />
                <input type="text" placeholder="Image URL" value={formState.image} onChange={(e) => setFormState({ ...formState, image: e.target.value })} className="border rounded p-2 shadow-sm" />
                <input type="text" placeholder="Description" value={formState.description} onChange={(e) => setFormState({ ...formState, description: e.target.value })} className="border rounded p-2 shadow-sm" />
                <input type="text" placeholder="Brand" value={formState.brand} onChange={(e) => setFormState({ ...formState, brand: e.target.value })} className="border rounded p-2 shadow-sm" />
                <input type="text" placeholder="Category" value={formState.category} onChange={(e) => setFormState({ ...formState, category: e.target.value })} className="border rounded p-2 shadow-sm" />
                <input type="number" placeholder="Price" value={formState.price} onChange={(e) => setFormState({ ...formState, price: e.target.value })} className="border rounded p-2 shadow-sm" />
                <input type="number" placeholder="Stock" value={formState.countInStock} onChange={(e) => setFormState({ ...formState, countInStock: Number(e.target.value) })} className="border rounded p-2 shadow-sm" />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">{formState._id ? 'Update Product' : 'Create Product'}</button>
            </form>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Products</h2>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                {status === 'loading' && <p>Loading products...</p>}
                {status === 'failed' && <p className="text-red-500">{error}</p>}
                {status === 'succeeded' && (
                    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Stock</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-100 transition">
                                    <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">{product.countInStock}</td>
                                    <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                        <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition">Edit</button>
                                        <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        {/* Orders Table */}
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Orders</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
            {status === 'loading' && <p>Loading orders...</p>}
            {status === 'failed' && <p className="text-red-500">{error}</p>}
            {status === 'succeeded' && (
                <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="border border-gray-300 px-4 py-2">User</th>
                            <th className="border border-gray-300 px-4 py-2">Total</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-100 transition">
                                <td className="border border-gray-300 px-4 py-2">{order.user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <select value={order.status} onChange={(e) => handleUpdateOrder(order._id, e.target.value)} className="border rounded px-2 py-1 shadow-sm">
                                        <option value="Pending">Pending</option>
                                        <option value="Available">Available</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                    <button onClick={() => handleDeleteOrder(order._id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
    );
};

export default AdminScreen;
