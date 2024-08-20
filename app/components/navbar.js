import { FaSearch, FaUserPlus } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'


export default function Navbar() {
    return (
        <nav className="z-50 bg-gradient-to-r from-navy to-darkpurple shadow-lg fixed w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <div className="flex items-center">
                        <a href="/" className="flex items-center space-x-2 text-white  transition duration-150 ease-in-out">
                            <span className=" hover:text-purple-950 text-purple-400 font-bold text-xl sm:text-2xl tracking-tight">Movo</span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <SignedOut>
                            <a href="/signup" className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1">
                                <FaUserPlus className=" h-5 w-5" />
                                <span className="font-bold hidden sm:inline">Sign Up</span>
                            </a>
                            <a href="/signin" className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1">
                                <IoLogIn className=" h-5 w-5" />
                                <span className="font-bold hidden sm:inline">Login</span>
                            </a>
                            <a href="/contact" className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1">
                            <IoIosMail className=" h-5 w-5" />
                            <span className=" font-bold hidden sm:inline">Contact Us</span>
                            </a>
                        </SignedOut>
                        <SignedIn>
                            <a href="/search" className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1">
                            <FaSearch className=" h-4 w-4" />
                            <span className="font-bold hidden sm:inline">Search</span>
                            </a>
                            <a href="/chatbot" className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1">
                            <SiGooglegemini className=" h-4 w-4" />
                            <span className="font-bold hidden sm:inline">Movo Bot</span>
                            </a>
                            <a href="/contact" className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1">
                            <IoIosMail className=" h-5 w-5" />
                            <span className=" font-bold hidden sm:inline">Contact Us</span>
                            </a>
                            <UserButton />
                        </SignedIn>
                        
                    </div>
                </div>
            </div>
        </nav>
    );
}
