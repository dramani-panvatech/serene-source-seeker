
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Brain, Baby, Eye, Bone, Smile, Stethoscope, Activity } from 'lucide-react';

interface ChooseDepartmentProps {
  onNext: () => void;
  onBack: () => void;
  onSelect: (department: string) => void;
  selected?: string;
}

const departments = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: Heart,
    description: 'Heart and cardiovascular care',
    color: 'red'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    icon: Brain,
    description: 'Brain and nervous system',
    color: 'purple'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    icon: Baby,
    description: 'Children\'s healthcare',
    color: 'pink'
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    icon: Eye,
    description: 'Eye and vision care',
    color: 'blue'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    icon: Bone,
    description: 'Bone and joint care',
    color: 'orange'
  },
  {
    id: 'dentistry',
    name: 'Dentistry',
    icon: Smile,
    description: 'Dental and oral health',
    color: 'green'
  },
  {
    id: 'general',
    name: 'General Medicine',
    icon: Stethoscope,
    description: 'Primary healthcare',
    color: 'gray'
  },
  {
    id: 'emergency',
    name: 'Emergency',
    icon: Activity,
    description: 'Urgent medical care',
    color: 'red'
  }
];

const ChooseDepartment = ({ onNext, onBack, onSelect, selected }: ChooseDepartmentProps) => {
  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap = {
      red: isSelected ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600',
      purple: isSelected ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600',
      pink: isSelected ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-600',
      blue: isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600',
      orange: isSelected ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-600',
      green: isSelected ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600',
      gray: isSelected ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900 font-cabinet">
            Choose Department
          </h1>
          <p className="text-sm text-gray-600 font-cabinet">
            Select the specialty you need
          </p>
        </div>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-2 gap-4">
        {departments.map((dept) => {
          const IconComponent = dept.icon;
          const isSelected = selected === dept.id;
          
          return (
            <Card
              key={dept.id}
              className={`hover:shadow-lg transition-all cursor-pointer ${
                isSelected ? `ring-2 ring-${dept.color}-500 bg-${dept.color}-50` : ''
              }`}
              onClick={() => onSelect(dept.id)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  getColorClasses(dept.color, isSelected)
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 font-cabinet mb-1">
                  {dept.name}
                </h3>
                <p className="text-xs text-gray-600 font-cabinet">
                  {dept.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
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

export default ChooseDepartment;
