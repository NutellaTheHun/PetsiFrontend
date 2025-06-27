import type { components } from "../../../../api-types";
import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { useUnitOfMeasures } from "../../hooks/useUnitOfMeasures";

type UnitOfMeasure = components["schemas"]["UnitOfMeasure"];

type Props = {
    selectedUnitOfMeasureId: number | null;
    onUpdateUnitOfMeasureId: (id: number | null) => void;
};

export function UnitOfMeasureDropdown({
    selectedUnitOfMeasureId: selectedId,
    onUpdateUnitOfMeasureId: setUnitOfMeasureId,
}: Props) {
    const { unitOfMeasures } = useUnitOfMeasures();

    return (
        <GenericDropdownInput
            options={unitOfMeasures.map((unitOfMeasure: UnitOfMeasure) => ({
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
