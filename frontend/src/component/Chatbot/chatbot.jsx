import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { FiSend, FiX } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  // Add states for resizing
  const [size, setSize] = useState({ width: 384, height: 500 }); // Default size (96*4=384px width)
  const [isResizing, setIsResizing] = useState(false);
  const resizableRef = useRef(null);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  
  const ApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const ai = new GoogleGenAI({ apiKey: ApiKey });
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function main({message}) {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message + " under 40 words",
    });
    return response.text;
  }
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async () => {
    if (input.trim() === "") return;
    
    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
        const response = await main({ message: input });

        console.log("response chatbot", response);
      
      const botMessage = { 
        role: "bot", 
        content: response 
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: "bot", content: "Sorry, I'm having trouble connecting. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Initial greeting when chat first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          role: "bot", 
          content: "Hi there! I'm your AI assistant. How can I help you today?" 
        }
      ]);
    }
  }, [isOpen]);

  // Handle mouse events for resizing - optimized for diagonal resize from top-left corner only
  const startResize = (e) => {
    e.preventDefault();
    setIsResizing(true);
    
    // Store initial mouse position and window size
    setInitialPosition({ x: e.clientX, y: e.clientY });
    setInitialSize({ width: size.width, height: size.height });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      // Calculate movement deltas
      const deltaX = initialPosition.x - e.clientX;
      const deltaY = initialPosition.y - e.clientY;
      
      // Update size proportionally to create diagonal resizing effect
      const aspectRatio = initialSize.width / initialSize.height;
      
      // Use the larger delta to determine resize amount
      const maxDelta = Math.max(deltaX, deltaY);
      
      // Calculate new dimensions ensuring minimum size
      const newWidth = Math.max(300, initialSize.width + maxDelta);
      const newHeight = Math.max(300, initialSize.height + maxDelta / aspectRatio);
      
      setSize({ width: newWidth, height: newHeight });
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
    };
    
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, initialPosition, initialSize]);

  return (
    <>
      {/* Chat toggle button */}
      <button 
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
        onClick={toggleChat}
      >
        {isOpen ? 
          <FiX className="w-6 h-6" /> : 
          <RiRobot2Line className="w-6 h-6" />
        }
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div 
          ref={resizableRef}
          className="fixed bottom-20 right-6 max-h-[90vh] max-w-[90vw] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-40 border border-gray-200"
          style={{ width: `${size.width}px`, height: `${size.height}px` }}
        >
          {/* Resize handle - only top left corner */}
          <div 
            className="absolute top-0 left-0 w-6 h-6 cursor-nwse-resize z-50"
            onMouseDown={startResize}
          >
            <div className="w-4 h-4 bg-indigo-600 opacity-30 hover:opacity-60 rounded-br transform -translate-x-2 -translate-y-2"></div>
          </div>
          
          {/* Visual indicator for resizing */}
          <div className="absolute top-0 left-0 w-10 h-1 bg-indigo-600 opacity-20 rounded"></div>
          <div className="absolute top-0 left-0 h-10 w-1 bg-indigo-600 opacity-20 rounded"></div>
          
          {/* Chat header */}
          <div className="bg-indigo-600 text-white p-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded-full p-1">
                <RiRobot2Line className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="font-medium">AI Assistant</span>
            </div>
            <FiX onClick={toggleChat} className="cursor-pointer hover:opacity-75" />
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`max-w-[80%] mb-3 ${
                  message.role === "user" ? "ml-auto" : "mr-auto"
                }`}
              >
                <div 
                  className={`p-2 rounded-lg ${
                    message.role === "user" 
                      ? "bg-indigo-600 text-white rounded-br-none" 
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="max-w-[80%] mr-auto">
                <div className="p-3 rounded-lg bg-white text-gray-800 border border-gray-200 rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: "0.2s"}}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: "0.4s"}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-center">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={1}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || input.trim() === ""}
                className={`bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-r-lg ${
                  (isLoading || input.trim() === "") ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;