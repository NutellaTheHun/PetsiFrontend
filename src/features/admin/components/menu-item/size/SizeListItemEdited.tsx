import { useState } from "react";
import type { components } from "../../../../../api-types";

type MenuItemSize = components["schemas"]["MenuItemSize"];

type Props = {
    size: MenuItemSize;
    setEditingSizeId: (id: number | null) => void; //
    handleUpdate: (name: string) => void;
};

export function SizeListItemEdited({
    size,
    setEditingSizeId,
    handleUpdate,
}: Props) {
    const [editedName, setEditedName] = useState(size.name);
    return (
        <li
            key={size.id}
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
                <button onClick={() => setEditingSizeId(null)}>Cancel</button>
            </>
        </li>
    );
}
