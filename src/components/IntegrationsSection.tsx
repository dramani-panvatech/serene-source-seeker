
import React from 'react';
import { Zap, CreditCard, Calendar, Video, Target, Mail, MessageSquare, Smartphone } from 'lucide-react';

const integrations = [
  { name: 'Zapier', icon: Zap, description: 'Connect with 5000+ apps', color: 'text-orange-500' },
  { name: 'Stripe', icon: CreditCard, description: 'Secure payment processing', color: 'text-purple-500' },
  { name: 'Google Calendar', icon: Calendar, description: 'Two-way calendar sync', color: 'text-blue-500' },
  { name: 'Zoom', icon: Video, description: 'Virtual class integration', color: 'text-blue-600' },
  { name: 'HubSpot', icon: Target, description: 'CRM and marketing tools', color: 'text-orange-600' },
  { name: 'Mailchimp', icon: Mail, description: 'Email marketing campaigns', color: 'text-yellow-500' },
  { name: 'Slack', icon: MessageSquare, description: 'Team communication', color: 'text-green-500' },
  { name: 'Mobile Apps', icon: Smartphone, description: 'iOS & Android apps', color: 'text-indigo-500' }
];

const IntegrationsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50" id="integrations">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Integrations
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect FlowTime with your favorite tools and streamline your entire workflow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
                  <integration.icon className={`w-6 h-6 ${integration.color} group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {integration.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{integration.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-white rounded-full px-8 py-4 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">API Access Available</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500">Connect any tool</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
