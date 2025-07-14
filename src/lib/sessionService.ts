import { getValidToken } from "./authService";
import { LOCAL_STORAGE_KEYS } from "./localStorageKeys";

export async function getClassSessionsSimpleList({ title = "", pageNumber = 1, pageSize = 10 } = {}) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = await getValidToken();
  const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.tenantId);

  const payload = {
    tenantId: Number(tenantId),
    title,
    pageNumber,
    pageSize,
  };

  const response = await fetch(`${baseUrl}/api/ClassSession/GetClassSessionsSimpleList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch class sessions.");
  }
  const data = await response.json();
  return data;
} 