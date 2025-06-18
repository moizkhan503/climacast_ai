"use client"

import type React from "react"

import { useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Upload, FileText, Zap, Download, TrendingUp, Eye, Cpu } from "lucide-react"
import { processAndPredictWeather, type WeatherAnalysisResult } from "../../utils/weatherPredictor"

export default function PredictWeatherPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<WeatherAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
      setError(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const result = await processAndPredictWeather(uploadedFile)
      setAnalysisResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed")
      setAnalysisResult(null)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setUploadedFile(null)
    setIsAnalyzing(false)
    setAnalysisResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">AI Weather Prediction</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Upload any document and AI will generate weather pattern predictions directly from your content.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-emerald-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Upload className="h-5 w-5 md:h-6 md:w-6 text-emerald-600 mr-2" />
                Upload Document
              </h2>

              {!uploadedFile ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all ${
                    dragActive
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 md:h-8 md:w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Drop your file here</h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
                    PDF, TXT, CSV, JSON, DOC, or any text-based document
                  </p>
                  <label className="bg-emerald-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer inline-block text-sm md:text-base">
                    Browse Files
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm md:text-base">{uploadedFile.name}</h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={resetAnalysis}
                      className="text-gray-500 hover:text-red-500 transition-colors text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {uploadedFile && !isAnalyzing && !analysisResult && (
                <button
                  onClick={handleAnalyze}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 md:py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105 shadow-lg mt-6"
                >
                  <Zap className="h-4 w-4 md:h-5 md:w-5 inline mr-2" />
                  Send to AI
                </button>
              )}

              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Analysis Status */}
            {isAnalyzing && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-orange-100">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Zap className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">AI Processing</h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
                    AI is analyzing your document and generating weather predictions...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full animate-pulse w-3/4"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysisResult ? (
              <>
                {/* Weather Predictions */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-green-100">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-green-600 mr-2" />
                    AI Weather Predictions
                  </h2>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                      {analysisResult.predictions.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="mb-4 text-justify">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Eye className="h-4 w-4 text-blue-600 mr-2" />
                        Confidence
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{analysisResult.confidence}</p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Cpu className="h-4 w-4 text-purple-600 mr-2" />
                        Methodology
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{analysisResult.methodology}</p>
                    </div>
                  </div>
                </div>

                {/* Download Report */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center">
                    <Download className="h-5 w-5 mr-2" />
                    Download Report
                  </button>
                </div>

                {/* Try Again */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <button
                    onClick={resetAnalysis}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Another File
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                <div className="text-center text-gray-500">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready for AI Analysis</h3>
                  <p className="text-sm md:text-base">
                    Upload any document and AI will generate weather predictions from your content.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
