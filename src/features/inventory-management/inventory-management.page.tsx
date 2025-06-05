import { Outlet } from "react-router-dom";
import { ROUTE } from "../../app/routes/constants";
import { Sidebar } from "../shared-components/Sidebar";
import { SidebarItem } from "../shared-components/SidebarItem";

export function InventoryManagementPage() {
  return (
    <div className="d-flex" style={{ backgroundColor: "white" }}>
      <Sidebar>
        <SidebarItem text="Dashboard" linkTo={ROUTE.INVENTORY.ROOT} />
        <SidebarItem text="Inventory Counts" linkTo={ROUTE.INVENTORY.COUNTS} />
      </Sidebar>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
