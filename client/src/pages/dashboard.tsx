// import { useUser, SignOutButton } from "@clerk/clerk-react";
// import { Redirect } from "wouter";
// import { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { apiRequest } from "@/lib/queryClient";
// import Header from "@/components/layout/header";
// import Sidebar from "@/components/layout/sidebar";
// import CreateTripForm from "@/components/trip/create-trip-form";
// import TripCard from "@/components/trip/trip-card";
// import UpgradePrompt from "@/components/subscription/upgrade-prompt";
// import SubscriptionPlans from "@/components/subscription/subscription-plans";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Plus, Route, Globe, Calendar, Heart, MapPin, MoreHorizontal, Trash2 } from "lucide-react";
// import type { User, Trip, Favorite } from "@shared/schema";
// import UpgradeButton from "@/components/subscription/UpgradeButton";
// import { Eye } from "lucide-react";
// import ManageSubscription from "@/components/subscription/ManageSubscription";

// export default function Dashboard() {
//   const { user: clerkUser, isSignedIn, isLoaded } = useUser();
//   const [activeSection, setActiveSection] = useState("overview");
//   const queryClient = useQueryClient();

//   // Redirect to home if not signed in
//   if (isLoaded && !isSignedIn) {
//     return <Redirect to="/" />;
//   }

//   // Create or get user in our database
//   const { data: dbUser, isLoading: userLoading } = useQuery<User>({
//     queryKey: ["/api/user", clerkUser?.id],
//     queryFn: async () => {
//       const res = await apiRequest("GET", `/api/user/${clerkUser?.id}`);
//       return res.json();
//     },
//     enabled: !!clerkUser?.id,
//   });

//   const createUserMutation = useMutation({
//     mutationFn: async (userData: any) => {
//       const res = await apiRequest("POST", "/api/user", userData);
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["/api/user"] });
//     },
//   });

//   // Create user in database if doesn't exist
//   useEffect(() => {
//     if (clerkUser && !dbUser && !userLoading && !createUserMutation.isPending) {
//       createUserMutation.mutate({
//         clerkId: clerkUser.id,
//         email: clerkUser.emailAddresses[0]?.emailAddress || "",
//         firstName: clerkUser.firstName || "",
//         lastName: clerkUser.lastName || "",
//         profileImage: clerkUser.imageUrl || "",
//       });
//     }
//   }, [clerkUser, dbUser, userLoading]);

//   // Fetch user trips
//   const { data: trips = [], isLoading: tripsLoading } = useQuery<Trip[]>({
//     queryKey: ["/api/trips", dbUser?.id],
//     queryFn: async () => {
//       const res = await apiRequest("GET", `/api/trips/${dbUser?.id}`);
//       return res.json();
//     },
//     enabled: !!dbUser?.id,
//   });

//   // Fetch user favorites
//   const { data: favorites = [], isLoading: favoritesLoading } = useQuery<Favorite[]>({
//     queryKey: ["/api/favorites", dbUser?.id],
//     queryFn: async () => {
//       const res = await apiRequest("GET", `/api/favorites/${dbUser?.id}`);
//       return res.json();
//     },
//     enabled: !!dbUser?.id,
//   });

//   if (!isLoaded || userLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <Skeleton className="h-8 w-32 mx-auto" />
//           <Skeleton className="h-4 w-48 mx-auto" />
//         </div>
//       </div>
//     );
//   }

//   const stats = {
//     totalTrips: trips.length,
//     countries: new Set(trips.map((trip: Trip) => trip.destination.split(',')[0])).size,
//     upcomingTrips: trips.filter((trip: Trip) => trip.status === 'upcoming').length,
//     favorites: favorites.length,
//   };

//   const recentTrips = trips.slice(0, 3);

