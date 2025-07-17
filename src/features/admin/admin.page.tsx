import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { getNavbarItems, Navbar } from "../../lib/uiComponents/navbar/Navbar";

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
                <Navbar items={getNavbarItems("Admin")} />
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
