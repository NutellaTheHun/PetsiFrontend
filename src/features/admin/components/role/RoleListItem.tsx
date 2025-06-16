import type { components } from "../../../../api-types";

type Role = components["schemas"]["Role"];

type Props = {
    role: Role;
    setSelectedRoleId: (id: number) => void;
};
export function RoleListItem({ role, setSelectedRoleId }: Props) {
    return (
        <li
            key={role.id}
            onClick={() => setSelectedRoleId(role.id)}
            className={
                "list-group-item d-flex justify-content-between align-items-center"
            }
            style={{ cursor: "pointer" }}
        >
            {role.roleName}
        </li>
    );
}
