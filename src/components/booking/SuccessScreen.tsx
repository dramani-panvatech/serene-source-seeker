
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Calendar, Home, RotateCcw, Download, MessageSquare } from 'lucide-react';
import type { BookingData } from '../../pages/BookingFlow';

interface SuccessScreenProps {
  onHome: () => void;
  bookingData: BookingData;
}

const SuccessScreen = ({ onHome, bookingData }: SuccessScreenProps) => {
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
      {/* Success Animation */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-fade-in">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 font-cabinet">
          Appointment Confirmed!
        </h1>
        <p className="text-gray-600 font-cabinet">
          Your booking has been successfully scheduled
        </p>
      </div>

      {/* Appointment Summary Card */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className="text-4xl mb-2">{bookingData.provider?.image || '👨‍⚕️'}</div>
            <h3 className="text-lg font-medium text-gray-900 font-cabinet">
              {bookingData.provider?.name || 'Dr. Sarah Johnson'}
            </h3>
            <p className="text-sm text-blue-600 font-cabinet">
              {bookingData.provider?.specialty || 'Cardiologist'}
            </p>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900 font-cabinet">
                {bookingData.dateTime?.date ? formatDate(bookingData.dateTime.date) : 'Tomorrow'}
              </p>
              <p className="text-sm text-gray-600 font-cabinet">
                {bookingData.dateTime?.time || '2:00 PM'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Details */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900 font-cabinet">
            What's Next?
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600">1</span>
              </div>
              <p className="text-sm text-gray-600 font-cabinet">
                Confirmation email sent to {bookingData.patientInfo?.email || 'your email'}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600">2</span>
              </div>
              <p className="text-sm text-gray-600 font-cabinet">
                You'll receive a reminder 24 hours before your appointment
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600">3</span>
              </div>
              <p className="text-sm text-gray-600 font-cabinet">
                {bookingData.appointmentType === 'telehealth' 
                  ? 'Video link will be sent 30 minutes before the call'
                  : 'Arrive 15 minutes early for check-in'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={onHome}
          className="w-full font-cabinet rounded-full py-6 text-base"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline"
            className="font-cabinet rounded-full py-3"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Add to Calendar
          </Button>
          
          <Button 
            variant="outline"
            className="font-cabinet rounded-full py-3"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reschedule
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline"
            className="font-cabinet rounded-full py-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          
          <Button 
            variant="outline"
            className="font-cabinet rounded-full py-3"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Clinic
          </Button>
        </div>
      </div>

      {/* Support */}
      <div className="text-center pt-6">
        <p className="text-sm text-gray-600 font-cabinet">
          Need help? <button className="text-blue-600 underline">Contact Support</button>
        </p>
      </div>
    </div>
  );
};

export default SuccessScreen;
