import { GenericListItemStateSelector } from "./GenericListItemStateSelector";
import { GenericNewItemForm } from "./GenericNewItemForm";

type GenericListGroupProps<T extends { id: number }> = {
    items: T[];
    targetId: number | null;
    editingId: number | null;
    onSetSelectId: (id: number) => void;
    onToggleEditId: (id: number | null) => void;
    onAdd: (name: string) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number) => void;
    renderItem: (
        item: T,
        isEditing: boolean,
        targetId: number | null
    ) => React.ReactNode;
};

export function GenericListGroup<T extends { id: number }>({
    items,
    targetId,
    editingId,
    onSetSelectId,
    onToggleEditId,
    onAdd,
    onUpdate,
    onDelete,
    renderItem,
}: GenericListGroupProps<T>) {
    return (
        <div
            className="container p-4 border rounded bg-white"
            style={{ width: 400 }}
        >
            <ul className="list-group mb-3">
                {items.map((item) => {
                    const isEditing =
                        targetId === item.id && editingId === item.id;

                    return (
                        <GenericListItemStateSelector
                            key={item.id}
                            itemId={item.id}
                            targetId={targetId}
                            editingId={editingId}
                            onSetSelect={onSetSelectId}
                            onSetEditingId={onToggleEditId}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        >
                            {renderItem(item, isEditing, targetId)}
                        </GenericListItemStateSelector>
                    );
                })}
            </ul>

            <GenericNewItemForm onSubmit={onAdd} />

            <button
                className="btn btn-danger"
                onClick={() => targetId && onDelete(targetId)}
                disabled={!targetId}
            >
                Remove Selected
            </button>
        </div>
    );
}
