
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Zap, Shield, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  "Unlimited classes and bookings",
  "All payment integrations included",
  "Multi-location support",
  "Mobile apps for iOS & Android",
  "24/7 customer support",
  "Custom branding options",
  "Advanced analytics & reporting",
  "Staff management tools",
  "Marketing automation",
  "API access"
];

const PricingSection = () => {
  const navigate = useNavigate();

  const handleStartFree = () => {
    navigate('/signup');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50" id="pricing">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything your studio needs in one comprehensive package
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Features List */}
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Everything Included
                </h3>
                <p className="text-gray-600">No hidden fees, no feature restrictions</p>
              </div>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 lg:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-4">
                    <Zap className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Most Popular</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-5xl font-bold">$49</span>
                    <span className="text-xl opacity-80">/month</span>
                  </div>
                  <p className="opacity-80">Per location • Billed annually</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-80">Monthly billing:</span>
                    <span className="font-medium">$59/month</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-80">Setup fee:</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-80">Contract:</span>
                    <span className="font-medium">None required</span>
                  </div>
                </div>

                <Button 
                  size="lg" onClick={handleStartFree}
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Start Free Trial
                </Button>
                
                <p className="text-center text-sm opacity-80 mt-4">
                  30-day free trial • No credit card required
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/20">
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 opacity-80" />
                    <p className="text-xs opacity-80">Enterprise Security</p>
                  </div>
                  <div className="text-center">
                    <Headphones className="w-6 h-6 mx-auto mb-2 opacity-80" />
                    <p className="text-xs opacity-80">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
