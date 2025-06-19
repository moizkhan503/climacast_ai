const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY

const SYSTEM_PROMPT = `You are an advanced meteorological AI specialist. Analyze the provided document content and generate detailed future weather pattern predictions in paragraph format.

Your task:
1. Read and understand the document content
2. Extract any weather-related information, patterns, or data
3. Generate realistic future weather predictions based on the content
4. Create comprehensive weather pattern analysis in flowing paragraphs
5. Provide confidence levels and methodology naturally within the text

Generate your response as detailed paragraphs covering:
- Weather pattern predictions and forecasts
- Temperature trends and variations
- Precipitation patterns and expectations
- Atmospheric conditions and changes
- Seasonal outlook and long-term trends
- Confidence levels and analysis methodology

Write in a professional meteorological style with flowing paragraphs. Make predictions specific and detailed based on the document content.`

export interface WeatherAnalysisResult {
  predictions: string
  confidence: string
  methodology: string
}

export const processAndPredictWeather = async (file: File): Promise<WeatherAnalysisResult> => {
  try {
    // Read file content
    const fileContent = await readFileContent(file)

    if (!fileContent || fileContent.trim().length === 0) {
      throw new Error("Could not read file content")
    }

    // Send directly to AI
    const result = await sendToAI(fileContent)
    return result
  } catch (error) {
    console.error("Error processing file:", error)
    throw new Error(`Failed to process file: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

const readFileContent = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      resolve(result || "")
    }
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}

const sendToAI = async (content: string): Promise<WeatherAnalysisResult> => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Analyze this document and generate weather pattern predictions:\n\n${content}` },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`AI API failed: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error("No response from AI")
    }

    return parseAIResponse(aiResponse)
  } catch (error) {
    console.error("AI request failed:", error)
    throw new Error("Failed to generate weather predictions")
  }
}

const parseAIResponse = (content: string): WeatherAnalysisResult => {
  const paragraphs = content.split("\n\n").filter((p) => p.trim().length > 0)

  let predictions = ""
  let confidence = ""
  let methodology = ""

  paragraphs.forEach((paragraph) => {
    const lower = paragraph.toLowerCase()

    if (lower.includes("confidence") || lower.includes("reliability")) {
      confidence += paragraph + "\n\n"
    } else if (lower.includes("method") || lower.includes("analysis") || lower.includes("approach")) {
      methodology += paragraph + "\n\n"
    } else {
      predictions += paragraph + "\n\n"
    }
  })

  // Ensure we have content for all sections
  if (!predictions.trim()) {
    predictions = content
  }

  if (!confidence.trim()) {
    confidence = "Confidence levels vary based on available data and prediction timeframe."
  }

  if (!methodology.trim()) {
    methodology = "Analysis based on document content and meteorological principles."
  }

  return {
    predictions: predictions.trim(),
    confidence: confidence.trim(),
    methodology: methodology.trim(),
  }
}
