import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign } from "lucide-react";
import type { Trip } from "@shared/schema";

interface TripCardProps {
  trip: Trip;
  variant?: "default" | "compact";
}

const statusColors = {
  draft: "bg-yellow-100 text-yellow-800",
  upcoming: "bg-blue-100 text-blue-800", 
  completed: "bg-green-100 text-green-800",
};

const getDestinationImage = (destination: string) => {
  // Simple destination to image mapping
  const images: Record<string, string> = {
    "paris": "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    "tokyo": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    "italy": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    "santorini": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    "maldives": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    "japan": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
  };
  
  const key = Object.keys(images).find(k => destination.toLowerCase().includes(k));
  return key ? images[key] : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250";
};

export default function TripCard({ trip, variant = "default" }: TripCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  if (variant === "compact") {
    return (
      <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
        <img 
          src={getDestinationImage(trip.destination)} 
          alt={trip.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{trip.title}</h3>
          <p className="text-sm text-gray-600">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </p>
        </div>
        <Badge className={statusColors[trip.status as keyof typeof statusColors]}>
          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </Badge>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={getDestinationImage(trip.destination)} 
        alt={trip.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{trip.title}</h3>
          <Badge className={statusColors[trip.status as keyof typeof statusColors]}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="mr-2 h-4 w-4" />
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="mr-2 h-4 w-4" />
            {trip.travelers} {trip.travelers === 1 ? "traveler" : "travelers"}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="mr-2 h-4 w-4" />
            {trip.budget.charAt(0).toUpperCase() + trip.budget.slice(1)} budget
          </div>
        </div>

        {trip.interests && trip.interests.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {trip.interests.slice(0, 3).map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {trip.interests.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{trip.interests.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-medium">{trip.destination}</span>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
            {trip.status === "draft" ? "Continue Planning" : "View Details"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
