
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Star, Crown, Sparkles, Calendar, CreditCard } from 'lucide-react';

const ClientPlan = () => {
  const currentPlan = {
    name: 'Premium Plan',
    price: '$29.99/month',
    features: ['Unlimited bookings', 'Priority support', '20% discount on services', 'Cancel anytime'],
    nextBilling: '2024-02-15'
  };

  const availablePlans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$9.99/month',
      icon: Star,
      features: ['5 bookings per month', 'Standard support', '10% discount on services'],
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$29.99/month',
      icon: Crown,
      features: ['Unlimited bookings', 'Priority support', '20% discount on services', 'Cancel anytime'],
      popular: true,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'vip',
      name: 'VIP Plan',
      price: '$49.99/month',
      icon: Crown,
      features: ['Unlimited bookings', '24/7 support', '30% discount on services', 'Exclusive access', 'Free cancellations'],
      popular: false,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 p-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="animate-scale-in">
            <Crown className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-right">
            Plans & Subscription
          </h1>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="current" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Current Plan
            </TabsTrigger>
            <TabsTrigger value="new" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Choose New Plan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl hover-scale transition-all duration-300 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="h-6 w-6 text-purple-500" />
                    Current Plan Details
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Check className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {currentPlan.name}
                    </h3>
                    <p className="text-gray-600 font-semibold">{currentPlan.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Next billing date
                    </p>
                    <p className="font-semibold text-blue-600">{currentPlan.nextBilling}</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    Plan Features
                  </h4>
                  <div className="grid gap-3">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button variant="outline" className="flex-1 hover-scale transition-transform duration-200">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </Button>
                  <Button variant="destructive" className="hover-scale transition-transform duration-200">
                    Cancel Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {availablePlans.map((plan, index) => (
                <Card key={plan.id} className={`backdrop-blur-sm bg-white/80 border-0 shadow-xl hover-scale transition-all duration-300 animate-fade-in relative overflow-hidden ${plan.popular ? 'ring-2 ring-blue-500' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  {plan.popular && (
                    <>
                      <div className={`h-1 bg-gradient-to-r ${plan.color}`}></div>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-blue-500 text-white shadow-lg">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    </>
                  )}
                  <CardHeader className="text-center pt-8">
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r ${plan.color}`}>
                        <plan.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.price}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className={`w-full transition-all duration-300 hover-scale ${
                        plan.popular 
                          ? `bg-gradient-to-r ${plan.color} hover:opacity-90` 
                          : plan.id === 'premium' 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : `bg-gradient-to-r ${plan.color} hover:opacity-90`
                      }`}
                      disabled={plan.id === 'premium'}
                    >
                      {plan.id === 'premium' ? 'Current Plan' : 'Choose Plan'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientPlan;
