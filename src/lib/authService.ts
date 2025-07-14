// src/lib/authService.ts
import { LOCAL_STORAGE_KEYS } from "./localStorageKeys";

export async function getAuthToken(email: string, password: string) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "0";

  const response = await fetch(`${baseUrl}/api/Auth/Token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenantId, email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to get auth token");
  }
  const data = await response.json();
  if (data.data.token) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.token, data.data.token);
  }
  if (data.data.expiryTime) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.tokenExpiry, data.data.expiryTime);
  }
  return data;
}

export async function adminLogin({ email, password, rememberMe }: { email: string; password: string; rememberMe: boolean }) {
  debugger;
  // Get tokende before login
  await getAuthToken(email, password);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const tenantId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId) || "0");
  const response = await fetch(`${baseUrl}/api/Login/AdminLogin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.token)}`,
    },
    body: JSON.stringify({ email, password, rememberMe, tenantId }),  
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed. Please try again.');
  }
  else
  {
    const result = await response.json();
    if (result && result.data) {
      const userData = result.data;
      localStorage.setItem(LOCAL_STORAGE_KEYS.userId, userData.userId);
      localStorage.setItem(LOCAL_STORAGE_KEYS.firstName, userData.firstName);
      localStorage.setItem(LOCAL_STORAGE_KEYS.lastName, userData.lastName);
      localStorage.setItem(LOCAL_STORAGE_KEYS.email, userData.email);
      localStorage.setItem(LOCAL_STORAGE_KEYS.role, userData.role);
      localStorage.setItem(LOCAL_STORAGE_KEYS.password, password);
    }
    return result;
  }
}

/**
 * GENERAL TOKEN MANAGEMENT
 *
 * Use getValidToken(email, password) to always get a valid token for API calls.
 * It checks expiry and refreshes the token if needed by calling getAuthToken.
 *
 * Example usage:
 *   const token = await getValidToken(email, password);
 *   // Use token in your API request
 *
 * Note: For silent refresh, you must have access to the user's email and password.
 */

// Helper to check if token is expired
export function isTokenExpired() {
  const expiry = localStorage.getItem(LOCAL_STORAGE_KEYS.tokenExpiry);
  if (!expiry) return true;
  // If expiry is a UTC date string, parse it and compare to current UTC time
  const expiryTime = Date.parse(expiry);
  if (isNaN(expiryTime)) return true;
  return Date.now() > expiryTime;
}

// General function to get a valid token
export async function getValidToken() {
  let token = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
  if (!token || isTokenExpired()) {
    let email = localStorage.getItem(LOCAL_STORAGE_KEYS.email);
    let password = localStorage.getItem(LOCAL_STORAGE_KEYS.password);
    const data = await getAuthToken(email, password);
    token = data.data.token;
  }
  return token;
} 