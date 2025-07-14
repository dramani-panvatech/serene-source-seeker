
import React, { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Plus, Share, ChevronLeft, ChevronRight, Clock, Users, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Calendar = () => {
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


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [showNewAppointment, setShowNewAppointment] = useState(false);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8;
    return hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
  });

  const appointments = [
    {
      id: 1,
      title: 'Consultation - John Smith',
      time: '9:00 AM',
      duration: 60,
      type: 'consultation',
      status: 'confirmed',
      day: 0
    },
    {
      id: 2,
      title: 'Follow-up - Sarah Wilson',
      time: '10:30 AM',
      duration: 30,
      type: 'followup',
      status: 'pending',
      day: 0
    },
    {
      id: 3,
      title: 'Therapy - Mike Johnson',
      time: '2:00 PM',
      duration: 90,
      type: 'therapy',
      status: 'confirmed',
      day: 2
    }
  ];

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getAppointmentColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'followup': return 'bg-green-100 border-green-300 text-green-800';
      case 'therapy': return 'bg-purple-100 border-purple-300 text-purple-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const handleCellRightClick = (e: React.MouseEvent, timeSlot: string, dayIndex: number) => {
    e.preventDefault();
    setShowNewAppointment(true);
  };

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
                <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
                  <p className="text-gray-600">Manage your appointments and schedule</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Dialog open={showNewAppointment} onOpenChange={setShowNewAppointment}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                      <Plus className="h-4 w-4 mr-2" />
                      New Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>New Appointment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Appointment title" />
                      </div>
                      <div>
                        <Label htmlFor="patient">Customer</Label>
                        <Input id="patient" placeholder="Customer name" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Date</Label>
                          <Input id="date" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="time">Time</Label>
                          <Input id="time" type="time" />
                        </div>
                      </div>
                      <Button className="w-full">Create Appointment</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Mini Calendar */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                        <div key={day} className="p-2 font-medium text-gray-600">{day}</div>
                      ))}
                      {Array.from({ length: 35 }, (_, i) => (
                        <div key={i} className="p-2 text-gray-800 hover:bg-blue-100 rounded cursor-pointer">
                          {i + 1 <= 31 ? i + 1 : ''}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Today's Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Today's Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm">Total Hours</span>
                      </div>
                      <span className="font-semibold">8.5h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Appointments</span>
                      </div>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-purple-600 mr-2" />
                        <span className="text-sm">Free Slots</span>
                      </div>
                      <span className="font-semibold">4</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Next Appointment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-900">John Smith</p>
                        <p className="text-sm text-blue-700">Consultation</p>
                        <p className="text-sm text-blue-600">9:00 AM - 10:00 AM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Calendar */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <h2 className="text-xl font-semibold">{formatDate(selectedDate)}</h2>
                          <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" onClick={goToToday}>
                          Today
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={viewMode === 'week' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setViewMode('week')}
                        >
                          Week
                        </Button>
                        <Button
                          variant={viewMode === 'month' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setViewMode('month')}
                        >
                          Month
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Week View */}
                    <div className="grid grid-cols-8 border-b bg-gray-50">
                      <div className="p-4 text-sm font-medium text-gray-600 border-r"></div>
                      {weekDays.map((day, index) => (
                        <div key={day} className="p-4 text-center border-r last:border-r-0">
                          <div className="text-sm font-medium text-gray-600">{day.slice(0, 3)}</div>
                          <div className="text-lg font-semibold mt-1">{8 + index}</div>
                        </div>
                      ))}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {timeSlots.map((time, timeIndex) => (
                        <div key={time} className="grid grid-cols-8 border-b last:border-b-0 min-h-[80px]">
                          <div className="p-4 text-sm text-gray-600 border-r bg-gray-50">
                            {time}
                          </div>
                          {weekDays.map((day, dayIndex) => (
                            <div
                              key={`${time}-${day}`}
                              className="p-2 border-r last:border-r-0 hover:bg-gray-50 relative cursor-pointer"
                              onContextMenu={(e) => handleCellRightClick(e, time, dayIndex)}
                              onClick={() => setShowNewAppointment(true)}
                            >
                              {appointments
                                .filter(apt => apt.day === dayIndex && apt.time === time)
                                .map(appointment => (
                                  <div
                                    key={appointment.id}
                                    className={`p-2 rounded-lg border-l-4 text-xs cursor-pointer hover:shadow-md transition-shadow ${getAppointmentColor(appointment.type)}`}
                                  >
                                    <p className="font-medium truncate">{appointment.title}</p>
                                    <p className="text-xs opacity-75">{appointment.time}</p>
                                    <Badge
                                      variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                                      className="text-xs mt-1"
                                    >
                                      {appointment.status}
                                    </Badge>
                                  </div>
                                ))
                              }
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Calendar;
