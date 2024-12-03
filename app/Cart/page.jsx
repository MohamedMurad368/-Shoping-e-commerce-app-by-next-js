'use client';
import React from 'react';
import { useProductContext } from '../context/ProductContext';

const Cart = () => {
  const { state, addToCart, removeFromCart, updateQuantity } = useProductContext();

  // حساب الإجمالي مع الخصم
  const calculateTotal = () => {
    const total = state.cart.reduce((total, product) => {
      // إذا كان هناك سعر مخفض، نستخدمه
      const price = product.discountedPrice ? parseFloat(product.discountedPrice) : parseFloat(product.price || 0);
      const quantity = product.quantity ? product.quantity : 1;
      return total + price * quantity;
    }, 0);
    return isNaN(total) ? 0 : total;
  };

  // حساب إجمالي الخصم
  const calculateDiscount = () => {
    const totalDiscount = state.cart.reduce((discount, product) => {
      const originalPrice = parseFloat(product.price || 0);
      const discountedPrice = parseFloat(product.discountedPrice || 0);

      if (!originalPrice || !discountedPrice) {
        return discount;
      }

      const discountAmount = (originalPrice - discountedPrice) * product.quantity;
      return discount + discountAmount;
    }, 0);
    return isNaN(totalDiscount) ? 0 : totalDiscount;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Shopping Cart</h1>

      {state.cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {state.cart.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition">
              {/* معلومات المنتج */}
              <div className="flex items-center space-x-4">
                <img 
                  src={product.image || '/default-image.png'}  
                  alt={product.title} 
                  className="w-24 h-24 rounded-md shadow-md border border-gray-200"
                  style={{ objectFit: 'contain' }}
                />
                <div>
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-500">
                    {/* استخدام السعر المخفض إذا كان موجودًا */}
                    Price: ${product.discountedPrice ? parseFloat(product.discountedPrice).toFixed(2) : (product.price ? parseFloat(product.price).toFixed(2) : '0.00')}
                  </p>
                  {product.discountedPrice && (
                    <span className="text-sm text-green-500">
                      Discount: ${((parseFloat(product.price) - parseFloat(product.discountedPrice)) * product.quantity).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* الكمية والإجراءات */}
              <div className="flex items-center space-x-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => {
                    const newQuantity = product.quantity - 1;
                    updateQuantity(product.id, newQuantity);
                  }}
                >
                  -
                </button>

                <span className="text-lg font-semibold">{product.quantity}</span>

                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => {
                    const newQuantity = product.quantity + 1;
                    updateQuantity(product.id, newQuantity);
                  }}
                >
                  +
                </button>

                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => removeFromCart(product)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 border-t border-gray-300">
        {/* إجمالي الخصم */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Discount:</h3>
          <span className="text-xl font-bold text-green-600">${calculateDiscount().toFixed(2)}</span>
        </div>

        {/* الإجمالي بعد الخصم */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Total:</h3>
          <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
        </div>

        <button className="mt-4 w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">
          Checkout
        </button>
      </div>

      {/* زر العودة إلى المنتجات */}
      <div className="mt-6">
        <button 
          onClick={() => window.location.href = '/products'} // تعديل المسار حسب الحاجة
          className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
        >
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default Cart;
