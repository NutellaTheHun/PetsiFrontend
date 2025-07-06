import { useState } from "react";
import type { GenericStatefulEntity } from "../GenericStatefulEntity";
import { GenericListItemStateSelector } from "./GenericListItemStateSelector";
import { GenericNewItemForm } from "./GenericNewItemForm";

type GenericListGroupProps<T extends { id: number }> = {
    items: GenericStatefulEntity<T>[];
    selectedEntityState: [T | null, (entity: T | null) => void];
    editingEntityState: [
        Partial<T> | null,
        (entity: Partial<T> | null) => void
    ];
    createEntityState: [Partial<T>, (entity: Partial<T>) => void];
    onCreate: () => void;
    onDelete: (id: number) => void;
    onUpdate: () => void;
    renderItem: (
        item: GenericStatefulEntity<T>,
        context: "edit" | "create"
    ) => React.ReactNode;
};

export function GenericListGroup<T extends { id: number }>({
    items,
    selectedEntityState,
    editingEntityState,
    createEntityState,
    onCreate,
    onUpdate,
    onDelete,
    renderItem,
}: GenericListGroupProps<T>) {
    const [selectedEntity, setSelectedEntity] = selectedEntityState;
    const [editingEntity, setEditingEntity] = editingEntityState;
    const [createEntity, setCreateEntity] = createEntityState;

    const [isAddingNew, setIsAddingNew] = useState(false);

    const handleCreate = () => {
        onCreate();
        setIsAddingNew(false);
    };

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
                            onSetSelectEntity={setSelectedEntity}
                            onSetEditEntity={setEditingEntity}
                            onUpdateInstance={onUpdate}
                            onDeleteInstance={onDelete}
                        >
                            {renderItem(item, "edit")}
                        </GenericListItemStateSelector>
                    );
                })}

                {isAddingNew && (
                    <div>
                        <GenericNewItemForm
                            createInstance={createEntity}
                            onSubmit={handleCreate}
                            renderItem={renderItem}
                            onCancel={() => setIsAddingNew(false)}
                        />
                    </div>
                )}
            </ul>

            {!isAddingNew && (
                <div>
                    <button
                        className="btn btn-primary mb-3"
                        onClick={() => setIsAddingNew(true)}
                    >
                        Add New Item
                    </button>
                </div>
            )}
        </div>
    );
}
