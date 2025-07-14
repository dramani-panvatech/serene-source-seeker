
import React, { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Search, MessageCircle, Book, Phone, Mail, Video, FileText, Clock, CheckCircle } from 'lucide-react';

const Help = () => {
  const [sidebarWidth, setSidebarWidth] = useState('250px');

  // Listen for sidebar width changes
  useEffect(() => {
    const handleSidebarWidthChange = () => {
      const width = document.documentElement.style.getPropertyValue('--sidebar-width') || '250px';
      setSidebarWidth(width);
    };

    // Set up a MutationObserver to watch for style changes
    const observer = new MutationObserver(handleSidebarWidthChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => observer.disconnect();
  }, []);


  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      id: 1,
      question: "How do I set up my booking calendar?",
      answer: "Go to Settings > Booking Settings to configure your availability, buffer times, and booking rules. You can set your working hours, block specific dates, and define appointment durations.",
      category: "setup"
    },
    {
      id: 2,
      question: "How do patients book appointments?",
      answer: "Patients can book through your public booking link, which you can find in your profile settings. They select a service, choose an available time slot, and provide their information.",
      category: "booking"
    },
    {
      id: 3,
      question: "Can I integrate with my existing calendar?",
      answer: "Yes! FlowTime integrates with Google Calendar, Outlook, and other popular calendar apps. Go to Settings > Integrations to connect your calendar.",
      category: "integrations"
    },
    {
      id: 4,
      question: "How do I set up payment processing?",
      answer: "Navigate to Payment Management and connect your preferred payment processor (Stripe, PayPal, Square, etc.). Configure your rates and payment terms in the settings.",
      category: "payments"
    },
    {
      id: 5,
      question: "How can I customize my booking page?",
      answer: "In your Profile settings, you can customize your bio, services, availability, and booking page appearance. Upload your photo and set your professional information.",
      category: "customization"
    },
    {
      id: 6,
      question: "What happens if a patient cancels?",
      answer: "Cancellations are handled according to your cancellation policy. You can set minimum notice periods and automated refund rules in Settings > Booking Rules.",
      category: "policies"
    }
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: true,
      response: "< 5 minutes"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      available: true,
      response: "< 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      action: "Call Now",
      available: false,
      response: "Business hours"
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Schedule a screen-sharing session",
      action: "Schedule",
      available: true,
      response: "Same day"
    }
  ];

  const tutorials = [
    {
      title: "Getting Started with FlowTime",
      duration: "5 min",
      difficulty: "Beginner",
      description: "Learn the basics of setting up your account and first appointment"
    },
    {
      title: "Setting Up Your Services",
      duration: "8 min",
      difficulty: "Beginner",
      description: "Create and configure your services and pricing"
    },
    {
      title: "Managing Your Calendar",
      duration: "12 min",
      difficulty: "Intermediate",
      description: "Advanced calendar management and availability settings"
    },
    {
      title: "Payment Processing Setup",
      duration: "10 min",
      difficulty: "Intermediate",
      description: "Configure payment methods and billing settings"
    },
    {
      title: "Analytics and Reporting",
      duration: "15 min",
      difficulty: "Advanced",
      description: "Understanding your business metrics and reports"
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50"
        style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}>
        <AdminSidebar onWidthChange={setSidebarWidth} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
                  <p className="text-gray-600">Get assistance and find answers to common questions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>

            {/* Quick Search */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">How can we help you?</h2>
                  <p className="text-gray-600 mb-6">Search our knowledge base or browse common topics</p>
                  <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search for help articles, tutorials, or FAQs..."
                      className="pl-12 h-12 text-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="faq" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-white border">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                <TabsTrigger value="support">Contact Support</TabsTrigger>
                <TabsTrigger value="guides">User Guides</TabsTrigger>
                <TabsTrigger value="status">System Status</TabsTrigger>
              </TabsList>

              <TabsContent value="faq">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Categories */}
                  <div className="lg:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>Categories</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start">
                          All Questions ({faqs.length})
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          Getting Started (3)
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          Booking & Calendar (5)
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          Payments (4)
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          Integrations (6)
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          Troubleshooting (8)
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* FAQ Content */}
                  <div className="lg:col-span-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <p className="text-gray-600">Found {filteredFAQs.length} results</p>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="space-y-4">
                          {filteredFAQs.map((faq) => (
                            <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border rounded-lg px-4">
                              <AccordionTrigger className="text-left">
                                <div className="flex items-center space-x-3">
                                  <Badge variant="outline" className="text-xs">
                                    {faq.category}
                                  </Badge>
                                  <span>{faq.question}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-600 pb-4">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tutorials">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tutorials.map((tutorial, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{tutorial.difficulty}</Badge>
                          <span className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {tutorial.duration}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{tutorial.description}</p>
                        <Button className="w-full">
                          <Video className="h-4 w-4 mr-2" />
                          Watch Tutorial
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="support">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Support Channels */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Get in Touch</CardTitle>
                        <p className="text-gray-600">Choose your preferred way to reach our support team</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {supportChannels.map((channel, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <channel.icon className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{channel.title}</h4>
                                <p className="text-sm text-gray-600">{channel.description}</p>
                                <p className="text-xs text-gray-500">Response: {channel.response}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              {channel.available ? (
                                <Button size="sm">{channel.action}</Button>
                              ) : (
                                <Button size="sm" variant="outline" disabled>
                                  Unavailable
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Contact Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Send us a Message</CardTitle>
                      <p className="text-gray-600">Describe your issue and we'll get back to you</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subject</label>
                        <Input placeholder="Brief description of your issue" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>General Question</option>
                          <option>Technical Issue</option>
                          <option>Billing Question</option>
                          <option>Feature Request</option>
                          <option>Bug Report</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <Textarea
                          placeholder="Please provide as much detail as possible..."
                          rows={6}
                        />
                      </div>
                      <Button className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="guides">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Start Guide</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">Get up and running in 10 minutes</p>
                      <Button variant="outline" className="w-full">
                        <Book className="h-4 w-4 mr-2" />
                        Read Guide
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Admin Manual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">Complete administrator documentation</p>
                      <Button variant="outline" className="w-full">
                        <Book className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>API Documentation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">Developer resources and API reference</p>
                      <Button variant="outline" className="w-full">
                        <Book className="h-4 w-4 mr-2" />
                        View Docs
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="status">
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <p className="text-gray-600">Current status of FlowTime services</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">All Systems Operational</p>
                          <p className="text-sm text-gray-600">Last updated: 2 minutes ago</p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-600">Online</Badge>
                    </div>

                    <div className="space-y-3">
                      {[
                        { service: "Booking System", status: "operational" },
                        { service: "Payment Processing", status: "operational" },
                        { service: "Email Notifications", status: "operational" },
                        { service: "Calendar Sync", status: "operational" },
                        { service: "Mobile App", status: "operational" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <span className="font-medium">{item.service}</span>
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-600">Operational</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        View Status History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Help;
