'use client'
import { useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-4 right-4 bg-navy text-white p-3 rounded-full shadow-lg transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
            aria-label="Scroll to top"
        >
            <FaArrowUp className="h-6 w-6 text-purple-400" />
        </button>
    );
}
