import { useState } from "react";
import type { components } from "../../../../api-types";

type Role = components["schemas"]["Role"];

type Props = {
    role: Role;
    setEditingRoleId: (id: number | null) => void; //
    handleUpdate: (name: string) => void;
};
export function RoleListItemEdited({
    role,
    setEditingRoleId,
    handleUpdate,
}: Props) {
    const [editedName, setEditedName] = useState(role.roleName);
    return (
        <li
            key={role.id}
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
                <button onClick={() => handleUpdate(editedName)}>Save</button>
                <button onClick={() => setEditingRoleId(null)}>Cancel</button>
            </>
        </li>
    );
}
