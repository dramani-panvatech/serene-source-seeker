
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getLocationList, insertLocation, updateLocation, deleteLocation } from '../lib/locationService';

const locationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Valid email is required'),
  website: z.string().url('Valid website URL is required').optional().or(z.literal('')),
  latitude: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
  longitude: z.number().min(-180).max(180, 'Longitude must be between -180 and 180'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  amenities: z.string().min(1, 'Amenities are required'),
});

type LocationFormData = z.infer<typeof locationSchema>;

interface Location extends LocationFormData {
  id: string;
}

const Location = () => {
  const [sidebarWidth, setSidebarWidth] = useState('250px');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [locations, setLocations] = useState<Location[]>([
    
  ]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const apiData = await getLocationList();
        // Map API data to Location[]
        const mapped = (Array.isArray(apiData) ? apiData : apiData.data || apiData.LocationList || [])
          .map((item: any) => ({
            id: String(item.locationId || item.id),
            name: item.name,
            description: item.description,
            address: item.address,
            city: item.city,
            state: item.state,
            postalCode: item.postalCode,
            country: item.country,
            phoneNumber: item.phoneNumber,
            email: item.email,
            website: item.website || '',
            latitude: item.latitude,
            longitude: item.longitude,
            capacity: item.capacity,
            amenities: item.amenities,
          }));
        setLocations(mapped);
      } catch (err) {
        // Optionally handle error (e.g., show toast)
        setLocations([]);
      }
    }
    fetchLocations();
  }, []);

  const form = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phoneNumber: '',
      email: '',
      website: '',
      latitude: 0,
      longitude: 0,
      capacity: 1,
      amenities: '',
    },
  });

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data: LocationFormData) => {
    try {
      if (editingLocation) {
        await updateLocation({ ...data, locationId: editingLocation.id });
      } else {
        await insertLocation(data);
      }
      // Refresh list after add/edit
      const apiData = await getLocationList();
      const mapped = (Array.isArray(apiData) ? apiData : apiData.data || apiData.LocationList || [])
        .map((item: any) => ({
          id: String(item.locationId || item.id),
          name: item.name,
          description: item.description,
          address: item.address,
          city: item.city,
          state: item.state,
          postalCode: item.postalCode,
          country: item.country,
          phoneNumber: item.phoneNumber,
          email: item.email,
          website: item.website || '',
          latitude: item.latitude,
          longitude: item.longitude,
          capacity: item.capacity,
          amenities: item.amenities,
        }));
      setLocations(mapped);
      setIsDialogOpen(false);
      setEditingLocation(null);
      form.reset();
    } catch (err) {
      // Optionally show error (e.g., toast)
      alert('Failed to save location.');
    }
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    form.reset(location);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLocation(id);
      // Refresh list after delete
      const apiData = await getLocationList();
      const mapped = (Array.isArray(apiData) ? apiData : apiData.data || apiData.LocationList || [])
        .map((item: any) => ({
          id: String(item.locationId || item.id),
          name: item.name,
          description: item.description,
          address: item.address,
          city: item.city,
          state: item.state,
          postalCode: item.postalCode,
          country: item.country,
          phoneNumber: item.phoneNumber,
          email: item.email,
          website: item.website || '',
          latitude: item.latitude,
          longitude: item.longitude,
          capacity: item.capacity,
          amenities: item.amenities,
        }));
      setLocations(mapped);
    } catch (err) {
      alert('Failed to delete location.');
    }
  };

  const handleAddNew = () => {
    setEditingLocation(null);
    form.reset({
      name: '',
      description: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phoneNumber: '',
      email: '',
      website: '',
      latitude: 0,
      longitude: 0,
      capacity: 1,
      amenities: '',
    });
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
                <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
                <p className="text-gray-600 mt-1">Manage your facility locations</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleAddNew} className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Plus className="h-4 w-4" />
                    Add Location
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingLocation ? 'Edit Location' : 'Add New Location'}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter location name" />
                              </FormControl>
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
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Enter location description" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter street address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter city" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter state" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter Zip code" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter country" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter phone number" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" placeholder="Enter email address" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter website URL" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="latitude"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Latitude</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="number"
                                  step="any"
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  placeholder="Enter latitude"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="longitude"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Longitude</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="number"
                                  step="any"
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  placeholder="Enter longitude"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="amenities"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amenities</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="List available amenities" />
                            </FormControl>
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
                          {editingLocation ? 'Update' : 'Create'} Location
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
                      placeholder="Search locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto w-full">
                <div className="p-4 border-b text-gray-700 font-medium">
                      Showing {filteredLocations.length} of {locations.length} Locations
                    </div>
                  <Table className="min-w-[1200px] w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Zip Code</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Website</TableHead>
                        <TableHead>Latitude</TableHead>
                        <TableHead>Longitude</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Amenities</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLocations.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={15} className="text-center text-gray-500 py-8">
                            No locations found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredLocations.map((location) => (
                          <TableRow key={location.id}>
                            <TableCell className="font-medium">{location.name}</TableCell>
                            <TableCell className="max-w-[120px] truncate whitespace-nowrap">{location.description}</TableCell>
                            <TableCell className="max-w-[120px] truncate whitespace-nowrap">{location.address}</TableCell>
                            <TableCell>{location.city}</TableCell>
                            <TableCell>{location.state}</TableCell>
                            <TableCell>{location.postalCode}</TableCell>
                            <TableCell>{location.country}</TableCell>
                            <TableCell>{location.phoneNumber}</TableCell>
                            <TableCell className="max-w-[120px] truncate whitespace-nowrap">{location.email}</TableCell>
                            <TableCell className="max-w-[120px] truncate whitespace-nowrap">
                              {location.website ? (
                                <a 
                                  href={location.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  {location.website}
                                </a>
                              ) : (
                                '-'
                              )}
                            </TableCell>
                            <TableCell>{location.latitude}</TableCell>
                            <TableCell>{location.longitude}</TableCell>
                            <TableCell>{location.capacity}</TableCell>
                            <TableCell className="max-w-[120px] truncate whitespace-nowrap">{location.amenities}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(location)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(location.id)}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Location;
