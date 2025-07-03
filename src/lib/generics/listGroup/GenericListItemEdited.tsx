type Props = {
    entityId: number;
    onClickCancel: (id: number | null) => void;
    onClickUpdate: (id: number) => void;
    children?: React.ReactNode;
};

export function GenericListItemEdited({
    entityId,
    onClickUpdate,
    onClickCancel,
    children,
}: Props) {
    return (
        <li
            className={
                "list-group-item d-flex justify-content-between align-items-center active text-white"
            }
            style={{ cursor: "pointer" }}
        >
            <>
                {children}
                <button
                    className="btn btn-primary"
                    onClick={() => onClickUpdate(entityId)}
                >
                    Save
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => onClickCancel(null)}
                >
                    Cancel
                </button>
            </>
        </li>
    );
}
