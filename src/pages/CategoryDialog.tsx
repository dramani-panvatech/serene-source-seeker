import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { insertCategory, updateCategory } from "@/lib/serviceService";
import { useToast } from "@/components/ui/use-toast";
import Swal from "sweetalert2";

const CategoryDialog = ({ open, onClose, onSuccess, category }) => {
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setName(category?.name || "");
    setDescription(category?.description || "");
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (category && category.categoryId) {
        await updateCategory({ categoryId: category.categoryId, name, description });
        toast({
          title: "Category updated!",
          description: "Category has been updated successfully.",
          duration: 3000,
        });
      } else {
        await insertCategory({ name, description });
        toast({
          title: "Category created!",
          description: "Category has been created successfully.",
          duration: 3000,
        });
      }
      onSuccess && onSuccess();
      onClose && onClose();
    } catch (err) {
      Swal.fire('Error', err.message || 'Failed to save category', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>{category ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog; 