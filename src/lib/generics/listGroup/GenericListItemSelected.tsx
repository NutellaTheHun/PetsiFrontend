import type { GenericStatefulEntity } from "../GenericStatefulEntity";

type Props<T extends { id: number }> = {
    entityInstance: GenericStatefulEntity<T>;
    onClickEdit: (id: number) => void;
    onClickDelete: (id: number) => void;
    children?: React.ReactNode;
};

export function GenericListItemSelected<T extends { id: number }>({
    entityInstance,
    onClickEdit,
    onClickDelete,
    children,
}: Props<T>) {
    return (
        <li
            className={
                "list-group-item d-flex justify-content-between align-items-center active text-white"
            }
            style={{ cursor: "pointer" }}
        >
            <>
                <span>{children}</span>
                <button onClick={() => onClickEdit(entityInstance.entity.id)}>
                    Edit
                </button>
                <button onClick={() => onClickDelete(entityInstance.entity.id)}>
                    Delete
                </button>
            </>
        </li>
    );
}
