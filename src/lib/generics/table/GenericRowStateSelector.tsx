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
    onSetSelect: (entity: T) => void;
    onSetEdit: (entity: T | null) => void;
    onUpdate: () => void;
    onDelete: (id: number) => void;
};

export function GenericRowStateSelector<T extends { id: number }>({
    instance,
    children,
    onSetSelect,
    onSetEdit,
    onUpdate,
    onDelete,
}: Props<T>) {
    if (isEditState(instance)) {
        return (
            <GenericRowEdited
                children={children}
                setEdit={onSetEdit}
                onUpdate={onUpdate}
            />
        );
    }
    if (isSelectedState(instance)) {
        return (
            <GenericRowSelected
                children={children}
                entityInstance={instance}
                setEdit={onSetEdit}
                onDelete={onDelete}
            />
        );
    }
    return (
        <GenericRow
            children={children}
            entityInstance={instance}
            onSetSelect={onSetSelect}
        />
    );
}
