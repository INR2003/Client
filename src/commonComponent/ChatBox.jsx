import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  const text = "Chat with us".toUpperCase().split("");

  return (
    <>
      {/* Flip animation */}
      <style>
        {`
          @keyframes flip {
            0%, 80% {
              transform: rotateY(360deg);
            }
          }
          .flip-letter {
            display: inline-block;
            animation: flip 2s infinite;
          }
        `}
      </style>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        {/* Chat icon with animated text */}
        <div className="flex items-center space-x-2">
          {!isOpen && (
            <span className="bg-black px-3 py-2 rounded-lg shadow-md text-white text-sm font-bold flex space-x-0.5">
              {text.map((char, index) => (
                <span
                  key={index}
                  className="flip-letter"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          )}

          <button
            onClick={toggleChat}
            className="bg-black p-3 rounded-full shadow-md hover:shadow-xl transition flex items-center justify-center"
          >
            {isOpen ? (
              <X className="w-7 h-7 text-yellow-400" />
            ) : (
              <MessageCircle className="w-7 h-7 text-yellow-400" />
            )}
          </button>
        </div>

        {/* Chat box */}
        {isOpen && (
          <div className="mt-3 w-80 h-96 bg-black border border-gray-700 rounded-xl shadow-lg flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-gray-900 px-4 py-2 text-white font-bold">
              ChatBot
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-2 overflow-y-auto space-y-2">
              {messages.length === 0 && (
                <div className="text-gray-400 text-sm">No messages yet...</div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex p-2 border-t border-gray-700">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-yellow-400 p-2 rounded-r-lg hover:bg-yellow-500 transition"
              >
                <Send className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBot;
