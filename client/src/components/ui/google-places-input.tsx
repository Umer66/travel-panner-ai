import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

interface GooglePlacesInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

declare global {
  interface Window {
    google: any;
    initGooglePlaces: () => void;
  }
}

export default function GooglePlacesInput({ value, onChange, placeholder }: GooglePlacesInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Load Google Places API
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || ""}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      window.initGooglePlaces = () => {
        setIsLoaded(true);
      };
      
      script.onload = () => {
        window.initGooglePlaces();
      };
      
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && inputRef.current && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['(cities)'],
        componentRestrictions: { country: [] } // Allow all countries
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onChange(place.formatted_address);
        } else if (place.name) {
          onChange(place.name);
        }
      });
    }
  }, [isLoaded, onChange]);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search for a destination..."}
        className="pl-12"
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        {isLoaded ? (
          <MapPin className="h-4 w-4 text-gray-400" />
        ) : (
          <Search className="h-4 w-4 text-gray-400" />
        )}
      </div>
    </div>
  );
}
