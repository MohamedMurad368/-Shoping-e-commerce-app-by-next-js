'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaTag, FaCartPlus } from 'react-icons/fa'; // Icons for best-seller, discount, and add-to-cart
import Image from 'next/image'; // تأكد من استيراد مكون Image من Next.js

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        const topProducts = response.data.slice(0, 5); // Show only top 5 products
        setProducts(topProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="loader">Loading Best Sellers...</div> {/* Add a spinner or animation here */}
      </div>
    );
  }

  return (
    <div className="min-h-[500px] bg-gradient-to-r from-green-500 to-yellow-400 p-4"> {/* Updated to a fixed height */}
      <div className="container mx-auto">
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          <FaTag className="inline mr-1" /> 20% Off
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-8">Best Selling Products </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative">
                {/* Image container */}
                <Image
                  src={product.image}
                  alt={product.title}
                  width={500}  // تحديد عرض الصورة
                  height={500}  // تحديد ارتفاع الصورة
                  className="w-full h-48 p-4 transition-transform duration-300 transform hover:scale-110"
                  style={{ objectFit: 'contain' }}  // استخدام style لتحديد objectFit
                />
                {/* Product badge (Best Seller) */}
                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  <FaStar className="inline mr-1" /> Best Seller
                </div>
                {/* Discount Badge */}
                {product.price < 20 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    <FaTag className="inline mr-1" /> 20% Off
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{product.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{product.description.slice(0, 100)}...</p>

                <div className="flex items-center justify-between mt-2 mb-4">
                  {/* Price display */}
                  <div className="flex flex-col items-start">
                    {/* Display the original price */}
                    {product.price > 20 && (
                      <span className="text-lg font-semibold line-through text-gray-600">${product.price}</span>
                    )}
                    {/* Display the discounted price */}
                    <span className="text-lg font-semibold text-green-600">${(product.price * 0.9).toFixed(2)}</span>
                  </div>

                  <button className="text-white bg-green-600 rounded-full p-2 hover:bg-green-700 transition duration-200">
                    <FaCartPlus />
                  </button>
                </div>

                <a
                  href={`/products/${product.id}`}
                  className="bg-gradient-to-r from-green-500 to-yellow-400 text-white py-2 px-4 rounded-md w-full text-center transition-all duration-300 hover:from-green-700 hover:to-yellow-500"
                >
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
