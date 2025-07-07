import type { GenericStatefulEntity } from "../GenericStatefulEntity";

type Props<T extends { id: number }> = {
    createInstance: Partial<T>;
    onSubmit: () => void;
    onCancel: () => void;
    renderItem: (entity: GenericStatefulEntity<T>) => React.ReactNode;
};

export function GenericNewItemForm<T extends { id: number }>({
    createInstance,
    onSubmit,
    onCancel,
    renderItem,
}: Props<T>) {
    return (
        <div className="input-group mb-3">
            {renderItem({
                entity: createInstance,
                state: "create",
            } as GenericStatefulEntity<T>)}

            <button className="btn btn-primary" onClick={onSubmit}>
                Add
            </button>
            <button className="btn btn-danger" onClick={onCancel}>
                Cancel
            </button>
        </div>
    );
}
