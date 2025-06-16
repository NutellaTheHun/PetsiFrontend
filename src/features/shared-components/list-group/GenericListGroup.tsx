import React, { useState } from "react";
import { GenericNewItemForm } from "./GenericNewItemForm";

type GenericListGroupProps<T> = {
    items: T[];
    title: string;
    renderItem: (
        item: T,
        state: {
            selectedId: number | null;
            editingId: number | null;
            setSelectedId: (id: number) => void;
            setEditingId: (id: number | null) => void;
            handleUpdate: (value: string) => void;
        }
    ) => React.ReactNode;
    onAdd: (name: string) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, name: string) => void;
    //selectedId?: number | null;
};

export function GenericListGroup<T extends { id: number }>({
    items,
    title,
    renderItem,
    onAdd,
    onUpdate,
    onDelete,
}: //selectedId: initialSelectedId = null,
GenericListGroupProps<T>) {
    const [selectedId, setSelectedId] = useState<number | null>(
        null
        //
    );
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleUpdate = (value: string) => {
        if (editingId !== null) {
            onUpdate(editingId, value);
        }
    };

    return (
        <div
            className="container p-4 border rounded bg-white"
            style={{ width: 400 }}
        >
            <h3>{title}</h3>

            <ul className="list-group mb-3">
                {items.map((item) =>
                    renderItem(item, {
                        selectedId,
                        editingId,
                        setSelectedId,
                        setEditingId,
                        handleUpdate,
                    })
                )}
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
