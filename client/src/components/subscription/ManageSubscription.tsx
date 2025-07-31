import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Settings } from "lucide-react";

interface ManageSubscriptionProps {
  customerId: string;
}

export default function ManageSubscription({ customerId }: ManageSubscriptionProps) {
  const [loading, setLoading] = useState(false);

  const handleManageSubscription = async () => {
    if (!customerId) {
      alert("No customer ID found. Please contact support.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "Failed to create portal session");
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert("Failed to open billing portal: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleManageSubscription}
      disabled={loading}
      variant="outline"
      className="flex items-center gap-2"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Settings className="h-4 w-4" />
      )}
      {loading ? "Opening..." : "Manage Subscription"}
    </Button>
  );
}