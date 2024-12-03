import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-500 to-yellow-400 text-black py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Column 1: About */}
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold mb-2 text-black">About Us</h2>
            <p className="text-sm text-black">
              We are committed to providing the best products at the most competitive prices.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold mb-2 text-black">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-black hover:text-gray-700">Home</a>
              </li>
              <li>
                <a href="#" className="text-sm text-black hover:text-gray-700">Shop</a>
              </li>
              <li>
                <a href="#" className="text-sm text-black hover:text-gray-700">About</a>
              </li>
              <li>
                <a href="#" className="text-sm text-black hover:text-gray-700">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold mb-2 text-black">Contact Us</h2>
            <p className="text-sm text-black">Email: info@example.com</p>
            <p className="text-sm text-black">Phone: +123 456 789</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center sm:justify-start space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-black hover:text-blue-500">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-black hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-black hover:text-pink-500">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-black hover:text-blue-700">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
