import { type User, type InsertUser, type Trip, type InsertTrip, type Favorite, type InsertFavorite } from "@shared/schema";
import { db } from "./db";
import { users, trips, favorites } from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByClerkId(clerkId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  incrementTripCount(userId: string): Promise<User | undefined>;
  updateUserSubscription(userId: string, subscriptionTier: string, stripeCustomerId?: string, stripeSubscriptionId?: string): Promise<User | undefined>;

  // Trip methods
  getUserTrips(userId: string): Promise<Trip[]>;
  getTrip(id: string): Promise<Trip | undefined>;
  createTrip(trip: InsertTrip): Promise<Trip>;
  updateTrip(id: string, updates: Partial<InsertTrip>): Promise<Trip | undefined>;
  deleteTrip(id: string): Promise<boolean>;

  // Favorite methods
  getUserFavorites(userId: string): Promise<Favorite[]>;
  createFavorite(favorite: InsertFavorite): Promise<Favorite>;
  deleteFavorite(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByClerkId(clerkId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async incrementTripCount(userId: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ 
        tripCount: sql`${users.tripCount} + 1`,
        updatedAt: new Date() 
      })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async updateUserSubscription(
    userId: string, 
    subscriptionTier: string,
    stripeCustomerId?: string,
    stripeSubscriptionId?: string
  ): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ 
        subscriptionTier,
        stripeCustomerId,
        stripeSubscriptionId,
        updatedAt: new Date() 
      })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async getUserTrips(userId: string): Promise<Trip[]> {
    return await db
      .select()
      .from(trips)
      .where(eq(trips.userId, userId))
      .orderBy(desc(trips.createdAt));
  }

  async getTrip(id: string): Promise<Trip | undefined> {
    const [trip] = await db.select().from(trips).where(eq(trips.id, id));
    return trip || undefined;
  }

  async createTrip(insertTrip: InsertTrip): Promise<Trip> {
    const [trip] = await db
      .insert(trips)
      .values(insertTrip)
      .returning();
    return trip;
  }

  async updateTrip(id: string, updates: Partial<InsertTrip>): Promise<Trip | undefined> {
    const [trip] = await db
      .update(trips)
      .set(updates)
      .where(eq(trips.id, id))
      .returning();
    return trip || undefined;
  }

  async deleteTrip(id: string): Promise<boolean> {
    const result = await db.delete(trips).where(eq(trips.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return await db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, userId))
      .orderBy(desc(favorites.createdAt));
  }

  async createFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const [favorite] = await db
      .insert(favorites)
      .values(insertFavorite)
      .returning();
    return favorite;
  }

  async deleteFavorite(id: string): Promise<boolean> {
    const result = await db.delete(favorites).where(eq(favorites.id, id));
    return (result.rowCount || 0) > 0;
  }

  async updateUserTripCount(userId: string, tripCount: number): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ 
        tripCount,
        updatedAt: new Date() 
      })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  async updateUserSubscription(userId: string, plan: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ 
        subscriptionTier: plan,
        updatedAt: new Date() 
      })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }
}

export const storage = new DatabaseStorage();
