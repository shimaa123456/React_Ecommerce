// src/context/ShopContext.jsx
import React, { createContext, useState } from 'react';

// إنشاء الـ Context
export const ShopContext = createContext();

// إنشاء الـ Provider الذي يحتوي على الـ state ويقوم بتمريره عبر الـ Context
export const ShopProvider = ({ children }) => {
  // حالة cartItems التي ستخزن عناصر السلة
  const [cartItems, setCartItems] = useState([]);
  
  // حالة products التي ستخزن المنتجات
  const [products, setProducts] = useState([]);
  
  // حالة العملة المستخدمة (افتراضيًا USD)
  const [currency, setCurrency] = useState('USD');

  // يمكنك هنا إضافة أي منطق آخر لحساب المجموع أو التعامل مع السلة أو المنتجات
  
  // إرجاع الـ Context Provider مع القيمة التي سيتم مشاركتها مع باقي التطبيق
  return (
    <ShopContext.Provider value={{ cartItems, products, currency }}>
      {children}
    </ShopContext.Provider>
  );
};