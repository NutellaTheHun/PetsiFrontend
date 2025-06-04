export function handleLoginSuccess(data: any) {
  if (!data.access_token || !data.roles) {
    throw new Error();
  }
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("roles", JSON.stringify(data.roles));
}
