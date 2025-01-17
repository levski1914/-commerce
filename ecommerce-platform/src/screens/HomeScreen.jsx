import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { fetchProducts } from '../redux/productSlice'
import { Link } from 'react-router-dom';
const HomeScreen = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const status = useSelector((state) => state.products.status);

    const [searchQuery,setSearchQuery]=useState('')
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

const filteredProducts=products.filter((product)=>product.name.toLowerCase().includes(searchQuery.toLowerCase()))


  return (


    <div className="max-w-7xl mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>

    {/* Поле за търсене */}
    <input
        type="text"
        className="border rounded-lg p-2 mb-4 w-full"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />

    {status === 'loading' && <p className="text-gray-500">Loading products...</p>}
    {status === 'failed' && <p className="text-red-500">Failed to load products.</p>}
    {status === 'succeeded' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
                <div
                    key={product._id}
                    className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                >
                    <Link to={`/api/product/${product._id}`}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-600 text-sm">{product.description}</p>
                        <p className="text-blue-600 font-semibold mt-2">${product.price}</p>
                    </Link>
                </div>
            ))}
        </div>
    )}
</div>
  )
}

export default HomeScreen