
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ClientBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { toast } = useToast();

  const services = [
    { id: '1', name: 'Hair Cut', duration: '30 min', price: '$25', icon: '✂️' },
    { id: '2', name: 'Hair Styling', duration: '45 min', price: '$35', icon: '💇' },
    { id: '3', name: 'Massage Therapy', duration: '60 min', price: '$80', icon: '💆' },
    { id: '4', name: 'Facial Treatment', duration: '90 min', price: '$120', icon: '🧴' },
    { id: '5', name: 'Manicure', duration: '45 min', price: '$40', icon: '💅' },
    { id: '6', name: 'Pedicure', duration: '60 min', price: '$50', icon: '🦶' },
  ];

  const providers = [
    { id: '1', name: 'Sarah Johnson', specialties: ['Hair', 'Styling'], rating: 4.9 },
    { id: '2', name: 'Michael Chen', specialties: ['Massage', 'Therapy'], rating: 4.8 },
    { id: '3', name: 'Emma Davis', specialties: ['Facial', 'Skincare'], rating: 4.7 },
    { id: '4', name: 'Any Available', specialties: ['All Services'], rating: 0 },
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const handleBooking = () => {
    if (selectedDate && selectedService && selectedTime) {
      console.log('Booking:', { selectedDate, selectedService, selectedProvider, selectedTime });

      toast({
        title: "🎉 Booking Confirmed!",
        description: "Your appointment has been successfully scheduled. You'll receive a confirmation email shortly.",
      });
    }
  };

  const selectedServiceInfo = services.find(s => s.id === selectedService);
  const selectedProviderInfo = providers.find(p => p.id === selectedProvider);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="animate-scale-in">
            <CalendarIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-right">
            Book Your Appointment
          </h1>
        </div>

        <div className="">
          {/* Left Column - Booking Form */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Service Selection */}
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl animate-fade-in hover-scale transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Select Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="w-full border-2 focus:border-blue-500 transition-colors duration-300">
                    <SelectValue placeholder="Choose your service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div className="flex items-center gap-3 py-2">
                          <span className="text-lg">{service.icon}</span>
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-gray-600">{service.duration} • {service.price}</p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Provider Selection */}
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl animate-fade-in hover-scale transition-all duration-300" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  Select Provider (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger className="w-full border-2 focus:border-blue-500 transition-colors duration-300">
                    <SelectValue placeholder="Choose your provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        <div className="flex items-center gap-3 py-2">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{provider.name}</p>
                            <p className="text-sm text-gray-600">
                              {provider.specialties.join(', ')}
                              {provider.rating > 0 && (
                                <span className="ml-2">⭐ {provider.rating}</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>


            {/* Right Column - Calendar & Summary */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-orange-500" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border pointer-events-auto"
                    disabled={(date) => date < new Date()}
                  />
                </CardContent>
              </Card>
              {/* Time Selection */}
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl animate-fade-in hover-scale transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    Select Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-xs transition-all duration-200 hover-scale"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              
            </div>
            {/* Booking Summary */}
              {selectedDate && selectedService && selectedTime && (
                <Card className="backdrop-blur-sm bg-gradient-to-br from-blue-50/80 to-purple-50/80 border-2 border-blue-200 shadow-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <CheckCircle2 className="h-5 w-5" />
                      Booking Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Service:
                        </span>
                        <span className="font-medium">
                          {selectedServiceInfo?.name}
                        </span>
                      </div>

                      {selectedProvider && (
                        <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border">
                          <span className="text-gray-600 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Provider:
                          </span>
                          <span className="font-medium">
                            {selectedProviderInfo?.name}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border">
                        <span className="text-gray-600 flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          Date:
                        </span>
                        <span className="font-medium">{selectedDate.toDateString()}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Time:
                        </span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border-t-2 border-blue-200">
                        <span className="text-gray-600 font-medium">Total Price:</span>
                        <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {selectedServiceInfo?.price}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handleBooking}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover-scale transition-all duration-300"
                      size="lg"
                    >
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Confirm Booking
                    </Button>
                  </CardContent>
                </Card>
              )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default ClientBooking;
