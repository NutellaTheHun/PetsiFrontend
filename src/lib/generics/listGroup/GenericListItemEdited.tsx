type Props = {
    entityId: number;
    onInputValueChange: (value: string | number) => void;
    onClickCancel: (id: number | null) => void;
    onClickUpdate: (id: number) => void;
    children?: React.ReactNode;
};

export function GenericListItemEdited({
    entityId,
    onInputValueChange,
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
                <button onClick={() => onClickUpdate(entityId)}>Save</button>
                <button onClick={() => onClickCancel(null)}>Cancel</button>
            </>
        </li>
    );
}
