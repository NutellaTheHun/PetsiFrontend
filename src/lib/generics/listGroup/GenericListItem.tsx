import type { GenericStatefulEntity } from "../GenericStatefulEntity";

type Props<T extends { id: number }> = {
    entityInstance: GenericStatefulEntity<T>;
    onItemClick: (id: number) => void;
    children?: React.ReactNode;
};

export function GenericListItem<T extends { id: number }>({
    entityInstance,
    onItemClick,
    children,
}: Props<T>) {
    return (
        <li
            onClick={() => onItemClick(entityInstance.entity.id)}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
        >
            {children}
        </li>
    );
}
