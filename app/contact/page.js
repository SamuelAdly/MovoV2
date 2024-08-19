'use client';
import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import emailjs from 'emailjs-com';
import { IoIosMail, IoIosSend  } from "react-icons/io";


export default function ContactPage() {
    const [formState, setFormState] = useState({
        fullName: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus('');

        try {
            await emailjs.sendForm(
                'service_netjyjx',
                'template_3nnym9g',
                e.target,
                '-5RY6cvhK4nBSFNgj'
            );
            setSubmissionStatus('Your message has been sent!');
            setFormState({ fullName: '', email: '', message: '' });
        } catch (error) {
            setSubmissionStatus('There was an error sending your message.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)' }} className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white font-sans flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 animate-fadeIn">
                <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Contact Us
                </h1>
                <p className="text-center mb-8 text-lg">
                    We’d love to hear from you! Drop us a message and we’ll get back to you soon.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            name="fullName"
                            value={formState.fullName}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white/5 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            placeholder="Full Name"
                        />
                        <FaRegUser className="absolute right-3 top-3 text-gray-400" size={20} />
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white/5 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            placeholder="Email"
                        />
                        <IoIosMail className="absolute right-3 top-3 text-gray-400" size={28} />
                    </div>
                    <div className="relative">
                        <textarea
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            required
                            rows="4"
                            className="w-full bg-white/5 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
                            placeholder="Your Message"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                            <IoIosSend size={25} />
                        </button>
                        {submissionStatus && (
                            <div className={`mt-4 text-center ${submissionStatus.includes('error') ? 'text-red-400' : 'text-green-400'}`} aria-live="polite">
                                <p>{submissionStatus}</p>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
