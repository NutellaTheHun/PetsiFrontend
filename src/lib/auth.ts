import { jwtDecode } from "jwt-decode";
import { RoleFeatureMap } from "../app/constants";

export function getUserRoles(): string[] {
    const stored = localStorage.getItem("roles");
    return stored ? JSON.parse(stored) : [];
}

export function getAuthorizedUserFeatures() {
    const roles = getUserRoles();
    const result = new Set<string>();
    roles.forEach((role) => {
        RoleFeatureMap[role]?.forEach((feature) => {
            result.add(feature);
        });
    });
    return Array.from(result);
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

export function isTokenExpired(): boolean {
    const token = getToken();

    if (!token) return true;

    const { exp } = jwtDecode(token);
    if (!exp) {
        return true;
    }

    return Date.now() > exp * 1000;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");

    // redirect to login
    window.location.href = "/login";
}
