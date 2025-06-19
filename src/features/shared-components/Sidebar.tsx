import { logout } from "../../lib/auth";
import { SidebarItem } from "./SidebarItem";

export type SidebarProps = {
    children?: React.ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
    return (
        <div
            className="bg-dark text-white p-3 d-flex flex-column justify-content-between"
            style={{
                width: "220px",
                height: "100vh",
            }}
        >
            <ul className="nav flex-column">{children}</ul>

            <ul className="nav flex-column">
                <SidebarItem text="Logout" action={logout} />
            </ul>
        </div>
    );
}
