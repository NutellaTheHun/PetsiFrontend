import { Outlet } from "react-router-dom";
import { Sidebar } from "../shared/components/Sidebar";
import { SidebarItem } from "../shared/components/SidebarItem";

export function InventoryManagementView() {
  return (
    <div className="d-flex" style={{ backgroundColor: "white" }}>
      <Sidebar>
        <SidebarItem text="Dashboard" linkTo="/inventoryDash" />
        <SidebarItem
          text="Inventory Counts"
          linkTo="/inventoryDash/inventoryCounts"
        />
      </Sidebar>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
