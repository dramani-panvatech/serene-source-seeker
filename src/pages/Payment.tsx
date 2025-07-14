import React, { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreditCard, DollarSign, TrendingUp, Receipt, Plus, Settings, Wallet, Smartphone, Building } from 'lucide-react';

const Payment = () => {
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

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('stripe');
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);

  const paymentStats = [
    { label: 'Monthly Revenue', value: '$12,540', change: '+15%', color: 'bg-green-500' },
    { label: 'Pending Payments', value: '$2,350', change: '+5%', color: 'bg-yellow-500' },
    { label: 'Total Transactions', value: '1,234', change: '+12%', color: 'bg-blue-500' },
    { label: 'Failed Payments', value: '12', change: '-8%', color: 'bg-red-500' }
  ];

  const recentTransactions = [
    { id: 1, patient: 'John Smith', amount: '$150', status: 'completed', date: '2024-01-15', method: 'Credit Card' },
    { id: 2, patient: 'Sarah Wilson', amount: '$200', status: 'pending', date: '2024-01-15', method: 'PayPal' },
    { id: 3, patient: 'Mike Johnson', amount: '$175', status: 'completed', date: '2024-01-14', method: 'Apple Pay' },
    { id: 4, patient: 'Emma Davis', amount: '$125', status: 'failed', date: '2024-01-14', method: 'Credit Card' }
  ];

  const paymentMethods = [
    { id: 'stripe', name: 'Stripe', icon: CreditCard, description: 'Accept credit cards, debit cards, and digital wallets', fees: '2.9% + 30¢' },
    { id: 'paypal', name: 'PayPal', icon: Wallet, description: 'PayPal payments and PayPal Credit', fees: '2.9% + fixed fee' },
    { id: 'square', name: 'Square', icon: Receipt, description: 'In-person and online payments', fees: '2.6% + 10¢' },
    { id: 'applepay', name: 'Apple Pay', icon: Smartphone, description: 'Quick and secure payments with Apple Pay', fees: '2.9% + 30¢' },
    { id: 'googlepay', name: 'Google Pay', icon: Smartphone, description: 'Fast checkout with Google Pay', fees: '2.9% + 30¢' },
    { id: 'bank', name: 'Bank Transfer', icon: Building, description: 'Direct bank-to-bank transfers', fees: '$5 flat fee' }
  ];

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
                <div className="h-12 w-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
                  <p className="text-gray-600">Manage payments, billing, and financial settings</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Receipt className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Dialog open={showAddPaymentMethod} onOpenChange={setShowAddPaymentMethod}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Payment Method</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-medium mb-4 block">Select Payment Provider</Label>
                        <div className="grid grid-cols-2 gap-4">
                          {paymentMethods.map((method) => (
                            <div
                              key={method.id}
                              className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedPaymentMethod === method.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                              onClick={() => setSelectedPaymentMethod(method.id)}
                            >
                              <div className="flex items-center space-x-3">
                                <method.icon className="h-6 w-6 text-gray-600" />
                                <div>
                                  <h4 className="font-medium">{method.name}</h4>
                                  <p className="text-sm text-gray-500">{method.fees}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedPaymentMethod === 'stripe' && (
                        <div className="space-y-4">
                          <h4 className="font-medium">Stripe Configuration</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="stripePublishable">Publishable Key</Label>
                              <Input id="stripePublishable" placeholder="pk_test_..." />
                            </div>
                            <div>
                              <Label htmlFor="stripeSecret">Secret Key</Label>
                              <Input id="stripeSecret" type="password" placeholder="sk_test_..." />
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedPaymentMethod === 'paypal' && (
                        <div className="space-y-4">
                          <h4 className="font-medium">PayPal Configuration</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="paypalClient">Client ID</Label>
                              <Input id="paypalClient" placeholder="Your PayPal Client ID" />
                            </div>
                            <div>
                              <Label htmlFor="paypalSecret">Client Secret</Label>
                              <Input id="paypalSecret" type="password" placeholder="Your PayPal Client Secret" />
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedPaymentMethod === 'bank' && (
                        <div className="space-y-4">
                          <h4 className="font-medium">Bank Account Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="bankName">Bank Name</Label>
                              <Input id="bankName" placeholder="Bank name" />
                            </div>
                            <div>
                              <Label htmlFor="accountNumber">Account Number</Label>
                              <Input id="accountNumber" placeholder="Account number" />
                            </div>
                            <div>
                              <Label htmlFor="routingNumber">Routing Number</Label>
                              <Input id="routingNumber" placeholder="Routing number" />
                            </div>
                            <div>
                              <Label htmlFor="accountType">Account Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="checking">Checking</SelectItem>
                                  <SelectItem value="savings">Savings</SelectItem>
                                  <SelectItem value="business">Business</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowAddPaymentMethod(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setShowAddPaymentMethod(false)}>
                          Add Payment Method
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {paymentStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                        </div>
                      </div>
                      <div className={`${stat.color} p-3 rounded-xl`}>
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-white border">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="methods">Payment Methods</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTransactions.map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <DollarSign className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{transaction.patient}</p>
                                <p className="text-sm text-gray-600">{transaction.method} • {transaction.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{transaction.amount}</p>
                              <Badge
                                variant={
                                  transaction.status === 'completed' ? 'default' :
                                    transaction.status === 'pending' ? 'secondary' : 'destructive'
                                }
                              >
                                {transaction.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Receipt className="h-4 w-4 mr-2" />
                        Issue Refund
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Process Payment
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Payment Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="methods">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Payment Methods</CardTitle>
                      <p className="text-gray-600">Choose which payment methods to accept from your patients</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <method.icon className="h-5 w-5 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">{method.name}</h3>
                              </div>
                              <input
                                type="checkbox"
                                defaultChecked={method.id === 'stripe' || method.id === 'paypal'}
                                className="h-4 w-4 text-blue-600"
                              />
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                            <p className="text-sm font-medium text-gray-900">Fees: {method.fees}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="transactions">
                <Card>
                  <CardHeader>
                    <CardTitle>All Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Input placeholder="Search transactions..." className="max-w-sm" />
                        <Select defaultValue="all">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b">
                            <tr>
                              <th className="text-left p-4 font-medium">Transaction ID</th>
                              <th className="text-left p-4 font-medium">Patient</th>
                              <th className="text-left p-4 font-medium">Amount</th>
                              <th className="text-left p-4 font-medium">Method</th>
                              <th className="text-left p-4 font-medium">Status</th>
                              <th className="text-left p-4 font-medium">Date</th>
                              <th className="text-left p-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentTransactions.map((transaction) => (
                              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-mono text-sm">TXN-{transaction.id.toString().padStart(6, '0')}</td>
                                <td className="p-4">{transaction.patient}</td>
                                <td className="p-4 font-semibold">{transaction.amount}</td>
                                <td className="p-4">{transaction.method}</td>
                                <td className="p-4">
                                  <Badge
                                    variant={
                                      transaction.status === 'completed' ? 'default' :
                                        transaction.status === 'pending' ? 'secondary' : 'destructive'
                                    }
                                  >
                                    {transaction.status}
                                  </Badge>
                                </td>
                                <td className="p-4">{transaction.date}</td>
                                <td className="p-4">
                                  <Button variant="outline" size="sm">View</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input id="businessName" defaultValue="FlowTime Medical Practice" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxId">Tax ID</Label>
                        <Input id="taxId" placeholder="XX-XXXXXXX" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Billing Address</Label>
                        <Input id="address" placeholder="123 Main St, City, State 12345" />
                      </div>
                      <Button>Update Billing Info</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Invoice Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                        <Input id="invoicePrefix" defaultValue="INV-" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paymentTerms">Payment Terms</Label>
                        <Select defaultValue="net30">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Due Immediately</SelectItem>
                            <SelectItem value="net15">Net 15 Days</SelectItem>
                            <SelectItem value="net30">Net 30 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="autoSend" className="h-4 w-4" />
                        <Label htmlFor="autoSend">Auto-send invoices</Label>
                      </div>
                      <Button>Save Settings</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">General Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Require payment before appointment</p>
                            <p className="text-sm text-gray-600">Patients must pay before booking is confirmed</p>
                          </div>
                          <input type="checkbox" className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Send payment receipts</p>
                            <p className="text-sm text-gray-600">Automatically email receipts to patients</p>
                          </div>
                          <input type="checkbox" defaultChecked className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Allow partial payments</p>
                            <p className="text-sm text-gray-600">Let patients pay in installments</p>
                          </div>
                          <input type="checkbox" className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Currency & Taxes</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currency">Default Currency</Label>
                          <Select defaultValue="usd">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usd">USD - US Dollar</SelectItem>
                              <SelectItem value="eur">EUR - Euro</SelectItem>
                              <SelectItem value="gbp">GBP - British Pound</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taxRate">Tax Rate (%)</Label>
                          <Input id="taxRate" type="number" placeholder="8.25" />
                        </div>
                      </div>
                    </div>

                    <Button>Save Settings</Button>
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

export default Payment;