//   const renderSection = () => {
//     switch (activeSection) {
//       case "overview":
//         return (
//           <div>
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 Welcome back, {clerkUser?.firstName || "Explorer"}!
//               </h1>
//               <p className="text-gray-600">Ready to plan your next adventure?</p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid md:grid-cols-4 gap-6 mb-8">
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600">Total Trips</p>
//                       <p className="text-2xl font-bold text-gray-900">{stats.totalTrips}</p>
//                     </div>
//                     <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <Route className="text-blue-600" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600">Countries Visited</p>
//                       <p className="text-2xl font-bold text-gray-900">{stats.countries}</p>
//                     </div>
//                     <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
//                       <Globe className="text-emerald-600" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600">Upcoming Trips</p>
//                       <p className="text-2xl font-bold text-gray-900">{stats.upcomingTrips}</p>
//                     </div>
//                     <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
//                       <Calendar className="text-amber-600" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600">Favorites</p>
//                       <p className="text-2xl font-bold text-gray-900">{stats.favorites}</p>
//                     </div>
//                     <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
//                       <Heart className="text-red-600" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Quick Actions */}
//             <Card className="mb-8">
//               <CardContent className="p-6">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <Button
//                     onClick={() => setActiveSection("create-trip")}
//                     className="flex items-center justify-start space-x-4 h-auto p-4 border-2 border-dashed border-blue-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent text-gray-900"
//                     variant="outline"
//                   >
//                     <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <Plus className="text-blue-600" />
//                     </div>
//                     <div className="text-left">
//                       <h3 className="font-semibold">Create New Trip</h3>
//                       <p className="text-sm text-gray-600">Plan your next adventure with AI</p>
//                     </div>
//                   </Button>
                  
//                   {/* <Button
//                     className="flex items-center justify-start space-x-4 h-auto p-4 border-2 border-dashed border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 bg-transparent text-gray-900"
//                     variant="outline"
//                   >
//                     <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
//                       <Globe className="text-emerald-600" />
//                     </div>
//                     <div className="text-left">
//                       <h3 className="font-semibold">Explore Destinations</h3>
//                       <p className="text-sm text-gray-600">Discover new places to visit</p>
//                     </div>
//                   </Button> */}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Recent Trips */}
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-semibold text-gray-900">Recent Trips</h2>
//                   <Button
//                     onClick={() => setActiveSection("my-trips")}
//                     variant="ghost"
//                     className="text-blue-600 hover:text-blue-700"
//                   >
//                     View All
//                   </Button>
//                 </div>
                
//                 {tripsLoading ? (
//                   <div className="space-y-4">
//                     {[1, 2, 3].map((i) => (
//                       <div key={i} className="flex items-center space-x-4">
//                         <Skeleton className="w-16 h-16 rounded-lg" />
//                         <div className="flex-1 space-y-2">
//                           <Skeleton className="h-4 w-48" />
//                           <Skeleton className="h-3 w-32" />
//                         </div>
//                         <Skeleton className="h-6 w-20" />
//                       </div>
//                     ))}
//                   </div>
//                 ) : recentTrips.length > 0 ? (
//                   <div className="space-y-4">
//                     {recentTrips.map((trip: Trip) => (
//                       <TripCard 
//                         key={trip.id} 
//                         trip={trip} 
//                         variant="compact" 
//                         userId={dbUser?.id}
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <p>No trips yet. Create your first trip to get started!</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         );

//       case "create-trip":
//         return (
//           <div>
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Trip</h1>
//               <p className="text-gray-600">Let AI plan your perfect adventure</p>
//             </div>
//             <CreateTripForm userId={dbUser?.id} />
//           </div>
//         );

//       case "my-trips":
//         return (
//           <div>
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
//               <p className="text-gray-600">All your adventures in one place</p>
//             </div>

//             {tripsLoading ? (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[1, 2, 3, 4, 5, 6].map((i) => (
//                   <div key={i}>
//                     <Skeleton className="h-48 w-full rounded-t-xl" />
//                     <div className="p-6 space-y-2">
//                       <Skeleton className="h-4 w-32" />
//                       <Skeleton className="h-3 w-24" />
//                       <Skeleton className="h-3 w-full" />
//                       <div className="flex justify-between pt-2">
//                         <Skeleton className="h-4 w-16" />
//                         <Skeleton className="h-4 w-20" />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : trips.length > 0 ? (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {trips.map((trip: Trip) => (
//                   <TripCard 
//                     key={trip.id} 
//                     trip={trip} 
//                     userId={dbUser?.id}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <Card>
//                 <CardContent className="p-12 text-center">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Route className="text-gray-400 text-2xl" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h3>
//                   <p className="text-gray-600 mb-6">Create your first trip to start planning amazing adventures</p>
//                   <Button onClick={() => setActiveSection("create-trip")}>
//                     <Plus className="mr-2 h-4 w-4" />
//                     Create Your First Trip
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         );

