import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product...</p>;
  const handleAddToCart = () => {
    // console.log("Product added:", product);
    dispatch(addToCart(product));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Link to="/cart" className="text-blue-500 hover:underline">
        Go to Cart
      </Link>
      <div className="flex flex-col lg:flex-row">
        <img
          src={product.image}
          alt={product.name}
          className="w-full lg:w-1/2 h-96 object-cover rounded-lg mb-6 lg:mb-0"
        />
        <div className="lg:ml-6">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-blue-600 font-semibold mb-4">${product.price}</p>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
