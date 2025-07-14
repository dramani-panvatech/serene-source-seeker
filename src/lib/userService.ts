// src/lib/userService.ts

import {  getValidToken } from './authService';
import { LOCAL_STORAGE_KEYS } from "./localStorageKeys";
export async function insertUser(user: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
  notes?: string;
  photoUrl?: string;
  password?: string;
  userId?: string;
  role?: string;
  categoryId?: number; // decimal
  yearsOfExperience?: number;
}) {
  
const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "0";
const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.userId) || "0";

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  
  const response = await fetch(`${baseUrl}/api/User/InsertUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...user,
      role: user.role || 'Client',
      tenantId: tenantId,
      createdBy: userId,
      password: user.password || 'password', // Default password
      categoryId: user.categoryId,
      yearsOfExperience: user.yearsOfExperience,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to add customer.');
  }
  return response.json();
} 

export async function getCustomersByCreator({ status, state }: { status?: string, state?: string } = {}) {
  const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.userId);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();

  let url = `${baseUrl}/api/User/GetCustomer?createdBy=${userId}`;
  if (status && status !== 'all') url += `&status=${status}`;
  if (state && state !== 'all') url += `&state=${encodeURIComponent(state)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch customers.');
  }
  return response.json();
} 

// getMyCustomers fetches users (was customers) from the backend
// Pass userType: 'Client' for customers, 'NotClient' for staff
export async function getMyCustomers(userType = 'Client') {
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "1";
  const userRole = localStorage.getItem(LOCAL_STORAGE_KEYS.role) || "Admin";
  const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.userId);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();

  const url = `${baseUrl}/api/User/GetUserList?tenantId=${tenantId}&userRole=${encodeURIComponent(userRole)}&userId=${userId}&getUserRole=${encodeURIComponent(userType)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch user list.');
  }
  return response.json();
} 

export async function getMyCustomersFiltered({ status }: { status?: string } = {}) {
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "1";
  const userRole = localStorage.getItem(LOCAL_STORAGE_KEYS.role) || "Admin";
  const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.userId);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();

  let url = `${baseUrl}/api/Customer/GetMyCustomers?tenantId=${tenantId}&userRole=${encodeURIComponent(userRole)}&userId=${userId}`;
  if (status && status !== 'all') url += `&status=${encodeURIComponent(status)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch customers.');
  }
  return response.json();
} 

export async function updateCustomer(customer) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const response = await fetch(`${baseUrl}/api/Customer/UpdateCustomer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(customer),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update customer.');
  }
  return response.json();
} 

export async function getUserById(userId) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "1";

  const response = await fetch(`${baseUrl}/api/User/GetUserById?userId=${userId}&tenantId=${tenantId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch user.');
  }
  return response.json();
} 

export async function updateUser(user) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "1";
  const updatedBy = localStorage.getItem(LOCAL_STORAGE_KEYS.userId);

  const payload = { ...user, tenantId, updatedBy, userId: user.userId };
  console.log('updateUser payload:', payload);

  const response = await fetch(`${baseUrl}/api/User/UpdateUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch (e) {
      // ignore
    }
    console.error('updateUser backend error:', errorData);
    const message = (errorData && typeof errorData.message === 'string') ? errorData.message : undefined;
    throw new Error(message || 'Failed to update user.');
  }
  return response.json();
} 

export async function setUserActiveStatus(userId, isActive) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "1";
  const updatedBy = localStorage.getItem(LOCAL_STORAGE_KEYS.userId);
  const updatedByRole = localStorage.getItem(LOCAL_STORAGE_KEYS.role);

  const response = await fetch(`${baseUrl}/api/User/SetUserActiveStatus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, tenantId, isActive, updatedBy, userRole: updatedByRole }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update user status.');
  }
  return response.json();
} 

export async function getProfileById(userId) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "1";

  const response = await fetch(`${baseUrl}/api/User/GetProfileById?userId=${userId}&tenantId=${tenantId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch profile.');
  }
  return response.json();
} 