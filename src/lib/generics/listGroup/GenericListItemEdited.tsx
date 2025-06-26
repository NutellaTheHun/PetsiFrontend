import { useState } from "react";

type Props<
    T extends { id: number },
    K extends keyof T,
    V extends T[K] = T[K]
> = {
    entity: T;
    propToUpdate: K;
    setEdit: (id: number | null) => void;
    handleUpdate: (val: V) => void;
};
export function GenericListItemEdited<
    T extends { id: number },
    K extends keyof T,
    V extends T[K] = T[K]
>({ entity, propToUpdate, setEdit, handleUpdate }: Props<T, K, V>) {
    const initialVal = entity[propToUpdate] as V;
    const [editVal, setEditVal] = useState<V>(initialVal);
    return (
        <li
            className={
                "list-group-item d-flex justify-content-between align-items-center active text-white"
            }
            style={{ cursor: "pointer" }}
        >
            <>
                <input
                    value={String(editVal)}
                    onChange={(e) => setEditVal(e.target.value as V)}
                />
                <button onClick={() => handleUpdate(editVal)}>Save</button>
                <button onClick={() => setEdit(null)}>Cancel</button>
            </>
        </li>
    );
}
