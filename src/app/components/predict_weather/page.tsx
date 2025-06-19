// src/app/predict-weather/page.tsx
"use client";

import type React from "react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Upload, FileText, Zap, Download, Cpu, Eye, List, Check } from "lucide-react";
import { ResponsiveContainer, LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { processAndPredictWeather, type WeatherAnalysisResult } from "../../utils/weatherPredictor";

export default function PredictWeatherPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<WeatherAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFile = (file: File | null) => {
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setUploadedFile(file);
        setError(null);
        setAnalysisResult(null);
      } else {
        setError("Invalid file type. Please upload a CSV file.");
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await processAndPredictWeather(uploadedFile);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setUploadedFile(null);
    setIsAnalyzing(false);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">AI Weather Prediction</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Upload a CSV file with historical weather data and our AI will generate future predictions and charts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-emerald-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Upload className="h-5 w-5 md:h-6 md:w-6 text-emerald-600 mr-2" />
                Upload CSV File
              </h2>
              {!uploadedFile ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all ${
                    dragActive
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                  onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 md:h-8 md:w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Drop your CSV file here</h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">Only .csv files are accepted</p>
                  <label className="bg-emerald-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer inline-block text-sm md:text-base">
                    Browse Files
                    <input type="file" className="hidden" onChange={handleFileChange} accept=".csv, text/csv" />
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
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button onClick={resetAnalysis} className="text-gray-500 hover:text-red-500 transition-colors text-xl">×</button>
                  </div>
                </div>
              )}

              {uploadedFile && !isAnalyzing && !analysisResult && (
                <button
                  onClick={handleAnalyze}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 md:py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105 shadow-lg mt-6"
                >
                  <Zap className="h-4 w-4 md:h-5 md:w-5 inline mr-2" />
                  Generate Prediction
                </button>
              )}

              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}
            </div>

            {isAnalyzing && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-orange-100">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Zap className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">AI is Generating Charts...</h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">Analyzing trends and forecasting the weather...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full animate-pulse w-3/4"></div></div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysisResult ? (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-green-100 space-y-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Prediction Summary</h2>
                    <p className="text-gray-600 leading-relaxed">{analysisResult.summary}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Predicted Temperature (°C)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={analysisResult.timeSeries} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="date" fontSize={12} tickFormatter={(str) => str.slice(5)} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="predicted_temperature_celsius" name="Temp (°C)" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Predicted Precipitation (mm)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={analysisResult.timeSeries} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="date" fontSize={12} tickFormatter={(str) => str.slice(5)} />
                            <YAxis fontSize={12} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="predicted_precipitation_mm" name="Precip. (mm)" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                     <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><List className="h-5 w-5 mr-2 text-green-600" /> Key Insights</h3>
                     <ul className="space-y-2">
                        {analysisResult.key_insights.map((insight, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{insight}</span>
                          </li>
                        ))}
                     </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center"><Eye className="h-4 w-4 text-blue-600 mr-2" /> Confidence</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{analysisResult.confidence}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center"><Cpu className="h-4 w-4 text-purple-600 mr-2" /> Methodology</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{analysisResult.methodology}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <button onClick={resetAnalysis} className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Analyze Another CSV
                  </button>
                </div>
              </>
            ) : (
              !isAnalyzing &&
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                <div className="text-center text-gray-500">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <List className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Awaiting Data</h3>
                  <p className="text-sm md:text-base">Upload a CSV file to see AI-generated charts and predictions.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}