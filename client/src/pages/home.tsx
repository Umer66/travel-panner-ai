// import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
// import { Redirect } from "wouter";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { 
//   Compass, 
//   Brain, 
//   MapPin, 
//   Save, 
//   ArrowRight, 
//   Menu, 
//   X, 
//   Star, 
//   Check,
//   ChevronDown,
//   ChevronUp,
//   Users,
//   Globe,
//   Clock
// } from "lucide-react";
// import { useState, useEffect } from "react";

// export default function Home() {
//   const { isSignedIn } = useUser();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       location: "New York, USA",
//       rating: 5,
//       text: "Trip Planner planned the perfect 10-day European adventure for me. Every recommendation was spot-on, and I discovered hidden gems I never would have found on my own!",
//       avatar: "https://i.pravatar.cc/150?img=1"
//     },
//     {
//       name: "Michael Chen",
//       location: "Toronto, Canada",
//       rating: 5,
//       text: "As a busy professional, I don't have time to research trips. Trip Planner's AI created an amazing itinerary for my Tokyo vacation in minutes. Absolutely brilliant!",
//       avatar: "https://i.pravatar.cc/150?img=2"
//     },
//     {
//       name: "Emma Rodriguez",
//       location: "Madrid, Spain",
//       rating: 5,
//       text: "The family trip to Costa Rica was flawless thanks to Trip Planner. The AI understood our needs perfectly and included activities for both adults and kids.",
//       avatar: "https://i.pravatar.cc/150?img=3"
//     }
//   ];

//   const destinations = [
//     {
//       name: "Tropical Paradise",
//       image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       description: "Crystal clear waters and pristine beaches"
//     },
//     {
// name: "Mountain Adventures",
// image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
// description: "Breathtaking peaks and hiking trails"

//     },
//     {
//       name: "Cultural Cities",
//       image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       description: "Historic landmarks and vibrant culture"
//     },
//     {
//       name: "Desert Escapes",
//       image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       description: "Stunning dunes and starlit nights"
//     }
//   ];

//   const faqs = [
//     {
//       question: "How does AI trip planning work?",
//       answer: "Our AI analyzes your preferences, budget, travel dates, and interests to create personalized itineraries. It considers factors like weather, local events, and your travel style to recommend the best activities, accommodations, and restaurants."
//     },
//     {
//       question: "Can I modify the AI-generated itinerary?",
//       answer: "Absolutely! While our AI creates a great foundation, you can easily customize any part of your itinerary. Add, remove, or modify activities, change hotels, or adjust your schedule to perfectly match your preferences."
//     },
//     {
//       question: "Do you handle bookings for hotels and flights?",
//       answer: "Currently, we provide detailed recommendations and direct links to booking platforms. This allows you to compare prices and choose the options that work best for you while benefiting from our AI's smart suggestions."
//     },
//     {
//       question: "What's included in the free plan?",
//       answer: "The free plan includes 5 AI-generated trips per month, basic itinerary features, and access to our destination database. It's perfect for occasional travelers who want to try our AI planning capabilities."
//     },
//     {
//       question: "How accurate are the AI recommendations?",
//       answer: "Our AI is trained on millions of travel data points and user feedback. It achieves over 95% satisfaction rate in recommendations, and we continuously improve the algorithm based on user experiences and travel trends."
//     }
//   ];

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   // Redirect to dashboard if already signed in - MOVED AFTER ALL HOOKS
//   if (isSignedIn) {
//     return <Redirect to="/dashboard" />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Enhanced Header */}
//       <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
//                 <Compass className="text-white text-sm" />
//               </div>
//               <span className="text-xl font-bold text-gray-900">Trip Planner</span>
//             </div>
            
//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-8">
//               <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
//               <a href="#destinations" className="text-gray-600 hover:text-blue-600 transition-colors">Destinations</a>
//               <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
//               <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
//               <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
//             </nav>
            
//             {/* Desktop Auth Buttons */}
//             <div className="hidden md:flex items-center space-x-4">
//               <SignInButton mode="modal">
//                 <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
//                   Sign In
//                 </Button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <Button className="bg-blue-500 hover:bg-blue-600">
//                   Get Started
//                 </Button>
//               </SignUpButton>
//             </div>

