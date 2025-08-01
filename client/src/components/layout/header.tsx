import { useUser, UserButton } from "@clerk/clerk-react";
import { Compass } from "lucide-react";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Compass className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold text-gray-900">Trip Planner</span>
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              {user?.firstName} {user?.lastName}
            </span>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
