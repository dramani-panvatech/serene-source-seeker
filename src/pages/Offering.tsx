import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Gift, Edit, Trash2, Search } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { insertOffer, getOffers, deleteOffer, updateOffer } from '@/lib/offerService';
import { getServicesList, getCategories } from '@/lib/serviceService';
import Swal from 'sweetalert2';

type OfferFormErrors = {
  offerTitle?: string;
  offerDescription?: string;
  title?: string;
  description?: string;
  offerCode?: string;
  startDate?: string;
  endDate?: string;
  discountAmount?: string;
  discountPercent?: string;
  applicableTo?: string;
};

function formatDateMMDDYYYY(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

function parseMMDDYYYYtoISO(mmddyyyy) {
  if (!mmddyyyy) return '';
  const [mm, dd, yyyy] = mmddyyyy.split('-');
  if (!mm || !dd || !yyyy) return '';
  const iso = new Date(`${yyyy}-${mm}-${dd}T00:00:00`).toISOString();
  return iso;
}

function mmddyyyyToYyyyMmDd(mmddyyyy) {
  if (!mmddyyyy) return '';
  const [mm, dd, yyyy] = mmddyyyy.split('-');
  if (!mm || !dd || !yyyy) return '';
  return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
}

function yyyymmddToMmddyyyy(yyyymmdd) {
  if (!yyyymmdd) return '';
  const [yyyy, mm, dd] = yyyymmdd.split('-');
  if (!mm || !dd || !yyyy) return '';
  return `${mm}-${dd}-${yyyy}`;
}

// Use MM-DD-YY format everywhere
function formatDateMMDDYY(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}-${dd}-${yy}`;
}

const Offering = () => {
  const [sidebarWidth, setSidebarWidth] = useState('250px');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offerForm, setOfferForm] = useState({
    offerTitle: '',
    offerDate: '',
    discountType: '',
    discountValue: '',
    offerDescription: '',
    title: '',
    description: '',
    offerCode: '',
    discountAmount: '',
    discountPercent: '',
    startDate: '',
    endDate: '',
    isActive: '',
    applicableTo: '',
    serviced: '',
    category: '',
    maxUsage: '',
    perUserLimit: '',
    serviceId: '',
    categoryId: '',
  });
  const [formErrors, setFormErrors] = useState<OfferFormErrors>({});
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [showCouponDialog, setShowCouponDialog] = useState(false);
  const [editOfferData, setEditOfferData] = useState(null);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');


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

  // Remove the local getOffers stub and use the imported getOffers from offerService
  // In useEffect and after saving an offer, use await getOffers() to fetch offers from the API

  useEffect(() => {
    // Fetch offers on mount and after add
    async function fetchOffers() {
      setLoading(true);
      try {
        const response = await getOffers();
        // If response has a 'data' property and it's an array, use it
        if (response && Array.isArray(response.data)) {
          setOffers(response.data);
        } else {
          setOffers([]);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  // Fetch services when dialog opens
  useEffect(() => {
    if (showOfferDialog) {
      getServicesList().then(setServices).catch(() => setServices([]));
    }
  }, [showOfferDialog]);

  // Fetch categories when dialog opens
  useEffect(() => {
    if (showOfferDialog) {
      getCategories().then(setCategories).catch(() => setCategories([]));
    }
  }, [showOfferDialog]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (showOfferDialog && editOfferData) {
      // Edit mode: populate form with existing data
      setOfferForm({
        offerTitle: editOfferData.title || '',
        offerDate: editOfferData.startDate ? formatDateMMDDYYYY(editOfferData.startDate) : '',
        discountType: '',
        discountValue: '',
        offerDescription: editOfferData.description || '',
        title: editOfferData.title || '',
        description: editOfferData.description || '',
        offerCode: editOfferData.offerCode || '',
        discountAmount: editOfferData.discountAmount?.toString() || '',
        discountPercent: editOfferData.discountPercent?.toString() || '',
        startDate: editOfferData.startDate ? formatDateMMDDYYYY(editOfferData.startDate) : '',
        endDate: editOfferData.endDate ? formatDateMMDDYYYY(editOfferData.endDate) : '',
        isActive: editOfferData.isActive ? 'true' : 'false',
        applicableTo: editOfferData.applicableTo || '',
        serviced: '',
        category: '',
        maxUsage: editOfferData.maxUsage?.toString() || '',
        perUserLimit: editOfferData.perUserLimit?.toString() || '',
        serviceId: editOfferData.serviceId?.toString() || '',
        categoryId: editOfferData.categoryId?.toString() || '',
      });
    } else if (showOfferDialog && !editOfferData) {
      // Add mode: reset form to empty
      setOfferForm({
        offerTitle: '',
        offerDate: '',
        discountType: '',
        discountValue: '',
        offerDescription: '',
        title: '',
        description: '',
        offerCode: '',
        discountAmount: '',
        discountPercent: '',
        startDate: '',
        endDate: '',
        isActive: '',
        applicableTo: '',
        serviced: '',
        category: '',
        maxUsage: '',
        perUserLimit: '',
        serviceId: '',
        categoryId: '',
      });
      setFormErrors({});
    }
  }, [showOfferDialog, editOfferData]);

  const handleAddSpecialOffer = () => {
    console.log('Add Special Day Offer clicked');
  };

  const handleCreateCoupon = () => {
    console.log('Create Coupon Code clicked');
  };

  function validateOfferForm(form) {
    const errors: OfferFormErrors = {};
    if (!form.title && !form.offerTitle) errors.title = 'Title is required';
    if (!form.description && !form.offerDescription) errors.description = 'Description is required';
    if (!form.offerCode) errors.offerCode = 'Offer code is required';
    if (!form.startDate) errors.startDate = 'Start date is required';
    if (!form.endDate) errors.endDate = 'End date is required';
    if (!form.discountAmount && !form.discountPercent) {
      errors.discountAmount = 'Discount amount or percent is required';
      errors.discountPercent = 'Discount amount or percent is required';
    }
    if (!form.applicableTo) errors.applicableTo = 'Applicable To is required';
    return errors;
  }

  async function handleSaveOffer(formData) {
    const errors = validateOfferForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      // Do NOT show SweetAlert2 for validation errors, just show inline errors
      return;
    }
    setLoading(true);
    try {
      let res;
      if (editOfferData) {
        // Edit mode: call updateOffer
        const payload = {
          offerId: editOfferData.offerId,
          title: formData.offerTitle || formData.title || '',
          description: formData.offerDescription || formData.description || '',
          offerCode: formData.offerCode || '',
          discountAmount: Number(formData.discountAmount) || 0,
          discountPercent: Number(formData.discountPercent) || 0,
          startDate: formData.startDate ? parseMMDDYYYYtoISO(formData.startDate) : new Date().toISOString(),
          endDate: formData.endDate ? parseMMDDYYYYtoISO(formData.endDate) : new Date().toISOString(),
          applicableTo: formData.applicableTo || '',
          serviceId: Number(formData.serviceId) || 0,
          categoryId: Number(formData.categoryId) || 0,
          maxUsage: Number(formData.maxUsage) || 0,
          perUserLimit: Number(formData.perUserLimit) || 0,
          isActive: formData.isActive === 'true' || formData.isActive === true,
        };
        res = await updateOffer(payload);
      } else {
        // Add mode: call insertOffer
        const payload = {
          title: formData.offerTitle || formData.title || '',
          description: formData.offerDescription || formData.description || '',
          offerCode: formData.offerCode || '',
          discountAmount: Number(formData.discountAmount) || 0,
          discountPercent: Number(formData.discountPercent) || 0,
          startDate: formData.startDate ? parseMMDDYYYYtoISO(formData.startDate) : new Date().toISOString(),
          endDate: formData.endDate ? parseMMDDYYYYtoISO(formData.endDate) : new Date().toISOString(),
          isActive: formData.isActive === 'true' || formData.isActive === true,
          isDeleted: true,
          applicableTo: formData.applicableTo || '',
          maxUsage: Number(formData.maxUsage) || 0,
          perUserLimit: Number(formData.perUserLimit) || 0,
        };
        res = await insertOffer(payload);
      }
      if (res && (res.success || res.id || res.offerId)) {
        const isEditMode = !!editOfferData;
        setShowOfferDialog(false);
        setEditOfferData(null);
        Swal.fire({ icon: 'success', title: isEditMode ? 'Offer Updated' : 'Offer Saved', text: isEditMode ? 'Special Day Offer updated successfully!' : 'Special Day Offer saved successfully!' });
        setOfferForm({
          offerTitle: '', offerDate: '', discountType: '', discountValue: '', offerDescription: '', title: '', description: '', offerCode: '', discountAmount: '', discountPercent: '', startDate: '', endDate: '', isActive: '', applicableTo: '', serviced: '', category: '', maxUsage: '', perUserLimit: '', serviceId: '', categoryId: '',
        });
        setFormErrors({});
        // Refresh offers
        const data = await getOffers();
        if (data && Array.isArray(data.data)) {
          setOffers(data.data);
        } else {
          setOffers([]);
        }
      } else {
        throw new Error(res?.message || 'API did not return success');
      }
    } catch (e) {
      setShowOfferDialog(false);
      setEditOfferData(null);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save offer',
        confirmButtonText: 'OK'
      });

    } finally {
      setLoading(false);
    }
  }

  async function handleEditOffer(id) {
    try {
      // Find the offer in the current offers array
      const offer = offers.find(o => o.offerId === id);
      if (offer) {
        setEditOfferData(offer);
        setShowOfferDialog(true);
      } else {
        throw new Error('Offer not found');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to load offer data', 'error');
    }
  }

  async function handleDeleteOffer(offer) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the offer permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      try {
        await deleteOffer(offer.offerId);
        Swal.fire('Deleted!', 'The offer has been deleted.', 'success');
        // Refresh offers
        const data = await getOffers();
        if (data && Array.isArray(data.data)) {
          setOffers(data.data);
        } else {
          setOffers([]);
        }
      } catch (e) {
        Swal.fire('Error', e.message || 'Failed to delete offer', 'error');
      }
    }
  }

  const handleCloseOfferDialog = () => {
    setShowOfferDialog(false);
    setEditOfferData(null);
  };

  const handleOpenAddDialog = () => {
    setEditOfferData(null);
    setShowOfferDialog(true);
  };

  // Filtered offers
  const filteredOffers = offers.filter(offer => {
    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'active' && !offer.isActive) return false;
      if (statusFilter === 'inactive' && offer.isActive) return false;
    }
    // Search filter (title, code, description)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      if (!(
        (offer.title && offer.title.toLowerCase().includes(term)) ||
        (offer.offerCode && offer.offerCode.toLowerCase().includes(term)) ||
        (offer.description && offer.description.toLowerCase().includes(term))
      )) {
        return false;
      }
    }



    return true;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50"
        style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}>
        <AdminSidebar onWidthChange={setSidebarWidth} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Gift className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Manage Offering</h1>
                  <p className="text-gray-600"> Set special day offers, apply coupon codes, and manage availability.</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex gap-4">
                  <Button onClick={handleOpenAddDialog} className="bg-gradient-to-r from-purple-600 to-pink-600">
                  <Plus className="h-4 w-4 mr-2" />
                    Add Special Day Offer
                  </Button>

                  <Dialog open={showOfferDialog} onOpenChange={handleCloseOfferDialog}>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>{editOfferData ? 'Edit Special Day Offer' : 'Add Special Day Offer'}</DialogTitle>
                      </DialogHeader>
                      <div className="gap-2 grid grid-cols-2">
                        {/* Existing fields */}
                        <div>
                          <Label htmlFor="offerTitle">Offer Title</Label>
                          <Input id="offerTitle" value={offerForm.offerTitle} onChange={e => setOfferForm(f => ({ ...f, offerTitle: e.target.value }))} placeholder="e.g., Valentine's Day Special" />
                          {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                        </div>




                        {/* Additional fields */}


                        <div>
                          <Label htmlFor="offerCode">Offer Code</Label>
                          <Input id="offerCode" value={offerForm.offerCode} onChange={e => setOfferForm(f => ({ ...f, offerCode: e.target.value }))} placeholder="e.g., SAVE20" />
                          {formErrors.offerCode && <p className="text-red-500 text-xs mt-1">{formErrors.offerCode}</p>}
                        </div>
                        <div>
                          <Label htmlFor="discountAmount">Discount Amount</Label>
                          <Input id="discountAmount" type="number" value={offerForm.discountAmount} onChange={e => setOfferForm(f => ({ ...f, discountAmount: e.target.value }))} placeholder="e.g., 10" />
                          {formErrors.discountAmount && <p className="text-red-500 text-xs mt-1">{formErrors.discountAmount}</p>}
                        </div>
                        <div>
                          <Label htmlFor="discountPercent">Discount Percent</Label>
                          <Input id="discountPercent" type="number" value={offerForm.discountPercent} onChange={e => setOfferForm(f => ({ ...f, discountPercent: e.target.value }))} placeholder="e.g., 15" />
                          {formErrors.discountPercent && <p className="text-red-500 text-xs mt-1">{formErrors.discountPercent}</p>}
                        </div>
                        <div>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={offerForm.startDate ? mmddyyyyToYyyyMmDd(offerForm.startDate) : ''}
                            onChange={e => {
                              const mmddyyyy = formatDateMMDDYYYY(e.target.value);
                              setOfferForm(f => ({ ...f, startDate: mmddyyyy }));
                            }}
                            placeholder="MM-DD-YYYY"
                          />
                          {formErrors.startDate && <p className="text-red-500 text-xs mt-1">{formErrors.startDate}</p>}
                        </div>
                        <div>
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={offerForm.endDate ? mmddyyyyToYyyyMmDd(offerForm.endDate) : ''}
                            onChange={e => {
                              const mmddyyyy = formatDateMMDDYYYY(e.target.value);
                              setOfferForm(f => ({ ...f, endDate: mmddyyyy }));
                            }}
                            placeholder="MM-DD-YYYY"
                          />
                          {formErrors.endDate && <p className="text-red-500 text-xs mt-1">{formErrors.endDate}</p>}
                        </div>
                        <div>
                          <Label htmlFor="isActive">Status</Label>
                          <Select value={offerForm.isActive} onValueChange={v => setOfferForm(f => ({ ...f, isActive: v }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Active</SelectItem>
                              <SelectItem value="false">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="applicableTo">Applicable To</Label>
                          <Select
                            value={offerForm.applicableTo}
                            onValueChange={v => setOfferForm(f => ({ ...f, applicableTo: v }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select applicable to" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="service">Service</SelectItem>
                              <SelectItem value="category">Category</SelectItem>
                            </SelectContent>
                          </Select>
                          {formErrors.applicableTo && <p className="text-red-500 text-xs mt-1">{formErrors.applicableTo}</p>}
                        </div>
                        <div>
                          <Label htmlFor="serviced">Service</Label>
                          <Select
                            value={offerForm.serviceId}
                            onValueChange={v => setOfferForm(f => ({ ...f, serviceId: v }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map(service => (
                                <SelectItem key={service.serviceId} value={service.serviceId?.toString() || ''}>
                                  {service.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={offerForm.categoryId}
                            onValueChange={v => setOfferForm(f => ({ ...f, categoryId: v }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.categoryId} value={category.categoryId?.toString() || ''}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="maxUsage">Max Usage</Label>
                          <Input id="maxUsage" type="number" value={offerForm.maxUsage} onChange={e => setOfferForm(f => ({ ...f, maxUsage: e.target.value }))} placeholder="e.g., 100" />
                        </div>
                        <div>
                          <Label htmlFor="perUserLimit">Per User Limit</Label>
                          <Input id="perUserLimit" type="number" value={offerForm.perUserLimit} onChange={e => setOfferForm(f => ({ ...f, perUserLimit: e.target.value }))} placeholder="e.g., 1" />
                        </div>
                        <div>
                          <Label htmlFor="offerDescription">Description</Label>
                          <Textarea id="offerDescription" value={offerForm.offerDescription} onChange={e => setOfferForm(f => ({ ...f, offerDescription: e.target.value }))} placeholder="Describe the special offer..." rows={3} />
                          {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" onClick={handleCloseOfferDialog}>Cancel</Button>
                        <Button onClick={() => handleSaveOffer(offerForm)}>{editOfferData ? 'Update Offer' : 'Create Offer'}</Button>
                      </div>
                    </DialogContent>
                  </Dialog>


                </div>
              </div>
            </div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search ..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ minWidth: 180 }}
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
              </CardContent>
            </Card>


            <div className="">

              {/* Table of offers */}
              <div className="">
                
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <Card className="rounded-lg shadow border">
                    <div className="p-4 border-b text-gray-700 font-medium">
                      Showing {filteredOffers.length} of {offers.length} offers
                    </div>
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="text-xs text-gray-500 uppercase">
                          <th className="px-6 py-3 text-left">Title</th>
                          <th className="px-6 py-3 text-left">Description</th>
                          <th className="px-6 py-3 text-left">Offer Code</th>
                          <th className="px-6 py-3 text-left">Discount</th>
                          <th className="px-6 py-3 text-left">Start Date</th>
                          <th className="px-6 py-3 text-left">End Date</th>
                          <th className="px-6 py-3 text-left">Status</th>
                          <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(Array.isArray(filteredOffers) ? filteredOffers : []).map((offer, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 font-medium text-gray-900">{offer.title}</td>
                            <td className="px-6 py-4 text-gray-700">{offer.description}</td>
                            <td className="px-6 py-4 font-mono">{offer.offerCode}</td>
                            <td className="px-6 py-4">
                              {offer.discountAmount > 0
                                ? `$${offer.discountAmount}`
                                : `${offer.discountPercent}%`}
                            </td>
                            <td className="px-6 py-4">{formatDateMMDDYY(offer.startDate)}</td>
                            <td className="px-6 py-4">{formatDateMMDDYY(offer.endDate)}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${offer.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                {offer.isActive ? 'active' : 'inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleEditOffer(offer.offerId)}
                                className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium mr-2"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteOffer(offer)}
                                className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div >
    </SidebarProvider >
  );
};

export default Offering;
