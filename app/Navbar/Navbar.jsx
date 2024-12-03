'use client'; // تأكد من أن هذا المكون يعمل في الـ Client فقط

import React, { useState } from 'react';
import Link from 'next/link'; // تأكد من استيراد Link
import { useProductContext } from '../context/ProductContext'; // تأكد من المسار الصحيح

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // تعريف حالة قائمة الموبايل
  const [isCartHovered, setIsCartHovered] = useState(false); // تعريف حالة الـ hover على السلة
  const { state, addToCart, removeFromCart, updateQuantity, cartItemCount } = useProductContext();

  // دالة لتبديل حالة القائمة المتنقلة
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // دالة لحساب الإجمالي
  const calculateTotal = () => {
    const total = state.cart.reduce((total, product) => {
      const price = product.discountedPrice ? parseFloat(product.discountedPrice) : parseFloat(product.price || 0);
      const quantity = product.quantity ? product.quantity : 1;
      return total + price * quantity;
    }, 0);
    return total.toFixed(2);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 via-yellow-500 to-green-600 dark:bg-gradient-to-r dark:from-yellow-600 dark:via-yellow-700 dark:to-green-700 shadow-md">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link href="/">
                <img
                  className="block w-auto h-8 dark:hidden"
                  src="https://banner2.cleanpng.com/20180519/jjs/avq0lgq0t.webp"
                  alt="Logo"
                />
                <img
                  className="hidden w-auto h-8 dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg"
                  alt="Logo"
                />
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-6 md:gap-8 py-3">
              <li>
                <Link href="/" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Home</Link>
              </li>
              <li>
                <Link href="/best-sellers" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Best Sellers</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Contact</Link>
              </li>
              <li>
                <Link href="/about us" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">About us</Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6 relative">
            {/* Cart Button */}
            <Link
              href="/Cart"
              className="relative inline-flex items-center justify-center p-2 text-gray-900 dark:text-white"
              onMouseEnter={() => setIsCartHovered(true)} // تغيير حالة الـ hover عند التمرير
              onMouseLeave={() => setIsCartHovered(false)} // إعادة الحالة عند ترك الـ hover
            >
              <span className="sr-only">Cart</span>
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
              </svg>

              {/* Display cart count if there are items */}
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 rounded-full -mr-2 -mt-2">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
                <Link href="/login" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Log in</Link>
              


            {/* Hover effect for cart with total */}
            {isCartHovered && (
              <div className="absolute right-0 top-8 w-48 p-4 bg-white border shadow-lg rounded-lg text-gray-900 dark:bg-gray-800 dark:text-white">
                <p className="text-sm font-medium">Total: ${calculateTotal()}</p>
              

              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-900 dark:text-white"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Hidden on larger screens */}
        <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mt-4`}>
          <ul className="flex flex-col items-center gap-6">
            <li>
              <Link href="/" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Home</Link>
            </li>
            <li>
              <Link href="/best-sellers" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Best Sellers</Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">Contact</Link>
            </li>
            <li>
              <Link href="/abut us" className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">About us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
