import { getValidToken } from "./authService";
import { LOCAL_STORAGE_KEYS } from "./localStorageKeys";
import { useToast } from "@/components/ui/use-toast";

export async function insertService(service, editMode = false) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId);
  const email = localStorage.getItem(LOCAL_STORAGE_KEYS.email);
debugger;
  let url, body;
  if (editMode) {
    url = `${baseUrl}/api/Service/UpdateService`;
    body = JSON.stringify({ ...service, serviceId: service.serviceId, tenantId, updatedBy: email });
  } else {
    url = `${baseUrl}/api/Service/InsertService`;
    body = JSON.stringify({ ...service, tenantId, createdBy: email });
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to ${editMode ? "update" : "create"} service.`);
  }
  return response.json();
}

export async function getServicesList() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId);

  const response = await fetch(`${baseUrl}/api/Service/GetServicesList?tenantId=${encodeURIComponent(tenantId)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    // No body needed for this request
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch services list.");
  }
  const data = await response.json();
  return data.data || [];
}

export async function getCategories() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId);
  const response = await fetch(`${baseUrl}/api/Category/ListCategories?tenantId=${encodeURIComponent(tenantId)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch categories.");
  }
  const data = await response.json();
  return data.data || [];
}

export async function getServiceById(serviceId) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId);

  const response = await fetch(`${baseUrl}/api/Service/GetServiceById?serviceId=${encodeURIComponent(serviceId)}&tenantId=${encodeURIComponent(tenantId)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch service by id.");
  }
  const data = await response.json();
  return data.data;
}

export async function deleteService(serviceId) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId);
  const updatedBy = localStorage.getItem(LOCAL_STORAGE_KEYS.email);

  const response = await fetch(`${baseUrl}/api/Service/DeleteService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ serviceId, tenantId, updatedBy }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete service.");
  }
  return response.json();
}

export async function getServiceDashboardSummary() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId);

  const response = await fetch(`${baseUrl}/api/Service/GetServiceDashboardSummary?tenantId=${encodeURIComponent(tenantId)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch service dashboard summary.");
  }
  const data = await response.json();
  return data.data || {};
}

export async function insertCategory({ name, description }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId);
  const email = localStorage.getItem(LOCAL_STORAGE_KEYS.email);

  const response = await fetch(`${baseUrl}/api/Category/InsertCategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description, tenantId, createdBy: email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create category.");
  }
  return response.json();
}

export async function updateCategory({ categoryId, name, description }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId);
  const email = localStorage.getItem(LOCAL_STORAGE_KEYS.email);

  const response = await fetch(`${baseUrl}/api/Category/UpdateCategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ categoryId, name, description, tenantId, updatedBy: email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update category.");
  }
  return response.json();
}

export async function deleteCategory(categoryId) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId);
  const updatedBy = localStorage.getItem(LOCAL_STORAGE_KEYS.email);

  const response = await fetch(`${baseUrl}/api/Category/DeleteCategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ categoryId, tenantId, updatedBy }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete category.");
  }
  return response.json();
} 