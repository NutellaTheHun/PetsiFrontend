import { RoleSettings } from "./role/RoleSettings";
import { UserSettings } from "./user/UserSettings";

export function UserRoleSettingsWindow() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <RoleSettings />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <UserSettings />
                </div>
            </div>
        </div>
    );
}
