'use client';
import React, { useState } from 'react';
import { FaLock, FaUser, FaFilm } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import { IoIosMail } from 'react-icons/io';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    // Debugging logs
    console.log('Form Password:', formData.password);
    console.log('Confirm Password:', formData.confirmPassword);
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed with signup
      console.log('Signup attempted with:', formData);
      // Here you would typically call an API to register the user
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)' }} className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white font-sans flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-gray-900 backdrop-blur-md rounded-lg shadow-lg p-8 animate-fadeIn">
        <div className="flex justify-center mb-8">
          <div className="bg-purple-600 rounded-full p-3 animate-bounce">
            <FaFilm size={48} className="text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Join Movo
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-white/5 rounded-md py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="Full Name"
            />
            <FaUser className="absolute left-3 top-3 text-gray-400" size={20} />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 rounded-md py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="Email"
            />
            <IoIosMail className="absolute left-3 top-3 text-gray-400" size={25} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/5 rounded-md py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="Password"
            />
            <FaLock className="absolute left-3 top-3 text-gray-400" size={20} />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-white/5 rounded-md py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="Confirm Password"
            />
            <FaLock className="absolute left-3 top-3 text-gray-400" size={20} />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Sign Up</span>
              <FiUserPlus size={20} />
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <a 
              href="/signin" 
              className="text-purple-400 hover:text-purple-300 transition-colors duration-300 animate-pulse"
            >
              Log In Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
