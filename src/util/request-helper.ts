export async function apiRequest(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': `application/json`,
    };

    return fetch(`http://localhost:3000${url}`, {
        ...options,
        headers,
    });
}