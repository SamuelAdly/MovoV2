"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import ScrollToTop from "../components/scrolltotop";

export default function Movo() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [isAIOnline, setIsAIOnline] = useState(true);

  const handleSendMessage = async () => {
    try {
      const userMessage = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          history: messages.map((msg) => ({
            text: msg.text,
            role: msg.role === "bot" ? "model" : "user",
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();
      const botMessage = {
        text: result.text,
        role: "bot",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsAIOnline(true);
      setError(null);
    } catch (error) {
      setError("Failed to send message. Please try again.");
      setIsAIOnline(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white font-sans transition-colors duration-300`}>
      <main className="container mx-auto px-4 py-16">
        {/* Chatbot UI */}
        <div className={`flex flex-col h-full p-8 mt-16 bg-gray-900 transition-colors duration-300`}>
          {/* Centered Title and Image */}
          <div className="flex flex-col items-center justify-center mb-8">
            <img
              src="/movie.png"
              alt="Movo Logo"
              className="h-12 w-12 mb-3 rounded-lg"
            />
            <h1 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Discover Something New
            </h1>
            <p className={`${isAIOnline ? "text-green-500" : "text-red-500"}`}>
              {isAIOnline ? "Online" : "Offline"}
            </p>
          </div>

          <div className={`flex-1 overflow-y-auto bg-gray-800 rounded-md p-4 scrollbar-thin transition-colors duration-300`}>
            <p className={`inline-block p-3 rounded-lg bg-gray-900 text-gray-100`}>
              Hello, I am Movo your AI Powered Recommendation Bot
            </p>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-6 ${msg.role === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-3 rounded-lg ${
                    msg.role === "user" ? `bg-purple-700 text-white` : `bg-gray-900 text-gray-100`
                  } transition-colors duration-300`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </span>
                <p className={`text-xs text-gray-100 mt-2`}>
                  {msg.role === "bot" ? "Bot" : "You"} - {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="flex items-center mt-4">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className={`text-gray-100 bg-gray-800 flex-1 p-4 rounded-l-md border-t border-b border-l border-r focus:outline-none focus:border-bg-purple-700 transition-colors duration-300`}
            />
            <button
              onClick={handleSendMessage}
              className={`p-4 bg-gradient-to-r from-gray-900 to-indigo-900 text-white border-t border-b border-l border-r rounded-r-md hover:bg-opacity-80 focus:outline-none transition-colors duration-300`}
            >
              Send
            </button>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </div>
  );
}
