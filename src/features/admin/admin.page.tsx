import { Outlet } from "react-router-dom";
import { ROUTE } from "../../app/routes/constants";
import { ContentWrapper } from "../shared-components/ContentWrapper";
import { Sidebar } from "../shared-components/Sidebar";
import { SidebarItem } from "../shared-components/SidebarItem";

export function AdminPage() {
    return (
        <div className="d-flex" style={{ backgroundColor: "white" }}>
            <Sidebar>
                <SidebarItem
                    text="Roles and Users"
                    linkTo={ROUTE.ADMIN.ROLE_USERS}
                />
                <SidebarItem
                    text="Menu Items"
                    linkTo={ROUTE.ADMIN.MENU_ITEMS}
                />
                <SidebarItem text="Orders" linkTo={ROUTE.ADMIN.ORDERS} />
                <SidebarItem text="Templates" linkTo={ROUTE.ADMIN.TEMPLATE} />
                <SidebarItem text="Labels" linkTo={ROUTE.ADMIN.LABEL} />
                <SidebarItem
                    text="Inv Areas"
                    linkTo={ROUTE.ADMIN.INVENTORY_AREAS}
                />
                <SidebarItem
                    text="Inv Items"
                    linkTo={ROUTE.ADMIN.INVENTORY_ITEMS}
                />
                <SidebarItem
                    text="Units of Measure"
                    linkTo={ROUTE.ADMIN.UNIT_OF_MEASURE}
                />
                <SidebarItem text="Recipes" linkTo={ROUTE.ADMIN.RECIPE} />
            </Sidebar>

            <ContentWrapper>
                <Outlet />
            </ContentWrapper>
        </div>
    );
}
