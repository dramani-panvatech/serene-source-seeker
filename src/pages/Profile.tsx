import React, { useState, useRef, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, Save, Edit, Settings, Clock, Calendar, User, Shield, Bell, Upload, X } from 'lucide-react';
import { getProfileById } from '@/lib/userService';

const Profile = () => {
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

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    phone: '',
    timeZone: '',
    publicBookingLink: '',
    specialty: '',
    experience: '',
    bio: '',
    location: ''
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        const result = await getProfileById(userId);
        const data = result.data || result;
        setProfileData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
          email: data.email || '',
          phone: data.phoneNumber || '',
          timeZone: data.timeZone || '',
          publicBookingLink: data.publicBookingLink || '',
          specialty: data.specialty || '',
          experience: (data.StaffExperiences && data.StaffExperiences.length > 0 && data.StaffExperiences[0].yearsOfExperience != null)
            ? data.StaffExperiences[0].yearsOfExperience : (data.yearsOfExperience != null ? data.yearsOfExperience : ''),
          bio: data.Notes || '',
          location: data.address || data.city || '',
        });
        console.log(data.firstName, 'data');
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchProfile();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        setShowImageUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Compute initials for avatar fallback
  const getInitials = (firstName: string, lastName: string) => {
    if (firstName && lastName) return (firstName[0] + lastName[0]).toUpperCase();
    if (firstName) return firstName[0].toUpperCase();
    if (lastName) return lastName[0].toUpperCase();
    return '';
  };
  const initials = getInitials(profileData.firstName, profileData.lastName);
  //console.log(profileData);

  const stats = [
    { label: 'Total Customers', value: '1,234', color: 'bg-blue-500' },
    { label: 'Appointments', value: '5,678', color: 'bg-green-500' },
    { label: 'Years Experience', value: '12', color: 'bg-purple-500' },
    { label: 'Rating', value: '4.9', color: 'bg-yellow-500' }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50"
        style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}>
        <AdminSidebar onWidthChange={setSidebarWidth} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                  <p className="text-gray-600 mt-1">Manage your account and preferences</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Profile Header Card */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      {profileImage ? (
                        <AvatarImage src={profileImage} alt="Profile" />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold">
                          {initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <Dialog open={showImageUpload} onOpenChange={setShowImageUpload}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                          <Camera className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Update Profile Picture</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {profileImage && (
                            <div className="text-center">
                              <Avatar className="h-32 w-32 mx-auto mb-4">
                                <AvatarImage src={profileImage} alt="Preview" />
                              </Avatar>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={removeImage}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Remove Image
                              </Button>
                            </div>
                          )}

                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-4">
                              Drop your image here, or{' '}
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                              >
                                browse
                              </button>
                            </p>
                            <p className="text-sm text-gray-500">
                              Supports: JPG, PNG, GIF (max 5MB)
                            </p>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Choose File
                            </Button>
                            <Button
                              className="flex-1"
                              onClick={() => setShowImageUpload(false)}
                              disabled={!profileImage}
                            >
                              Save Photo
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{`${profileData.firstName} ${profileData.lastName}`.trim()}</h2>
                    <p className="text-gray-600">{profileData.specialty}</p>
                    <p className="text-sm text-gray-500 mt-1">{profileData.email}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Active
                      </Badge>
                      <Badge variant="outline">
                        {profileData.experience} Experience
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className={`w-3 h-3 ${stat.color} rounded-full mx-auto mb-1`}></div>
                        <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-white border">
                <TabsTrigger value="personal" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Personal</span>
                </TabsTrigger>
                <TabsTrigger value="professional" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Professional</span>
                </TabsTrigger>
                <TabsTrigger value="availability" className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Availability</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Integrations</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Personal Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" value={profileData.firstName} onChange={e => setProfileData({ ...profileData, firstName: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" value={profileData.lastName} onChange={e => setProfileData({ ...profileData, lastName: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Bio & Description</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bio">Professional Bio</Label>
                        <textarea
                          id="bio"
                          rows={6}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          placeholder="Tell patients about your background and expertise..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeZone">Time Zone</Label>
                        <Select value={profileData.timeZone} onValueChange={(value) => setProfileData({ ...profileData, timeZone: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="professional">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="specialty">Specialty</Label>
                          <Select value={profileData.specialty} onValueChange={(value) => setProfileData({ ...profileData, specialty: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Cardiology">Cardiology</SelectItem>
                              <SelectItem value="Neurology">Neurology</SelectItem>
                              <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Years of Experience</Label>
                          <Input
                            id="experience"
                            value={profileData.experience}
                            onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bookingLink">Public Booking Link</Label>
                          <Input
                            id="bookingLink"
                            value={profileData.publicBookingLink}
                            onChange={(e) => setProfileData({ ...profileData, publicBookingLink: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">Booking Settings</h4>
                          <p className="text-sm text-blue-700 mb-3">Configure how patients can book appointments with you.</p>
                          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Booking Settings
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability">
                <Card>
                  <CardHeader>
                    <CardTitle>Working Hours & Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Set your availability for patient bookings.</p>
                    <div className="space-y-4">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                        <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{day}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input type="time" defaultValue="09:00" className="w-24" />
                            <span>to</span>
                            <Input type="time" defaultValue="17:00" className="w-24" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { label: 'New appointment bookings', description: 'Get notified when patients book appointments' },
                        { label: 'Appointment reminders', description: 'Receive reminders before appointments' },
                        { label: 'Payment notifications', description: 'Get notified about payment updates' },
                        { label: 'Calendar sync', description: 'Sync appointments with your calendar' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Change Password</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" />
                          </div>
                        </div>
                        <Button variant="outline">Update Password</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations">
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar & Integrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">Connect with your favorite tools and services.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Google Calendar</h4>
                          <p className="text-sm text-gray-600 mb-3">Sync your appointments with Google Calendar</p>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Outlook Calendar</h4>
                          <p className="text-sm text-gray-600 mb-3">Sync your appointments with Outlook</p>
                          <Button variant="outline" size="sm">Connect</Button>
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

export default Profile;
