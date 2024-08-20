'use client'
import Head from "next/head";
import ScrollToTop from "./components/scrolltotop";
import { FaFilm } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { MdOutlineDesignServices } from "react-icons/md";
import { LuBrain } from "react-icons/lu";
import { IoGlobeOutline } from "react-icons/io5";
import { FiZap } from "react-icons/fi";
import { FaBan } from "react-icons/fa";







export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-indigo-900 text-white font-sans">
      <Head>
        <title>Movo</title>
        <meta name="description" content="Samuel Adly Landing Page"/>
      </Head>
      <main className="container mx-auto px-4 py-16 text-center flex-grow">
        <div className="mb-8 animate-float">
          <FaFilm size={80} className="inline-block text-purple-400" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Welcome to Movo
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          AI-Powered Movie & TV Show Recommendation Platform to Help You Discover New Content
        </p>
        <div className="tryitbtn flex justify-center space-x-4">
          <a href='/signup' className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-transform transform hover:scale-105">
            Try It For Free
          </a>
        </div>
        <motion.section 
          className="my-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 pb-2">
            Discover Something New
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Modern Design",
                description: "Our platform features a clean and modern design that is easy to use and navigate.",
                icon: <MdOutlineDesignServices className="w-12 h-12 text-purple-500" />
              },
              {
                title: "Intelligent Learning",
                description: "Our AI-powered recommendation engine learns your preferences to provide personalized suggestions.",
                icon: <LuBrain className="w-12 h-12 text-blue-500" />
              },
              {
                title: "Discover Anywhere",
                description: "Access our platform from anywhere in the world on any device with an internet connection.",
                icon: <IoGlobeOutline className="w-12 h-12 text-green-500" />
              },
              {
                title: "Unlimited Recommendations",
                description: "Get unlimited movie and TV show recommendations based on your preferences and viewing history.",
                icon: <FiZap className="w-12 h-12 text-yellow-500" />
              },
              {
                title: "Ad-Free Experience",
                description: "Enjoy an ad-free experience while browsing and discovering new content on our platform.",
                icon: <FaBan className="w-12 h-12 text-gray-500" />
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col justify-center items-center"
                variants={itemVariants}
              >
                <div className="mb-6 flex justify-center items-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-purple-400 mb-4 text-center">{feature.title}</h3>
                <p className="text-white text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      <footer className="text-center p-4">
        <p>&copy; 2024 Movo. All rights reserved.</p>
      </footer>
      <ScrollToTop />
    </div>
  );
}
