type Props<T extends { id: number }, K extends keyof T> = {
    entity: T;
    entityProp: K;
    setEdit: (id: number) => void;
};
export function GenericListItemSelected<
    T extends { id: number },
    K extends keyof T
>({ entity, entityProp, setEdit }: Props<T, K>) {
    return (
        <li
            className={
                "list-group-item d-flex justify-content-between align-items-center active text-white"
            }
            style={{ cursor: "pointer" }}
        >
            <>
                <span>{String(entity[entityProp])}</span>
                <button onClick={() => setEdit(entity.id)}>Edit</button>
            </>
        </li>
    );
}
