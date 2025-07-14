import React, { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Filter, Grid3X3, Table, Plus, Star, MapPin, Phone, Mail, Eye, CheckCircle2 } from 'lucide-react';
import { getMyCustomers, setUserActiveStatus, getUserById, updateUser } from '@/lib/userService';
import { toast } from '@/components/ui/use-toast';
import { CustomerForm } from './Customers';
import { getCategories } from '../lib/serviceService';
import { insertUser } from '@/lib/userService';

const Provider = () => {

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

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [providers, setProviders] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  const [confirmMessage, setConfirmMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('Instructor'); // Default to Instructor for staff
  const [category, setCategory] = useState<number[]>([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [experience, setExperience] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const handleCancel = () => {
    setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setPassword(''); setShowPassword(false);
    setAddress(''); setCity(''); setStateVal(''); setPincode(''); setNotes(''); setLoading(false); setError('');
  };
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const payload: any = {
        firstName,
        lastName,
        email,
        phoneNumber: phone,
        address,
        city,
        state: stateVal,
        pincode,
        password,
        PasswordHash: password,
        role,
        notes, // Bio field
        StaffExperiences: [
          {
            categoryIds: category && category.length > 0 ? category.join(',') : '',
            yearsOfExperience: experience
          }
        ],
      };
      await insertUser(payload);
      toast({
        title: 'Success!',
        description: 'Staff member added successfully.',
        className: 'bg-green-100 text-green-800',
      });
      setAddDialogOpen(false);
      setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setPassword(''); setShowPassword(false);
      setAddress(''); setCity(''); setStateVal(''); setPincode(''); setNotes(''); setRole('Instructor'); setCategory([]); setExperience(''); setLoading(false); setError('');
    } catch (err) {
      setError(err.message || 'Failed to add staff member.');
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchStaff() {
      try {
        const data = await getMyCustomers('NotClient');
        const staffRaw = Array.isArray(data) ? data : data.data || [];
        // Map staff to customer-like card structure
        const staff = staffRaw.map(u => {
          let status = 'inactive';
          if ((u.status && u.status.toLowerCase() === 'active') || u.isActive === true) {
            status = 'active';
          }
          return {
            id: u.id || u.userId,
            name: `${u.firstName || ''} ${u.lastName || ''}`.trim(),
            email: u.email,
            phone: u.phoneNumber,
            address: u.address,
            city: u.city,
            state: u.state,
            pincode: u.pincode,
            status,
            lastVisit: u.lastVisit || '',
            totalAppointments: u.totalAppointments || 0,
            totalSpent: u.totalSpent || 0,
            avatar: `${(u.firstName?.[0] || '')}${(u.lastName?.[0] || '')}`.toUpperCase(),
            role: u.role || 'Provider',
            rating: u.rating || 0,
            reviews: u.reviews || 0,
            location: u.address || u.city,
            patients: u.totalAppointments || 0,
            experience:
              (u.staffExperiences && u.staffExperiences.length > 0 && u.staffExperiences[0].yearsOfExperience != null)
                ? u.staffExperiences[0].yearsOfExperience
                : (u.yearsOfExperience != null ? u.yearsOfExperience : 0),
          };
        });
        setProviders(staff);
      } catch (err) {
        setProviders([]);
      }
    }
    fetchStaff();
  }, []);

  useEffect(() => {
    if (addDialogOpen || editDialogOpen) {
      getCategories().then(setCategoryOptions).catch(() => setCategoryOptions([]));
    }
  }, [addDialogOpen, editDialogOpen]);

  // Sort providers: SuperAdmin > Admin > Instructor > others
  const roleOrder = { SuperAdmin: 1, Admin: 2, Instructor: 3 };
  const sortedProviders = [...providers].sort((a, b) => {
    const aOrder = roleOrder[a.role] || 99;
    const bOrder = roleOrder[b.role] || 99;
    return aOrder - bOrder;
  });

  const filteredProviders = sortedProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (provider.specialty ? provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) : false);
    const matchesStatus = filterStatus === 'all' || provider.status === filterStatus;
    const matchesSpecialty = filterSpecialty === 'all' || (provider.specialty ? provider.specialty === filterSpecialty : false);

    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProviders.map((provider) => (
        <Card key={provider.id} className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {provider.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{provider.name}</h3>
                  <Button
                    size="sm"
                    className={provider.status === 'active'
                      ? 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 px-2 py-0.5 text-xs h-6 min-h-0'
                      : 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 px-2 py-0.5 text-xs h-6 min-h-0'}
                    onClick={() => {
                      setConfirmMessage(
                        provider.status === 'active'
                          ? 'Do you want to set this staff member as inactive?'
                          : 'Do you want to set this staff member as active?'
                      );
                      setConfirmAction(() => async () => {
                        await setUserActiveStatus(provider.id, provider.status !== 'active');
                        // Refresh providers
                        const data = await getMyCustomers('NotClient');
                        const staffRaw = Array.isArray(data) ? data : data.data || [];
                        const staff = staffRaw.map(u => {
                          let status = 'inactive';
                          if ((u.status && u.status.toLowerCase() === 'active') || u.isActive === true) {
                            status = 'active';
                          }
                          return {
                            id: u.id || u.userId,
                            name: `${u.firstName || ''} ${u.lastName || ''}`.trim(),
                            email: u.email,
                            phone: u.phoneNumber,
                            address: u.address,
                            city: u.city,
                            state: u.state,
                            pincode: u.pincode,
                            status,
                            lastVisit: u.lastVisit || '',
                            totalAppointments: u.totalAppointments || 0,
                            totalSpent: u.totalSpent || 0,
                            avatar: `${(u.firstName?.[0] || '')}${(u.lastName?.[0] || '')}`.toUpperCase(),
                            role: u.role || 'Provider',
                            rating: u.rating || 0,
                            reviews: u.reviews || 0,
                            location: u.address || u.city,
                            patients: u.totalAppointments || 0,
                            experience:
                              (u.staffExperiences && u.staffExperiences.length > 0 && u.staffExperiences[0].yearsOfExperience != null)
                                ? u.staffExperiences[0].yearsOfExperience
                                : (u.yearsOfExperience != null ? u.yearsOfExperience : 0),
                          };
                        });
                        setProviders(staff);
                        setConfirmDialogOpen(false);
                      });
                      setConfirmDialogOpen(true);
                    }}
                  >
                    {provider.status === 'active' ? 'Active' : 'Inactive'}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-end min-w-[120px]">
                <span
                  className={
                    'text-xs font-semibold mb-1 ' +
                    (provider.role === 'Admin' ? 'text-blue-600' :
                     provider.role === 'SuperAdmin' ? 'text-purple-600' :
                     provider.role === 'Instructor' ? 'text-orange-500' :
                     'text-gray-500')
                  }
                >
                  {provider.role}
                </span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {provider.rating} ({provider.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {provider.location}
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {provider.phone}
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {provider.email}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{provider.patients}</p>
                <p className="text-sm text-gray-600">Customers</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-semibold text-gray-900">{provider.experience} Yrs</p>
                <p className="text-sm text-gray-600">Experience</p>
              </div>
            </div>

            <Button
              className="w-full"
              variant="outline"
              onClick={async () => {
                const user = await getUserById(provider.id || provider.userId);
                const userObj = user.data || user;
                // Prefer staffExperiences[0] for experience and category
                if (userObj.staffExperiences && userObj.staffExperiences.length > 0) {
                  const staffExp = userObj.staffExperiences[0];
                  userObj.experience = staffExp.yearsOfExperience || '';
                  userObj.category = staffExp.categoryIds
                    ? staffExp.categoryIds.split(',').map(id => Number(id.trim())).filter(Boolean)
                    : [];
                } else {
                  userObj.experience = userObj.yearsOfExperience || userObj.experience || '';
                  userObj.category = userObj.categoryIds && typeof userObj.categoryIds === 'string'
                    ? userObj.categoryIds.split(',').map(id => Number(id.trim())).filter(Boolean)
                    : [];
                }
                setSelectedStaff(userObj);
                setEditDialogOpen(true);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const TableView = () => (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Staff</th>
                <th className="text-left p-4 font-medium text-gray-900">Specialty</th>
                <th className="text-left p-4 font-medium text-gray-900">Rating</th>
                <th className="text-left p-4 font-medium text-gray-900">Location</th>
                <th className="text-left p-4 font-medium text-gray-900">Patients</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProviders.map((provider) => (
                <tr key={provider.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {provider.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{provider.name}</p>
                        <p className="text-sm text-gray-600">{provider.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-900">{provider.specialty}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-gray-900">{provider.rating}</span>
                      <span className="text-sm text-gray-600 ml-1">({provider.reviews})</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-900">{provider.location}</td>
                  <td className="p-4 text-gray-900">{provider.patients}</td>
                  <td className="p-4">
                    <Badge
                      className={provider.status === 'active'
                        ? 'bg-green-100 text-green-700 border border-green-300 px-2 py-0.5 text-xs h-6 min-h-0'
                        : 'bg-red-100 text-red-700 border border-red-300 px-2 py-0.5 text-xs h-6 min-h-0'}
                      style={{ cursor: 'pointer' }}
                    >
                      {provider.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Button variant="outline" size="sm" onClick={async () => {
                      const user = await getUserById(provider.id || provider.userId);
                      const userObj = user.data || user;
                      // Prefer staffExperiences[0] for experience and category
                      if (userObj.staffExperiences && userObj.staffExperiences.length > 0) {
                        const staffExp = userObj.staffExperiences[0];
                        userObj.experience = staffExp.yearsOfExperience || '';
                        userObj.category = staffExp.categoryIds
                          ? staffExp.categoryIds.split(',').map(id => Number(id.trim())).filter(Boolean)
                          : [];
                      } else {
                        userObj.experience = userObj.yearsOfExperience || userObj.experience || '';
                        userObj.category = userObj.categoryIds && typeof userObj.categoryIds === 'string'
                          ? userObj.categoryIds.split(',').map(id => Number(id.trim())).filter(Boolean)
                          : [];
                      }
                      setSelectedStaff(userObj);
                      setEditDialogOpen(true);
                    }}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50"
        style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}>
        <AdminSidebar onWidthChange={setSidebarWidth} />
        <main className="flex-1 p-6">
          <div className="mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Staff</h1>
                <p className="text-gray-600 mt-1">Manage your healthcare Staff</p>
              </div>
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Staff
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                  </DialogHeader>
                  <CustomerForm
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    email={email}
                    setEmail={setEmail}
                    experience={experience}
                    setExperience={setExperience}
                    phone={phone}
                    setPhone={setPhone}
                    password={password}
                    setPassword={setPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    address={address}
                    setAddress={setAddress}
                    city={city}
                    setCity={setCity}
                    state={stateVal}
                    setState={setStateVal}
                    pincode={pincode}
                    setPincode={setPincode}
                    notes={notes}
                    setNotes={setNotes}
                    loading={loading}
                    error={error}
                    onCancel={handleCancel}
                    onSubmit={handleSubmit}
                    buttonText="Add Staff Member"
                    role={role}
                    setRole={setRole}
                    category={category}
                    setCategory={setCategory}
                    categoryOptions={categoryOptions}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search Staff..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Neurology">Neurology</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center space-x-2 border rounded-lg p-1">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'table' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                      >
                        <Table className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredProviders.length} of {providers.length} Staff
              </p>
            </div>

            {/* Content */}
            {viewMode === 'grid' ? <GridView /> : <TableView />}
          </div>
        </main>
      </div>
      {/* Custom Confirmation Dialog for Staff */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
          </DialogHeader>
          <div className="py-4">{confirmMessage}</div>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
            <Button
              className="bg-green-600 text-white"
              onClick={async () => {
                await confirmAction();
                setConfirmDialogOpen(false);
              }}
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
          </DialogHeader>
          {selectedStaff && (
            <CustomerForm
              firstName={selectedStaff.firstName}
              setFirstName={val => setSelectedStaff({ ...selectedStaff, firstName: val })}
              lastName={selectedStaff.lastName}
              setLastName={val => setSelectedStaff({ ...selectedStaff, lastName: val })}
              email={selectedStaff.email}
              setEmail={val => setSelectedStaff({ ...selectedStaff, email: val })}
              experience={selectedStaff.experience}
              setExperience={val => setSelectedStaff({ ...selectedStaff, experience: val })}
              phone={selectedStaff.phoneNumber}
              setPhone={val => setSelectedStaff({ ...selectedStaff, phoneNumber: val })}
              password={selectedStaff.PasswordHash || ''}
              setPassword={val => setSelectedStaff({ ...selectedStaff, PasswordHash: val })}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              address={selectedStaff.address}
              setAddress={val => setSelectedStaff({ ...selectedStaff, address: val })}
              city={selectedStaff.city}
              setCity={val => setSelectedStaff({ ...selectedStaff, city: val })}
              state={selectedStaff.state}
              setState={val => setSelectedStaff({ ...selectedStaff, state: val })}
              pincode={selectedStaff.pincode}
              setPincode={val => setSelectedStaff({ ...selectedStaff, pincode: val })}
              notes={selectedStaff.notes}
              setNotes={val => setSelectedStaff({ ...selectedStaff, notes: val })}
              loading={loading}
              error={error}
              onCancel={() => setEditDialogOpen(false)}
              onSubmit={async () => {
                const payload = {
                  ...selectedStaff,
                  StaffExperiences: [
                    {
                      categoryIds: selectedStaff.category && selectedStaff.category.length > 0
                        ? selectedStaff.category.join(',')
                        : '',
                      yearsOfExperience: selectedStaff.experience
                    }
                  ]
                };
                await updateUser(payload);
                toast({
                  title: 'Success!',
                  description: 'Staff member updated successfully.',
                  className: 'bg-green-100 text-green-800',
                });
                setEditDialogOpen(false);
              }}
              buttonText="Update Staff Member"
              role={selectedStaff.role}
              setRole={val => setSelectedStaff({ ...selectedStaff, role: val })}
              category={selectedStaff.category}
              setCategory={arr => setSelectedStaff({ ...selectedStaff, category: arr })}
              categoryOptions={categoryOptions}
            />
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default Provider;