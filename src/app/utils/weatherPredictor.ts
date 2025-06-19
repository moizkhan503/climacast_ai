const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

const SYSTEM_PROMPT = `You are an expert data scientist and meteorologist AI. Your task is to analyze raw weather data provided in CSV format and generate a structured JSON object containing future weather predictions.

**Input:** You will receive the content of a CSV file. The CSV will contain historical weather data, which may include columns like 'date', 'temperature', 'humidity', 'pressure', 'wind_speed', etc.

**Your Task:**
1.  **Analyze the Data:** Carefully examine the provided CSV data to identify trends, seasonality, and correlations between different weather variables.
2.  **Predict Future Patterns:** Based on your analysis, extrapolate the data to predict weather conditions for the next 7-14 days.
3.  **Generate Structured JSON:** You MUST respond with ONLY a valid JSON object. Do not add any text before or after the JSON. The JSON object must conform to the following structure:
    {
      "summary": "A concise, 2-3 sentence summary of the overall weather forecast for the upcoming period.",
      "timeSeries": [
        {
          "date": "YYYY-MM-DD",
          "predicted_temperature_celsius": <number>,
          "predicted_precipitation_mm": <number>,
          "description": "<string: e.g., 'Sunny with light clouds'>"
        }
      ],
      "key_insights": [
        "<string: A specific, actionable insight derived from the data>",
        "<string: Another key observation or trend>"
      ],
      "confidence": "<string: e.g., 'High', 'Medium', 'Low'>. Briefly justify the confidence level.",
      "methodology": "A brief explanation of the analytical approach used (e.g., 'Time-series forecasting using an ARIMA model approach on temperature and humidity data, combined with seasonal trend analysis.')."
    }

**Example of a valid response:**
{
  "summary": "The upcoming week will see a gradual increase in temperature, peaking by the weekend. Expect scattered showers midweek, with clearer skies returning for the weekend.",
  "timeSeries": [
    { "date": "2024-09-15", "predicted_temperature_celsius": 22, "predicted_precipitation_mm": 0, "description": "Clear and sunny" },
    { "date": "2024-09-16", "predicted_temperature_celsius": 23, "predicted_precipitation_mm": 5, "description": "Partly cloudy with afternoon showers" }
  ],
  "key_insights": [
    "A significant pressure drop on Wednesday indicates a high probability of rain.",
    "Temperatures are trending 3-5 degrees above the seasonal average."
  ],
  "confidence": "High. The input data shows consistent and clear seasonal patterns, making short-term prediction reliable.",
  "methodology": "Analysis based on seasonal decomposition of time-series data, focusing on temperature and pressure trends from the provided CSV."
}

Now, analyze the following CSV content and generate the JSON response.`;

export interface WeatherAnalysisResult {
  summary: string;
  timeSeries: {
    date: string;
    predicted_temperature_celsius: number;
    predicted_precipitation_mm: number;
    description: string;
  }[];
  key_insights: string[];
  confidence: string;
  methodology: string;
}

export const processAndPredictWeather = async (file: File): Promise<WeatherAnalysisResult> => {
  try {
    // Check file type
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        throw new Error("Invalid file type. Please upload a CSV file.");
    }
    
    const fileContent = await readFileContent(file);

    if (!fileContent || fileContent.trim().length === 0) {
      throw new Error('The CSV file is empty or could not be read.');
    }

    const result = await sendToAI(fileContent);
    return result;
  } catch (error) {
    console.error('Error processing file:', error);
    throw new Error(`Failed to process file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result || '');
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

const sendToAI = async (content: string): Promise<WeatherAnalysisResult> => {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key is not configured.');
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192', // Using a more powerful model for better JSON adherence
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Analyze this CSV document and generate weather pattern predictions:\n\n${content}` },
        ],
        temperature: 0.5,
        max_tokens: 4096,
        response_format: { type: "json_object" }, // Crucial for ensuring JSON output
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`AI API request failed with status ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('AI returned an empty response.');
    }

    // The AI response is now a JSON string, so we parse it.
    return parseAIResponse(aiResponse);
  } catch (error) {
    console.error('AI request failed:', error);
    throw new Error('Failed to generate weather predictions from AI.');
  }
};

const parseAIResponse = (content: string): WeatherAnalysisResult => {
  try {
    const parsedJson = JSON.parse(content);

    // Basic validation to ensure the structure is correct
    if (
      !parsedJson.summary ||
      !Array.isArray(parsedJson.timeSeries) ||
      !Array.isArray(parsedJson.key_insights) ||
      !parsedJson.confidence ||
      !parsedJson.methodology
    ) {
      throw new Error('AI response is missing required JSON fields.');
    }
    
    return parsedJson as WeatherAnalysisResult;
  } catch (error) {
    console.error('Failed to parse AI JSON response:', error);
    console.error('Received content:', content);
    throw new Error('The AI returned an invalid data structure. Please try again.');
  }
};