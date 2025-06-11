import { RoleFeatureMap } from "../app/constants";

export function getUserRoles(): string[] {
  const stored = localStorage.getItem("roles");
  return stored ? JSON.parse(stored) : [];
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function hasAccess(feature: string): boolean {
  const roles = getUserRoles();
  return roles.some((role) => RoleFeatureMap[role]?.includes(feature));
}
