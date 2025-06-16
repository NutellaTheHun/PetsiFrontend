import type { components } from "../../../../api-types";

type Role = components["schemas"]["Role"];

type Props = {
    role: Role;
    setSelectedRoleId: (id: number) => void;
    handleEdit: (id: number, currentName: string) => void;
};
export function RoleListItemSelected({
    role,
    setSelectedRoleId,
    handleEdit,
}: Props) {
    return (
        <li
            key={role.id}
            onClick={() => setSelectedRoleId(role.id)}
            className={
                "list-group-item d-flex justify-content-between align-items-center active text-white"
            }
            style={{ cursor: "pointer" }}
        >
            <>
                <span>{role.roleName}</span>
                <button onClick={() => handleEdit(role.id, role.roleName)}>
                    Edit
                </button>
            </>
        </li>
    );
}
