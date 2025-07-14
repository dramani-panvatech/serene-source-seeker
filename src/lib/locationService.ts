import { getValidToken } from "./authService";
import { LOCAL_STORAGE_KEYS } from "./localStorageKeys";

export async function getLocationList() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:7187";
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "1";

  const response = await fetch(`${baseUrl}/api/Location/LocationList?tenantId=${tenantId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch location list.");
  }
  return response.json();
}

export async function insertLocation(location) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:7187";
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "1";
  const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.userId) || "admin";

  const response = await fetch(`${baseUrl}/api/Location/InsertLocation?tenantId=${tenantId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ ...location, tenantId, createdBy: userId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to insert location.");
  }
  return response.json();
}

export async function updateLocation(location) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:7187";
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "1";
  const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.userId) || "admin";

  const response = await fetch(`${baseUrl}/api/Location/UpdateLocation?tenantId=${tenantId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ ...location, tenantId, updatedBy: userId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update location.");
  }
  return response.json();
}

export async function deleteLocation(locationId) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:7187";
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "1";
  const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.userId) || "admin";

  const response = await fetch(`${baseUrl}/api/Location/DeleteLocation?tenantId=${tenantId}&locationId=${locationId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ locationId, tenantId, updatedBy: userId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete location.");
  }
  return response.json();
} 