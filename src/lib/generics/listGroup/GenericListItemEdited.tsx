type Props<T extends { id: number }> = {
    onToggleEdit: (entity: T | null) => void;
    onClickUpdate: () => void;
    children?: React.ReactNode;
};

export function GenericListItemEdited<T extends { id: number }>({
    onClickUpdate,
    onToggleEdit,
    children,
}: Props<T>) {
    return (
        <li
            className={
                "list-group-item d-flex justify-content-between align-items-center active text-white"
            }
            style={{ cursor: "pointer" }}
        >
            <>
                {children}
                <button className="btn btn-primary" onClick={onClickUpdate}>
                    Save
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => onToggleEdit(null)}
                >
                    Cancel
                </button>
            </>
        </li>
    );
}
