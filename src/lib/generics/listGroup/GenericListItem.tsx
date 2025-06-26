type Props<T extends { id: number }, K extends keyof T> = {
    entity: T;
    entityProp: K;
    setSelectedId: (id: number) => void;
};
export function GenericListItem<T extends { id: number }, K extends keyof T>({
    entity,
    entityProp,
    setSelectedId,
}: Props<T, K>) {
    return (
        <li
            onClick={() => setSelectedId(entity.id)}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
        >
            {String(entity[entityProp])}
        </li>
    );
}
