import { DropdownCheckboxSelection } from "../../../../lib/uiComponents/input/DropdownCheckboxSelection";
import type { Role } from "../../../entityTypes";

type Props = {
    selectedRoles: Role[];
    onUpdateRoles: (roles: Role[]) => void;
    roles: Role[];
};

export function RoleDropdownCheckbox({
    selectedRoles,
    onUpdateRoles,
    roles,
}: Props) {
    return (
        <DropdownCheckboxSelection
            totalOptions={roles}
            selectedOptions={selectedRoles}
            labelKey={"roleName"}
            onCheckboxChange={onUpdateRoles}
        />
    );
}
