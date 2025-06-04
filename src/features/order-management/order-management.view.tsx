import { Outlet } from "react-router-dom";
import { Sidebar } from "../shared/components/Sidebar";
import { SidebarItem } from "../shared/components/SidebarItem";

export function OrderManagementView() {
  return (
    <div className="d-flex" style={{ backgroundColor: "white" }}>
      <Sidebar>
        <SidebarItem text="Dashboard" linkTo="/ordersDash" />
        <SidebarItem text="Orders" linkTo="/ordersDash/orders" />
        <SidebarItem text="Items" linkTo="/ordersDash/items" />
        <SidebarItem text="Templates" linkTo="/ordersDash/templates" />
        <SidebarItem text="Labels" linkTo="/ordersDash/labels" />
      </Sidebar>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