//       case "favorites":
//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Favorite Trips</h1>
//         <p className="text-gray-600">Your most loved adventures</p>
//       </div>

//       {favoritesLoading ? (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[1, 2, 3, 4, 5, 6].map((i) => (
//             <div key={i}>
//               <Skeleton className="h-48 w-full rounded-t-xl" />
//               <div className="p-6 space-y-2">
//                 <Skeleton className="h-4 w-32" />
//                 <Skeleton className="h-3 w-24" />
//                 <Skeleton className="h-3 w-full" />
//                 <div className="flex justify-between pt-2">
//                   <Skeleton className="h-4 w-16" />
//                   <Skeleton className="h-4 w-20" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : favorites.length > 0 ? (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {favorites.map((favorite: Favorite) => (
//             <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
//               <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
//                 {favorite.imageUrl ? (
//                   <img src={favorite.imageUrl} alt={favorite.title} className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
//                     <div className="text-center text-white">
//                       <MapPin className="mx-auto mb-2 h-8 w-8" />
//                       <h3 className="text-xl font-bold">{favorite.location}</h3>
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               <CardContent className="p-6">
//                 <div className="space-y-4">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-1">{favorite.title}</h3>
//                     <p className="text-sm text-gray-600">{favorite.location}</p>
//                   </div>
                  
//                   {favorite.description && (
//                     <p className="text-sm text-gray-600 line-clamp-2">{favorite.description}</p>
//                   )}
                  
//                   {/* Updated button section to match My Trips layout */}
//                   <div className="flex justify-between items-center pt-4">
// <Button 
//   className="flex-1 mr-2"
//   onClick={() => {
//     if (favorite.tripId) {
//       // Navigate directly using the tripId
//       window.location.href = `/trip/${favorite.tripId}`;
//     } else {
//       // Fallback to the old method for existing favorites without tripId
//       const matchingTrip = trips.find(trip => 
//         trip.title === favorite.title && trip.destination === favorite.location
//       );
      
//       if (matchingTrip) {
//         window.location.href = `/trip/${matchingTrip.id}`;
//       } else {
//         alert("Trip details not found. The trip may have been deleted from your trips.");
//       }
//     }
//   }}
// >
//   <Eye className="mr-2 h-4 w-4" />
//   View Details
// </Button>
                    
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="sm">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem 
//                           className="text-red-600"
//                           onClick={async () => {
//                             if (confirm("Are you sure you want to remove this from favorites?")) {
//                               try {
//                                 console.log('Removing favorite:', favorite.id);
//                                 const res = await apiRequest("DELETE", `/api/favorite/${favorite.id}`);
                                
//                                 if (res.ok) {
//                                   // Refresh the favorites list
//                                   queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
//                                   console.log('✅ Successfully removed from favorites');
//                                 } else {
//                                   throw new Error('Failed to remove favorite');
//                                 }
//                               } catch (error) {
//                                 console.error("❌ Error removing favorite:", error);
//                                 alert("Failed to remove from favorites. Please try again.");
//                               }
//                             }
//                           }}
//                         >
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Remove from Favorites
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <Card>
//           <CardContent className="p-12 text-center">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Heart className="text-red-400 text-2xl" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorite trips yet</h3>
//             <p className="text-gray-600 mb-6">Add trips to your favorites by clicking the heart icon in the 3-dots menu</p>
//             <Button onClick={() => setActiveSection("my-trips")}>
//               <Route className="mr-2 h-4 w-4" />
//               Browse My Trips
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );

//      case "billing":
//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Plans</h1>
//         <p className="text-gray-600">Manage your subscription and billing</p>
//       </div>

