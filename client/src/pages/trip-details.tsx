import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Download,
  Edit,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import type { Trip } from "@shared/schema";

// Define extra types for itinerary with images
interface Activity {
  time: string;
  activity: string;
  location: string;
  description: string;
  estimatedCost: string;
  imageUrl?: string; // Added imageUrl
}

interface Hotel {
  name: string;
  location: string;
  rating: number;
  priceRange: string;
  description: string;
  imageUrl?: string; // Added imageUrl
}

interface DailyItinerary {
  day: number;
  date: string;
  hotels: Hotel[];
  activities: Activity[];
}

interface Overview {
  duration: string;
  destination: string;
  weatherInfo: string;
  currencyInfo: string;
  bestTimeToVisit: string;
  totalEstimatedCost: string;
  destinationImageUrl?: string; // Added destination image
}

interface Itinerary {
  overview: Overview;
  dailyItinerary: DailyItinerary[];
  recommendations?: {
    restaurants: Array<{
      name: string;
      cuisine: string;
      priceRange: string;
      description: string;
      imageUrl?: string;
    }>;
    attractions: Array<{
      name: string;
      type: string;
      description: string;
      estimatedTime: string;
      imageUrl?: string;
    }>;
  };
}

// NEW - Use Omit to exclude the original itinerary field
interface FullTrip extends Omit<Trip, 'itinerary'> {
  itinerary?: Itinerary;
}

