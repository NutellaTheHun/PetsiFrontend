type Props = {
    children: React.ReactNode[];
    onRowClick?: (id: number) => void;
    rowId: number;
    onDeleteRow?: (id: number) => void;
    setEdit?: (id: number) => void;
};
export function GenericRowSelected({
    children,
    onRowClick,
    rowId,
    onDeleteRow,
    setEdit,
}: Props) {
    return (
        <tr onClick={() => onRowClick?.(rowId)} style={{ cursor: "pointer" }}>
            {children}
            <td>
                <button
                    className="btn btn-primary"
                    onClick={() => setEdit?.(rowId)}
                >
                    Edit
                </button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDeleteRow?.(rowId)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}
