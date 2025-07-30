import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Download, Edit } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import type { Trip } from "@shared/schema";

export default function TripDetails() {
  const { id } = useParams();
  
  const { data: trip, isLoading, error } = useQuery<Trip>({
    queryKey: ["/api/trip", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Skeleton className="h-10 w-32 mb-4" />
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Not Found</h2>
              <p className="text-gray-600 mb-6">The trip you're looking for doesn't exist or has been removed.</p>
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

  const formatDateRange = (startDate: Date, endDate: Date) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return `${format(start, "MMMM d")} - ${format(end, "MMMM d, yyyy")}`;
    } catch (error) {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
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
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Trip
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.title}</h1>
              <p className="text-gray-600">{trip.destination}</p>
            </div>
            <Badge className={getStatusColor(trip.status)}>
              {trip.status}
            </Badge>
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
                  <p className="font-semibold">{formatDateRange(trip.startDate, trip.endDate)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="text-green-600 h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-600">Travelers</p>
                  <p className="font-semibold">{trip.travelers} {trip.travelers === 1 ? "person" : "people"}</p>
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
                  {trip.interests.map((interest, index) => (
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
              <div className="prose max-w-none">
                {typeof trip.itinerary === 'string' ? (
                  <div className="whitespace-pre-wrap">{trip.itinerary}</div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(trip.itinerary).map(([key, value]) => (
                      <div key={key}>
                        <h3 className="text-lg font-semibold capitalize mb-2">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <div className="text-gray-700">
                          {typeof value === 'string' ? (
                            <p>{value}</p>
                          ) : Array.isArray(value) ? (
                            <ul className="list-disc list-inside space-y-1">
                              {value.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    ))}
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