"use client"

import Link from "next/link"
import Header from "../../src/app/components/Header"
import Footer from "../../src/app/components/Footer"
import {
  CloudRain,
  Zap,
  Brain,
  Globe,
  TrendingUp,
  Shield,
  Cpu,
  Database,
  Satellite,
  BarChart3,
  Users,
  Building,
  Plane,
  Sprout,
  Factory,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50">
      <Header currentPage="home" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-orange-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6">
              AI-Powered
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500">
                Weather Intelligence
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Harness the power of cutting-edge artificial intelligence to predict weather patterns, analyze climate
              data, and make informed decisions for a sustainable future. Experience unprecedented accuracy with our
              advanced machine learning algorithms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/predict_weather"
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Predicting
              </Link>
              <Link
                href="/climate_awareness"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Learn About Climate
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">99.2%</div>
                <div className="text-sm md:text-base text-gray-600">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-500">50M+</div>
                <div className="text-sm md:text-base text-gray-600">Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-600">14 Days</div>
                <div className="text-sm md:text-base text-gray-600">Forecast Range</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-teal-600">24/7</div>
                <div className="text-sm md:text-base text-gray-600">Real-time Updates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-4 md:left-10 animate-bounce">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-200 rounded-full flex items-center justify-center">
            <CloudRain className="h-6 w-6 md:h-8 md:w-8 text-emerald-600" />
          </div>
        </div>
        <div className="absolute top-32 right-4 md:right-20 animate-pulse">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-200 rounded-full flex items-center justify-center">
            <Zap className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
          </div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-bounce delay-1000">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-200 rounded-full flex items-center justify-center">
            <Brain className="h-6 w-6 md:h-7 md:w-7 text-yellow-600" />
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
     

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Revolutionary Weather Intelligence</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of AI-powered features delivers unprecedented accuracy and insights for weather
              prediction and climate analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">AI-Powered Predictions</h3>
              <p className="text-gray-600 mb-4">
                Advanced machine learning algorithms analyze vast amounts of meteorological data to provide highly
                accurate weather forecasts up to 14 days in advance.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                  99.2% accuracy rate
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                  14-day forecasts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                  Hourly updates
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Global Climate Analysis</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive climate pattern analysis covering global weather systems, temperature trends, and
                atmospheric conditions worldwide.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  200+ countries covered
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  Real-time global data
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  Climate trend analysis
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-yellow-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Trend Forecasting</h3>
              <p className="text-gray-600 mb-4">
                Identify long-term climate trends and seasonal patterns to help with agricultural planning, energy
                management, and disaster preparedness.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  Seasonal predictions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  Long-term trends
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  Pattern recognition
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-teal-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Risk Assessment</h3>
              <p className="text-gray-600 mb-4">
                Early warning systems for extreme weather events including storms, floods, droughts, and temperature
                anomalies to protect communities.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-teal-500 mr-2" />
                  Early warnings
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-teal-500 mr-2" />
                  Risk scoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-teal-500 mr-2" />
                  Alert systems
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <CloudRain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Precision Meteorology</h3>
              <p className="text-gray-600 mb-4">
                Hyperlocal weather predictions with street-level accuracy using satellite data, IoT sensors, and
                real-time atmospheric monitoring.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Street-level accuracy
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  IoT integration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Micro-climate analysis
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Real-time Processing</h3>
              <p className="text-gray-600 mb-4">
                Lightning-fast data processing and analysis delivering instant insights and predictions as weather
                conditions change in real-time.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                  Sub-second response
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                  Live data streams
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                  Instant updates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Transforming Industries with AI Weather Intelligence
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              From agriculture to aviation, our AI-powered weather predictions are revolutionizing how industries make
              critical decisions and manage weather-related risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 md:p-8 rounded-2xl border border-emerald-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Agriculture & Farming</h3>
              <p className="text-gray-600 mb-4">
                Optimize crop planning, irrigation scheduling, and harvest timing with precise weather forecasts and
                climate analysis tailored for agricultural needs.
              </p>
              <div className="flex items-center text-emerald-600 font-semibold">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-6 md:p-8 rounded-2xl border border-orange-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Plane className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Aviation & Transportation</h3>
              <p className="text-gray-600 mb-4">
                Enhance flight safety, optimize routes, and reduce delays with accurate weather predictions and
                turbulence forecasting for the aviation industry.
              </p>
              <div className="flex items-center text-orange-600 font-semibold">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 md:p-8 rounded-2xl border border-yellow-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Energy & Utilities</h3>
              <p className="text-gray-600 mb-4">
                Optimize renewable energy production, manage grid demand, and predict energy consumption patterns with
                weather-dependent forecasting models.
              </p>
              <div className="flex items-center text-yellow-600 font-semibold">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-gradient-to-br from-teal-50 to-teal-100 p-6 md:p-8 rounded-2xl border border-teal-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Construction & Infrastructure</h3>
              <p className="text-gray-600 mb-4">
                Plan construction schedules, ensure worker safety, and protect infrastructure with detailed weather
                forecasts and extreme weather alerts.
              </p>
              <div className="flex items-center text-teal-600 font-semibold">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-6 md:p-8 rounded-2xl border border-green-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Factory className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Manufacturing & Supply Chain</h3>
              <p className="text-gray-600 mb-4">
                Minimize weather-related disruptions, optimize logistics, and protect inventory with predictive weather
                intelligence for supply chain management.
              </p>
              <div className="flex items-center text-green-600 font-semibold">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-gradient-to-br from-amber-50 to-amber-100 p-6 md:p-8 rounded-2xl border border-amber-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Emergency Management</h3>
              <p className="text-gray-600 mb-4">
                Protect communities with early warning systems, disaster preparedness planning, and real-time emergency
                response coordination based on weather predictions.
              </p>
              <div className="flex items-center text-amber-600 font-semibold">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How ClimaCast AI Works</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our sophisticated AI system processes multiple data sources through advanced machine learning pipelines to
              deliver the most accurate weather predictions available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Data Collection & Integration</h3>
              <p className="text-gray-600">
                We continuously gather data from over 50,000 weather stations, 20+ satellites, ocean buoys, atmospheric
                sensors, and IoT devices worldwide to create the most comprehensive meteorological dataset.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">AI Analysis & Processing</h3>
              <p className="text-gray-600">
                Our advanced neural networks and machine learning algorithms process petabytes of data in real-time,
                identifying complex patterns and correlations that traditional forecasting methods cannot detect.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Intelligent Prediction Delivery</h3>
              <p className="text-gray-600">
                Accurate, actionable weather forecasts and climate insights are delivered through our intuitive
                interface with customizable alerts, detailed analytics, and API access for seamless integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              See how organizations worldwide are leveraging ClimaCast AI to make better decisions and reduce
              weather-related risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 md:p-8 rounded-2xl border border-emerald-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "ClimaCast AI has revolutionized our crop planning. The 14-day forecasts are incredibly accurate,
                helping us optimize irrigation and reduce water waste by 30%."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">John Davis</div>
                  <div className="text-sm text-gray-600">Agricultural Director, GreenFields Corp</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 md:p-8 rounded-2xl border border-orange-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The precision of weather predictions has improved our flight operations significantly. We've reduced
                weather-related delays by 45% since implementing ClimaCast AI."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">SM</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Sarah Martinez</div>
                  <div className="text-sm text-gray-600">Operations Manager, SkyLine Airlines</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 md:p-8 rounded-2xl border border-yellow-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The renewable energy forecasting has been game-changing for our wind farm operations. We can now
                predict energy output with 98% accuracy up to 10 days ahead."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MR</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Michael Rodriguez</div>
                  <div className="text-sm text-gray-600">Chief Engineer, WindPower Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Light Theme */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Experience the Future of Weather Prediction?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of users who trust ClimaCast AI for accurate weather insights and climate intelligence. Start
            your journey today with our advanced AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/predict_weather"
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Predicting Now
            </Link>
            <Link
              href="/climate_awareness"
              className="bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Learn More
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            No credit card required • Free trial available • Enterprise solutions available
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
