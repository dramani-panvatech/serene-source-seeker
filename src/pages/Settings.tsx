
import React, { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Settings as SettingsIcon, Shield, Bell, Users, Calendar, Globe, Database, Mail, Smartphone } from 'lucide-react';

const Settings = () => {
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


  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    appointments: true,
    payments: true,
    reminders: true
  });

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
                <div className="h-12 w-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
                  <SettingsIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                  <p className="text-gray-600">Manage your application settings and preferences</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-gray-600 to-gray-800">
                Save All Changes
              </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-7 bg-white border">
                <TabsTrigger value="general" className="flex items-center space-x-2">
                  <SettingsIcon className="h-4 w-4" />
                  <span>General</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </TabsTrigger>
                <TabsTrigger value="booking" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Booking</span>
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Integrations</span>
                </TabsTrigger>
                <TabsTrigger value="backup" className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>Backup</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input id="businessName" defaultValue="FlowTime Medical Practice" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessEmail">Business Email</Label>
                        <Input id="businessEmail" type="email" defaultValue="contact@flowtime.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessPhone">Business Phone</Label>
                        <Input id="businessPhone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessAddress">Business Address</Label>
                        <Textarea id="businessAddress" defaultValue="123 Main Street, Suite 100, New York, NY 10001" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Regional Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Time Zone</Label>
                        <Select defaultValue="america/new_york">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="america/new_york">Eastern Time (ET)</SelectItem>
                            <SelectItem value="america/chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="america/denver">Mountain Time (MT)</SelectItem>
                            <SelectItem value="america/los_angeles">Pacific Time (PT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select defaultValue="mm/dd/yyyy">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select defaultValue="usd">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD - US Dollar</SelectItem>
                            <SelectItem value="eur">EUR - Euro</SelectItem>
                            <SelectItem value="gbp">GBP - British Pound</SelectItem>
                            <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Authentication</p>
                          <p className="text-sm text-gray-600">Receive verification codes via SMS</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Authenticator App</p>
                          <p className="text-sm text-gray-600">Use an authenticator app for codes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Backup Codes</p>
                          <p className="text-sm text-gray-600">Generate backup recovery codes</p>
                        </div>
                        <Button variant="outline" size="sm">Generate</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Login Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Remember Login</p>
                          <p className="text-sm text-gray-600">Stay logged in for 30 days</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Login Alerts</p>
                          <p className="text-sm text-gray-600">Get notified of new logins</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Button variant="outline">View Login History</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Data Privacy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Data Encryption</p>
                          <p className="text-sm text-gray-600">Encrypt all stored data</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Analytics Tracking</p>
                          <p className="text-sm text-gray-600">Allow usage analytics</p>
                        </div>
                        <Switch />
                      </div>
                      <Button variant="outline">Download My Data</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Channels</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                        </div>
                        <Switch checked={notifications.email} onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                          </div>
                        </div>
                        <Switch checked={notifications.sms} onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Bell className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-600">Receive browser notifications</p>
                          </div>
                        </div>
                        <Switch checked={notifications.push} onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Types</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Appointment Notifications</p>
                          <p className="text-sm text-gray-600">New bookings and cancellations</p>
                        </div>
                        <Switch checked={notifications.appointments} onCheckedChange={(checked) => setNotifications({ ...notifications, appointments: checked })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Payment Notifications</p>
                          <p className="text-sm text-gray-600">Payment confirmations and failures</p>
                        </div>
                        <Switch checked={notifications.payments} onCheckedChange={(checked) => setNotifications({ ...notifications, payments: checked })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Reminder Notifications</p>
                          <p className="text-sm text-gray-600">Appointment reminders</p>
                        </div>
                        <Switch checked={notifications.reminders} onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">User Roles & Permissions</h4>
                        <Button>Add New User</Button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Allow user registration</p>
                            <p className="text-sm text-gray-600">Let new users create accounts</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Require email verification</p>
                            <p className="text-sm text-gray-600">Users must verify email before access</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Auto-approve bookings</p>
                            <p className="text-sm text-gray-600">Automatically approve new bookings</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="booking">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Rules</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="advanceBooking">Advance Booking (days)</Label>
                        <Input id="advanceBooking" type="number" defaultValue="30" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cancellationTime">Cancellation Time (hours)</Label>
                        <Input id="cancellationTime" type="number" defaultValue="24" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bufferTime">Buffer Time (minutes)</Label>
                        <Input id="bufferTime" type="number" defaultValue="15" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Allow same-day booking</p>
                          <p className="text-sm text-gray-600">Let patients book on the same day</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Availability Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="defaultDuration">Default Appointment Duration</Label>
                        <Select defaultValue="60">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                            <SelectItem value="90">90 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Auto-block past time slots</p>
                          <p className="text-sm text-gray-600">Prevent booking in the past</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Show availability calendar</p>
                          <p className="text-sm text-gray-600">Display calendar to patients</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="integrations">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Google Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">Sync appointments with Google Calendar</p>
                      <Button variant="outline" className="w-full">Connect</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Zoom</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">Automatically create Zoom meetings</p>
                      <Button variant="outline" className="w-full">Connect</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Slack</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">Get notifications in Slack</p>
                      <Button variant="outline" className="w-full">Connect</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="backup">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Backup & Recovery</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Automatic Backups</p>
                        <p className="text-sm text-gray-600">Daily automatic data backups</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Manual Backup</h4>
                      <p className="text-sm text-gray-600">Create a backup of all your data including appointments, patients, and settings.</p>
                      <Button>Create Backup Now</Button>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Recent Backups</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded">
                          <span className="text-sm">Backup - Jan 15, 2024 10:30 AM</span>
                          <Button variant="outline" size="sm">Restore</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <span className="text-sm">Backup - Jan 14, 2024 10:30 AM</span>
                          <Button variant="outline" size="sm">Restore</Button>
                        </div>
                      </div>
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

export default Settings;