//             {/* Mobile Menu Button */}
//             <button 
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-100">
//             <div className="px-4 py-6 space-y-4">
//               <a href="#features" className="block text-gray-600 hover:text-blue-600 transition-colors">Features</a>
//               <a href="#destinations" className="block text-gray-600 hover:text-blue-600 transition-colors">Destinations</a>
//               <a href="#pricing" className="block text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
//               <a href="#testimonials" className="block text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
//               <a href="#faq" className="block text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
//               <div className="pt-4 space-y-2">
//                 <SignInButton mode="modal">
//                   <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-blue-600">
//                     Sign In
//                   </Button>
//                 </SignInButton>
//                 <SignUpButton mode="modal">
//                   <Button className="w-full bg-blue-500 hover:bg-blue-600">
//                     Get Started
//                   </Button>
//                 </SignUpButton>
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Enhanced Hero Section */}
//       <section className="relative overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50"></div>
//         </div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
//           <div className="text-center text-white">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
//               Navigate Your Next Journey
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-green-200">
//                 With The Power of AI
//               </span>
//             </h1>
//             <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 text-blue-100 max-w-3xl mx-auto">
//               Seamlessly crafted itineraries that bring your travel aspirations to life
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <SignUpButton mode="modal">
//                 <Button size="lg" className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg">
//                   Begin Your Adventure Now!
//                   <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
//                 </Button>
//               </SignUpButton>
//               <div className="flex items-center text-blue-100 text-sm md:text-base">
//                 <Users className="h-4 w-4 mr-2" />
//                 Join 50,000+ travelers
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-16 md:py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 md:mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Trip Planner?</h2>
//             <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Experience the future of travel planning with AI-powered personalization</p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-6 md:gap-8">
//             {/* Feature 1 */}
//             <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//               <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
//                 <Brain className="text-white text-xl md:text-2xl" />
//               </div>
//               <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">AI-Powered Planning</h3>
//               <p className="text-gray-600">Let artificial intelligence create personalized itineraries based on your preferences and travel style.</p>
//             </div>
            
//             {/* Feature 2 */}
//             <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//               <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
//                 <MapPin className="text-white text-xl md:text-2xl" />
//               </div>
//               <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Smart Recommendations</h3>
//               <p className="text-gray-600">Get hotel and activity suggestions with Google Maps integration for the perfect travel experience.</p>
//             </div>
            
