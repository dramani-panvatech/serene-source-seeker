import { getValidToken } from './authService';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7187';

export async function getResourceList() {
  const tenantId = localStorage.getItem('tenantId');
  const token = await getValidToken();
  const url = `${baseUrl}/api/Resource/ResourceList?tenantId=${tenantId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch resource list.');
  }
  return response.json();
}

export async function insertResource(resource) {
  const tenantId = Number(localStorage.getItem('tenantId')) || 0;
  const email = localStorage.getItem('email') || '';
  const token = await getValidToken();
  const payload = {
    resourceId: 0,
    tenantId,
    name: resource.name,
    description: resource.description,
    type: resource.type,
    capacity: Number(resource.capacity) || 0,
    //isActive: resource.status,
    createdBy: email,
  };
  const url = `${baseUrl}/api/Resource/InsertResource?tenantId=${tenantId}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to add resource.');
  }
  return response.json();
}

export async function updateResource(resource) {
  const tenantId = Number(localStorage.getItem('tenantId')) || 0;
  const email = localStorage.getItem('email') || '';
  const token = await getValidToken();
  const isDeleted = false;
  const payload = {
    resourceId: Number(resource.resourceId),
    tenantId,
    name: resource.name,
    description: resource.description,
    type: resource.type,
    capacity: Number(resource.capacity) || 0,
    //isActive: resource.status,
    createdBy: email,
    isDeleted
  };
  const url = `${baseUrl}/api/Resource/UpdateResource?tenantId=${tenantId}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update resource.');
  }
  return response.json();
}

export async function deleteResource(resourceId, updatedBy) {
  const tenantId = Number(localStorage.getItem('tenantId')) || 0;
  const token = await getValidToken();
  const payload = {
    resourceId: Number(resourceId),
    updatedBy: updatedBy || localStorage.getItem('email') || '',
  };
  const url = `${baseUrl}/api/Resource/DeleteResource?tenantId=${tenantId}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete resource.');
  }
  return response.json();
}
