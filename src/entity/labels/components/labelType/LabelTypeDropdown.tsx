import { Text } from "@mantine/core";
import { DropdownSelection } from "../../../../lib/uiComponents/input/DropdownSelection";
import type { LabelType } from "../../../entityTypes";

type Props = {
    selectedLabelType: LabelType | null;
    onUpdateLabelType: (labelType: LabelType) => void;
    labelTypes: LabelType[];
};

export function LabelTypeDropdown({
    selectedLabelType,
    onUpdateLabelType,
    labelTypes,
}: Props) {
    if (labelTypes.length === 0) {
        return <Text>No label types found</Text>;
    }
    return (
        <DropdownSelection<LabelType>
            totalOptions={labelTypes}
            selectedOption={selectedLabelType}
            onOptionChange={onUpdateLabelType}
            labelKey={"labelTypeName"}
        />
    );
}
