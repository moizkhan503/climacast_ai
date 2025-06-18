"use client"

import Link from "next/link"
import { CloudRain, Menu, X } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            {currentPage !== "home" && <span className="text-gray-400 mr-2">←</span>}
            <CloudRain className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-800">ClimaCast AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/#features" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Features
            </Link>
            <Link href="/#ai-technology" className="text-gray-600 hover:text-emerald-600 transition-colors">
              AI Technology
            </Link>
            <Link href="/#use-cases" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Use Cases
            </Link>
            <Link href="/#about" className="text-gray-600 hover:text-emerald-600 transition-colors">
              About
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/components/predict_weather"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Predict Weather
            </Link>
            <Link
              href="/components/climate_awareness"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Climate Awareness
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-emerald-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#features"
                className="text-gray-600 hover:text-emerald-600 transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#ai-technology"
                className="text-gray-600 hover:text-emerald-600 transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Technology
              </Link>
              <Link
                href="/#use-cases"
                className="text-gray-600 hover:text-emerald-600 transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Use Cases
              </Link>
              <Link
                href="/#about"
                className="text-gray-600 hover:text-emerald-600 transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200">
                <Link
                  href="/predict_weather"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Predict Weather
                </Link>
                <Link
                  href="/climate_awareness"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Climate Chat
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
