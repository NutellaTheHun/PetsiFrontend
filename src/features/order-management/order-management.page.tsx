import { Outlet } from "react-router-dom";
import { ROUTE } from "../../app/routes/constants";
import { Sidebar } from "../shared-components/Sidebar";
import { SidebarItem } from "../shared-components/SidebarItem";

export function OrderManagementPage() {
  return (
    <div className="d-flex" style={{ backgroundColor: "white" }}>
      <Sidebar>
        <SidebarItem text="Dashboard" linkTo={ROUTE.ORDER.ROOT} />
        <SidebarItem text="Orders" linkTo={ROUTE.ORDER.ORDERS} />
        <SidebarItem text="Items" linkTo={ROUTE.ORDER.ITEMS} />
        <SidebarItem text="Templates" linkTo={ROUTE.ORDER.TEMPLATES} />
        <SidebarItem text="Labels" linkTo={ROUTE.ORDER.LABELS} />
      </Sidebar>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
