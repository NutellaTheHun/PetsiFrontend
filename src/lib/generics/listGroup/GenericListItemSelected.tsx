import type { GenericStatefulEntity } from "../GenericStatefulEntity";

type Props<T extends { id: number }> = {
    entityInstance: GenericStatefulEntity<T>;
    onClickEdit: (entity: T) => void;
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
                "list-group-item d-flex justify-content-between align-items-center bg-secondary-subtle text-black"
            }
            style={{ cursor: "pointer" }}
        >
            <span>{children}</span>
            <div className="d-flex gap-2">
                <button
                    className="btn btn-primary"
                    onClick={() => onClickEdit(entityInstance.entity)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => onClickDelete(entityInstance.entity.id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
