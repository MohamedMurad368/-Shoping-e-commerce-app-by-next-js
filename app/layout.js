import React from 'react';
import { ProductProvider } from './context/ProductContext'; // استيراد ProductProvider
import localFont from 'next/font/local';
import './globals.css';
import Navbar from './Navbar/Navbar';
import Footer from './Component/Footer/Footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff', 
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'E-commerce Store',
  description: 'An online store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* تضمين ProductProvider حول جميع المكونات */}
        <ProductProvider>
          <div className="flex flex-col min-h-screen">
            {/* Navbar ثابت في أعلى الصفحة طوال الوقت */}
            <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
            
            {/* باقي المحتوى في الصفحة مع إضافة padding لتجنب تداخل الـ Navbar */}
            <main className="flex-1 pt-20">{children}</main>
            
            {/* Footer ثابت في أسفل الصفحة */}
            <Footer className="bg-white shadow-md" />
          </div>
        </ProductProvider>
      </body>
    </html>
  );
}
