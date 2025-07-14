import { Button } from "@mantine/core";
import { logout } from "../../auth";

export function LogoutButton() {
    return (
        <Button variant="filled" color="red" onClick={logout}>
            Logout
        </Button>
    );
}
