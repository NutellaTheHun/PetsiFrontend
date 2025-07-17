import type { components } from "../../../../api-types";
import { DropdownSelection } from "../../../../lib/uiComponents/input/DropdownSelection";

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
        <DropdownSelection<UnitOfMeasure>
            totalOptions={unitsOfMeasure}
            selectedOption={selectedUnitOfMeasure}
            onOptionChange={onUpdateUnitOfMeasure}
            labelKey={"name"}
        />
    );
}
