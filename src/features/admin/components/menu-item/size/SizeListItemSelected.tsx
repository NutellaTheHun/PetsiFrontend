import type { components } from "../../../../../api-types";

type MenuItemSize = components["schemas"]["MenuItemSize"];

type Props = {
    size: MenuItemSize;
    handleEdit: (id: number, currentName: string) => void;
};

export function SizeListItemSelected({ size, handleEdit }: Props) {
    return (
        <li
            key={size.id}
            className={
                "list-group-item d-flex justify-content-between align-items-center active text-white"
            }
            style={{ cursor: "pointer" }}
        >
            <>
                <span>{size.name}</span>
                <button onClick={() => handleEdit(size.id, size.name)}>
                    Edit
                </button>
            </>
        </li>
    );
}
