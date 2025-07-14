// src/lib/offerService.ts
import { getValidToken } from './authService';

export async function insertOffer(offer) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7187';
  const tenantId = localStorage.getItem('tenantId');
  const createdBy = localStorage.getItem('email');
  const isDeleted = false;
  const token = await getValidToken();
  const payload = {
    ...offer,
    tenantId,
    createdBy,
    isDeleted,
  };
  const response = await fetch(`${baseUrl}/api/Offer/InsertOffer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to save offer');
  }
  return response.json();
}

export async function getOffers() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7187';
  const tenantId = localStorage.getItem('tenantId');
  const token = await getValidToken();
  const response = await fetch(`${baseUrl}/api/Offer/ListOffers?tenantId=${tenantId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch offers');
  }
  return response.json();
}

export async function deleteOffer(offerId) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7187';
  const token = await getValidToken();
  const tenantId = localStorage.getItem('tenantId');
  const updatedBy = localStorage.getItem('email');
  const payload = {
    offerId: Number(offerId),
    tenantId: Number(tenantId),
    updatedBy: updatedBy || '',
  };
  const response = await fetch(`${baseUrl}/api/Offer/DeleteOffer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete offer');
  }
  return response.json();
}

export async function updateOffer(offer) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7187';
  const tenantId = localStorage.getItem('tenantId');
  const updatedBy = localStorage.getItem('email');
  const token = await getValidToken();
  const payload = {
    offerId: Number(offer.offerId),
    tenantId: Number(tenantId),
    title: offer.title || '',
    description: offer.description || '',
    offerCode: offer.offerCode || '',
    discountAmount: Number(offer.discountAmount) || 0,
    discountPercent: Number(offer.discountPercent) || 0,
    startDate: offer.startDate || '',
    endDate: offer.endDate || '',
    applicableTo: offer.applicableTo || '',
    serviceId: Number(offer.serviceId) || 0,
    categoryId: Number(offer.categoryId) || 0,
    maxUsage: Number(offer.maxUsage) || 0,
    perUserLimit: Number(offer.perUserLimit) || 0,
    updatedBy: updatedBy || '',
    isActive: offer.isActive === true || offer.isActive === 'true',
  };
  const response = await fetch(`${baseUrl}/api/Offer/UpdateOffer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update offer');
  }
  return response.json();
} 