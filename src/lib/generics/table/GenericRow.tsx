import type { GenericStatefulEntity } from "../GenericStatefulEntity";

type Props<T extends { id: number }> = {
    children: React.ReactNode[];
    onSetSelect: (entity: T) => void;
    entityInstance: GenericStatefulEntity<T>;
};
export function GenericRow<T extends { id: number }>({
    children,
    onSetSelect,
    entityInstance,
}: Props<T>) {
    return (
        <tr
            className="table-light"
            onClick={() => onSetSelect(entityInstance.entity)}
            style={{
                cursor: "pointer",
            }}
        >
            {children}
        </tr>
    );
}
