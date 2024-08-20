'use client';
import React from 'react';
import { FaFilm } from 'react-icons/fa';
import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes';

export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white font-sans flex flex-col justify-center items-center p-4">
    <div className="w-full max-w-md bg-gray-900 backdrop-blur-md rounded-lg shadow-lg p-8 flex flex-col items-center">
        <div className="flex justify-center mb-8">
            <div className="bg-purple-600 rounded-full p-3 animate-pulse">
                <FaFilm size={48} className="text-white" />
            </div>
        </div>
        <SignUp
            appearance={{
                baseTheme: dark,
                elements: {
                    card: 'bg-transparent',
                    footerActionText: 'text-gray-400',
                    footerActionLink: 'text-purple-400 hover:text-purple-300 transition-colors duration-300 animate-pulse',
                    headerTitle: 'text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600',
                    formFieldInput: 'w-full bg-white/5 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300',
                    formButtonPrimary: 'w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2',
                },
                layout: {
                    socialButtonsVariant: 'oauth',
                },
            }}
            path="/signup"
            routing="path"
            signInUrl="/signin"
            afterSignUpUrl="/search"
        />
    </div>
</div>
  );
};
