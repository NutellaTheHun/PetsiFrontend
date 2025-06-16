import { RoleSettings } from "./role/RoleSettings";
import { UserSettings } from "./user/UserSettings";

export function UserRoleSettingsWindow() {
    return (
        <>
            <RoleSettings />
            <UserSettings />
        </>
    );
}
