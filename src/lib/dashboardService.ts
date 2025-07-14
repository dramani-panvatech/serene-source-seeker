// src/lib/dashboardService.ts

import { getValidToken } from './authService';

export async function getDashboardData() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  //debugger;
  const token = await getValidToken();
  const tenantId = localStorage.getItem("tenantId");
console.log(token, "token");

  const response = await fetch(`${baseUrl}/api/Dashboard/GetDashboardData?tenantId=${tenantId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to load dashboard data');
  }
  debugger;
  return response.json();
} 