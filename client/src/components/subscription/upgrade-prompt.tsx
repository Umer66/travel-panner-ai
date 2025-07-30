import { AlertCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UpgradePromptProps {
  currentPlan: string;
  tripsUsed: number;
  tripLimit: number;
  onUpgrade: () => void;
}

export default function UpgradePrompt({ currentPlan, tripsUsed, tripLimit, onUpgrade }: UpgradePromptProps) {
  const isLimitReached = tripsUsed >= tripLimit;
  const isNearLimit = tripsUsed >= tripLimit * 0.8;
  
  if (!isNearLimit && !isLimitReached) return null;

  return (
    <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          {isLimitReached ? (
            <AlertCircle className="h-5 w-5 text-amber-600" />
          ) : (
            <Crown className="h-5 w-5 text-amber-600" />
          )}
          <CardTitle className="text-amber-800 dark:text-amber-200">
            {isLimitReached ? "Trip Limit Reached" : "Approaching Trip Limit"}
          </CardTitle>
        </div>
        <CardDescription className="text-amber-700 dark:text-amber-300">
          {isLimitReached 
            ? `You've used all ${tripLimit} trips in your ${currentPlan} plan this month.`
            : `You've used ${tripsUsed} of ${tripLimit} trips in your ${currentPlan} plan.`
          }
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Progress
          </span>
          <Badge variant="outline" className="text-amber-700 border-amber-300">
            {tripsUsed}/{tripLimit} trips
          </Badge>
        </div>
        
        <div className="w-full bg-amber-200 rounded-full h-2">
          <div 
            className="bg-amber-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((tripsUsed / tripLimit) * 100, 100)}%` }}
          />
        </div>
        
        <p className="text-sm text-amber-700 dark:text-amber-300 mt-4">
          {isLimitReached 
            ? "Upgrade to continue creating amazing AI-powered trips!"
            : "Upgrade now to get more trips and unlock premium features!"
          }
        </p>
      </CardContent>

      <CardFooter>
        <Button onClick={onUpgrade} className="w-full">
          <Crown className="h-4 w-4 mr-2" />
          Upgrade Plan
        </Button>
      </CardFooter>
    </Card>
  );
}