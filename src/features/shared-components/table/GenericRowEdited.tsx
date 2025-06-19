type Props = {
    children: React.ReactNode[];
    onRowClick?: (id: number) => void;
    rowId: number;
    setEdit?: (id: number | null) => void;
    onUpdate?: (id: number) => void;
};
export function GenericRowEdited({
    children,
    onRowClick,
    rowId,
    setEdit,
    onUpdate,
}: Props) {
    return (
        <tr onClick={() => onRowClick?.(rowId)} style={{ cursor: "pointer" }}>
            {children}
            <td>
                <button
                    className="btn btn-primary"
                    onClick={() => setEdit?.(null)}
                >
                    Cancel
                </button>
            </td>
            <td>
                <button
                    className="btn btn-primary"
                    onClick={() => onUpdate?.(rowId)}
                >
                    Save
                </button>
            </td>
        </tr>
    );
}
