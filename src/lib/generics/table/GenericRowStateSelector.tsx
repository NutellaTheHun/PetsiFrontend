import { GenericRow } from "./GenericRow";
import { GenericRowEdited } from "./GenericRowEdited";
import { GenericRowSelected } from "./GenericRowSelected";

type Props = {
    targetId: number | null;
    rowId: number;
    isEdit: boolean;
    children: React.ReactNode[];
    onSetSelect?: (id: number) => void;
    onSetEdit?: (id: number | null) => void;
    onUpdate?: (id: number) => void;
    onDeleteRow?: (id: number) => void;
};

export function GenericRowStateSelector({
    targetId,
    rowId,
    isEdit,
    children,
    onSetSelect,
    onSetEdit,
    onUpdate,
    onDeleteRow,
}: Props) {
    if (targetId === rowId && isEdit) {
        return (
            <GenericRowEdited
                children={children}
                rowId={rowId}
                setEdit={onSetEdit}
                onUpdate={onUpdate}
            />
        );
    }
    if (targetId === rowId) {
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