//       {dbUser && (
//         <div className="space-y-8">
//           <Card>
//             <CardContent className="p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Plan</h2>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-lg font-medium text-gray-900 capitalize">
//                     {dbUser.subscriptionTier.replace('_', ' ')} Plan
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {dbUser.tripCount} of {
//                       dbUser.subscriptionTier === 'free' ? 5 :
//                       dbUser.subscriptionTier === 'premium' ? 50 : 100
//                     } trips used
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   {/* Show upgrade button only for free users */}
//                   {dbUser.subscriptionTier === 'free' && (
//                     <UpgradeButton
//                       userId={dbUser.id}
//                       plan="premium"
//                       currentPlan={dbUser.subscriptionTier}
//                       className="bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                       Upgrade Plan
//                     </UpgradeButton>
//                   )}
                  
//                   {/* Show manage subscription for premium users */}
//                   {dbUser.subscriptionTier !== 'free' && dbUser.stripeCustomerId && (
//                     <ManageSubscription customerId={dbUser.stripeCustomerId} />
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Show upgrade options only for free users */}
//           {dbUser.subscriptionTier === 'free' && (
//             <>
//               <UpgradePrompt 
//                 currentPlan={dbUser.subscriptionTier}
//                 tripsUsed={dbUser.tripCount}
//                 tripLimit={5}
//                 userId={dbUser.id}
//               />                    

//               <SubscriptionPlans 
//                 currentPlan={dbUser.subscriptionTier}
//                 userId={dbUser.id}
//                 onUpgrade={() => {}}
//               />                 
//             </>
//           )}

//           {/* Show current plan benefits for premium users */}
//           {dbUser.subscriptionTier !== 'free' && (
//             <Card>
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Plan Benefits</h3>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>✅ {dbUser.subscriptionTier === 'premium' ? '50' : '100'} AI-generated trips per month</li>
//                   <li>✅ Advanced itinerary customization</li>
//                   <li>✅ Priority customer support</li>
//                   {dbUser.subscriptionTier === 'premium_plus' && (
//                     <>
//                       <li>✅ Unlimited trip modifications</li>
//                       <li>✅ Export to PDF and other formats</li>
//                     </>
//                   )}
//                 </ul>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       )}
//     </div>
//   );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//     <Header />
// {/* <div className="bg-white border-b px-8 py-4">
//   <div className="flex items-center justify-end space-x-4">
//     <span className="text-sm text-gray-600">
//       {clerkUser?.firstName} {clerkUser?.lastName}
//     </span>
//     <SignOutButton>
//       <Button variant="outline" size="sm">
//         Sign Out
//       </Button>
//     </SignOutButton>
//   </div>
// </div> */}

//       <div className="flex">
//         <Sidebar 
//           activeSection={activeSection} 
//           onSectionChange={setActiveSection} 
//         />
        
