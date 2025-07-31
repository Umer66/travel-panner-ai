import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTripSchema, insertFavoriteSchema } from "@shared/schema";
import { generateTripItinerary } from "./gemini";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/user/:clerkId", async (req, res) => {
    try {
      const { clerkId } = req.params;
      const user = await storage.getUserByClerkId(clerkId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/user", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByClerkId(userData.clerkId);
      if (existingUser) {
        return res.json(existingUser);
      }
      
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Trip routes
  app.get("/api/trips/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const userTrips = await storage.getUserTrips(userId);
      res.json(userTrips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/trip/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const trip = await storage.getTrip(id);
      
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      res.json(trip);
    } catch (error) {
      console.error("Error fetching trip:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/trip/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const trip = await storage.getTrip(id);
      
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      res.json(trip);
    } catch (error) {
      console.error("Error fetching trip:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // app.post("/api/trips", async (req, res) => {
  //   try {
  //     // Parse dates from strings if needed
  //     const bodyWithDates = {
  //       ...req.body,
  //       startDate: typeof req.body.startDate === 'string' ? new Date(req.body.startDate) : req.body.startDate,
  //       endDate: typeof req.body.endDate === 'string' ? new Date(req.body.endDate) : req.body.endDate,
  //     };
      
  //     const tripData = insertTripSchema.parse(bodyWithDates);
      
  //     // Check trip limits based on user's subscription
  //     const user = await storage.getUser(tripData.userId);
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }
      
  //     const tripLimits = { free: 5, premium: 10, premium_plus: 15 };
  //     const userLimit = tripLimits[user.subscriptionTier as keyof typeof tripLimits] || 5;
      
  //     if (user.tripCount >= userLimit) {
  //       return res.status(429).json({ 
  //         message: "Trip limit reached",
  //         currentPlan: user.subscriptionTier,
  //         tripLimit: userLimit,
  //         tripsUsed: user.tripCount
  //       });
  //     }
      
  //     // Generate AI itinerary
  //     const itinerary = await generateTripItinerary({
  //       destination: tripData.destination,
  //       startDate: tripData.startDate,
  //       endDate: tripData.endDate,
  //       budget: tripData.budget,
  //       travelers: tripData.travelers || 1,
  //       interests: Array.isArray(tripData.interests) ? tripData.interests : [],
  //     });
      
  //     const trip = await storage.createTrip({
  //       ...tripData,
  //       itinerary: itinerary as any,
  //       status: 'draft',
  //     });
      
  //     // Increment user's trip count
  //     await storage.incrementTripCount(user.id);
      
  //     res.status(201).json(trip);
  //   } catch (error) {
  //     console.error("Error creating trip:", error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // });

  app.post("/api/trips", async (req, res) => {
  try {
    // Parse dates from strings if needed
    const bodyWithDates = {
      ...req.body,
      startDate: typeof req.body.startDate === 'string' ? new Date(req.body.startDate) : req.body.startDate,
      endDate: typeof req.body.endDate === 'string' ? new Date(req.body.endDate) : req.body.endDate,
    };
    
    const tripData = insertTripSchema.parse(bodyWithDates);
    
    // Check trip limits based on user's subscription
    const user = await storage.getUser(tripData.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const tripLimits = { free: 5, premium: 10, premium_plus: 15 };
    const userLimit = tripLimits[user.subscriptionTier as keyof typeof tripLimits] || 5;
    
    if (user.tripCount >= userLimit) {
      return res.status(429).json({ 
        message: "Trip limit reached",
        currentPlan: user.subscriptionTier,
        tripLimit: userLimit,
        tripsUsed: user.tripCount
      });
    }
    
    // Generate AI itinerary
    const itinerary = await generateTripItinerary({
      destination: tripData.destination,
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      budget: tripData.budget,
      travelers: tripData.travelers || 1,
      interests: Array.isArray(tripData.interests) ? tripData.interests : [],
    });
    
    // 🎯 SMART STATUS LOGIC - Instead of hardcoded 'draft'
    const now = new Date();
    const startDate = new Date(tripData.startDate);
    const endDate = new Date(tripData.endDate);
    
    let status: string;
    if (endDate < now) {
      status = 'completed';
    } else if (startDate <= now && endDate >= now) {
      status = 'ongoing'; // Currently happening
    } else if (startDate > now) {
      status = 'upcoming';
    } else {
      status = 'draft'; // Fallback
    }
    
    const trip = await storage.createTrip({
      ...tripData,
      itinerary: itinerary as any,
      status, // ← Now uses smart status instead of hardcoded 'draft'
    });
    
    // Increment user's trip count
    await storage.incrementTripCount(user.id);
    
    res.status(201).json(trip);
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

  app.put("/api/trip/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const trip = await storage.updateTrip(id, updates);
      
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      res.json(trip);
    } catch (error) {
      console.error("Error updating trip:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/trip/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTrip(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting trip:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Favorites routes
  app.get("/api/favorites/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const userFavorites = await storage.getUserFavorites(userId);
      res.json(userFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const favoriteData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.createFavorite(favoriteData);
      res.status(201).json(favorite);
    } catch (error) {
      console.error("Error creating favorite:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/favorite/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteFavorite(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Favorite not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting favorite:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Subscription routes
  app.post("/api/create-subscription", async (req, res) => {
    try {
      const { plan } = req.body;
      const planPrices = {
        premium: 999, // $9.99 in cents
        premium_plus: 1999 // $19.99 in cents
      };
      
      const amount = planPrices[plan as keyof typeof planPrices];
      if (!amount) {
        return res.status(400).json({ message: "Invalid plan" });
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        metadata: { plan }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Error creating subscription: " + error.message });
    }
  });

  app.post("/api/upgrade-subscription", async (req, res) => {
    try {
      const { userId, plan } = req.body;
      
      const user = await storage.updateUserSubscription(userId, plan);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error: any) {
      console.error("Error upgrading subscription:", error);
      res.status(500).json({ message: "Error upgrading subscription: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
