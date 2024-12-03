'use client';
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const initialState = {
  cart: [],
};

// وظائف المخفض (reducer)
const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // تحقق مما إذا كان المنتج موجودًا بالفعل في السلة
      const existingProduct = state.cart.find(item => item.id === action.payload.id);

      if (existingProduct) {
        // إذا كان المنتج موجودًا بالفعل، نقوم بتحديث الكمية
        return {
          ...state,
          cart: state.cart.map(product =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      } else {
        // إذا لم يكن المنتج موجودًا، نقوم بإضافته إلى السلة مع تعيين الكمية إلى 1
        const productWithDiscount = {
          ...action.payload,
          discountedPrice: action.payload.discountedPrice || action.payload.price,
          quantity: 1,  // تعيين الكمية إلى 1
        };
        return { ...state, cart: [...state.cart, productWithDiscount] };
      }

    case 'REMOVE_FROM_CART':
      // إزالة المنتج من السلة
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload.id),
      };

    case 'UPDATE_QUANTITY':
      // تحديث الكمية
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: action.payload.quantity }
            : product
        ),
      };

    case 'SET_CART':
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

// إنشاء السياق
const ProductContext = createContext();

// استخدام السياق في التطبيق
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [isClient, setIsClient] = useState(false);  // لحل مشكلة الـ Hydration

  useEffect(() => {
    setIsClient(true);  // سيتم التحديث بعد تحميل الصفحة في العميل
  }, []);

  useEffect(() => {
    if (isClient) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart) });
      }
    }
  }, [isClient]);

  const addToCart = (product) => {
    const productWithDiscount = {
      ...product,
      discountedPrice: product.discountedPrice || product.price,
      quantity: 1,  // تعيين الكمية إلى 1
    };
    dispatch({ type: 'ADD_TO_CART', payload: productWithDiscount });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const updateQuantity = (id, quantity) => {
    const validQuantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: validQuantity } });
  };

  const cartItemCount = state.cart.reduce((total, product) => total + product.quantity, 0);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  }, [state.cart, isClient]);

  return (
    <ProductContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, cartItemCount }}>
      {children}
    </ProductContext.Provider>
  );
};

// استخدام السياق في مكونات React
export const useProductContext = () => {
  return useContext(ProductContext);
};
