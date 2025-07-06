type Props = {
    children: React.ReactNode[];
    onSubmit: () => void;
    onCancel: () => void;
};
export function GenericNewRowForm({ children, onSubmit, onCancel }: Props) {
    return (
        <tr
            className="table-info"
            style={{
                cursor: "pointer",
            }}
        >
            {children}
            <td>
                <button className="btn btn-primary" onClick={onSubmit}>
                    Save
                </button>
            </td>
            <td>
                <button className="btn btn-danger" onClick={onCancel}>
                    Cancel
                </button>
            </td>
        </tr>
    );
}
