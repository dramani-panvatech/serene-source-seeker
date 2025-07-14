
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Home, Phone, Check } from 'lucide-react';
import type { BookingStep } from '../../pages/BookingFlow';

interface DashboardProps {
  onNext: () => void;
  onGoToStep: (step: BookingStep) => void;
}

const Dashboard = ({ onNext, onGoToStep }: DashboardProps) => {
  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900 font-cabinet">
          Welcome back, Sarah
        </h1>
        <p className="text-gray-600 font-cabinet">
          How can we help you today?
        </p>
      </div>

      {/* Main Action Cards */}
      <div className="space-y-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onNext}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 font-cabinet">
                  Book New Appointment
                </h3>
                <p className="text-sm text-gray-600 font-cabinet">
                  Schedule your next visit
                </p>
              </div>
              <div className="text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 font-cabinet">
                  Upcoming Visits
                </h3>
                <p className="text-sm text-gray-600 font-cabinet">
                  View and manage appointments
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  2 scheduled
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Home className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 font-cabinet">
                  My Providers
                </h3>
                <p className="text-sm text-gray-600 font-cabinet">
                  Your healthcare team
                </p>
              </div>
              <div className="text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 font-cabinet">
                  Messages
                </h3>
                <p className="text-sm text-gray-600 font-cabinet">
                  Secure communication
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  1 new
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3 font-cabinet">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="font-cabinet rounded-full">
            Find Provider
          </Button>
          <Button variant="outline" className="font-cabinet rounded-full">
            Prescriptions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
