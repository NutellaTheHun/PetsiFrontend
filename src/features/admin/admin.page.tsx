import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import {
    adminPanelItem,
    NavbarNested,
} from "../../lib/uiComponents/navbar/MantineNavbar";

export function AdminPage() {
    return (
        <AppShell
            padding="md"
            navbar={{
                width: 300,
                breakpoint: "sm",
            }}
        >
            <AppShell.Navbar>
                <NavbarNested items={adminPanelItem} />
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
