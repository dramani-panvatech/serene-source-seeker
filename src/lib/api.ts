// src/lib/api.ts

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token'); // Adjust key if your token is stored under a different name

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
} 