import type { components } from "../../../../api-types";
import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";

type UnitOfMeasure = components["schemas"]["UnitOfMeasure"];

type Props = {
    selectedUnitOfMeasure: UnitOfMeasure | null;
    onUpdateUnitOfMeasure: (unitOfMeasure: UnitOfMeasure) => void;
    unitsOfMeasure: UnitOfMeasure[];
};

export function UnitOfMeasureDropdown({
    selectedUnitOfMeasure,
    onUpdateUnitOfMeasure,
    unitsOfMeasure,
}: Props) {
    return (
        <GenericDropdownInput
            options={createDropdownOptions(unitsOfMeasure, "name")}
            value={selectedUnitOfMeasure}
            onChange={(unitOfMeasure) =>
                onUpdateUnitOfMeasure(unitOfMeasure ?? null)
            }
        />
    );
}
