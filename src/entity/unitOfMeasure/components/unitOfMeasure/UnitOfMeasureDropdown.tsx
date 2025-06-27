import type { components } from "../../../../api-types";
import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";

type UnitOfMeasure = components["schemas"]["UnitOfMeasure"];

type Props = {
    selectedUnitOfMeasureId: number | null;
    onUpdateUnitOfMeasureId: (id: number | null) => void;
    unitsOfMeasure: UnitOfMeasure[];
};

export function UnitOfMeasureDropdown({
    selectedUnitOfMeasureId: selectedId,
    onUpdateUnitOfMeasureId: setUnitOfMeasureId,
    unitsOfMeasure,
}: Props) {
    return (
        <GenericDropdownInput
            options={unitsOfMeasure.map((unitOfMeasure: UnitOfMeasure) => ({
                id: unitOfMeasure.id,
                label: unitOfMeasure.name,
            }))}
            value={selectedId}
            onChange={(unitOfMeasureId) =>
                setUnitOfMeasureId(Number(unitOfMeasureId))
            }
        />
    );
}
