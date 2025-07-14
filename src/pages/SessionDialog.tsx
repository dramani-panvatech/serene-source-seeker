import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getServicesList } from "@/lib/serviceService";
import { getMyCustomers } from "@/lib/userService";
import { useToast } from "@/components/ui/use-toast";

const SessionDialog = ({ open, onClose, onSuccess, session }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(session?.title || "");
  const [description, setDescription] = useState(session?.description || "");
  const [serviceId, setServiceId] = useState(session?.serviceId || "");
  const [locationId, setLocationId] = useState(session?.locationId || "");
  const [resourceId, setResourceId] = useState(session?.resourceId || "");
  const [instructorId, setInstructorId] = useState(session?.instructorId || "");
  const [startTime, setStartTime] = useState(session?.startTime || "");
  const [endTime, setEndTime] = useState(session?.endTime || "");
  const [maxCapacity, setMaxCapacity] = useState(session?.maxCapacity || "");
  const [price, setPrice] = useState(session?.price || "");
  const [currency, setCurrency] = useState(session?.currency || "");
  const [notes, setNotes] = useState(session?.notes || "");
  const [meetingLink, setMeetingLink] = useState(session?.meetingLink || "");

  // State for dropdown data
  const [services, setServices] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingInstructors, setLoadingInstructors] = useState(false);
  const locations = [];
  const resources = [];

  // Fetch services and instructors when dialog opens
  useEffect(() => {
    if (open) {
      fetchServices();
      fetchInstructors();
    }
  }, [open]);

  // Reset form when session changes
  useEffect(() => {
    setTitle(session?.title || "");
    setDescription(session?.description || "");
    setServiceId(session?.serviceId || "");
    setLocationId(session?.locationId || "");
    setResourceId(session?.resourceId || "");
    setInstructorId(session?.instructorId || "");
    setStartTime(session?.startTime || "");
    setEndTime(session?.endTime || "");
    setMaxCapacity(session?.maxCapacity || "");
    setPrice(session?.price || "");
    setCurrency(session?.currency || "");
    setNotes(session?.notes || "");
    setMeetingLink(session?.meetingLink || "");
  }, [session]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const servicesData = await getServicesList();
      setServices(servicesData);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({
        title: "Error",
        description: "Failed to load services. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructors = async () => {
    try {
      setLoadingInstructors(true);
      const res = await getMyCustomers('NotClient');
      setInstructors(res.data || []);
    } catch (error) {
      console.error("Error fetching instructors:", error);
      toast({
        title: "Error",
        description: "Failed to load instructors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingInstructors(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call API to save or update session
    onSuccess && onSuccess();
    onClose && onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] flex flex-col p-6">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{session ? "Edit Session" : "Add Session"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto pr-2">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Service</label>
            <Select value={serviceId} onValueChange={setServiceId} required disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder={loading ? "Loading services..." : "Select service"} />
              </SelectTrigger>
              <SelectContent>
                {services.map(service => (
                  <SelectItem key={service.serviceId} value={service.serviceId}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <Select value={locationId} onValueChange={setLocationId} required>
              <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
              <SelectContent>
                {locations.map(l => (
                  <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Resource</label>
            <Select value={resourceId} onValueChange={setResourceId} required>
              <SelectTrigger><SelectValue placeholder="Select resource" /></SelectTrigger>
              <SelectContent>
                {resources.map(r => (
                  <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Instructor</label>
            <Select value={instructorId} onValueChange={setInstructorId} required disabled={loadingInstructors}>
              <SelectTrigger><SelectValue placeholder={loadingInstructors ? "Loading instructors..." : "Select instructor"} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="" disabled>Select</SelectItem>
                {instructors.map(i => (
                  <SelectItem key={i.userId} value={i.userId}>{i.firstName} {i.lastName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Start Time</label>
              <Input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">End Time</label>
              <Input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} required />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Max Capacity</label>
              <Input type="number" value={maxCapacity} onChange={e => setMaxCapacity(e.target.value)} required />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Price</label>
              <Input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Currency</label>
              <Input value={currency} onChange={e => setCurrency(e.target.value)} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Notes</label>
            <Textarea value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Meeting Link</label>
            <Input value={meetingLink} onChange={e => setMeetingLink(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2 pt-4 pb-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{session ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SessionDialog; 