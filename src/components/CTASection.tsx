
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();

  const handleStartFree = () => {
    navigate('/signup');
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
          <Zap className="w-5 h-5 mr-2 text-yellow-300" />
          <span className="text-white font-medium">Ready to Transform Your Studio?</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Start Growing Your
          <span className="block">Wellness Business Today</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join thousands of wellness professionals who have simplified their operations and increased revenue with FlowTime.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={handleStartFree}
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 min-w-48"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-white/80 hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 backdrop-blur-sm min-w-48"
          >
            Schedule Demo
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { icon: CheckCircle, text: "No credit card required" },
            { icon: CheckCircle, text: "30-day free trial" },
            { icon: CheckCircle, text: "Cancel anytime" }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center space-x-2 text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
              <item.icon className="w-5 h-5 text-green-300" />
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
