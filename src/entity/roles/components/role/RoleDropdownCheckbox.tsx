import { MultiSelectCheckbox } from "../../../../lib/uiComponents/input/MantineMultiSelectCheckbox";
import type { Role } from "../../../entityTypes";

type Props = {
    selectedRoles: Role[];
    onUpdateRoles: (roles: Role[]) => void;
    roles: Role[];
    placeholder?: string;
};

export function RoleDropdownCheckbox({
    selectedRoles,
    onUpdateRoles,
    roles,
}: Props) {
    return (
        <MultiSelectCheckbox
            totalOptions={roles}
            selectedOptions={selectedRoles}
            labelKey={"roleName"}
            onCheckboxChange={onUpdateRoles}
        />
    );
}
