import {
    isEditState,
    isSelectedState,
    type GenericStatefulEntity,
} from "../GenericStatefulEntity";
import { GenericRow } from "./GenericRow";
import { GenericRowEdited } from "./GenericRowEdited";
import { GenericRowSelected } from "./GenericRowSelected";

type Props<T extends { id: number }> = {
    instance: GenericStatefulEntity<T>;
    children: React.ReactNode[];
    onSetSelect?: (id: number) => void;
    onSetEdit?: (id: number | null) => void;
    onUpdate?: (id: number) => void;
    onDeleteRow?: (id: number) => void;
};

export function GenericRowStateSelector<T extends { id: number }>({
    instance,
    children,
    onSetSelect,
    onSetEdit,
    onUpdate,
    onDeleteRow,
}: Props<T>) {
    if (isEditState(instance)) {
        return (
            <GenericRowEdited
                children={children}
                rowId={instance.entity.id}
                setEdit={onSetEdit}
                onUpdate={onUpdate}
            />
        );
    }
    if (isSelectedState(instance)) {
        return (
            <GenericRowSelected
                children={children}
                rowId={instance.entity.id}
                setEdit={onSetEdit}
                onDeleteRow={onDeleteRow}
            />
        );
    }
    return (
        <GenericRow
            children={children}
            rowId={instance.entity.id}
            onSetSelect={onSetSelect}
        />
    );
}
