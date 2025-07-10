import {
    GenericDropdownCheckbox,
    createDropdownOptions,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownCheckbox";
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
    placeholder = "Select roles...",
}: Props) {
    const options = createDropdownOptions(roles, "roleName");

    return (
        <GenericDropdownCheckbox
            selectedValues={selectedRoles}
            onUpdateValues={onUpdateRoles}
            options={options}
            placeholder={placeholder}
        />
    );
}
