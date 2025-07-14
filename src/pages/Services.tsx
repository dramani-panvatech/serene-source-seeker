import React, { useEffect, useState, useRef } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Share, MoreHorizontal, Clock, DollarSign, Users, Settings, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { insertService } from "@/lib/serviceService";
import ServiceList from "@/components/ServiceList";
import CreateServiceDialog from "@/components/CreateServiceDialog";
import Swal from 'sweetalert2';
import { deleteService } from "@/lib/serviceService";
import { useToast } from "@/components/ui/use-toast";
import { getServiceDashboardSummary } from "@/lib/serviceService";
import { getCategories } from "@/lib/serviceService";
import CategoryDialog from "./CategoryDialog";
import CategoryList from "./CategoryList";
import SessionList from "./SessionList";

const Services = () => {

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
  const [selectedCategory, setSelectedCategory] = useState('services');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryCounts, setCategoryCounts] = useState<{ services?: number }>({});

  const [serviceListKey, setServiceListKey] = useState(0);
  const refreshList = () => setServiceListKey((k) => k + 1);

  const createDialogRef = useRef(null);
  const handleEdit = (serviceId) => {
    if (createDialogRef.current && createDialogRef.current.openDialog) {
      createDialogRef.current.openDialog(serviceId);
    }
  };

  const { toast } = useToast();

  const handleDelete = async (serviceId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this service!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if (result.isConfirmed) {
      try {
        const res = await deleteService(serviceId);
        if (res.success) {
          //Swal.fire('Deleted!', 'Service has been deleted.', 'success');
          toast({
            title: 'Service deleted!',
            description: 'Service has been deleted successfully.',
            duration: 3000,
          });
          refreshList();
        } else {
          Swal.fire('Error', 'Failed to delete service.', 'error');
        }
      } catch (err) {
        Swal.fire('Error', err.message || 'Failed to delete service', 'error');
      }
    }
  };

  const [dashboardSummary, setDashboardSummary] = useState({
    totalServices: 0,
    activeBookings: 0,
    monthlyRevenue: 0,
    avgDurationMinutes: 0,
  });

  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await getServiceDashboardSummary();
        setDashboardSummary(data);
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchSummary();
  }, [serviceListKey]); // refetch when services change


  const categories = [
    { id: 'services', name: 'Services', count: categoryCounts.services || 0 },
    { id: 'classes', name: 'Classes', count: 0 },
    { id: 'category', name: 'Category', count:  0 },
    { id: 'consultations', name: 'Consultations', count: 0 }
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
                <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Services & Classes</h1>
                  <p className="text-gray-600">Manage your services, classes, and offerings</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600" onClick={() => createDialogRef.current?.openDialog()}>
                  New Service
                </Button>
                <CreateServiceDialog ref={createDialogRef} onSuccess={refreshList} />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Settings className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Services</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardSummary.totalServices}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardSummary.activeBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">${dashboardSummary.monthlyRevenue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardSummary.avgDurationMinutes}m</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-6">
              {/* Categories Sidebar */}
              <div className="w-64">
                <Card className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 mb-3">Configuration</h3>
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        className="w-full justify-between"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span>{category.name}</span>
                        <Badge variant="secondary">{category.count}</Badge>
                      </Button>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Controls */}
                {selectedCategory !== 'category' && (
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold capitalize">
                      {selectedCategory} ({categoryCounts[selectedCategory] || 0})
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search services..."
                          className="pl-10 w-80"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="flex border rounded-lg">
                        <Button
                          variant={viewMode === 'grid' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('grid')}
                        >
                          Grid
                        </Button>
                        <Button
                          variant={viewMode === 'list' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('list')}
                        >
                          List
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Content Switch */}
                {selectedCategory === 'category' ? (
                  <CategoryList />
                ) : selectedCategory === 'classes' ? (
                  <SessionList />
                ) : (
                  <ServiceList key={serviceListKey} viewMode={viewMode} onCategoryCounts={setCategoryCounts} handleEdit={handleEdit} handleDelete={handleDelete} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Services;
