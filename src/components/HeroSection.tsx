
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartFree = () => {
    navigate('/signup');
  };

  return (
    <section className="relative min-h-screen flex items-center px-4 py-10 bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-green-200 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Brand Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-100">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                FlowTime
              </span>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Effortless Booking for
                <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                  Yoga & Pilates Studios
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                Simplify class scheduling, client management, payments, and more—all in one calming platform.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={handleStartFree}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                Start FREE
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            {/* Main Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wellness Card */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Wellness-Focused</h3>
                <p className="text-gray-600 leading-relaxed">Designed specifically for yoga and pilates studios with mindful UX</p>
              </div>

              {/* Smart Scheduling Card */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 md:mt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Scheduling</h3>
                <p className="text-gray-600 leading-relaxed">AI-powered booking with automated waitlists and conflict resolution</p>
              </div>

              {/* Payments Card */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 md:col-span-2">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                    <span className="text-green-600 font-bold text-2xl">$</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Payments</h3>
                    <p className="text-gray-600 leading-relaxed">Integrated billing with packages, discounts, and membership management</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
