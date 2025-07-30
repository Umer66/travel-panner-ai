import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "" });

interface TripRequest {
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: string;
  travelers: number;
  interests: string[];
}

interface DayItinerary {
  day: number;
  date: string;
  activities: {
    time: string;
    activity: string;
    location: string;
    description: string;
    estimatedCost: string;
  }[];
  hotels: {
    name: string;
    location: string;
    rating: number;
    priceRange: string;
    description: string;
  }[];
}

interface TripItinerary {
  overview: {
    destination: string;
    duration: string;
    totalEstimatedCost: string;
    bestTimeToVisit: string;
    weatherInfo: string;
    currencyInfo: string;
  };
  dailyItinerary: DayItinerary[];
  recommendations: {
    restaurants: {
      name: string;
      cuisine: string;
      priceRange: string;
      description: string;
    }[];
    attractions: {
      name: string;
      type: string;
      description: string;
      estimatedTime: string;
    }[];
    transportation: {
      type: string;
      description: string;
      estimatedCost: string;
    }[];
  };
}

export async function generateTripItinerary(request: TripRequest): Promise<TripItinerary> {
  try {
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const systemPrompt = `You are an expert travel planner with extensive knowledge of destinations worldwide. 
Create a detailed, personalized travel itinerary based on the user's preferences. 
Focus on authentic local experiences, practical logistics, and budget-conscious recommendations.
Include specific hotel recommendations with Google Maps integration in mind.
Provide realistic cost estimates and practical travel advice.`;

    const userPrompt = `Create a detailed ${days}-day travel itinerary for ${request.destination} from ${startDate.toDateString()} to ${endDate.toDateString()}.

Trip Details:
- Destination: ${request.destination}
- Duration: ${days} days
- Number of travelers: ${request.travelers}
- Budget range: ${request.budget}
- Interests: ${request.interests.join(', ')}

Please provide a comprehensive itinerary with daily activities, hotel recommendations, restaurants, and practical information.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            overview: {
              type: "object",
              properties: {
                destination: { type: "string" },
                duration: { type: "string" },
                totalEstimatedCost: { type: "string" },
                bestTimeToVisit: { type: "string" },
                weatherInfo: { type: "string" },
                currencyInfo: { type: "string" }
              },
              required: ["destination", "duration", "totalEstimatedCost", "bestTimeToVisit", "weatherInfo", "currencyInfo"]
            },
            dailyItinerary: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: { type: "number" },
                  date: { type: "string" },
                  activities: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        time: { type: "string" },
                        activity: { type: "string" },
                        location: { type: "string" },
                        description: { type: "string" },
                        estimatedCost: { type: "string" }
                      },
                      required: ["time", "activity", "location", "description", "estimatedCost"]
                    }
                  },
                  hotels: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        location: { type: "string" },
                        rating: { type: "number" },
                        priceRange: { type: "string" },
                        description: { type: "string" }
                      },
                      required: ["name", "location", "rating", "priceRange", "description"]
                    }
                  }
                },
                required: ["day", "date", "activities", "hotels"]
              }
            },
            recommendations: {
              type: "object",
              properties: {
                restaurants: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      cuisine: { type: "string" },
                      priceRange: { type: "string" },
                      description: { type: "string" }
                    },
                    required: ["name", "cuisine", "priceRange", "description"]
                  }
                },
                attractions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      type: { type: "string" },
                      description: { type: "string" },
                      estimatedTime: { type: "string" }
                    },
                    required: ["name", "type", "description", "estimatedTime"]
                  }
                },
                transportation: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      description: { type: "string" },
                      estimatedCost: { type: "string" }
                    },
                    required: ["type", "description", "estimatedCost"]
                  }
                }
              },
              required: ["restaurants", "attractions", "transportation"]
            }
          },
          required: ["overview", "dailyItinerary", "recommendations"]
        }
      },
      contents: userPrompt,
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from Gemini API");
    }

    const itinerary: TripItinerary = JSON.parse(rawJson);
    return itinerary;
    
  } catch (error) {
    console.error("Error generating trip itinerary:", error);
    throw new Error(`Failed to generate trip itinerary: ${error}`);
  }
}
