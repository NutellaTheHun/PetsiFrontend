import { Outlet } from "react-router-dom";

export function OrderManagementView() {
  return (
    <div>
      <h1>Order Management View</h1>
      <Outlet />
    </div>
  );
}
