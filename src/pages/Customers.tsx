
import React, { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Upload, Search, Filter, Grid3X3, Table, Eye, Phone, Mail, MapPin, Calendar, User, CheckCircle2, EyeOff } from 'lucide-react';
import { insertUser, getMyCustomers, updateUser, getUserById, setUserActiveStatus } from '@/lib/userService';
import { toast } from '@/components/ui/sonner';

// Shared CustomerForm component for Add and Edit dialogs
export function CustomerForm({
  firstName, setFirstName,
  lastName, setLastName,
  email, setEmail,
  experience, setExperience, // NEW
  phone, setPhone,
  password, setPassword, showPassword, setShowPassword,
  address, setAddress,
  city, setCity,
  state, setState,
  pincode, setPincode,
  notes, setNotes,
  loading,
  error,
  onCancel,
  onSubmit,
  buttonText,
  role, setRole, // optional
  category, setCategory, // optional
  categoryOptions = []
}: {
  firstName: any, setFirstName: any,
  lastName: any, setLastName: any,
  email: any, setEmail: any,
  experience?: any, setExperience?: any,
  phone: any, setPhone: any,
  password: any, setPassword: any, showPassword: any, setShowPassword: any,
  address: any, setAddress: any,
  city: any, setCity: any,
  state: any, setState: any,
  pincode: any, setPincode: any,
  notes: any, setNotes: any,
  loading: any,
  error: any,
  onCancel: any,
  onSubmit: any,
  buttonText: any,
  role?: any, setRole?: any,
  category?: any, setCategory?: any,
  categoryOptions?: any[]
}) {
  // Debug log for category selection
  console.log('category:', category, 'categoryOptions:', categoryOptions.map(o => o.categoryId));
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = React.useRef(null);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    }
    if (showCategoryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryDropdown]);
  
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(); }}>
      <div className="space-y-6">
        <div className="flex w-full items-center gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <Button variant="outline" size="sm">Upload Photo</Button>
          </div>
          {/* Centered Role dropdown */}
          {role !== undefined && setRole && (
            <div className="mx-auto min-w-[140px]">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SuperAdmin">SuperAdmin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Instructor">Instructor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {/* Right-aligned Category dropdown */}
          {role && role !== 'Client' && (
            <div className="min-w-[200px] ml-4">
              <Label htmlFor="category">Category</Label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="w-full border rounded px-3 py-2 text-left bg-white"
                  onClick={() => setShowCategoryDropdown(v => !v)}
                >
                  {category && category.length > 0
                    ? (
                      <span title={categoryOptions.filter(opt => category.includes(Number(opt.categoryId))).map(opt => opt.name).join(', ')}>
                        {categoryOptions.filter(opt => category.includes(Number(opt.categoryId))).map(opt => opt.name).join(', ').slice(0, 20)}{categoryOptions.filter(opt => category.includes(Number(opt.categoryId))).map(opt => opt.name).join(', ').length > 20 ? '…' : ''}
                      </span>
                    )
                    : 'Select category'}
                </button>
                {showCategoryDropdown && (
                  <div className="absolute z-10 bg-white border rounded shadow-lg mt-1 max-h-48 overflow-y-auto w-full">
                    {categoryOptions.map(opt => {
                      const id = Number(opt.categoryId);
                      return (
                        <label key={id} className="flex items-center px-3 py-1 cursor-pointer hover:bg-gray-100">
                          <input
                            type="checkbox"
                            checked={category.includes(id)}
                            onChange={e => {
                              if (e.target.checked) {
                                setCategory([...category, id]);
                              } else {
                                setCategory(category.filter(cid => cid !== id));
                              }
                            }}
                            className="mr-2"
                          />
                          {opt.name}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Smith" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john.smith@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            {/* Show experience only for staff (role present and not Client) */}
            {role && role !== 'Client' ? (
              <div className="space-y-2">
                <Label htmlFor="experience">No. of Experience</Label>
                <Input id="experience" type="number" min="0" placeholder="e.g., 5" value={experience} onChange={e => setExperience && setExperience(e.target.value)} />
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 123-4567" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={typeof setShowPassword === 'function' && setShowPassword !== (() => {}) ? (showPassword ? "text" : "password") : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="pr-10"
              />
              {typeof setShowPassword === 'function' && setShowPassword !== (() => {}) && (
                <button
                  type="button"
                  className="absolute right-2 top-8 text-gray-400 hover:text-gray-700"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Main St, City, State 12345" value={address} onChange={e => setAddress(e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="State" value={state} onChange={e => setState(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" placeholder="Pincode" value={pincode} onChange={e => setPincode(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">{role && role !== 'Client' ? 'Bio' : 'Notes'}</Label>
            <textarea
              id="notes"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={role && role !== 'Client' ? 'Brief bio about the staff member...' : 'Additional notes about the customer...'}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600" disabled={loading}>
            {loading ? 'Saving...' : buttonText}
          </Button>
        </div>
      </div>
    </form>
  );
}

const Customers = () => {
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

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await getMyCustomers('Client');
        setCustomers(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchCustomers();
  }, []);

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.firstName} ${customer.lastName}`;
    const matchesSearch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    const locationString = [
      customer.address,
      customer.city,
      customer.state,
      customer.pincode
    ].filter(Boolean).join(' ').toLowerCase();
    const matchesLocation = filterLocation === 'all' || locationString.includes(filterLocation.toLowerCase());

    return matchesSearch && matchesStatus && matchesLocation;
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  const [confirmMessage, setConfirmMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCustomers.map((customer) => (
        <Card key={customer.id} className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {customer.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{customer.firstName + " " + customer.lastName}</h3>
                <p className="text-gray-600 text-sm">{customer.email}</p>
                {customer.status === 'active' ? (
                  <Button
                    size="sm"
                    className="bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 px-2 py-0.5 text-xs h-6 min-h-0"
                    onClick={() => {
                      setConfirmMessage('Do you want to set this user as inactive?');
                      setConfirmAction(() => async () => {
                        await setUserActiveStatus(customer.userId, false);
                        toast.success('Success!', {
                          description: 'Client set to inactive.',
                          className: 'bg-red-100 text-red-800',
                          icon: <CheckCircle2 className="text-red-600" />,
                        });
                        const data = await getMyCustomers('Client');
                        setCustomers(Array.isArray(data) ? data : data.data || []);
                      });
                      setConfirmDialogOpen(true);
                    }}
                  >
                    Active
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 px-2 py-0.5 text-xs h-6 min-h-0"
                    onClick={() => {
                      setConfirmMessage('Do you want to set this user as active?');
                      setConfirmAction(() => async () => {
                        await setUserActiveStatus(customer.userId, true);
                        toast.success('Success!', {
                          description: 'Client activated successfully.',
                          className: 'bg-green-100 text-green-800',
                          icon: <CheckCircle2 className="text-green-600" />,
                        });
                        const data = await getMyCustomers('Client');
                        setCustomers(Array.isArray(data) ? data : data.data || []);
                      });
                      setConfirmDialogOpen(true);
                    }}
                  >
                    Inactive
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {customer.phoneNumber}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <div>
                  {customer.address}
                  <br />
                  {[
                    [customer.city, customer.state].filter(Boolean).join(', '),
                    customer.pincode
                  ].filter(Boolean).join(' ')}
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Last visit: {customer.lastVisit}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">{customer.totalAppointments}</p>
                <p className="text-xs text-gray-600">Appointments</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">{customer.totalSpent}</p>
                <p className="text-xs text-gray-600">Total Spent</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1" variant="outline" size="sm" onClick={async () => {
                console.log('customer on view click:', customer);
                const user = await getUserById(customer.userId); // or customer.id, as appropriate
                const userObj = user.data || user;
                setSelectedCustomer({
                  ...userObj,
                  password: userObj.PasswordHash || '',
                });
                setEditDialogOpen(true);
              }}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button className="flex-1" variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
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
                <th className="text-left p-4 font-medium text-gray-900">Customer</th>
                <th className="text-left p-4 font-medium text-gray-900">Contact</th>
                <th className="text-left p-4 font-medium text-gray-900">Location</th>
                <th className="text-left p-4 font-medium text-gray-900">Appointments</th>
                <th className="text-left p-4 font-medium text-gray-900">Total Spent</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{customer.firstName + " " + customer.lastName}</p>
                        <p className="text-sm text-gray-600">Last visit: {customer.lastVisit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-900">{customer.email}</p>
                    <p className="text-sm text-gray-600">{customer.phone}</p>
                  </td>
                  <td className="p-4 text-gray-900">
                    <div>
                      {customer.address}
                      <br />
                      {[
                        [customer.city, customer.state].filter(Boolean).join(', '),
                        customer.pincode
                      ].filter(Boolean).join(' ')}
                    </div>
                  </td>
                  <td className="p-4 text-gray-900 font-semibold">{customer.totalAppointments}</td>
                  <td className="p-4 text-gray-900 font-semibold">{customer.totalSpent}</td>
                  <td className="p-4">
                    {customer.status === 'active' ? (
                      <Button
                        size="sm"
                        className="bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 px-2 py-0.5 text-xs h-6 min-h-0"
                        onClick={() => {
                          setConfirmMessage('Do you want to set this user as inactive?');
                          setConfirmAction(() => async () => {
                            await setUserActiveStatus(customer.userId, false);
                            toast.success('Success!', {
                              description: 'Client set to inactive.',
                              className: 'bg-red-100 text-red-800',
                              icon: <CheckCircle2 className="text-red-600" />,
                            });
                            const data = await getMyCustomers('Client');
                            setCustomers(Array.isArray(data) ? data : data.data || []);
                          });
                          setConfirmDialogOpen(true);
                        }}
                      >
                        Active
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 px-2 py-0.5 text-xs h-6 min-h-0"
                        onClick={() => {
                          setConfirmMessage('Do you want to set this user as active?');
                          setConfirmAction(() => async () => {
                            await setUserActiveStatus(customer.userId, true);
                            toast.success('Success!', {
                              description: 'Client activated successfully.',
                              className: 'bg-green-100 text-green-800',
                              icon: <CheckCircle2 className="text-green-600" />,
                            });
                            const data = await getMyCustomers('Client');
                            setCustomers(Array.isArray(data) ? data : data.data || []);
                          });
                          setConfirmDialogOpen(true);
                        }}
                      >
                        Inactive
                      </Button>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={async () => {
                        const user = await getUserById(customer.userId);
                        const userObj = user.data || user;
                        setSelectedCustomer({
                          ...userObj,
                          password: userObj.PasswordHash || '',
                        });
                        setEditDialogOpen(true);
                      }}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  // Add New Customer Dialog State
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50"
        style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}>
        <AdminSidebar onWidthChange={setSidebarWidth} />
        <main className="flex-1 p-6">
          <div className="mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
                  <p className="text-gray-600">Manage your customer relationships</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Customer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Add New Customer</DialogTitle>
                    </DialogHeader>
                    <CustomerForm
                      firstName={firstName} setFirstName={setFirstName}
                      lastName={lastName} setLastName={setLastName}
                      email={email} setEmail={setEmail}
                      phone={phone} setPhone={setPhone}
                      password={password} setPassword={setPassword} showPassword={showPassword} setShowPassword={setShowPassword}
                      address={address} setAddress={setAddress}
                      city={city} setCity={setCity}
                      state={state} setState={setState}
                      pincode={pincode} setPincode={setPincode}
                      notes={notes} setNotes={setNotes}
                      loading={addLoading}
                      error={addError}
                      onCancel={() => setAddDialogOpen(false)}
                      onSubmit={async () => {
                          setAddLoading(true);
                          setAddError('');
                          try {
                            const newCustomer = await insertUser({
                              firstName,
                              lastName,
                              email,
                              phoneNumber: phone,
                              address,
                            city,
                            state,
                            pincode,
                              notes,
                            password,
                            });
                            setCustomers(prev => [
                              ...prev,
                              {
                                id: newCustomer.id || Date.now(),
                                name: `${firstName} ${lastName}`,
                                email,
                                phone,
                              location: `${address}, ${city}, ${state} - ${pincode}`,
                                status: 'active',
                                lastVisit: '',
                                totalAppointments: 0,
                                totalSpent: '$0',
                                avatar: `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase(),
                              city,
                              state,
                              pincode,
                              }
                            ]);
                          toast.success('Success!', {
                            description: 'Client Added Successfully',
                            className: 'bg-green-100 text-green-800',
                            icon: <CheckCircle2 className="text-green-600" />,
                          });
                            setAddDialogOpen(false);
                            setFirstName('');
                            setLastName('');
                            setEmail('');
                            setPhone('');
                            setAddress('');
                          setCity('');
                          setState('');
                          setPincode('');
                            setNotes('');
                          setPassword('');
                          } catch (err: any) {
                            setAddError(err.message || 'Failed to add customer.');
                          } finally {
                            setAddLoading(false);
                          }
                      }}
                      buttonText="Add Customer"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Customers</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{customers.length}</p>
                    </div>
                    <div className="bg-blue-500 p-3 rounded-xl">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Customers</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {customers.filter(c => c.status === 'active').length}
                      </p>
                    </div>
                    <div className="bg-green-500 p-3 rounded-xl">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">New This Month</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                    </div>
                    <div className="bg-purple-500 p-3 rounded-xl">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">$3,750</p>
                    </div>
                    <div className="bg-yellow-500 p-3 rounded-xl">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search customers..."
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

                    <Input
                      placeholder="Search location..."
                      value={filterLocation}
                      onChange={e => setFilterLocation(e.target.value)}
                      className="w-40"
                    />

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
                Showing {filteredCustomers.length} of {customers.length} customers
              </p>
            </div>

            {/* Content */}
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-32">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              </div>
            ) : (
              viewMode === 'grid' ? <GridView /> : <TableView />
            )}
          </div>
        </main>
      </div>
      {/* Edit Customer Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <EditCustomerFormWrapper
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
              setEditDialogOpen={setEditDialogOpen}
              setCustomers={setCustomers}
            />
          )}
        </DialogContent>
      </Dialog>
      {/* Custom Confirmation Dialog */}
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
    </SidebarProvider>
  );
};

function EditCustomerFormWrapper({ selectedCustomer, setSelectedCustomer, setEditDialogOpen, setCustomers }) {
  const [password, setPassword] = React.useState(selectedCustomer.password || '');
  const [showPassword, setShowPassword] = React.useState(false);
  React.useEffect(() => {
    setPassword(selectedCustomer.password || '');
    setShowPassword(false);
  }, [selectedCustomer]);
  return (
    <CustomerForm
      firstName={selectedCustomer.firstName} setFirstName={val => setSelectedCustomer({ ...selectedCustomer, firstName: val })}
      lastName={selectedCustomer.lastName} setLastName={val => setSelectedCustomer({ ...selectedCustomer, lastName: val })}
      email={selectedCustomer.email} setEmail={val => setSelectedCustomer({ ...selectedCustomer, email: val })}
      phone={selectedCustomer.phoneNumber} setPhone={val => setSelectedCustomer({ ...selectedCustomer, phoneNumber: val })}
      password={selectedCustomer.passwordHash} setPassword={val => setSelectedCustomer({ ...selectedCustomer, password: val })}
      showPassword={showPassword} setShowPassword={setShowPassword}
      address={selectedCustomer.address} setAddress={val => setSelectedCustomer({ ...selectedCustomer, address: val })}
      city={selectedCustomer.city} setCity={val => setSelectedCustomer({ ...selectedCustomer, city: val })}
      state={selectedCustomer.state} setState={val => setSelectedCustomer({ ...selectedCustomer, state: val })}
      pincode={selectedCustomer.pincode} setPincode={val => setSelectedCustomer({ ...selectedCustomer, pincode: val })}
      notes={selectedCustomer.notes} setNotes={val => setSelectedCustomer({ ...selectedCustomer, notes: val })}
      loading={false}
      error={''}
      onCancel={() => setEditDialogOpen(false)}
      onSubmit={async () => {
        const updateObj = { ...selectedCustomer };
        if (password) updateObj.password = password;
        else delete updateObj.password;
        updateObj.notes = selectedCustomer.notes; // Always include notes
        await updateUser(updateObj);
        toast.success('Success!', {
          description: 'Client updated successfully.',
          className: 'bg-green-100 text-green-800',
          icon: <CheckCircle2 className="text-green-600" />, // green check icon
        });
        setEditDialogOpen(false);
        // Optionally refresh the customer list
        const data = await getMyCustomers('Client');
        setCustomers(Array.isArray(data) ? data : data.data || []);
      }}
      buttonText="Update Customer"
    />
  );
}

export default Customers;
