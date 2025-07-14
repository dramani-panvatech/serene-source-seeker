// src/lib/localStorageKeys.ts

export const LOCAL_STORAGE_KEYS = {
  tenantId: "tenantId",
  tenantName: "TenantName",
  faviconUrl: "faviconUrl",
  logoUrl: "logoUrl",
  token: "token",
  tokenExpiry: "tokenExpiry",
  userId: "userId",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  password: "password",
  role: "role",
} as const;

export type LocalStorageKey = typeof LOCAL_STORAGE_KEYS[keyof typeof LOCAL_STORAGE_KEYS]; 