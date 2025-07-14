
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Calendar, Clock } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  bio: string;
  nextAvailable: string;
  experience: string;
}

interface PickProviderProps {
  onNext: () => void;
  onBack: () => void;
  onSelect: (provider: Provider) => void;
  selected?: Provider;
  department?: string;
}

const providers: Provider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    rating: 4.9,
    image: '👩‍⚕️',
    bio: 'Specializing in preventive cardiology and heart disease management',
    nextAvailable: 'Tomorrow 2:00 PM',
    experience: '15+ years'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    rating: 4.8,
    image: '👨‍⚕️',
    bio: 'Expert in cardiac surgery and interventional procedures',
    nextAvailable: 'Today 4:30 PM',
    experience: '12+ years'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Cardiologist',
    rating: 4.9,
    image: '👩‍⚕️',
    bio: 'Focus on women\'s heart health and cardiac rehabilitation',
    nextAvailable: 'Friday 10:00 AM',
    experience: '18+ years'
  }
];

const PickProvider = ({ onNext, onBack, onSelect, selected, department }: PickProviderProps) => {
  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900 font-cabinet">
            Choose Provider
          </h1>
          <p className="text-sm text-gray-600 font-cabinet">
            Select your preferred doctor
          </p>
        </div>
      </div>

      {/* Providers List */}
      <div className="space-y-4">
        {providers.map((provider) => (
          <Card
            key={provider.id}
            className={`hover:shadow-lg transition-all cursor-pointer ${
              selected?.id === provider.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => onSelect(provider)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{provider.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 font-cabinet">
                      {provider.name}
                    </h3>
                    {selected?.id === provider.id && (
                      <div className="text-blue-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-blue-600 font-medium mb-2 font-cabinet">
                    {provider.specialty}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600 font-cabinet">
                      {provider.experience}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 font-cabinet">
                    {provider.bio}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium font-cabinet">
                      Next available: {provider.nextAvailable}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Button */}
      <div className="pt-6">
        <Button 
          onClick={onNext} 
          disabled={!selected}
          className="w-full font-cabinet rounded-full py-6 text-base"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PickProvider;
