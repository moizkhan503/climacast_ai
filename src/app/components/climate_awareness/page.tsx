"use client"

import { useState, useRef, useEffect } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Send, Bot, User, Leaf, CloudRain, Sun, Cloud, CloudSnow, CloudLightning, CloudFog } from "lucide-react"
import { getClimateAdvice, extractWeatherInfo } from "../../utils/climateAssistant"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  isError?: boolean
}

export default function ClimateAwarenessPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Climate Awareness Assistant. I can help you understand how to adapt to different weather conditions and live more sustainably. You can tell me about your current weather or ask for climate-related advice!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Remove auto-scrolling behavior completely
  const scrollToBottom = () => {
    // No-op function to prevent scrolling
    return
  }
  
  // Remove the auto-scroll effect completely
  useEffect(() => {
    // This effect is intentionally left empty to prevent any auto-scrolling
  }, [])

  // Handle input resizing
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`
    }
  }, [inputMessage])

  const handleSendMessage = async () => {
    const message = inputMessage.trim()
    if (message === "") return

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    }

    // Prevent default form submission behavior that might cause scrolling
    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)
    
    // Prevent default form submission behavior
    if (typeof window !== 'undefined') {
      window.scrollTo(0, window.scrollY)
    }

    try {
      // Extract weather info from user message
      const weatherInfo = extractWeatherInfo(message)
      
      // Get AI response
      const response = await getClimateAdvice(message, weatherInfo)
      
      // Add AI response to chat
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error("Error getting AI response:", error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
        isError: true
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const getWeatherIcon = (text: string) => {
    const lowerText = text.toLowerCase()
    if (lowerText.includes('rain')) return <CloudRain className="h-5 w-5 text-blue-500" />
    if (lowerText.includes('sun') || lowerText.includes('hot')) return <Sun className="h-5 w-5 text-yellow-500" />
    if (lowerText.includes('snow') || lowerText.includes('cold')) return <CloudSnow className="h-5 w-5 text-blue-200" />
    if (lowerText.includes('storm') || lowerText.includes('thunder')) return <CloudLightning className="h-5 w-5 text-purple-500" />
    if (lowerText.includes('fog') || lowerText.includes('mist')) return <CloudFog className="h-5 w-5 text-gray-400" />
    return <Cloud className="h-5 w-5 text-gray-400" />
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQuestions = [
    "What is climate change?",
    "How do greenhouse gases work?",
    "What are renewable energy sources?",
    "How is weather changing?",
    "What can I do to help the environment?",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 mb-4">
            Weather & Climate Assistant
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized advice for any weather condition and learn how to live more sustainably. 
            Try asking about your local weather or climate-related topics!
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6 md:mb-8">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Climate & Weather Assistant</h3>
                  <p className="text-emerald-100 text-sm">Ask me about your local weather or climate topics</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {['sunny', 'rainy', 'snowy', 'stormy'].map((type, i) => (
                  <div key={i} className="hidden sm:block opacity-75 hover:opacity-100 transition-opacity">
                    {type === 'sunny' && <Sun className="h-5 w-5 text-yellow-300" />}
                    {type === 'rainy' && <CloudRain className="h-5 w-5 text-blue-300" />}
                    {type === 'snowy' && <CloudSnow className="h-5 w-5 text-blue-100" />}
                    {type === 'stormy' && <CloudLightning className="h-5 w-5 text-purple-300" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div 
            className="h-80 md:h-96 overflow-y-auto p-4 space-y-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                    message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "user" ? "bg-emerald-600" : "bg-orange-500"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-emerald-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600 mb-2">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="relative flex-1">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Tell me about your current weather or ask about climate..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm md:text-base bg-white shadow-sm min-h-[44px] max-h-40 resize-none text-gray-800 placeholder-gray-400"
                  rows={1}
                  style={{ minHeight: '44px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === "" || isTyping}
                  className="absolute right-2 bottom-2 bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="group bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 hover:border-emerald-200 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Weather Insights</h3>
            <p className="text-gray-600 text-sm">
              Get real-time weather analysis and personalized recommendations for any condition.
            </p>
          </div>

          <div className="group bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 hover:border-blue-200 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Climate Impact</h3>
            <p className="text-gray-600 text-sm">Understand how weather patterns are changing and what it means for your area.</p>
          </div>

          <div className="group bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 hover:border-teal-200 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Actions</h3>
            <p className="text-gray-600 text-sm">Get instant tips for energy saving, safety, and comfort in any weather condition.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
