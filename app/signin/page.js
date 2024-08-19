'use client';

import React, { useState } from 'react';
import { IoIosMail } from "react-icons/io";
import { PiSignIn } from "react-icons/pi";
import { FaFilm } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempted with:', { email, password });
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)' }} className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white font-sans flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-gray-900 backdrop-blur-md rounded-lg shadow-lg p-8 animate-fadeIn">
                <div className="flex justify-center mb-8">
                    <div className="bg-purple-600 rounded-full p-3 animate-pulse">
                        <FaFilm size={48} className="text-white" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Welcome Back
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-white/5 rounded-md py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            placeholder="Email"
                        />
                        <IoIosMail className="absolute left-3 top-3 text-gray-400" size={25} />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-white/5 rounded-md py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            placeholder="Password"
                        />
                        <FaLock className="absolute left-3 top-3 text-gray-400" size={20} />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <span>Log In</span>
                            <PiSignIn size={20} />
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Don’t have an account?{' '}
                        <a 
                            href="/signup" 
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-300 animate-pulse"
                        >
                            Sign Up Here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
