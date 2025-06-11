import type { components } from "../../../api-types";

type Role = components["schemas"]["Role"];

type Props = {
    role: Role;
    editedName: string;
    setEditedName: (val: string) => void;
    setEditingRoleId: (id: number | null) => void;
    setSelectedRoleId: (id: number) => void;
    handleUpdate: (id: number) => void;
};
export function RoleListItemEdited({
    role,
    editedName,
    setEditedName,
    setEditingRoleId,
    setSelectedRoleId,
    handleUpdate: handleSave,
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
                <input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={() => handleSave(role.id)}>Save</button>
                <button onClick={() => setEditingRoleId(null)}>Cancel</button>
            </>
        </li>
    );
}
