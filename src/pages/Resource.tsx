
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Edit, Trash2, Filter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getResourceList, insertResource, updateResource, deleteResource } from '@/lib/resourceService';

const resourceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.string().min(1, 'Type is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  locationId: z.string().optional(), // No longer required
  status: z.boolean(),
});

type ResourceFormData = z.infer<typeof resourceSchema>;

interface Resource extends ResourceFormData {
  id: string;
  createdDate: string;
}

const Resource = () => {
  const [sidebarWidth, setSidebarWidth] = useState('250px');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      name: 'Conference Room A',
      description: 'Large conference room with projector',
      type: 'Meeting Room',
      capacity: 12,
      locationId: 'LOC001',
      status: true,
      createdDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Medical Equipment Unit',
      description: 'Portable medical diagnostic equipment',
      type: 'Equipment',
      capacity: 1,
      locationId: 'LOC002',
      status: false,
      createdDate: '2024-01-20',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  React.useEffect(() => {
    // Ensure tenantId is set for demo/testing
    if (!localStorage.getItem('tenantId')) {
      localStorage.setItem('tenantId', '1');
    }
    setLoading(true);
    getResourceList()
      .then((data) => {
        if (!Array.isArray(data.data)) {
          setError('API did not return a resource list array.');
          setResources([]);
          return;
        }
        setResources(
          data.data.map((item: any) => ({
            id: item.resourceId ? String(item.resourceId) : '',
            name: item.name,
            description: item.description,
            type: item.type,
            capacity: item.capacity,
            locationId: item.locationId ? String(item.locationId) : '',
            status: item.isActive,
            createdDate: item.createdAt?.split('T')[0] ?? '',
          }))
        );
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch resources');
      })
      .finally(() => setLoading(false));
  }, []);

  const form = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      name: '',
      description: '',
      type: '',
      capacity: 1,
      locationId: '',
      status: true,
    },
  });

  const filteredResources = resources.filter(
    (resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (resource.locationId || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && resource.status) ||
        (statusFilter === 'inactive' && !resource.status);
      return matchesSearch && matchesStatus;
    }
  );

  const onSubmit = async (data: ResourceFormData) => {
    setLoading(true);
    setError(null);
    try {
      if (!editingResource) {
        await insertResource({
          ...data,
          isDeleted: false,
        });
        // Refresh resource list
        const resp = await getResourceList();
        setResources(
          Array.isArray(resp.data)
            ? resp.data.map((item: any) => ({
                id: item.resourceId ? String(item.resourceId) : '',
                name: item.name,
                description: item.description,
                type: item.type,
                capacity: item.capacity,
                locationId: item.locationId ? String(item.locationId) : '',
                status: item.isActive,
                createdDate: item.createdAt?.split('T')[0] ?? '',
              }))
            : []
        );
      } else {
        await updateResource({
          ...data,
          resourceId: editingResource.id,
          createdAt: editingResource.createdDate,
          createdBy: (editingResource as any)?.createdBy,
          isDeleted: false,
        });
        // Refresh resource list
        const resp = await getResourceList();
        setResources(
          Array.isArray(resp.data)
            ? resp.data.map((item: any) => ({
                id: item.resourceId ? String(item.resourceId) : '',
                name: item.name,
                description: item.description,
                type: item.type,
                capacity: item.capacity,
                locationId: item.locationId ? String(item.locationId) : '',
                status: item.isActive,
                createdDate: item.createdAt?.split('T')[0] ?? '',
              }))
            : []
        );
      }
      setIsDialogOpen(false);
      setEditingResource(null);
      form.reset();
    } catch (err: any) {
      setError(err.message || 'Failed to save resource');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    console.log(resource,'resource');
    
    form.reset({
      name: resource.name,
      description: resource.description,
      type: resource.type,
      capacity: resource.capacity,
      locationId: resource.locationId,
      status: resource.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const email = localStorage.getItem('email') || '';
      await deleteResource(id, email);
      // Refresh resource list
      const resp = await getResourceList();
      setResources(
        Array.isArray(resp.data)
          ? resp.data.map((item: any) => ({
              id: item.resourceId ? String(item.resourceId) : '',
              name: item.name,
              description: item.description,
              type: item.type,
              capacity: item.capacity,
              locationId: item.locationId ? String(item.locationId) : '',
              status: item.isActive,
              createdDate: item.createdAt?.split('T')[0] ?? '',
            }))
          : []
      );
    } catch (err: any) {
      setError(err.message || 'Failed to delete resource');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingResource(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <SidebarProvider>
      <div 
        className="min-h-screen flex w-full bg-gray-50" 
        style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}
      >
        <AdminSidebar onWidthChange={setSidebarWidth} />
        <main className="flex-1 transition-all duration-300 ease-in-out">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
                <p className="text-gray-600 mt-1">Manage your resources and equipment</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleAddNew} className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Plus className="h-4 w-4" />
                    Add Resource
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingResource ? 'Edit Resource' : 'Add New Resource'}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter resource name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Enter resource description" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select resource type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Meeting Room">Meeting Room</SelectItem>
                                <SelectItem value="Equipment">Equipment</SelectItem>
                                <SelectItem value="Vehicle">Vehicle</SelectItem>
                                <SelectItem value="Facility">Facility</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="capacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capacity</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="number" 
                                min="1"
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                placeholder="Enter capacity"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={(value) => field.onChange(value === 'true')} value={field.value ? field.value.toString() : 'false'}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingResource ? 'Update' : 'Create'} Resource
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>

                   

                    
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                Showing {filteredResources.length} of {resources.length} Resources
                  {error && (
                    <div className="text-red-600 mb-4">{error}</div>
                  )}
                  {loading ? (
                    <div className="text-gray-600">Loading resources...</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Capacity</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredResources.map((resource) => (
                          <TableRow key={resource.id}>
                            <TableCell className="font-medium">{resource.name}</TableCell>
                            <TableCell className="max-w-xs truncate">{resource.description}</TableCell>
                            <TableCell>{resource.type}</TableCell>
                            <TableCell>{resource.capacity}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  resource.status
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {resource.status ? 'Active' : 'Inactive'}
                              </span>
                            </TableCell>
                            <TableCell>{resource.createdDate}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(resource)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(resource.id)}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Resource;
