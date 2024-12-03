'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter for page navigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Attempt to get user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      // Check if email and password match
      if (storedUser.email === email && storedUser.password === password) {
        // If correct, redirect to home page
        router.push('/');
      } else {
        setError('Incorrect email or password');
      }
    } else {
      setError('No account found with this email');
    }
  };

  return (
    <div className="min-h-screen bg-[#a8d08d] flex justify-center items-center"> {/* Gold green background */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-green-300 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span>Don't have an account? <a href="/register" className="text-blue-600 hover:text-blue-800">Create one</a></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