//         <main className="flex-1 p-8">
//           {renderSection()}
//         </main>
//       </div>
//     </div>
//   );
// }

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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Route, Globe, Calendar, Heart, MapPin, MoreHorizontal, Trash2 } from "lucide-react";
import type { User, Trip, Favorite } from "@shared/schema";
import UpgradeButton from "@/components/subscription/UpgradeButton";
import { Eye } from "lucide-react";
import ManageSubscription from "@/components/subscription/ManageSubscription";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const [activeSection, setActiveSection] = useState("overview");
  const [showRemoveFavoriteDialog, setShowRemoveFavoriteDialog] = useState(false);
  const [favoriteToRemove, setFavoriteToRemove] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
      toast({
        title: "Welcome!",
        description: "Your account has been set up successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to set up your account. Please try refreshing the page.",
        variant: "destructive",
      });
    },
  });

  // Remove from favorites mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: async (favoriteId: string) => {
      const res = await apiRequest("DELETE", `/api/favorite/${favoriteId}`);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Removed from Favorites",
        description: "The trip has been removed from your favorites.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove from favorites. Please try again.",
        variant: "destructive",
      });
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

  const handleRemoveFavorite = (favoriteId: string) => {
    setFavoriteToRemove(favoriteId);
    setShowRemoveFavoriteDialog(true);
  };

  const confirmRemoveFavorite = async () => {
    if (favoriteToRemove) {
      try {
        await removeFavoriteMutation.mutateAsync(favoriteToRemove);
      } catch (error) {
        console.error("❌ Error removing favorite:", error);
      }
    }
    setShowRemoveFavoriteDialog(false);
    setFavoriteToRemove(null);
  };

  const handleViewTripDetails = (favorite: Favorite) => {
    if (favorite.tripId) {
      // Navigate directly using the tripId
      window.location.href = `/trip/${favorite.tripId}`;
    } else {
      // Fallback to the old method for existing favorites without tripId
      const matchingTrip = trips.find(trip => 
        trip.title === favorite.title && trip.destination === favorite.location
      );
      
      if (matchingTrip) {
        window.location.href = `/trip/${matchingTrip.id}`;
      } else {
        toast({
          title: "Trip Not Found",
          description: "Trip details not found. The trip may have been deleted from your trips.",
          variant: "destructive",
        });
      }
    }
  };

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
                      <TripCard 
                        key={trip.id} 
                        trip={trip} 
                        variant="compact" 
                        userId={dbUser?.id}
                      />
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
                  <TripCard 
                    key={trip.id} 
                    trip={trip} 
                    userId={dbUser?.id}
                  />
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Favorite Trips</h1>
              <p className="text-gray-600">Your most loved adventures</p>
            </div>

            {favoritesLoading ? (
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
            ) : favorites.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((favorite: Favorite) => (
                  <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                      {favorite.imageUrl ? (
                        <img src={favorite.imageUrl} alt={favorite.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <div className="text-center text-white">
                            <MapPin className="mx-auto mb-2 h-8 w-8" />
                            <h3 className="text-xl font-bold">{favorite.location}</h3>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{favorite.title}</h3>
                          <p className="text-sm text-gray-600">{favorite.location}</p>
                        </div>
                        
                        {favorite.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{favorite.description}</p>
                        )}
                        
                        <div className="flex justify-between items-center pt-4">
                          <Button 
                            className="flex-1 mr-2"
                            onClick={() => handleViewTripDetails(favorite)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleRemoveFavorite(favorite.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove from Favorites
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-red-400 text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorite trips yet</h3>
                  <p className="text-gray-600 mb-6">Add trips to your favorites by clicking the heart icon in the 3-dots menu</p>
                  <Button onClick={() => setActiveSection("my-trips")}>
                    <Route className="mr-2 h-4 w-4" />
                    Browse My Trips
                  </Button>
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

            {dbUser && (
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Plan</h2>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-medium text-gray-900 capitalize">
                          {dbUser.subscriptionTier?.replace('_', ' ') || 'Free'} Plan
                        </p>
                        <p className="text-sm text-gray-600">
                          {dbUser.tripCount || 0} of {
                            dbUser.subscriptionTier === 'free' ? 5 :
                            dbUser.subscriptionTier === 'premium' ? 50 : 100
                          } trips used
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {/* Show upgrade button only for free users */}
                        {(!dbUser.subscriptionTier || dbUser.subscriptionTier === 'free') && (
                          <UpgradeButton
                            userId={dbUser.id}
                            plan="premium"
                            currentPlan={dbUser.subscriptionTier || 'free'}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Upgrade Plan
                          </UpgradeButton>
                        )}
                        
                        {/* Show manage subscription for premium users */}
                        {dbUser.subscriptionTier !== 'free' && dbUser.stripeCustomerId && (
                          <ManageSubscription customerId={dbUser.stripeCustomerId} />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Show upgrade options only for free users */}
                {(!dbUser.subscriptionTier || dbUser.subscriptionTier === 'free') && (
                  <>
                    <UpgradePrompt 
                      currentPlan={dbUser.subscriptionTier || 'free'}
                      tripsUsed={dbUser.tripCount || 0}
                      tripLimit={5}
                      userId={dbUser.id}
                    />                    

                    <SubscriptionPlans 
                      currentPlan={dbUser.subscriptionTier || 'free'}
                      userId={dbUser.id}
                      onUpgrade={() => {}}
                    />                 
                  </>
                )}

                {/* Show current plan benefits for premium users */}
                {dbUser.subscriptionTier && dbUser.subscriptionTier !== 'free' && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Plan Benefits</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✅ {dbUser.subscriptionTier === 'premium' ? '50' : '100'} AI-generated trips per month</li>
                        <li>✅ Advanced itinerary customization</li>
                        <li>✅ Priority customer support</li>
                        {dbUser.subscriptionTier === 'premium_plus' && (
                          <>
                            <li>✅ Unlimited trip modifications</li>
                            <li>✅ Export to PDF and other formats</li>
                          </>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
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
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <main className="flex-1 p-8">
          {renderSection()}
        </main>
      </div>

      {/* Remove Favorite Confirmation Dialog */}
      <AlertDialog open={showRemoveFavoriteDialog} onOpenChange={setShowRemoveFavoriteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from Favorites</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this trip from your favorites? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveFavorite}
              className="bg-red-600 hover:bg-red-700"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}