import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

interface UpgradeButtonProps {
  userId: string;
  plan: "premium" | "premium_plus";
  currentPlan: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function UpgradeButton({ 
  userId, 
  plan, 
  currentPlan, 
  disabled = false,
  className,
  children
}: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!userId) {
      console.error("No user ID provided");
      alert("User not found. Please try logging out and back in.");
      return;
    }

    setLoading(true);
    try {
      console.log("Creating checkout session for:", { userId, plan });
      
      const response = await apiRequest("POST", "/api/create-checkout-session", {
        userId,
        plan
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Checkout session error:", errorText);
        throw new Error(`Failed to create checkout session: ${errorText}`);
      }

      const data = await response.json();
      
      if (data.url) {
        console.log("Redirecting to Stripe:", data.url);
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received from server");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      
      // Fix the TypeScript error by properly typing the error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to start checkout: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const isCurrentPlan = currentPlan === plan;
  const isDowngrade = (currentPlan === "premium_plus" && plan === "premium");

  if (isCurrentPlan) {
    return (
      <Button 
        disabled 
        variant="outline"
        className={className}
      >
        Current Plan
      </Button>
    );
  }

  if (isDowngrade) {
    return (
      <Button 
        disabled 
        variant="outline"
        className={className}
      >
        Contact Support to Downgrade
      </Button>
    );
  }

  return (
    <Button
      onClick={handleUpgrade}
      disabled={loading || disabled}
      className={className}
    >
      {loading ? "Creating checkout..." : (children || "Upgrade")}
    </Button>
  );
}