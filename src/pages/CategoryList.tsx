import React, { useState, useEffect } from "react";
import { getCategories, deleteCategory } from "@/lib/serviceService";
import CategoryDialog from "./CategoryDialog";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Trash2 } from 'lucide-react';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleAdd = () => {
    setEditCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = async (category) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if (result.isConfirmed) {
      try {
        await deleteCategory(category.categoryId);
        toast({
          title: 'Category deleted!',
          description: 'Category has been deleted successfully.',
          duration: 3000,
        });
        fetchCategories();
      } catch (err) {
        Swal.fire('Error', err.message || 'Failed to delete category', 'error');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Categories</h2>
        <Button onClick={handleAdd}>Add Category</Button>
      </div>
      <ul>
        {categories.map(cat => (
          <li key={cat.categoryId} className="flex justify-between items-center border-b py-2">
            <div>
              <div className="font-medium">{cat.name}</div>
              <div className="text-gray-500 text-sm">{cat.description}</div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => handleEdit(cat)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Delete" onClick={() => handleDelete(cat)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {dialogOpen && (
        <CategoryDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSuccess={() => { setDialogOpen(false); fetchCategories(); }}
          category={editCategory}
        />
      )}
    </div>
  );
};

export default CategoryList; 