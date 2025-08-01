import { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Compass, X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "sign-in" | "sign-up";
}

export default function AuthModal({ isOpen, onClose, mode = "sign-in" }: AuthModalProps) {
  const [currentMode, setCurrentMode] = useState<"sign-in" | "sign-up">(mode);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Compass className="text-white text-sm" />
              </div>
              <DialogTitle className="text-xl font-bold">Trip Planner</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="py-4">
          {currentMode === "sign-in" ? (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to continue your journey</p>
              </div>
              
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-0 p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "w-full justify-center border border-gray-300 hover:bg-gray-50",
                    formButtonPrimary: "w-full bg-blue-500 hover:bg-blue-600",
                    footerAction: "hidden"
                  }
                }}
                redirectUrl="/dashboard"
              />
              
              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600 hover:text-blue-700"
                  onClick={() => setCurrentMode("sign-up")}
                >
                  Sign up
                </Button>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Trip Planner</h2>
                <p className="text-gray-600">Start planning your dream trips today</p>
              </div>
              
              <SignUp 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-0 p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "w-full justify-center border border-gray-300 hover:bg-gray-50",
                    formButtonPrimary: "w-full bg-blue-500 hover:bg-blue-600",
                    footerAction: "hidden"
                  }
                }}
                redirectUrl="/dashboard"
              />
              
              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600 hover:text-blue-700"
                  onClick={() => setCurrentMode("sign-in")}
                >
                  Sign in
                </Button>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
