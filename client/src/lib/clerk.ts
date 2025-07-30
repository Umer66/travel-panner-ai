export const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.VITE_CLERK_PUBLISHABLE_KEY || "";

if (!clerkPublishableKey) {
  console.warn("Missing Clerk publishable key. Authentication will not work properly.");
}