//             {/* Feature 3 */}
//             <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//               <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
//                 <Save className="text-white text-xl md:text-2xl" />
//               </div>
//               <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Save & Share</h3>
//               <p className="text-gray-600">Save your favorite itineraries and share them with friends and family for collaborative planning.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Destinations Section */}
//       <section id="destinations" className="py-16 md:py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 md:mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
//             <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Discover amazing places around the world with our AI-curated recommendations</p>
//           </div>
          
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {destinations.map((destination, index) => (
//               <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
//                 <div className="relative">
//                   <img 
//                     src={destination.image} 
//                     alt={destination.name}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//                   <div className="absolute bottom-4 left-4 text-white">
//                     <h3 className="text-lg font-semibold mb-1">{destination.name}</h3>
//                     <p className="text-sm text-gray-200">{destination.description}</p>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-16 md:py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 md:mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
//             <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Real experiences from real travelers who trusted Trip Planner with their adventures</p>
//           </div>
          
//           <div className="relative max-w-4xl mx-auto">
//             <Card className="p-8 md:p-12">
//               <CardContent className="text-center">
//                 <div className="flex justify-center mb-4">
//                   {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
//                     <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <blockquote className="text-lg md:text-xl text-gray-700 mb-6 italic">
//                   "{testimonials[currentTestimonial].text}"
//                 </blockquote>
//                 <div className="flex items-center justify-center space-x-4">
//                   <img 
//                     src={testimonials[currentTestimonial].avatar} 
//                     alt={testimonials[currentTestimonial].name}
//                     className="w-12 h-12 rounded-full"
//                   />
//                   <div className="text-left">
//                     <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
//                     <div className="text-sm text-gray-600">{testimonials[currentTestimonial].location}</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
            
//             {/* Testimonial indicators */}
//             <div className="flex justify-center mt-6 space-x-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentTestimonial(index)}
//                   className={`w-3 h-3 rounded-full transition-colors ${
//                     index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-16 md:py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 md:mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Adventure Plan</h2>
//             <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Start free and upgrade as your wanderlust grows</p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-6 md:gap-8">
//             {/* Free Plan */}
//             <Card className="relative p-6 md:p-8 hover:shadow-lg transition-all duration-300">
//               <CardContent>
//                 <div className="text-center">
//                   <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Explorer</h3>
//                   <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                     Free
//                   </div>
//                   <p className="text-gray-600 mb-6">Perfect for trying out AI travel planning</p>
//                   <ul className="space-y-3 text-left mb-8">
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       <span>5 AI-generated trips per month</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       <span>Basic itinerary features</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       <span>Destination recommendations</span>
//                     </li>
//                   </ul>
//                   <SignUpButton mode="modal">
//                     <Button variant="outline" className="w-full">
//                       Get Started Free
//                     </Button>
//                   </SignUpButton>
//                 </div>
//               </CardContent>
//             </Card>
            
//             {/* Pro Plan */}
//             <Card className="relative p-6 md:p-8 border-2 border-blue-500 hover:shadow-lg transition-all duration-300 transform scale-105">
//               <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                 <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                   Most Popular
//                 </span>
//               </div>
//               <CardContent>
//                 <div className="text-center">
//                   <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Adventurer</h3>
//                   <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
//                     $9.99<span className="text-lg text-gray-600">/month</span>
//                   </div>
//                   <p className="text-gray-600 mb-6">For frequent travelers who want more</p>
//                   <ul className="space-y-3 text-left mb-8">
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       <span>Unlimited AI-generated trips</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       <span>Advanced customization</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       <span>Priority support</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       <span>Offline access</span>
//                     </li>
//                   </ul>
//                   <SignUpButton mode="modal">
//                     <Button className="w-full bg-blue-500 hover:bg-blue-600">
//                       Start Free Trial
//                     </Button>
//                   </SignUpButton>
//                 </div>
//               </CardContent>
//             </Card>
            
//             {/* Premium Plan */}
//             <Card className="relative p-6 md:p-8 hover:shadow-lg transition-all duration-300">
//               <CardContent>
//                 <div className="text-center">
//                   <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Globetrotter</h3>
//                   <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                     $19.99<span className="text-lg text-gray-600">/month</span>
//                   </div>
//                   <p className="text-gray-600 mb-6">For travel professionals and enthusiasts</p>
//                   <ul className="space-y-3 text-left mb-8">
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       <span>Everything in Adventurer</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       <span>Group trip planning</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       <span>Real-time collaboration</span>
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       <span>White-label options</span>
//                     </li>
//                   </ul>
//                   <SignUpButton mode="modal">
//                     <Button variant="outline" className="w-full">
//                       Contact Sales
//                     </Button>
//                   </SignUpButton>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section id="faq" className="py-16 md:py-20 bg-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 md:mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
//             <p className="text-lg md:text-xl text-gray-600">Everything you need to know about Trip Planner</p>
//           </div>
          
//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <Card key={index} className="overflow-hidden">
//                 <button
//                   className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
//                   onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
//                 >
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
//                     {expandedFaq === index ? (
//                       <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
//                     ) : (
//                       <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
//                     )}
//                   </div>
//                 </button>
//                 {expandedFaq === index && (
//                   <div className="px-6 pb-6">
//                     <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
//                   </div>
//                 )}
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Ready to Start Your Next Adventure?
//           </h2>
//           <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Join thousands of travelers who have discovered the magic of AI-powered trip planning
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <SignUpButton mode="modal">
//               <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
//                 Start Planning Today
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </SignUpButton>
//             <div className="flex items-center text-blue-100">
//               <Clock className="h-5 w-5 mr-2" />
//               Free 14-day trial • No credit card required
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
//                   <Compass className="text-white text-sm" />
//                 </div>
//                 <span className="text-xl font-bold text-white">Trip Planner</span>
//               </div>
//               <p className="text-gray-400">
//                 AI-powered travel planning that makes every journey unforgettable.
//               </p>
//             </div>
            
//             <div>
//               <h4 className="text-white font-semibold mb-4">Product</h4>
//               <ul className="space-y-2">
//                 <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
//                 <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">API</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-white font-semibold mb-4">Support</h4>
//               <ul className="space-y-2">
//                 <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-white font-semibold mb-4">Company</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-white transition-colors">About</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//             <p className="text-gray-400">
//               © 2024 Trip Planner. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Compass, 
  Brain, 
  MapPin, 
  Save, 
  ArrowRight, 
  Menu, 
  X, 
  Star, 
  Check,
  ChevronDown,
  ChevronUp,
  Users,
  Globe,
  Clock,
  Search,
  Calendar,
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "Trip Planner planned the perfect 10-day European adventure for me. Every recommendation was spot-on, and I discovered hidden gems I never would have found on my own!",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Michael Chen",
      location: "Toronto, Canada",
      rating: 5,
      text: "As a busy professional, I don't have time to research trips. Trip Planner's AI created an amazing itinerary for my Tokyo vacation in minutes. Absolutely brilliant!",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Emma Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      text: "The family trip to Costa Rica was flawless thanks to Trip Planner. The AI understood our needs perfectly and included activities for both adults and kids.",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ];

  const destinations = [
    {
      name: "Tropical Paradise",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Crystal clear waters and pristine beaches"
    },
    {
      name: "Mountain Adventures",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Breathtaking peaks and hiking trails"
    },
    {
      name: "Cultural Cities",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Historic landmarks and vibrant culture"
    },
    {
      name: "Desert Escapes",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Stunning dunes and starlit nights"
    }
  ];

  const faqs = [
    {
      question: "How does AI trip planning work?",
      answer: "Our AI analyzes your preferences, budget, travel dates, and interests to create personalized itineraries. It considers factors like weather, local events, and your travel style to recommend the best activities, accommodations, and restaurants."
    },
    {
      question: "Can I modify the AI-generated itinerary?",
      answer: "Absolutely! While our AI creates a great foundation, you can easily customize any part of your itinerary. Add, remove, or modify activities, change hotels, or adjust your schedule to perfectly match your preferences."
    },
    {
      question: "Do you handle bookings for hotels and flights?",
      answer: "Currently, we provide detailed recommendations and direct links to booking platforms. This allows you to compare prices and choose the options that work best for you while benefiting from our AI's smart suggestions."
    },
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes 5 AI-generated trips per month, basic itinerary features, and access to our destination database. It's perfect for occasional travelers who want to try our AI planning capabilities."
    },
    {
      question: "How accurate are the AI recommendations?",
      answer: "Our AI is trained on millions of travel data points and user feedback. It achieves over 95% satisfaction rate in recommendations, and we continuously improve the algorithm based on user experiences and travel trends."
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Redirect to dashboard if already signed in - MOVED AFTER ALL HOOKS
  if (isSignedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Compass className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold text-gray-900">Trip Planner</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#destinations" className="text-gray-600 hover:text-blue-600 transition-colors">Destinations</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
              <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
            </nav>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Get Started
                </Button>
              </SignUpButton>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#destinations" className="block text-gray-600 hover:text-blue-600 transition-colors">Destinations</a>
              <a href="#pricing" className="block text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="block text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
              <a href="#faq" className="block text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
              <div className="pt-4 space-y-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-blue-600">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Navigate Your Next Journey
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-green-200">
                With The Power of AI
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 text-blue-100 max-w-3xl mx-auto">
              Seamlessly crafted itineraries that bring your travel aspirations to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignUpButton mode="modal">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg">
                  Begin Your Adventure Now!
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </SignUpButton>
              <div className="flex items-center text-blue-100 text-sm md:text-base">
                <Users className="h-4 w-4 mr-2" />
                Join 50,000+ travelers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Trip Planner?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Experience the future of travel planning with AI-powered personalization</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Brain className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">AI-Powered Planning</h3>
              <p className="text-gray-600">Let artificial intelligence create personalized itineraries based on your preferences and travel style.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <MapPin className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Smart Recommendations</h3>
              <p className="text-gray-600">Get hotel and activity suggestions with Google Maps integration for the perfect travel experience.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Save className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Save & Share</h3>
              <p className="text-gray-600">Save your favorite itineraries and share them with friends and family for collaborative planning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Plan your perfect trip in just 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-white text-2xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Input Your Destination</h3>
              <p className="text-gray-600">Tell us where you want to go, your travel dates, and any specific preferences you have for your trip.</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-white text-2xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Set Your Budget & Preferences</h3>
              <p className="text-gray-600">Choose your budget range, travel style, and interests so our AI can create the perfect itinerary for you.</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-white text-2xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">AI Crafts Your Itinerary</h3>
              <p className="text-gray-600">Our AI analyzes millions of data points to create a personalized itinerary with activities, restaurants, and accommodations.</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-4 text-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all">
                Start Planning Your Trip
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Discover amazing places around the world with our AI-curated recommendations</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">{destination.name}</h3>
                    <p className="text-sm text-gray-200">{destination.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

    

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Adventure Plan</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Start free and upgrade as your wanderlust grows</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Free Plan */}
            <Card className="relative p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <CardContent>
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Explorer</h3>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Free
                  </div>
                  <p className="text-gray-600 mb-6">Perfect for trying out AI travel planning</p>
                  <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>5 AI-generated trips per month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>Basic itinerary features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>Destination recommendations</span>
                    </li>
                  </ul>
                  <SignUpButton mode="modal">
                    <Button variant="outline" className="w-full">
                      Get Started Free
                    </Button>
                  </SignUpButton>
                </div>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="relative p-6 md:p-8 border-2 border-blue-500 hover:shadow-lg transition-all duration-300 transform scale-105">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <CardContent>
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Adventurer</h3>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                    $9.99<span className="text-lg text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">For frequent travelers who want more</p>
                  <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>Unlimited AI-generated trips</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>Advanced customization</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>Offline access</span>
                    </li>
                  </ul>
                  <SignUpButton mode="modal">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                      Start Free Trial
                    </Button>
                  </SignUpButton>
                </div>
              </CardContent>
            </Card>
            
            {/* Premium Plan */}
            <Card className="relative p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <CardContent>
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Globetrotter</h3>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    $19.99<span className="text-lg text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">For travel professionals and enthusiasts</p>
                  <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>Everything in Adventurer</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>Group trip planning</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>Real-time collaboration</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span>White-label options</span>
                    </li>
                  </ul>
                  <SignUpButton mode="modal">
                    <Button variant="outline" className="w-full">
                      Contact Sales
                    </Button>
                  </SignUpButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


        {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Real experiences from real travelers who trusted Trip Planner with their adventures</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 md:p-12">
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-gray-600">{testimonials[currentTestimonial].location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg md:text-xl text-gray-600">Everything you need to know about Trip Planner</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Next Adventure?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the magic of AI-powered trip planning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Start Planning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignUpButton>
            <div className="flex items-center text-blue-100">
              <Clock className="h-5 w-5 mr-2" />
              Free 14-day trial • No credit card required
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
     {/* Footer */}
<footer className="bg-black text-white py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-8 items-start">
      {/* Left Side - Logo and Description */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Compass className="text-white text-sm" />
          </div>
          <span className="text-xl font-bold text-white">Trip Planner</span>
        </div>
        
        <p className="text-gray-300 text-lg leading-relaxed max-w-md">
          AI-powered travel planning that makes every journey unforgettable. 
        </p>
      </div>
      
      {/* Right Side - Navigation Links */}
      <div className="md:text-right">
        <nav className="flex flex-wrap md:justify-end gap-6 md:gap-8 mb-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#destinations" className="text-gray-300 hover:text-white transition-colors">Destinations</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Reviews</a>
          <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
        </nav>
      </div>
    </div>
    
    {/* Copyright - Centered at bottom */}
    <div className="border-t border-gray-800 pt-8 mt-8 text-center">
      <p className="text-gray-400">
        © 2025 Trip Planner. All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  );
}