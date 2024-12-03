'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');  // Search state
  const [selectedCategory, setSelectedCategory] = useState('');  // Category filter state

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        // Apply discount to the first 4 products
        const updatedProducts = response.data.map((product, index) => {
          if (index < 4) { // Discount only on the first 4 products
            const discount = 0.2; // 20% discount
            const discountedPrice = (product.price * (1 - discount)).toFixed(2);
            return {
              ...product,
              discountedPrice,
              discount: discount * 100, // Discount as percentage
            };
          } else {
            return {
              ...product,
              discountedPrice: product.price.toFixed(2), // No discount
              discount: 0,
            };
          }
        });
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);  // Set filtered products initially
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false); // Stop loading if there's an error
      });
  }, []);

  // Search and filter functionality
  const handleFilter = () => {
    let filtered = [...products];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);  // Set filtered products
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Run filtering whenever search term or category changes
  useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedCategory]);

  // Loading state
  if (loading) {
    return <div className="text-center py-10">جاري تحميل المنتجات...</div>; // Loading message
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-yellow-400 p-4">
      <h1 className='text-center p-10 text-2xl'>All Products</h1>
      
      {/* Search and filter bar */}
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}  // Trigger filtering on input change
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}  // Trigger filtering on category change
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>
      
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <Image 
              src={product.image} 
              alt={product.title} 
              width={500}  
              height={500}  
              className="w-full h-48 p-4 transition-all duration-300 transform hover:scale-105"
              style={{ objectFit: 'contain' }}  // Ensure images fit properly
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{product.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{product.description.slice(0, 100)}...</p>
              <div className="flex items-center justify-between mb-4">
                {product.discount > 0 && (
                  <span className="text-lg text-red-500 line-through">${product.price}</span>
                )}
                <span className="text-xl font-bold text-gray-800">${product.discountedPrice}</span>
              </div>
              {product.discount > 0 && (
                <div className="text-sm text-green-600">{product.discount}% OFF</div>
              )}
              <Link 
                href={`/products/${product.id}`} 
                className="text-center bg-gradient-to-r from-green-500 to-yellow-400 text-dark py-2 px-4 rounded-md w-full mt-2 cursor-pointer transition-all duration-300 hover:from-green-700 hover:to-yellow-500"
              >
                Go to Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
