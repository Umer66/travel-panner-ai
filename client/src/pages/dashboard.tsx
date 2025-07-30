import { useUser, SignOutButton } from "@clerk/clerk-react";
import { Redirect } from "wouter";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import CreateTripForm from "@/components/trip/create-trip-form";
import TripCard from "@/components/trip/trip-card";
import UpgradePrompt from "@/components/subscription/upgrade-prompt";
import SubscriptionPlans from "@/components/subscription/subscription-plans";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Route, Globe, Calendar, Heart } from "lucide-react";
import type { User, Trip, Favorite } from "@shared/schema";

export default function Dashboard() {
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const [activeSection, setActiveSection] = useState("overview");
  const queryClient = useQueryClient();

  // Redirect to home if not signed in
  if (isLoaded && !isSignedIn) {
    return <Redirect to="/" />;
  }

  // Create or get user in our database
  const { data: dbUser, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/user", clerkUser?.id],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/user/${clerkUser?.id}`);
      return res.json();
    },
    enabled: !!clerkUser?.id,
  });

  const createUserMutation = useMutation({
    mutationFn: async (userData: any) => {
      const res = await apiRequest("POST", "/api/user", userData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
  });

  // Create user in database if doesn't exist
  useEffect(() => {
    if (clerkUser && !dbUser && !userLoading && !createUserMutation.isPending) {
      createUserMutation.mutate({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        profileImage: clerkUser.imageUrl || "",
      });
    }
  }, [clerkUser, dbUser, userLoading]);

  // Fetch user trips
  const { data: trips = [], isLoading: tripsLoading } = useQuery<Trip[]>({
    queryKey: ["/api/trips", dbUser?.id],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/trips/${dbUser?.id}`);
      return res.json();
    },
    enabled: !!dbUser?.id,
  });

  // Fetch user favorites
  const { data: favorites = [], isLoading: favoritesLoading } = useQuery<Favorite[]>({
    queryKey: ["/api/favorites", dbUser?.id],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/favorites/${dbUser?.id}`);
      return res.json();
    },
    enabled: !!dbUser?.id,
  });

  if (!isLoaded || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-32 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    );
  }

  const stats = {
    totalTrips: trips.length,
    countries: new Set(trips.map((trip: Trip) => trip.destination.split(',')[0])).size,
    upcomingTrips: trips.filter((trip: Trip) => trip.status === 'upcoming').length,
    favorites: favorites.length,
  };

  const recentTrips = trips.slice(0, 3);

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {clerkUser?.firstName || "Explorer"}!
              </h1>
              <p className="text-gray-600">Ready to plan your next adventure?</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Trips</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalTrips}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Route className="text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Countries Visited</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.countries}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Globe className="text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Upcoming Trips</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.upcomingTrips}</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Calendar className="text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Favorites</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.favorites}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Heart className="text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => setActiveSection("create-trip")}
                    className="flex items-center justify-start space-x-4 h-auto p-4 border-2 border-dashed border-blue-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent text-gray-900"
                    variant="outline"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Plus className="text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Create New Trip</h3>
                      <p className="text-sm text-gray-600">Plan your next adventure with AI</p>
                    </div>
                  </Button>
                  
                  <Button
                    className="flex items-center justify-start space-x-4 h-auto p-4 border-2 border-dashed border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 bg-transparent text-gray-900"
                    variant="outline"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Globe className="text-emerald-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Explore Destinations</h3>
                      <p className="text-sm text-gray-600">Discover new places to visit</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trips */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Trips</h2>
                  <Button
                    onClick={() => setActiveSection("my-trips")}
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View All
                  </Button>
                </div>
                
                {tripsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="w-16 h-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                      </div>
                    ))}
                  </div>
                ) : recentTrips.length > 0 ? (
                  <div className="space-y-4">
                    {recentTrips.map((trip: Trip) => (
                      <TripCard key={trip.id} trip={trip} variant="compact" />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No trips yet. Create your first trip to get started!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case "create-trip":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Trip</h1>
              <p className="text-gray-600">Let AI plan your perfect adventure</p>
            </div>
            <CreateTripForm userId={dbUser?.id} />
          </div>
        );

      case "my-trips":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
              <p className="text-gray-600">All your adventures in one place</p>
            </div>

            {tripsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-48 w-full rounded-t-xl" />
                    <div className="p-6 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-full" />
                      <div className="flex justify-between pt-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : trips.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip: Trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Route className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h3>
                  <p className="text-gray-600 mb-6">Create your first trip to start planning amazing adventures</p>
                  <Button onClick={() => setActiveSection("create-trip")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Trip
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "favorites":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Favorites</h1>
              <p className="text-gray-600">Your saved destinations and experiences</p>
            </div>

            {favoritesLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-48 w-full rounded-t-xl" />
                    <div className="p-6 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : favorites.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((favorite: Favorite) => (
                  <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={favorite.imageUrl || "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"} 
                      alt={favorite.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{favorite.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{favorite.location}</p>
                      <p className="text-gray-500 text-sm mb-4">{favorite.description}</p>
                      <Button variant="ghost" className="text-red-600 hover:text-red-700 p-0">
                        <Heart className="mr-1 h-4 w-4" />
                        Remove from Favorites
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                  <p className="text-gray-600">Start exploring and save your favorite destinations</p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "billing":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Plans</h1>
              <p className="text-gray-600">Manage your subscription and billing</p>
            </div>

            {/* Current Plan Status */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
                    <p className="text-gray-600 capitalize">{dbUser?.subscriptionTier || 'free'} Plan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Trips Used</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dbUser?.tripCount || 0} / {
                        dbUser?.subscriptionTier === 'premium' ? 10 :
                        dbUser?.subscriptionTier === 'premium_plus' ? 15 : 5
                      }
                    </p>
                  </div>
                </div>
                
                {/* Show upgrade prompt if needed */}
                {dbUser && (
                  <UpgradePrompt
                    currentPlan={dbUser.subscriptionTier || 'free'}
                    tripsUsed={dbUser.tripCount || 0}
                    tripLimit={
                      dbUser.subscriptionTier === 'premium' ? 10 :
                      dbUser.subscriptionTier === 'premium_plus' ? 15 : 5
                    }
                    onUpgrade={() => window.location.href = '/subscribe'}
                  />
                )}
              </CardContent>
            </Card>

            {/* Subscription Plans */}
            <SubscriptionPlans
              currentPlan={dbUser?.subscriptionTier || 'free'}
              onUpgrade={(plan) => {
                window.location.href = `/subscribe?plan=${plan}`;
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
