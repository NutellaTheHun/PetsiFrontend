export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("roles");

  // redirect to login
  window.location.href = "/login";
}
