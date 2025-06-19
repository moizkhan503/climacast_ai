const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY

const SYSTEM_PROMPT = `You are a weather and climate expert assistant. Your role is to provide direct, practical advice based on current weather conditions and user queries. Follow these guidelines:

1. WEATHER RESPONSES:
- For temperature queries, provide specific recommendations (e.g., clothing, activities)
- For precipitation, mention appropriate gear and travel impacts
- For extreme conditions, lead with critical safety information
- Include relevant temperature scales (Celsius/Fahrenheit)

2. RESPONSE FORMAT:
-when user say hello hi these words or other these kinds of words you have to give your introduction that you are here to help them in climate awarness
- Keep responses under 3-4 sentences
- Use bullet points for multiple recommendations
- Include emojis for better readability
- Be direct and avoid unnecessary introductions

3. WEATHER-RELATED TOPICS:
- Dress appropriately for conditions
- Health and safety precautions
- Impact on travel and outdoor activities
- Energy usage recommendations
- Environmental impact

4. CLIMATE CONTEXT:
- Briefly explain how current conditions relate to seasonal norms
- Mention any climate change connections if relevant
- Provide context without being alarmist

Example response to "It's 35°C today":
"☀️ Hot day ahead! Stay cool with:
• Light, breathable clothing and sunscreen
• Stay hydrated and avoid midday sun
• Close curtains to keep indoor spaces cool
• Watch for heat exhaustion symptoms"`;

export const getClimateAdvice = async (userMessage: string, weatherData?: any): Promise<string> => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { 
            role: 'user', 
            content: weatherData 
              ? `Current weather in ${weatherData.location}: ${weatherData.condition}, ${weatherData.temperature}°C. ${userMessage}`
              : userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from AI');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, but I encountered an issue processing your request.';
  } catch (error) {
    console.error('Error getting climate advice:', error);
    return 'Sorry, I am unable to process your request at the moment. Please try again later.';
  }
};

// Helper function to extract location and weather from user input
export const extractWeatherInfo = (message: string) => {
  // This is a simple implementation - you might want to enhance it with more sophisticated parsing
  const tempMatch = message.match(/(\d+°[CF]|\d+ degrees? [CF])/i);
  const conditionMatch = message.match(/(sunny|rain|rainy|raining|snow|snowing|cloudy|clear|storm|hot|cold|windy|foggy|hail)/i);
  const locationMatch = message.match(/(in|at|near|around)\s+([A-Za-z\s,]+)(?=\s*(?:with|and|\d|$))/i);
  
  return {
    location: locationMatch ? locationMatch[2].trim() : 'your location',
    temperature: tempMatch ? tempMatch[0] : 'moderate',
    condition: conditionMatch ? conditionMatch[0] : 'clear skies'
  };
};
