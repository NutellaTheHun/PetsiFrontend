export function getUserRoles(): string[] {
    const stored = localStorage.getItem('roles');
    return stored ? JSON.parse(stored) : [];
}

export function getToken(): string | null {
    return localStorage.getItem('token');
}

export function isAuthenticated(): boolean {
    return !!getToken();
}