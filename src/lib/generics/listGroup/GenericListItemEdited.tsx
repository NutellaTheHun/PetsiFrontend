import type { GenericStatefulEntity } from "../GenericStatefulEntity";

type Props<T extends { id: number }> = {
    entityInstance: GenericStatefulEntity<T>;
    onClickCancel: (id: number | null) => void;
    onClickUpdate: (id: number) => void;
    children?: React.ReactNode;
};

export function GenericListItemEdited<T extends { id: number }>({
    entityInstance,
    onClickUpdate,
    onClickCancel,
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
                {children}
                <button
                    className="btn btn-primary"
                    onClick={() => onClickUpdate(entityInstance.entity.id)}
                >
                    Save
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => onClickCancel(null)}
                >
                    Cancel
                </button>
            </>
        </li>
    );
}
