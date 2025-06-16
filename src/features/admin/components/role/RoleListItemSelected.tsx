import type { components } from "../../../../api-types";

type Role = components["schemas"]["Role"];

type Props = {
    role: Role;
    handleEdit: (id: number) => void;
};
export function RoleListItemSelected({ role, handleEdit }: Props) {
    return (
        <li
            key={role.id}
            className={
                "list-group-item d-flex justify-content-between align-items-center active text-white"
            }
            style={{ cursor: "pointer" }}
        >
            <>
                <span>{role.roleName}</span>
                <button onClick={() => handleEdit(role.id)}>Edit</button>
            </>
        </li>
    );
}
