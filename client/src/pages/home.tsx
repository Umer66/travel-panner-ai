import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Compass, Brain, MapPin, Save, ArrowRight } from "lucide-react";

export default function Home() {
  const { isSignedIn } = useUser();

  // Redirect to dashboard if already signed in
  if (isSignedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Compass className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold text-gray-900">Navigo</span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            </nav>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Navigate Your Next Journey
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-green-200">
                With The Power of AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
              Seamlessly crafted itineraries that bring your travel aspirations to life
            </p>
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-4 text-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg">
                Begin Your Adventure Now!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Navigo?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience the future of travel planning with AI-powered personalization</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI-Powered Planning</h3>
              <p className="text-gray-600">Let artificial intelligence create personalized itineraries based on your preferences and travel style.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Smart Recommendations</h3>
              <p className="text-gray-600">Get hotel and activity suggestions with Google Maps integration for the perfect travel experience.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Save className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Save & Manage</h3>
              <p className="text-gray-600">Keep all your trips organized in your personal dashboard with easy access anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to your perfect trip</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tell Us Your Preferences</h3>
              <p className="text-gray-600">Share your destination, budget, travel dates, and interests with our AI.</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Creates Your Itinerary</h3>
              <p className="text-gray-600">Our AI analyzes your preferences and generates a personalized travel plan.</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enjoy Your Journey</h3>
              <p className="text-gray-600">Follow your AI-crafted itinerary and create unforgettable memories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Planning?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of travelers who trust Navigo for their adventures</p>
          <SignUpButton mode="modal">
            <Button size="lg" className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Create Your First Trip
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Compass className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold">Navigo</span>
              </div>
              <p className="text-gray-400">Navigate your next journey with the power of AI.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Navigo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
