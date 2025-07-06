import type { GenericStatefulEntity } from "../GenericStatefulEntity";

type Props<T extends { id: number }> = {
    children: React.ReactNode[];
    entityInstance: GenericStatefulEntity<T>;
    onDelete: (id: number) => void;
    setEdit: (entity: T | null) => void;
};
export function GenericRowSelected<T extends { id: number }>({
    children,
    entityInstance,
    onDelete,
    setEdit,
}: Props<T>) {
    return (
        <tr
            className="table-info"
            style={{
                cursor: "pointer",
            }}
        >
            {children}
            <td>
                <button
                    className="btn btn-primary"
                    onClick={() => setEdit(entityInstance.entity)}
                >
                    Edit
                </button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(entityInstance.entity.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}
