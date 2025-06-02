export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');

    // Optional: redirect to login
    window.location.href = '/login';
}