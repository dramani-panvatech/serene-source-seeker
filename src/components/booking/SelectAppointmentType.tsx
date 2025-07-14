
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Video, Phone } from 'lucide-react';

interface SelectAppointmentTypeProps {
  onNext: () => void;
  onBack: () => void;
  onSelect: (type: 'in-person' | 'telehealth') => void;
  selected?: 'in-person' | 'telehealth';
}

const SelectAppointmentType = ({ onNext, onBack, onSelect, selected }: SelectAppointmentTypeProps) => {
  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900 font-cabinet">
            Appointment Type
          </h1>
          <p className="text-sm text-gray-600 font-cabinet">
            How would you like to meet?
          </p>
        </div>
      </div>

      {/* Appointment Type Options */}
      <div className="space-y-4">
        <Card 
          className={`hover:shadow-lg transition-all cursor-pointer ${
            selected === 'in-person' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          }`}
          onClick={() => onSelect('in-person')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selected === 'in-person' ? 'bg-blue-600' : 'bg-blue-100'
              }`}>
                <MapPin className={`w-6 h-6 ${
                  selected === 'in-person' ? 'text-white' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 font-cabinet">
                  In-Person Visit
                </h3>
                <p className="text-sm text-gray-600 font-cabinet">
                  Visit our clinic for comprehensive care
                </p>
              </div>
              {selected === 'in-person' && (
                <div className="text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Physical examination available
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Lab tests and procedures
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`hover:shadow-lg transition-all cursor-pointer ${
            selected === 'telehealth' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
          }`}
          onClick={() => onSelect('telehealth')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selected === 'telehealth' ? 'bg-purple-600' : 'bg-purple-100'
              }`}>
                <Video className={`w-6 h-6 ${
                  selected === 'telehealth' ? 'text-white' : 'text-purple-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 font-cabinet">
                  Telehealth
                </h3>
                <p className="text-sm text-gray-600 font-cabinet">
                  Convenient video consultation from home
                </p>
              </div>
              {selected === 'telehealth' && (
                <div className="text-purple-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Save time and travel
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Secure video connection
              </div>
            </div>
          </CardContent>
        </Card>
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

export default SelectAppointmentType;
