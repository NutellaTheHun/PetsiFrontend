type Props = {
    children: React.ReactNode[];
    rowId: number;
    onDeleteRow?: (id: number) => void;
    setEdit?: (id: number) => void;
};
export function GenericRowSelected({
    children,
    rowId,
    onDeleteRow,
    setEdit,
}: Props) {
    return (
        <tr
            className="table-info"
            style={{
                cursor: "pointer",
            }}
        >
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
