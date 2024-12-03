/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disable React Strict Mode
    images: {
      images: {
        domains: ['fakestoreapi.com', 'upload.wikimedia.org', 'otherdomain.com'],
      }    },
  };
  
  module.exports = nextConfig;
  