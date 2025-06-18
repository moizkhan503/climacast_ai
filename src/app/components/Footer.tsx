import Link from "next/link"
import { CloudRain, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <CloudRain className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold">ClimaCast AI</span>
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionizing weather prediction with artificial intelligence for a more sustainable and informed
              future.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors cursor-pointer">
                <span className="text-white font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors cursor-pointer">
                <span className="text-white font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors cursor-pointer">
                <span className="text-white font-bold">in</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">AI Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Weather Prediction</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Climate Analysis</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Risk Assessment</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Pattern Recognition</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Real-time Processing</li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tools & Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/predict_weather" className="hover:text-emerald-400 transition-colors">
                  Weather Prediction Tool
                </Link>
              </li>
              <li>
                <Link href="/climate_awareness" className="hover:text-emerald-400 transition-colors">
                  Climate Chatbot
                </Link>
              </li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">API Access</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Data Analytics</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Custom Solutions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">contact@climacast.ai</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="text-sm font-semibold mb-2">Company</h5>
              <ul className="space-y-1 text-sm text-gray-400">
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 ClimaCast AI. All rights reserved. Powered by advanced machine learning.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-xs text-gray-500">Built with Next.js & TypeScript</span>
              <span className="text-xs text-gray-500">AI-Powered Weather Intelligence</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
