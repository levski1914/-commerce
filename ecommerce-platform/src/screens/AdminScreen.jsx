import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../redux/adminSlice';

const AdminScreen = () => {

    const dispatch=useDispatch();
    const {products,status,error}=useSelector((state)=>state.admin)
    const [formState,setFormState]=useState({
        _id:null,
        name:'',
        image:'',
        description:'',
        brand:'',
        category:'',
        price:'',
        countInStock:''
    })

    useEffect(()=>{
        if(status==='idle'){
            dispatch(fetchProducts());
        }
    },[dispatch,status])

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
            // Update product
            await dispatch(updateProduct({ id: formState._id, productData }));
        } else {
            // Create new product
            await dispatch(createProduct(productData));
        }

        // Reset form
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

    // Handle editing a product
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

    // Handle deleting a product
    const handleDelete = async (id) => {
        await dispatch(deleteProduct(id));
    };



  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Form for creating/updating products */}
            <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="border rounded p-2"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={formState.image}
                    onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                    className="border rounded p-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className="border rounded p-2"
                />
                <input
                    type="text"
                    placeholder="Brand"
                    value={formState.brand}
                    onChange={(e) => setFormState({ ...formState, brand: e.target.value })}
                    className="border rounded p-2"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="border rounded p-2"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                    className="border rounded p-2"
                />
                <input
                    type="number"
                    placeholder="Count in Stock"
                    value={formState.countInStock}
                    onChange={(e) => setFormState({ ...formState, countInStock: e.target.value })}
                    className="border rounded p-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    {formState._id ? 'Update Product' : 'Create Product'}
                </button>
            </form>

            {/* Product list */}
            {status === 'loading' && <p>Loading products...</p>}
            {status === 'failed' && <p className="text-red-500">{error}</p>}
            {status === 'succeeded' && (
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Price</th>
                            <th className="border border-gray-300 px-4 py-2">Stock</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                                <td className="border border-gray-300 px-4 py-2">{product.countInStock}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
  )
}

export default AdminScreen