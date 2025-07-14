
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Mail, Phone, Calendar, Shield } from 'lucide-react';

interface PatientInfo {
  name: string;
  email: string;
  phone: string;
  dob: string;
  insurance: string;
}

interface PatientInformationProps {
  onNext: () => void;
  onBack: () => void;
  onSubmit: (info: PatientInfo) => void;
  data?: PatientInfo;
}

const PatientInformation = ({ onNext, onBack, onSubmit, data }: PatientInformationProps) => {
  const [formData, setFormData] = useState<PatientInfo>(
    data || {
      name: '',
      email: '',
      phone: '',
      dob: '',
      insurance: ''
    }
  );

  const handleInputChange = (field: keyof PatientInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900 font-cabinet">
            Patient Information
          </h1>
          <p className="text-sm text-gray-600 font-cabinet">
            Please fill in your details
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center space-x-2 font-cabinet">
              <User className="w-4 h-4 text-gray-600" />
              <span>Full Name</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="font-cabinet text-base py-6"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2 font-cabinet">
              <Mail className="w-4 h-4 text-gray-600" />
              <span>Email Address</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              className="font-cabinet text-base py-6"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center space-x-2 font-cabinet">
              <Phone className="w-4 h-4 text-gray-600" />
              <span>Phone Number</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className="font-cabinet text-base py-6"
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dob" className="flex items-center space-x-2 font-cabinet">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span>Date of Birth</span>
            </Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              className="font-cabinet text-base py-6"
            />
          </div>

          {/* Insurance */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2 font-cabinet">
              <Shield className="w-4 h-4 text-gray-600" />
              <span>Insurance Provider</span>
            </Label>
            <Select value={formData.insurance} onValueChange={(value) => handleInputChange('insurance', value)}>
              <SelectTrigger className="font-cabinet text-base py-6">
                <SelectValue placeholder="Select your insurance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aetna">Aetna</SelectItem>
                <SelectItem value="blue-cross">Blue Cross Blue Shield</SelectItem>
                <SelectItem value="cigna">Cigna</SelectItem>
                <SelectItem value="humana">Humana</SelectItem>
                <SelectItem value="united">United Healthcare</SelectItem>
                <SelectItem value="medicare">Medicare</SelectItem>
                <SelectItem value="medicaid">Medicaid</SelectItem>
                <SelectItem value="self-pay">Self Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800 font-cabinet">
          🔒 Your information is secure and HIPAA compliant. We'll only use this data for your appointment and medical records.
        </p>
      </div>

      {/* Continue Button */}
      <div className="pt-6">
        <Button 
          onClick={handleSubmit} 
          disabled={!isFormValid}
          className="w-full font-cabinet rounded-full py-6 text-base"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PatientInformation;
