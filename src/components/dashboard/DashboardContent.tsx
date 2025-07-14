
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, DollarSign, TrendingUp, Star, Plus, ArrowRight } from 'lucide-react';
import { getDashboardData } from '@/lib/dashboardService';
import { LOCAL_STORAGE_KEYS } from "@/lib/localStorageKeys";

type DashboardContentProps = {
  dashboard?: any;
};

const DashboardContent: React.FC<DashboardContentProps> = ({ dashboard: propDashboard }) => {
  const [dashboard, setDashboard] = useState<any>(propDashboard || null);
  const [loading, setLoading] = useState(!propDashboard);
  const [error, setError] = useState<string | null>(null);

  const firstName = localStorage.getItem(LOCAL_STORAGE_KEYS.firstName) || "";
  const lastName = localStorage.getItem(LOCAL_STORAGE_KEYS.lastName) || "";

  // Fetch dashboard data if not provided as prop
  useEffect(() => {
    if (!propDashboard) {
      const fetchDashboardData = async () => {
        try {
          setLoading(true);
          const response = await getDashboardData();
          if (response.success) {
            setDashboard(response.data);
          } else {
            setError(response.message || 'Failed to load dashboard data');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred while loading dashboard data');
        } finally {
          setLoading(false);
        }
      };

      fetchDashboardData();
    }
  }, [propDashboard]);

  const stats = [
    {
      title: 'Total Classes Held',
      value: dashboard?.totalClassesHeld ?? 0,
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Members',
      value: dashboard?.activeMembers ?? 0,
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Avg Session Time',
      value: `${dashboard?.avgClassDurationMinutes ?? 0}m`,
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      title: 'Monthly Revenue',
      value: `$${dashboard?.monthlyRevenue ?? 0}`,
      icon: DollarSign,
      color: 'bg-yellow-500'
    }
  ];

  const upcomingAppointments = dashboard?.todaysSchedule ?? [];
  const recentActivities = dashboard?.recentActivity ?? [];
  const quickActions = dashboard?.quickActions ?? [];

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back,  {firstName} {lastName}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Today</span>
            </Button>
            <Button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600">
              <Plus className="h-4 w-4" />
              <span>New Appointment</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+12%</span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold">Today's Schedule</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.length === 0 ? (
                  <p className="text-center text-gray-500">No classes scheduled today.</p>
                ) : (
                  upcomingAppointments.map((appointment: any) => (
                    <div key={appointment.classSessionId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {appointment.instructorName.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{appointment.instructorName}</p>
                          <p className="text-sm text-gray-600">{appointment.classType}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{appointment.time}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${appointment.status === 'Scheduled'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.length === 0 ? (
                  <p className="text-center text-gray-500">No recent activity.</p>
                ) : (
                  recentActivities.map((activity: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${activity.activityType === 'ClassBooked' ? 'bg-blue-100' :
                          activity.activityType === 'Payment' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                        {activity.activityType === 'ClassBooked' && <Calendar className="h-4 w-4 text-blue-600" />}
                        {activity.activityType === 'Payment' && <DollarSign className="h-4 w-4 text-green-600" />}
                        {activity.activityType === 'Completed' && <Star className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Calendar className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">Schedule Class</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Users className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium">Add Member</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <DollarSign className="h-6 w-6 text-yellow-600" />
                <span className="text-sm font-medium">Process Payment</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Clock className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-medium">View Calendar</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
