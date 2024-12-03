'use client';
import React, { useEffect, useState } from 'react';
import { useProductContext } from '../../context/ProductContext';
import axios from 'axios';

const ProductDetail = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]); // لتخزين المنتجات مع الخصم
  const { addToCart } = useProductContext();

  const { id } = React.use(params);

  // تحميل أول 5 منتجات مع الخصم
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        const discount = 0.2; // خصم 20%
        // نعرض أول 5 منتجات فقط مع حساب الخصم
        const productsWithDiscounts = response.data.slice(0, 5).map(product => {
          const discountedPrice = (product.price * (1 - discount)).toFixed(2);
          return {
            ...product,
            discountedPrice,
            discount: discount * 100, // تحويل إلى نسبة مئوية
          };
        });
        setDiscountedProducts(productsWithDiscounts);
      })
      .catch(error => console.error('Error fetching discounted products:', error));
  }, []);

  // تحميل تفاصيل المنتج
  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(data => {
          setProduct(data);
          fetchProductCategory(data.category);  // جلب المنتجات المشابهة
        })
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id]);

  // جلب المنتجات المشابهة بناءً على فئة المنتج الحالي
  const fetchProductCategory = (category) => {
    axios.get(`https://fakestoreapi.com/products?category=${category}`)
      .then(response => {
        setSimilarProducts(response.data.slice(0, 4)); // نعرض 4 منتجات مشابهة فقط
      })
      .catch(error => console.error('Error fetching similar products:', error));
  };

  const handleAddToCart = (product) => {
    // التحقق من وجود خصم على المنتج
    const isDiscountedProduct = discountedProducts.some(discountedProduct => discountedProduct.id === product.id);
    
    const finalPrice = isDiscountedProduct ? product.price * (1 - 0.2) : product.price;
    
    // إضافة المنتج إلى السلة مع السعر النهائي (مع الخصم أو بدون)
    const productWithDiscount = {
      ...product,
      discountedPrice: finalPrice.toFixed(2),  // تخزين السعر بعد الخصم
    };

    addToCart(productWithDiscount);
  };

  if (!product) return <div className="text-center py-20 text-xl text-gray-500">Loading...</div>;

  // التحقق إذا كان المنتج ضمن أول 5 منتجات مع خصم 20%
  const isDiscountedProduct = discountedProducts.some(discountedProduct => discountedProduct.id === product.id);
  const displayPrice = isDiscountedProduct ? product.price * (1 - 0.2) : product.price;

  return (
    <div className="container mx-auto py-16 px-6 md:px-12">
      {/* عرض المنتج المحدد */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-12">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-72 h-72 object-contain rounded-t-lg md:rounded-l-lg mx-auto"
          />
        </div>

        <div className="w-full md:w-1/2 px-6 py-8">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{product.description}</p>
          
          <div className="flex items-center justify-between mb-6">
            {/* إظهار السعر مع الخصم إذا كان المنتج ضمن أول 5 */}
            {isDiscountedProduct && (
              <span className="text-2xl font-bold text-gray-800 line-through">${product.price}</span>
            )}
            <span className="text-2xl font-bold text-gray-800">${displayPrice.toFixed(2)}</span>
          </div>

          {isDiscountedProduct && (
            <div className="text-sm text-green-600 mb-6">20% OFF</div>
          )}

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-md transition duration-200"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* عرض المنتجات المشابهة */}
      {similarProducts.length > 0 && (
        <div className="similar-products mt-16">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Like this product</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => {
              // التحقق إذا كان المنتج ضمن أول 5 منتجات مع خصم 20%
              const isSimilarDiscounted = discountedProducts.some(discountedProduct => discountedProduct.id === product.id);
              const similarDisplayPrice = isSimilarDiscounted ? product.price * (1 - 0.2) : product.price;
              return (
                <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48  p-4"
                    style={{ objectFit: 'contain' }} 
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-700 truncate">{product.title}</h3>
                    <div className="flex justify-between items-center mt-4">
                      {/* إظهار السعر مع الخصم إذا كان المنتج ضمن أول 5 */}
                      {isSimilarDiscounted && (
                        <span className="text-lg font-bold text-gray-800 line-through">${product.price}</span>
                      )}
                      <span className="text-lg font-bold text-gray-800">${similarDisplayPrice.toFixed(2)}</span>
                    </div>
                    {isSimilarDiscounted && (
                      <div className="text-sm text-green-600 mb-4">20% OFF</div>
                    )}
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
