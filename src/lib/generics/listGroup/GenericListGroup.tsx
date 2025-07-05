import { useState } from "react";
import type { GenericStatefulEntity } from "../GenericStatefulEntity";
import { GenericListItemStateSelector } from "./GenericListItemStateSelector";

type GenericListGroupProps<T extends { id: number }> = {
    items: GenericStatefulEntity<T>[];
    selectedIdState: [number | null, (id: number | null) => void];
    editingIdState: [number | null, (id: number | null) => void];
    onAdd: (name: string) => void;
    onAddChange?: (name: string) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number) => void;
    renderItem: (item: GenericStatefulEntity<T>) => React.ReactNode;
    renderNewItem?: (
        value: string,
        onChange: (value: string) => void,
        onSave: () => void,
        onCancel: () => void
    ) => React.ReactNode;
};

export function GenericListGroup<T extends { id: number }>({
    items,
    selectedIdState,
    editingIdState,
    onAdd,
    onAddChange,
    onUpdate,
    onDelete,
    renderItem,
    renderNewItem,
}: GenericListGroupProps<T>) {
    const [selectedId, setSelectedId] =
        selectedIdState ?? useState<number | null>(null);

    const [editingId, setEditingId] =
        editingIdState ?? useState<number | null>(null);

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newItemValue, setNewItemValue] = useState("");

    const handleAddNew = () => {
        setIsAddingNew(true);
        setNewItemValue("");
    };

    const handleSaveNew = () => {
        if (newItemValue.trim()) {
            onAdd(newItemValue.trim());
            setIsAddingNew(false);
            setNewItemValue("");
            onAddChange?.("");
        }
    };

    const handleCancelNew = () => {
        setIsAddingNew(false);
        setNewItemValue("");
        onAddChange?.("");
    };

    const handleNewItemChange = (value: string) => {
        setNewItemValue(value);
        onAddChange?.(value);
    };

    const defaultRenderNewItem = (
        value: string,
        onChange: (value: string) => void,
        onSave: () => void,
        onCancel: () => void
    ) => (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="form-control me-2"
                placeholder="Enter name..."
                autoFocus
            />
            <div>
                <button
                    className="btn btn-success btn-sm me-1"
                    onClick={onSave}
                    disabled={!value.trim()}
                >
                    Save
                </button>
                <button className="btn btn-secondary btn-sm" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </li>
    );

    return (
        <div
            className="container p-4 border rounded bg-white"
            style={{ width: 400 }}
        >
            <ul className="list-group mb-3">
                {items.map((item) => {
                    return (
                        <GenericListItemStateSelector
                            key={item.entity.id}
                            entityInstance={item}
                            onSetSelectId={() => setSelectedId}
                            onSetEditId={setEditingId}
                            onUpdateInstance={onUpdate}
                            onDeleteInstance={onDelete}
                        >
                            {renderItem(item)}
                        </GenericListItemStateSelector>
                    );
                })}

                {isAddingNew &&
                    (renderNewItem
                        ? renderNewItem(
                              newItemValue,
                              handleNewItemChange,
                              handleSaveNew,
                              handleCancelNew
                          )
                        : defaultRenderNewItem(
                              newItemValue,
                              handleNewItemChange,
                              handleSaveNew,
                              handleCancelNew
                          ))}
            </ul>

            {!isAddingNew && (
                <button className="btn btn-primary mb-3" onClick={handleAddNew}>
                    Add New Item
                </button>
            )}

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
