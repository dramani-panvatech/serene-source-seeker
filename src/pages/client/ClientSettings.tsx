
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Bell, Lock, Sparkles, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ClientSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const { toast } = useToast();

  const handleNotificationChange = (type: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [type]: value }));
    toast({
      title: "Settings Updated",
      description: `${type} notifications ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password change request');
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    });
    setPasswords({ current: '', new: '', confirm: '' });
  };

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
            <Settings className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-right">
            Settings
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Notification Settings */}
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl hover-scale transition-all duration-300 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-500" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(notifications).map(([key, value], index) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Label htmlFor={key} className="text-sm font-medium capitalize">
                    {key === 'sms' ? 'SMS' : key} Notifications
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => handleNotificationChange(key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Password Settings */}
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl hover-scale transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-500" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input
                    id="current"
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                    className="border-2 focus:border-blue-500 transition-colors duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input
                    id="new"
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                    className="border-2 focus:border-blue-500 transition-colors duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                    className="border-2 focus:border-blue-500 transition-colors duration-300"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 hover-scale transition-all duration-300"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Settings */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl hover-scale transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-green-500" />
              Account Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Privacy Settings</h3>
                <p className="text-sm text-blue-600">Manage your data and privacy preferences</p>
                <Button variant="outline" size="sm" className="mt-2 hover-scale transition-transform duration-200">
                  Configure
                </Button>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Account Data</h3>
                <p className="text-sm text-purple-600">Export or delete your account data</p>
                <Button variant="outline" size="sm" className="mt-2 hover-scale transition-transform duration-200">
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientSettings;
