type Props<T extends { id: number }> = {
    children: React.ReactNode[];
    setEdit: (entity: T | null) => void;
    onUpdate: () => void;
};
export function GenericRowEdited<T extends { id: number }>({
    children,
    setEdit,
    onUpdate,
}: Props<T>) {
    return (
        <tr
            className="table-info"
            style={{
                cursor: "pointer",
            }}
        >
            {children}
            <td>
                <button className="btn btn-primary" onClick={onUpdate}>
                    Save
                </button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => setEdit(null)}
                >
                    Cancel
                </button>
            </td>
        </tr>
    );
}
