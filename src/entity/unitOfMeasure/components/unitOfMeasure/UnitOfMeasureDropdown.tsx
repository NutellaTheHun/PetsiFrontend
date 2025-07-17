import type { components } from "../../../../api-types";
import { MantineComboBox } from "../../../../lib/uiComponents/input/MantineComboBox";

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
        <MantineComboBox<UnitOfMeasure>
            totalOptions={unitsOfMeasure}
            selectedOption={selectedUnitOfMeasure}
            onOptionChange={onUpdateUnitOfMeasure}
            labelKey={"name"}
        />
    );
}
