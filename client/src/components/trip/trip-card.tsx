import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, DollarSign, MoreHorizontal, Eye } from "lucide-react";
import { format } from "date-fns";
import type { Trip } from "@shared/schema";
import { Link } from "wouter";

interface TripCardProps {
  trip: Trip;
  variant?: "default" | "compact";
}

export default function TripCard({ trip, variant = "default" }: TripCardProps) {
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

  const formatDateRange = (startDate: Date, endDate: Date) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
    } catch (error) {
      return "Invalid dates";
    }
  };

  if (variant === "compact") {
    return (
      <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <MapPin className="text-white text-2xl" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{trip.title}</h3>
          <p className="text-sm text-gray-600">{trip.destination}</p>
          <p className="text-xs text-gray-500">{formatDateRange(trip.startDate, trip.endDate)}</p>
        </div>
        <Badge className={getStatusColor(trip.status)}>
          {trip.status}
        </Badge>
        <Link href={`/trip/${trip.id}`}>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-center text-white">
            <MapPin className="mx-auto mb-2 h-8 w-8" />
            <h3 className="text-xl font-bold">{trip.destination}</h3>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(trip.status)}>
            {trip.status}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{trip.title}</h3>
            <p className="text-sm text-gray-600">{trip.destination}</p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="mr-2 h-4 w-4" />
              {formatDateRange(trip.startDate, trip.endDate)}
            </div>
            
            <div className="flex items-center text-gray-600">
              <Users className="mr-2 h-4 w-4" />
              {trip.travelers} {trip.travelers === 1 ? "traveler" : "travelers"}
            </div>
            
            <div className="flex items-center text-gray-600">
              <DollarSign className="mr-2 h-4 w-4" />
              {trip.budget} budget
            </div>
          </div>
          
          {trip.interests && trip.interests.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {trip.interests.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {trip.interests.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{trip.interests.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center pt-4">
            <Link href={`/trip/${trip.id}`}>
              <Button className="flex-1 mr-2">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}