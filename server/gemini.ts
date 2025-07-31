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
    imageUrl?: string; // Added imageUrl field
  }[];
  hotels: {
    name: string;
    location: string;
    rating: number;
    priceRange: string;
    description: string;
    imageUrl?: string; // Added imageUrl field
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
    destinationImageUrl?: string; // Added destination image
  };
  dailyItinerary: DayItinerary[];
  recommendations: {
    restaurants: {
      name: string;
      cuisine: string;
      priceRange: string;
      description: string;
      imageUrl?: string; // Added imageUrl field
    }[];
    attractions: {
      name: string;
      type: string;
      description: string;
      estimatedTime: string;
      imageUrl?: string; // Added imageUrl field
    }[];
    transportation: {
      type: string;
      description: string;
      estimatedCost: string;
    }[];
  };
}

// Function to fetch images from Unsplash API
async function fetchDestinationImage(query: string, fallbackQuery?: string): Promise<string> {
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
  
  // Fallback images for different categories
  const fallbackImages = {
    hotel: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
    restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    attraction: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
    destination: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
    activity: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'
  };

  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash API key not found, using fallback images');
    return fallbackImages.destination;
  }

  try {
    const searchQuery = encodeURIComponent(query.toLowerCase());
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`,
      {
        headers: {
          'Accept-Version': 'v1'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular + '&w=400&h=300&fit=crop';
    }

    // If no results found, try fallback query
    if (fallbackQuery) {
      const fallbackResponse = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(fallbackQuery)}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`,
        {
          headers: {
            'Accept-Version': 'v1'
          }
        }
      );
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        if (fallbackData.results && fallbackData.results.length > 0) {
          return fallbackData.results[0].urls.regular + '&w=400&h=300&fit=crop';
        }
      }
    }

    // Return category-specific fallback
    return fallbackImages.destination;
    
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return fallbackImages.destination;
  }
}

// Helper function to determine image category and create search queries
function getImageSearchQueries(item: any, destination: string, type: 'hotel' | 'activity' | 'restaurant' | 'attraction') {
  const cleanDestination = destination.split(',')[0].trim(); // Get main city/location
  
  switch (type) {
    case 'hotel':
      return {
        primary: `${item.name} hotel ${cleanDestination}`,
        fallback: `luxury hotel ${cleanDestination}`
      };
    case 'activity':
      return {
        primary: `${item.location} ${cleanDestination}`,
        fallback: `${item.activity} ${cleanDestination}`
      };
    case 'restaurant':
      return {
        primary: `${item.name} restaurant ${cleanDestination}`,
        fallback: `${item.cuisine} restaurant ${cleanDestination}`
      };
    case 'attraction':
      return {
        primary: `${item.name} ${cleanDestination}`,
        fallback: `${item.type} ${cleanDestination}`
      };
    default:
      return {
        primary: `${cleanDestination} travel`,
        fallback: 'travel destination'
      };
  }
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

    const baseItinerary: TripItinerary = JSON.parse(rawJson);
    
    // Add images to the itinerary
    console.log('Fetching images for itinerary...');
    
    // Add destination image to overview
    const destinationQuery = request.destination.split(',')[0].trim();
    const destinationImageUrl = await fetchDestinationImage(`${destinationQuery} travel destination`, 'travel destination');
    
    const itineraryWithImages: TripItinerary = {
      ...baseItinerary,
      overview: {
        ...baseItinerary.overview,
        destinationImageUrl
      },
      dailyItinerary: await Promise.all(
        baseItinerary.dailyItinerary.map(async (day) => ({
          ...day,
          hotels: await Promise.all(
            day.hotels.map(async (hotel) => {
              const queries = getImageSearchQueries(hotel, request.destination, 'hotel');
              const imageUrl = await fetchDestinationImage(queries.primary, queries.fallback);
              return { ...hotel, imageUrl };
            })
          ),
          activities: await Promise.all(
            day.activities.map(async (activity) => {
              const queries = getImageSearchQueries(activity, request.destination, 'activity');
              const imageUrl = await fetchDestinationImage(queries.primary, queries.fallback);
              return { ...activity, imageUrl };
            })
          )
        }))
      ),
      recommendations: {
        ...baseItinerary.recommendations,
        restaurants: await Promise.all(
          baseItinerary.recommendations.restaurants.map(async (restaurant) => {
            const queries = getImageSearchQueries(restaurant, request.destination, 'restaurant');
            const imageUrl = await fetchDestinationImage(queries.primary, queries.fallback);
            return { ...restaurant, imageUrl };
          })
        ),
        attractions: await Promise.all(
          baseItinerary.recommendations.attractions.map(async (attraction) => {
            const queries = getImageSearchQueries(attraction, request.destination, 'attraction');
            const imageUrl = await fetchDestinationImage(queries.primary, queries.fallback);
            return { ...attraction, imageUrl };
          })
        )
      }
    };

    console.log('Images successfully added to itinerary');
    return itineraryWithImages;
    
  } catch (error) {
    console.error("Error generating trip itinerary:", error);
    throw new Error(`Failed to generate trip itinerary: ${error}`);
  }
}