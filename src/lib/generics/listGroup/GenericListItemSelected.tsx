type Props = {
    entityId: number;
    onClickEdit: (id: number) => void;
    onClickDelete: (id: number) => void;
    children?: React.ReactNode;
};

export function GenericListItemSelected({
    entityId,
    onClickEdit,
    onClickDelete,
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
                <span>{children}</span>
                <button onClick={() => onClickEdit(entityId)}>Edit</button>
                <button onClick={() => onClickDelete(entityId)}>Delete</button>
            </>
        </li>
    );
}
