
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, Star, Gift, Crown, Sparkles, CheckCircle } from 'lucide-react';

const ClientSubscription = () => {
  const subscriptions = [
    {
      id: 1,
      name: 'Premium Plan',
      status: 'Active',
      price: '$29.99/month',
      nextBilling: '2024-02-15',
      features: ['Unlimited bookings', 'Priority support', '20% discount']
    },
    {
      id: 2,
      name: 'Spa Package',
      status: 'Active',
      price: '$15.99/month',
      nextBilling: '2024-02-10',
      features: ['Monthly facial', 'Massage discount', 'Product samples']
    }
  ];

  const activeOfferings = [
    {
      id: 1,
      title: '20% Off All Services',
      description: 'Premium member exclusive discount',
      validUntil: '2024-12-31',
      used: 3,
      limit: 10,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Free Monthly Facial',
      description: 'Included in Spa Package subscription',
      validUntil: '2024-02-29',
      used: 0,
      limit: 1,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 3,
      title: 'Loyalty Points 2x',
      description: 'Double points on all bookings',
      validUntil: '2024-01-31',
      used: 5,
      limit: null,
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
            My Subscriptions
          </h1>
        </div>

        {/* Active Subscriptions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-500" />
            Active Subscriptions
          </h2>
          <div className='grid gap-4 md:grid-cols-2'>


            {subscriptions.map((subscription, index) => (
              <div className='col'>


                <Card key={subscription.id} className="backdrop-blur-sm bg-white/80 border-0 shadow-xl hover-scale transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-purple-500" />
                        {subscription.name}
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {subscription.status}
                        </Badge>
                      </CardTitle>
                      <p className="text-gray-600 mt-1 font-semibold">{subscription.price}</p>
                    </div>
                    <Button variant="outline" size="sm" className="hover-scale transition-transform duration-200">
                      Manage
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Features included:</p>
                        <ul className="space-y-1">
                          {subscription.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600">Next billing date</p>
                          <p className="font-semibold text-blue-600">{subscription.nextBilling}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        {/* Active Offerings */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Gift className="h-6 w-6 text-purple-500" />
            Active Offers & Benefits
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeOfferings.map((offering, index) => (
              <Card key={offering.id} className="backdrop-blur-sm bg-white/80 border-0 shadow-xl hover-scale transition-all duration-300 animate-fade-in overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`h-2 bg-gradient-to-r ${offering.color}`}></div>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    {offering.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm">{offering.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <span className="text-gray-600">Valid until:</span>
                    <span className="font-medium text-purple-600">{offering.validUntil}</span>
                  </div>

                  {offering.limit && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Usage:</span>
                        <span className="font-medium">{offering.used}/{offering.limit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${offering.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${(offering.used / offering.limit) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {!offering.limit && (
                    <div className="text-sm p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <span className="text-gray-600">Used: </span>
                      <span className="font-medium">{offering.used} times</span>
                    </div>
                  )}

                  <Button size="sm" className={`w-full bg-gradient-to-r ${offering.color} hover:opacity-90 transition-opacity duration-300 hover-scale`}>
                    Use Offer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSubscription;
