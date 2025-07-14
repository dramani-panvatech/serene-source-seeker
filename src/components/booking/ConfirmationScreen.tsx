
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Video, Calendar, Clock, User, CreditCard } from 'lucide-react';
import type { BookingData } from '../../pages/BookingFlow';

interface ConfirmationScreenProps {
  onConfirm: () => void;
  onBack: () => void;
  bookingData: BookingData;
}

const ConfirmationScreen = ({ onConfirm, onBack, bookingData }: ConfirmationScreenProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
            Confirm Appointment
          </h1>
          <p className="text-sm text-gray-600 font-cabinet">
            Review your booking details
          </p>
        </div>
      </div>

      {/* Appointment Summary */}
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Provider Info */}
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{bookingData.provider?.image || '👨‍⚕️'}</div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 font-cabinet">
                {bookingData.provider?.name || 'Dr. Sarah Johnson'}
              </h3>
              <p className="text-sm text-blue-600 font-cabinet">
                {bookingData.provider?.specialty || 'Cardiologist'}
              </p>
            </div>
          </div>

          {/* Appointment Type */}
          <div className="flex items-center space-x-3">
            {bookingData.appointmentType === 'telehealth' ? (
              <Video className="w-5 h-5 text-purple-600" />
            ) : (
              <MapPin className="w-5 h-5 text-blue-600" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900 font-cabinet">
                {bookingData.appointmentType === 'telehealth' ? 'Telehealth Visit' : 'In-Person Visit'}
              </p>
              <p className="text-xs text-gray-600 font-cabinet">
                {bookingData.appointmentType === 'telehealth' 
                  ? 'Video consultation from home' 
                  : 'Main Street Medical Center'}
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900 font-cabinet">
                {bookingData.dateTime?.date ? formatDate(bookingData.dateTime.date) : 'Tomorrow'}
              </p>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <p className="text-xs text-gray-600 font-cabinet">
                  {bookingData.dateTime?.time || '2:00 PM'} (45 minutes)
                </p>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium text-gray-900 font-cabinet">
                {bookingData.patientInfo?.name || 'Sarah Johnson'}
              </p>
              <p className="text-xs text-gray-600 font-cabinet">
                {bookingData.patientInfo?.email || 'sarah@example.com'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900 font-cabinet">
              Payment Information
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-cabinet">Consultation Fee</span>
              <span className="text-sm font-medium text-gray-900 font-cabinet">$150.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-cabinet">Insurance Copay</span>
              <span className="text-sm font-medium text-gray-900 font-cabinet">$25.00</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900 font-cabinet">Total Due</span>
                <span className="text-lg font-semibold text-gray-900 font-cabinet">$25.00</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 font-cabinet">
              ✅ {bookingData.patientInfo?.insurance || 'Blue Cross Blue Shield'} - Copay will be collected at time of service
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-yellow-800 mb-2 font-cabinet">Important Notes:</h4>
        <ul className="text-sm text-yellow-700 space-y-1 font-cabinet">
          <li>• Please arrive 15 minutes early for check-in</li>
          <li>• Bring a valid ID and insurance card</li>
          <li>• You can reschedule up to 24 hours in advance</li>
        </ul>
      </div>

      {/* Confirm Button */}
      <div className="pt-6">
        <Button 
          onClick={onConfirm}
          className="w-full font-cabinet rounded-full py-6 text-base bg-green-600 hover:bg-green-700"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
