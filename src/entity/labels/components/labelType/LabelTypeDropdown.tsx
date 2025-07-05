import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { LabelType } from "../../../entityTypes";

type Props = {
    selectedLabelType: LabelType | null;
    onUpdateLabelType: (labelType: LabelType | null) => void;
    labelTypes: LabelType[];
};

export function LabelTypeDropdown({
    selectedLabelType,
    onUpdateLabelType,
    labelTypes,
}: Props) {
    if (labelTypes.length === 0) {
        return <GenericValueDisplay value={"No label types found"} />;
    }
    return (
        <GenericDropdownInput
            options={createDropdownOptions(labelTypes, "labelTypeName")}
            value={selectedLabelType}
            onChange={onUpdateLabelType}
        />
    );
}
