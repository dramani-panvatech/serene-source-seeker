import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { insertService, getCategories, getServiceById } from "@/lib/serviceService";
import { useImperativeHandle, forwardRef } from "react";
import Swal from 'sweetalert2';
import { useToast } from "@/components/ui/use-toast";

const initialForm = {
  name: "",
  description: "",
  categoryId: "",
  difficulty: "",
  durationMinutes: "",
  maxCapacity: "",
  price: "",
  currency: "",
  requirements: "",
  equipment: "",
};
type CreateServiceDialogProps = {
  onSuccess?: () => void;
  serviceId?: number;
};

const CreateServiceDialog = forwardRef<unknown, CreateServiceDialogProps>(({ onSuccess, serviceId }, ref) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();

  useImperativeHandle(ref, () => ({
    
    openDialog: (id) => {
      debugger;
      fetchCategories();
      if (id) {
        setEditMode(true);
        fetchService(id);
      } else {
        setEditMode(false);
        setForm(initialForm);
      }
      setOpen(true);
    },
    closeDialog: () => setOpen(false),
  }));

  async function fetchService(id) {
    setLoading(true);
    try {
      const data = await getServiceById(id);
      setForm({
        ...initialForm,
        ...data,
        categoryId: data.categoryId ? String(data.categoryId) : "",
        durationMinutes: data.durationMinutes ? String(data.durationMinutes) : "",
        maxCapacity: data.maxCapacity ? String(data.maxCapacity) : "",
        price: data.price ? String(data.price) : "",
      });
    } catch (err) {
      alert(err.message || "Failed to fetch service");
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    setCatLoading(true);
    setCatError("");
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setCatError(err.message || "Failed to fetch categories");
    } finally {
      setCatLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await insertService({
        ...form,
        durationMinutes: Number(form.durationMinutes),
        maxCapacity: Number(form.maxCapacity),
        price: Number(form.price),
      }, editMode);
      setOpen(false);
      setForm(initialForm);
      if (onSuccess) onSuccess();
      toast({
        title: editMode ? "Service updated!" : "Service created!",
        description: editMode
          ? "Service has been updated successfully."
          : "Service has been created successfully.",
        duration: 3000,
      });
    } catch (err) {
      Swal.fire('Error', err.message || 'Failed to save service', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchCategories();
    }
  };

  return (
    <>
     
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Service" : "Create New Service"}</DialogTitle>
          </DialogHeader>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceName">Name</Label>
                <Input id="serviceName" name="name" value={form.name} onChange={handleChange} placeholder="Enter service name" required />
              </div>
              <div>
                <Label htmlFor="categoryId">Category</Label>
                {catLoading ? (
                  <div>Loading categories...</div>
                ) : catError ? (
                  <div className="text-red-500">{catError}</div>
                ) : (
                  <Select name="categoryId" value={form.categoryId} onValueChange={(val) => handleSelectChange("categoryId", val)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.categoryId} value={String(cat.categoryId)}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Input id="difficulty" name="difficulty" value={form.difficulty} onChange={handleChange} placeholder="Enter difficulty" required />
              </div>
              <div>
                <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                <Input id="durationMinutes" name="durationMinutes" type="number" min="1" value={form.durationMinutes} onChange={handleChange} placeholder="Enter duration in minutes" required />
              </div>
              <div>
                <Label htmlFor="maxCapacity">Max Capacity</Label>
                <Input id="maxCapacity" name="maxCapacity" type="number" min="1" value={form.maxCapacity} onChange={handleChange} placeholder="Enter max capacity" required />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="Enter price" required />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" name="currency" value={form.currency} onChange={handleChange} placeholder="Enter currency (e.g. USD)" required />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Describe your service..." rows={4} required />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea id="requirements" name="requirements" value={form.requirements} onChange={handleChange} placeholder="List requirements..." rows={2} />
              </div>
              <div>
                <Label htmlFor="equipment">Equipment</Label>
                <Textarea id="equipment" name="equipment" value={form.equipment} onChange={handleChange} placeholder="List equipment..." rows={2} />
              </div>
            </div>
            <div className="col-span-2 flex justify-end space-x-2 mt-4">
              <Button variant="outline" type="button" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? (editMode ? "Saving..." : "Creating...") : (editMode ? "Save Changes" : "Create Service")}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );

  function openDialog(id?: number) {
    fetchCategories();
    if (id) {
      setEditMode(true);
      fetchService(id);
    } else {
      setEditMode(false);
      setForm(initialForm);
    }
    setOpen(true);
  }
});

export default CreateServiceDialog; 