export default function TripDetails() {
  const { id } = useParams();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    destination: "",
    budget: "",
    travelers: 1,
  });
  const queryClient = useQueryClient();

  const {
    data: trip,
    isLoading,
    error,
  } = useQuery<FullTrip>({
    queryKey: ["/api/trip", id],
    enabled: !!id,
  });

  // Update trip mutation
  const updateTripMutation = useMutation({
    mutationFn: async (updates: any) => {
      const res = await apiRequest("PUT", `/api/trip/${trip?.id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/trip", id] });
      setIsEditDialogOpen(false);
    },
  });

  // Initialize edit form when trip data loads
  useState(() => {
    if (trip) {
      setEditFormData({
        title: trip.title,
        destination: trip.destination,
        budget: trip.budget,
        travelers: trip.travelers,
      });
    }
  });

  // Export to PDF function
  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      // Dynamic import for better bundle size
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const element = document.getElementById('trip-content');
      if (element) {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`${trip?.title || 'trip'}-itinerary.pdf`);
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error exporting PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const formatDateRange = (startDate: Date, endDate: Date) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return `${format(start, "MMMM d")} - ${format(end, "MMMM d, yyyy")}`;
    } catch {
      return "Invalid dates";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Image component with fallback
  const ImageWithFallback = ({ src, alt, className }: { src?: string; alt: string; className?: string }) => {
    const [imageError, setImageError] = useState(false);
    
    if (!src || imageError) {
      return (
        <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
          <ImageIcon className="h-8 w-8 text-gray-400" />
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
          <div className="grid gap-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Trip Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The trip you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/dashboard">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div id="trip-content" className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>

            <div className="flex space-x-2">
              {/* Edit Trip Dialog */}
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  {/* <Button variant="outline" disabled={updateTripMutation.isPending}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Trip
                  </Button> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Trip Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Trip Title</Label>
                      <Input
                        id="title"
                        value={editFormData.title}
                        onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        value={editFormData.destination}
                        onChange={(e) => setEditFormData({ ...editFormData, destination: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="budget">Budget</Label>
                      <Input
                        id="budget"
                        value={editFormData.budget}
                        onChange={(e) => setEditFormData({ ...editFormData, budget: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="travelers">Number of Travelers</Label>
                      <Input
                        id="travelers"
                        type="number"
                        min="1"
                        value={editFormData.travelers}
                        onChange={(e) => setEditFormData({ ...editFormData, travelers: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => updateTripMutation.mutate(editFormData)}
                      disabled={updateTripMutation.isPending}
                    >
                      {updateTripMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={exportToPDF} disabled={isExporting}>
                {isExporting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Export PDF
              </Button>
            </div>
          </div>

          {/* Destination Hero Image */}
          {trip.itinerary?.overview?.destinationImageUrl && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={trip.itinerary.overview.destinationImageUrl}
                alt={`${trip.destination} destination`}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {trip.title}
              </h1>
              <p className="text-gray-600">{trip.destination}</p>
            </div>
            <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
          </div>
        </div>

        {/* Trip Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Trip Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="text-blue-600 h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-600">Dates</p>
                  <p className="font-semibold">
                    {formatDateRange(trip.startDate, trip.endDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="text-green-600 h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-600">Travelers</p>
                  <p className="font-semibold">
                    {trip.travelers} {trip.travelers === 1 ? "person" : "people"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <DollarSign className="text-amber-600 h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-semibold">{trip.budget}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="text-red-600 h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-600">Destination</p>
                  <p className="font-semibold">{trip.destination}</p>
                </div>
              </div>
            </div>

            {trip.interests && trip.interests.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {trip.interests.map((interest: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Generated Itinerary */}
        {trip.itinerary && (
          <Card>
            <CardHeader>
              <CardTitle>AI Generated Itinerary</CardTitle>
              <CardDescription>
                Your personalized travel plan powered by AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Overview */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Overview</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <p><strong>Duration:</strong> {trip.itinerary.overview.duration}</p>
                    <p><strong>Destination:</strong> {trip.itinerary.overview.destination}</p>
                    <p><strong>Weather Info:</strong> {trip.itinerary.overview.weatherInfo}</p>
                    <p><strong>Currency Info:</strong> {trip.itinerary.overview.currencyInfo}</p>
                    <p><strong>Best Time to Visit:</strong> {trip.itinerary.overview.bestTimeToVisit}</p>
                    <p><strong>Total Estimated Cost:</strong> {trip.itinerary.overview.totalEstimatedCost}</p>
                  </div>
                </div>

                {/* Daily Itinerary */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Daily Itinerary</h2>
                  {trip.itinerary.dailyItinerary.map((dayItem: DailyItinerary, index: number) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Day {dayItem.day} - {dayItem.date}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Hotels */}
                        {dayItem.hotels.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3 text-green-700">🏨 Accommodation</h4>
                            <div className="grid gap-4">
                              {dayItem.hotels.map((hotel: Hotel, i: number) => (
                                <div key={i} className="flex gap-4 p-4 bg-green-50 rounded-lg">
                                  <ImageWithFallback
                                    src={hotel.imageUrl}
                                    alt={hotel.name}
                                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                  />
                                  <div className="flex-1">
                                    <h5 className="font-medium text-gray-900">{hotel.name}</h5>
                                    <p className="text-sm text-gray-600 mb-1">📍 {hotel.location}</p>
                                    <p className="text-sm text-gray-600 mb-1">⭐ {hotel.rating} stars | 💰 {hotel.priceRange}</p>
                                    <p className="text-sm text-gray-700">{hotel.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Activities */}
                        {dayItem.activities.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3 text-blue-700">🎯 Activities</h4>
                            <div className="space-y-4">
                              {dayItem.activities.map((activity: Activity, i: number) => (
                                <div key={i} className="flex gap-4 p-4 bg-blue-50 rounded-lg">
                                  <ImageWithFallback
                                    src={activity.imageUrl}
                                    alt={activity.activity}
                                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                        {activity.time}
                                      </span>
                                      <h5 className="font-medium text-gray-900">{activity.activity}</h5>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">📍 {activity.location}</p>
                                    <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                                    <p className="text-sm font-medium text-blue-600">💰 {activity.estimatedCost}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recommendations */}
                {trip.itinerary.recommendations && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold">Recommendations</h2>
                    
                    {/* Restaurants */}
                    {trip.itinerary.recommendations.restaurants && trip.itinerary.recommendations.restaurants.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-orange-700">🍽️ Restaurants</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            {trip.itinerary.recommendations.restaurants.map((restaurant, i) => (
                              <div key={i} className="flex gap-3 p-3 bg-orange-50 rounded-lg">
                                <ImageWithFallback
                                  src={restaurant.imageUrl}
                                  alt={restaurant.name}
                                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">{restaurant.name}</h5>
                                  <p className="text-sm text-gray-600">{restaurant.cuisine} | {restaurant.priceRange}</p>
                                  <p className="text-xs text-gray-700">{restaurant.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Attractions */}
                    {trip.itinerary.recommendations.attractions && trip.itinerary.recommendations.attractions.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-purple-700">🎭 Attractions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            {trip.itinerary.recommendations.attractions.map((attraction, i) => (
                              <div key={i} className="flex gap-3 p-3 bg-purple-50 rounded-lg">
                                <ImageWithFallback
                                  src={attraction.imageUrl}
                                  alt={attraction.name}
                                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">{attraction.name}</h5>
                                  <p className="text-sm text-gray-600">{attraction.type} | ⏱️ {attraction.estimatedTime}</p>
                                  <p className="text-xs text-gray-700">{attraction.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}