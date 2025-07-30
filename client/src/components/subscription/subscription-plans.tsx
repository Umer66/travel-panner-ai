import { Check, Zap, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  icon: React.ReactNode;
  features: PlanFeature[];
  tripLimit: number;
  popular?: boolean;
  buttonText: string;
  buttonVariant: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out our AI travel planner",
    icon: <Zap className="h-6 w-6" />,
    tripLimit: 5,
    features: [
      { text: "5 AI-generated trips", included: true },
      { text: "Basic trip customization", included: true },
      { text: "Standard destinations", included: true },
      { text: "Email support", included: true },
      { text: "Advanced AI features", included: false },
      { text: "Priority support", included: false },
      { text: "Custom itineraries", included: false }
    ],
    buttonText: "Current Plan",
    buttonVariant: "outline"
  },
  {
    name: "Premium",
    price: "$9.99",
    description: "For regular travelers who want more flexibility",
    icon: <Star className="h-6 w-6" />,
    tripLimit: 10,
    popular: true,
    features: [
      { text: "10 AI-generated trips", included: true },
      { text: "Advanced trip customization", included: true },
      { text: "All destinations worldwide", included: true },
      { text: "Priority email support", included: true },
      { text: "Advanced AI features", included: true },
      { text: "Export to PDF", included: true },
      { text: "Custom itineraries", included: false }
    ],
    buttonText: "Upgrade to Premium",
    buttonVariant: "default"
  },
  {
    name: "Premium Plus",
    price: "$19.99",
    description: "For travel enthusiasts and professionals",
    icon: <Crown className="h-6 w-6" />,
    tripLimit: 15,
    features: [
      { text: "15 AI-generated trips", included: true },
      { text: "Ultimate trip customization", included: true },
      { text: "All destinations worldwide", included: true },
      { text: "24/7 priority support", included: true },
      { text: "Advanced AI features", included: true },
      { text: "Export to PDF", included: true },
      { text: "Custom itineraries", included: true }
    ],
    buttonText: "Upgrade to Premium Plus",
    buttonVariant: "default"
  }
];

interface SubscriptionPlansProps {
  currentPlan?: string;
  onUpgrade: (planName: string) => void;
}

export default function SubscriptionPlans({ currentPlan = "free", onUpgrade }: SubscriptionPlansProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Travel Plan</h2>
        <p className="text-muted-foreground">
          Unlock more destinations and advanced AI features with our premium plans
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan.toLowerCase() === plan.name.toLowerCase();
          const isUpgrade = plan.name.toLowerCase() !== "free";
          
          return (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold">
                  {plan.price}
                  {plan.name !== "Free" && <span className="text-sm font-normal text-muted-foreground">/month</span>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="font-semibold text-primary">
                    {plan.tripLimit} AI-generated trips per month
                  </div>
                  
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check 
                        className={`h-4 w-4 ${feature.included ? 'text-green-500' : 'text-gray-300'}`} 
                      />
                      <span className={feature.included ? '' : 'text-muted-foreground line-through'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={isCurrentPlan ? "outline" : plan.buttonVariant}
                  disabled={isCurrentPlan}
                  onClick={() => isUpgrade && onUpgrade(plan.name.toLowerCase())}
                >
                  {isCurrentPlan ? "Current Plan" : plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}