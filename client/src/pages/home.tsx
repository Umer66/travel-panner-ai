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
  Clock
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Redirect to dashboard if already signed in
  if (isSignedIn) {
    return <Redirect to="/dashboard" />;
  }

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "Navigo planned the perfect 10-day European adventure for me. Every recommendation was spot-on, and I discovered hidden gems I never would have found on my own!",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Michael Chen",
      location: "Toronto, Canada",
      rating: 5,
      text: "As a busy professional, I don't have time to research trips. Navigo's AI created an amazing itinerary for my Tokyo vacation in minutes. Absolutely brilliant!",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Emma Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      text: "The family trip to Costa Rica was flawless thanks to Navigo. The AI understood our needs perfectly and included activities for both adults and kids.",
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
      image: "https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
  }, []);

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
              <span className="text-xl font-bold text-gray-900">Navigo</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Navigo?</h2>
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
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Save & Manage</h3>
              <p className="text-gray-600">Keep all your trips organized in your personal dashboard with easy access anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Discover amazing places our AI recommends for unforgettable experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 transform group-hover:scale-105">
                  <img 
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                    <p className="text-sm text-gray-200">{destination.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



  {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg md:text-xl text-gray-600">Three simple steps to your perfect trip</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl md:text-2xl font-bold">1</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Tell Us Your Preferences</h3>
              <p className="text-gray-600">Share your destination, budget, travel dates, and interests with our AI.</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl md:text-2xl font-bold">2</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">AI Creates Your Itinerary</h3>
              <p className="text-gray-600">Our AI analyzes your preferences and generates a personalized travel plan.</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl md:text-2xl font-bold">3</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Enjoy Your Journey</h3>
              <p className="text-gray-600">Follow your AI-crafted itinerary and create unforgettable memories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Start free and upgrade as your travel planning needs grow</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Free Plan */}
            <Card className="relative p-6 md:p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>5 AI-generated trips</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Basic itinerary features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Email support</span>
                  </li>
                </ul>
                <SignUpButton mode="modal">
                  <Button className="w-full" variant="outline">
                    Get Started Free
                  </Button>
                </SignUpButton>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative p-6 md:p-8 border-2 border-blue-500 hover:shadow-lg transition-shadow">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$9.99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>50 AI-generated trips</span>
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
                    <span>Export to PDF</span>
                  </li>
                </ul>
                <SignUpButton mode="modal">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Start Premium
                  </Button>
                </SignUpButton>
              </CardContent>
            </Card>

            {/* Premium Plus Plan */}
            <Card className="relative p-6 md:p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Plus</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$19.99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>100 AI-generated trips</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Everything in Premium</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>24/7 support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Team collaboration</span>
                  </li>
                </ul>
                <SignUpButton mode="modal">
                  <Button className="w-full" variant="outline">
                    Go Premium Plus
                  </Button>
                </SignUpButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Travelers Say</h2>
            <p className="text-lg md:text-xl text-gray-600">Join thousands of satisfied travelers who trust Navigo</p>
          </div>
          
          <div className="relative">
            <Card className="p-6 md:p-8">
              <CardContent className="p-0 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-gray-700 mb-6">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].location}</div>
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
      <section id="faq" className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg md:text-xl text-gray-600">Everything you need to know about Navigo</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
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
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Planning?</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8">Join thousands of travelers who trust Navigo for their adventures</p>
          <SignUpButton mode="modal">
            <Button size="lg" className="bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Create Your First Trip
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Compass className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold">Navigo</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">Navigate your next journey with the power of AI. Create personalized travel itineraries that match your style and budget.</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  50K+ travelers
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  195 countries
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  24/7 support
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#destinations" className="hover:text-white transition-colors">Destinations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Navigo. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}