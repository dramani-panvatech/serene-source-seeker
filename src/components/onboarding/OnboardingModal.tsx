
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, Phone, Clock, DollarSign, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  userName: string;
}

const OnboardingModal = ({ isOpen, onClose, userEmail, userName }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    brandName: '',
    industry: '',
    phoneNumber: '',
    timeZone: 'America/New_York',
    currency: 'USD'
  });
  const navigate = useNavigate();

  const industries = [
    'Healthcare',
    'Salon & Spa',
    'Yoga & Fitness',
    'Dental',
    'Therapy & Counseling',
    'Beauty Services',
    'Personal Training',
    'Other'
  ];

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar', symbol: '$' },
    { value: 'INR', label: 'INR - Indian Rupee', symbol: '₹' },
    { value: 'EUR', label: 'EUR - Euro', symbol: '€' },
    { value: 'GBP', label: 'GBP - British Pound', symbol: '£' }
  ];

  const timeZones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' }
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    console.log('Onboarding completed with data:', { ...formData, userEmail, userName });
    onClose();
    navigate('/dashboard');
  };

  const isStep1Valid = formData.brandName.trim() && formData.industry;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-white to-blue-50/30 border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            {currentStep === 1 ? (
              <Building2 className="w-8 h-8 text-white" />
            ) : (
              <Globe className="w-8 h-8 text-white" />
            )}
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {currentStep === 1 ? "Tell us about your business" : "Set your preferences"}
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            {currentStep === 1 
              ? "Help us customize your experience" 
              : "Almost there! Just a few final details"
            }
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Enhanced Progress indicator */}
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                currentStep >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Business Info</span>
            </div>
            <div className={`w-16 h-1 rounded-full transition-all duration-300 ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                currentStep >= 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Preferences</span>
            </div>
          </div>

          {currentStep === 1 ? (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="brandName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Business Name
                </Label>
                <Input
                  id="brandName"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  placeholder="Enter your business name"
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  Industry
                </Label>
                <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry} className="rounded-lg">
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70 transition-all duration-200"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="timeZone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Time Zone
                </Label>
                <Select value={formData.timeZone} onValueChange={(value) => setFormData({ ...formData, timeZone: value })}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {timeZones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value} className="rounded-lg">
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  Currency
                </Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value} className="rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{currency.symbol}</span>
                          {currency.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <p className="text-green-800 font-semibold text-lg">All set!</p>
                </div>
                <p className="text-green-700 text-sm">
                  Your workspace is ready. Let's start managing your bookings!
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {currentStep > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(1)} 
                className="flex-1 h-12 rounded-xl border-2 hover:bg-gray-50 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext} 
              disabled={currentStep === 1 && !isStep1Valid}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              {currentStep === 1 ? (
                <>
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                'Complete Setup'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
