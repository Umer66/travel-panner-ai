import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertTripSchema } from "@shared/schema";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import GooglePlacesInput from "@/components/ui/google-places-input";
import { Minus, Plus, Sparkles } from "lucide-react";

const formSchema = insertTripSchema.extend({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

type FormData = z.infer<typeof formSchema>;

interface CreateTripFormProps {
  userId?: string;
}

const interests = [
  "Adventure",
  "Culture", 
  "Food",
  "Relaxation",
  "Nightlife",
  "Nature",
  "History",
  "Art",
  "Shopping",
  "Photography"
];

export default function CreateTripForm({ userId }: CreateTripFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userId || "",
      title: "",
      destination: "",
      startDate: "",
      endDate: "",
      budget: "",
      travelers: 1,
      interests: [],
    },
  });

  const createTripMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const tripData = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        title: `${data.destination} Adventure`,
      };
      
      const res = await apiRequest("POST", "/api/trips", tripData);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Trip Created!",
        description: "Your AI-powered itinerary has been generated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/trips"] });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create trip. Please try again.",
        variant: "destructive",
      });
      console.error("Error creating trip:", error);
    },
    onSettled: () => {
      setIsGenerating(false);
    },
  });

  const onSubmit = (data: FormData) => {
    setIsGenerating(true);
    createTripMutation.mutate(data);
  };

  const updateTravelers = (increment: boolean) => {
    const currentTravelers = form.getValues("travelers") || 1;
    const newCount = increment 
      ? Math.min(currentTravelers + 1, 20)
      : Math.max(currentTravelers - 1, 1);
    form.setValue("travelers", newCount);
  };

  return (
    <Card>
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Destination */}
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Where do you want to go?</FormLabel>
                  <FormControl>
                    <GooglePlacesInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Search for a destination..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trip Duration */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Budget */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="budget">Budget ($0 - $1,000)</SelectItem>
                      <SelectItem value="mid-range">Mid-range ($1,000 - $3,000)</SelectItem>
                      <SelectItem value="luxury">Luxury ($3,000+)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Travelers */}
            <FormField
              control={form.control}
              name="travelers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Travelers</FormLabel>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => updateTravelers(false)}
                      disabled={(field.value || 1) <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold text-gray-900 min-w-8 text-center">
                      {field.value}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => updateTravelers(true)}
                      disabled={(field.value || 1) >= 20}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Interests */}
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are you interested in?</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={field.value?.includes(interest)}
                          onCheckedChange={(checked) => {
                            const updatedInterests = checked
                              ? [...(field.value || []), interest]
                              : (field.value || []).filter((i) => i !== interest);
                            field.onChange(updatedInterests);
                          }}
                        />
                        <Label
                          htmlFor={interest}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
              disabled={isGenerating}
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Your Trip...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate My Trip with AI
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
