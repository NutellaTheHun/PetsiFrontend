import type { GenericStatefulEntity } from "../GenericStatefulEntity";

type Props<T extends { id: number }> = {
    createInstance: Partial<T>;
    onSubmit: () => void;
    onCancel: () => void;
    renderProperty: (entity: GenericStatefulEntity<T>) => React.ReactNode;
};

export function GenericNewItemForm<T extends { id: number }>({
    createInstance,
    onSubmit,
    onCancel,
    renderProperty,
}: Props<T>) {
    return (
        <div className="input-group mb-3">
            {renderProperty({
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
