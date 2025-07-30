import { cn } from "@/lib/utils";
import { BarChart3, Plus, Briefcase, Heart, Crown } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigation = [
  { id: "overview", name: "Overview", icon: BarChart3 },
  { id: "create-trip", name: "Create Trip", icon: Plus },
  { id: "my-trips", name: "My Trips", icon: Briefcase },
  { id: "favorites", name: "Favorites", icon: Heart },
  { id: "billing", name: "Billing & Plans", icon: Crown },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-sm">
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                    activeSection === item.id
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
