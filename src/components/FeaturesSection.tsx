
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, CreditCard, Bell, RefreshCw, Settings, BarChart, Palette, Smartphone, Shield, Zap, Globe } from 'lucide-react';

const featureCategories = {
  core: {
    name: 'Core Features',
    features: [
      {
        icon: Calendar,
        title: 'Smart Scheduling',
        description: 'Advanced booking system with automated reminders, waitlists, and recurring class management.',
        color: 'bg-blue-500'
      },
      {
        icon: Users,
        title: 'Client Management',
        description: 'Complete customer profiles, attendance tracking, and automated intake forms.',
        color: 'bg-green-500'
      },
      {
        icon: CreditCard,
        title: 'Payment Processing',
        description: 'Integrated payments, package deals, and automated billing with Stripe & PayPal.',
        color: 'bg-purple-500'
      },
      {
        icon: Bell,
        title: 'Smart Notifications',
        description: 'SMS & email reminders, booking confirmations, and custom automated workflows.',
        color: 'bg-orange-500'
      }
    ]
  },
  analytics: {
    name: 'Analytics & Growth',
    features: [
      {
        icon: BarChart,
        title: 'Analytics & Reports',
        description: 'Detailed insights into class popularity, revenue trends, and business performance.',
        color: 'bg-pink-500'
      },
      {
        icon: Palette,
        title: 'Custom Branding',
        description: 'White-label booking widgets, custom domains, and branded mobile apps.',
        color: 'bg-indigo-500'
      },
      {
        icon: Zap,
        title: 'Automation',
        description: 'Connect with 3000+ apps through Zapier, webhooks, and custom API integrations.',
        color: 'bg-emerald-500'
      }
    ]
  },
  integrations: {
    name: 'Integrations',
    features: [
      {
        icon: RefreshCw,
        title: 'Calendar Sync',
        description: 'Two-way integration with Google Calendar, Outlook, and all major calendar apps.',
        color: 'bg-teal-500'
      },
      {
        icon: Settings,
        title: 'Zoom Integration',
        description: 'Seamless virtual class hosting with automatic meeting links and recordings.',
        color: 'bg-red-500'
      },
      {
        icon: Smartphone,
        title: 'Mobile Apps',
        description: 'Native iOS and Android apps for clients and instructors with offline capabilities.',
        color: 'bg-cyan-500'
      }
    ]
  },
  enterprise: {
    name: 'Enterprise',
    features: [
      {
        icon: Shield,
        title: 'Security & Compliance',
        description: 'GDPR compliant with PCI-DSS payment security and enterprise-grade data protection.',
        color: 'bg-yellow-500'
      },
      {
        icon: Globe,
        title: 'Multi-Location',
        description: 'Manage multiple studios, staff scheduling, and location-specific reporting.',
        color: 'bg-violet-500'
      }
    ]
  }
};

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white" id="features">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Grow Your Business
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools designed specifically for yoga studios, pilates centers, and wellness professionals
          </p>
        </div>

        <Tabs defaultValue="core" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 bg-white shadow-lg rounded-xl p-1 h-auto">
            <TabsTrigger 
              value="core" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-medium py-3 px-4 text-sm md:text-base"
            >
              Core Features
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-medium py-3 px-4 text-sm md:text-base"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="integrations" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-medium py-3 px-4 text-sm md:text-base"
            >
              Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="enterprise" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-medium py-3 px-4 text-sm md:text-base"
            >
              Enterprise
            </TabsTrigger>
          </TabsList>

          {Object.entries(featureCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card
                      key={index}
                      className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 bg-white animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                              {feature.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        
      </div>
    </section>
  );
};

export default FeaturesSection;
