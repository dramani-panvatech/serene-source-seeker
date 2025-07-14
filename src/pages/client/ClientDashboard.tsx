
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { CheckCircle, Clock, Calendar, Gift, ArrowRight, Sparkles, Crown, Zap } from 'lucide-react';

const ClientDashboard = () => {
  const appointments = [
    { id: 1, service: 'Hair Cut', date: '2024-01-15', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, service: 'Massage Therapy', date: '2024-01-18', time: '2:00 PM', status: 'Pending' },
  ];

  const offerings = [
    { 
      id: 1, 
      title: '50% Off First Visit', 
      description: 'New client special offer',
      image: '/placeholder.svg',
      buttonText: 'Book Now',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    { 
      id: 2, 
      title: 'Spa Package Deal', 
      description: 'Massage + Facial combo',
      image: '/placeholder.svg',
      buttonText: 'Book Now',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    { 
      id: 3, 
      title: 'Loyalty Points 2x', 
      description: 'Double points this month',
      image: '/placeholder.svg',
      buttonText: 'Earn Points',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    { 
      id: 4, 
      title: 'Weekend Special', 
      description: 'Saturday & Sunday deals',
      image: '/placeholder.svg',
      buttonText: 'View Deals',
      color: 'bg-gradient-to-br from-orange-500 to-red-500'
    },
  ];

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="animate-scale-in">
          <Sparkles className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 animate-slide-in-right">
          Welcome back, Sarah!
        </h1>
      </div>

      {/* Tray Summary Section - 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Status Card */}
        <Card className="animate-fade-in hover-scale transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">Active</p>
                <p className="text-sm text-gray-600">All services available</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* My Appointments Card */}
        <Card className="animate-fade-in hover-scale transition-all duration-300 hover:shadow-lg" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-blue-500" />
              Next Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {appointments.slice(0, 2).map((appointment, index) => (
                <div key={appointment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{appointment.service}</p>
                    <p className="text-xs text-gray-600">{appointment.date}</p>
                  </div>
                  <Badge variant={appointment.status === 'Confirmed' ? 'default' : 'secondary'} className="text-xs">
                    {appointment.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Plan Info Card */}
        <Card className="animate-fade-in hover-scale transition-all duration-300 hover:shadow-lg" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Crown className="h-5 w-5 text-purple-500" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-xl font-bold text-purple-600">Premium</p>
                <p className="text-sm text-gray-600">Expires: March 2024</p>
              </div>
              <Button size="sm" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Zap className="h-4 w-4 mr-1" />
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Offerings & Deals Section */}
      <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Gift className="h-6 w-6 text-purple-500" />
            Top Offers for You
          </CardTitle>
          <Button variant="outline" size="sm">
            View All Offers
          </Button>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {offerings.map((offer) => (
                <CarouselItem key={offer.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="relative overflow-hidden rounded-xl hover-scale transition-all duration-300 hover:shadow-xl">
                    <div className={`${offer.color} p-6 text-white`}>
                      <div className="space-y-4">
                        <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                          <Gift className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                          <p className="text-white/90 text-sm mb-4">{offer.description}</p>
                        </div>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
                        >
                          {offer.buttonText}
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <Card className="hover-scale transition-all duration-300 hover:shadow-lg cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Book New Appointment</h3>
                <p className="text-sm text-gray-600">Schedule your next visit</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale transition-all duration-300 hover:shadow-lg cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Explore Plans</h3>
                <p className="text-sm text-gray-600">Upgrade your experience</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
