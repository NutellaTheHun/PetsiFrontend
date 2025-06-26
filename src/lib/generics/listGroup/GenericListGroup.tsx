import { useState } from "react";
import { GenericListItem } from "./GenericListItem";
import { GenericListItemEdited } from "./GenericListItemEdited";
import { GenericListItemSelected } from "./GenericListItemSelected";
import { GenericNewItemForm } from "./GenericNewItemForm";

type GenericListGroupProps<T, K extends keyof T, V extends T[K] = T[K]> = {
    items: T[];
    title: string;
    targetProp: K;
    selectedId: number | null;
    setSelectedId: (id: number) => void;
    onAdd: (name: string) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, name: V) => void;
};

export function GenericListGroup<
    T extends { id: number },
    K extends keyof T,
    V extends T[K] = T[K]
>({
    items,
    title,
    targetProp,
    selectedId,
    setSelectedId,
    onAdd,
    onUpdate,
    onDelete,
}: GenericListGroupProps<T, K, V>) {
    //const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleUpdate = (value: V) => {
        if (editingId !== null) {
            onUpdate(editingId, value);
            setEditingId(null);
        }
    };

    return (
        <div
            className="container p-4 border rounded bg-white"
            style={{ width: 400 }}
        >
            <h3>{title}</h3>

            <ul className="list-group mb-3">
                {items.map((item) => {
                    if (item.id === editingId && item.id === selectedId) {
                        return (
                            <GenericListItemEdited
                                key={item.id}
                                entity={item}
                                propToUpdate={targetProp}
                                setEdit={setEditingId}
                                handleUpdate={handleUpdate}
                            />
                        );
                    }
                    if (item.id === selectedId) {
                        return (
                            <GenericListItemSelected
                                key={item.id}
                                entity={item}
                                entityProp={targetProp}
                                setEdit={setEditingId}
                            />
                        );
                    }
                    return (
                        <GenericListItem
                            key={item.id}
                            entity={item}
                            entityProp={targetProp}
                            setSelectedId={setSelectedId}
                        />
                    );
                })}
            </ul>

            <GenericNewItemForm onSubmit={onAdd} />

            <button
                className="btn btn-danger"
                onClick={() => selectedId && onDelete(selectedId)}
                disabled={!selectedId}
            >
                Remove Selected
            </button>
        </div>
    );
}
