import { GenericRow } from "./GenericRow";
import { GenericRowEdited } from "./GenericRowEdited";
import { GenericRowSelected } from "./GenericRowSelected";

type Props = {
    targetId: number | null;
    rowId: number;
    editingId: number | null;
    children: React.ReactNode[];
    onSetSelect?: (id: number) => void;
    onSetEdit?: (id: number | null) => void;
    onUpdate?: (id: number) => void;
    onDeleteRow?: (id: number) => void;
};

export function GenericRowStateSelector({
    targetId,
    rowId,
    editingId,
    children,
    onSetSelect,
    onSetEdit,
    onUpdate,
    onDeleteRow,
}: Props) {
    const isEditing = targetId === rowId && editingId === rowId;
    const isSelected = targetId === rowId;

    if (isEditing) {
        return (
            <GenericRowEdited
                children={children}
                rowId={rowId}
                setEdit={onSetEdit}
                onUpdate={onUpdate}
            />
        );
    }
    if (isSelected) {
        return (
            <GenericRowSelected
                children={children}
                rowId={rowId}
                setEdit={onSetEdit}
                onDeleteRow={onDeleteRow}
            />
        );
    }
    return (
        <GenericRow
            children={children}
            rowId={rowId}
            onSetSelect={onSetSelect}
        />
    );
}
