import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { LabelType } from "../../../entityTypes";

type Props = {
    selectedLabelTypeId: number | null;
    onUpdateLabelTypeId: (id: number | null) => void;
    labelTypes: LabelType[];
};

export function LabelTypeDropdown({
    selectedLabelTypeId: selectedId,
    onUpdateLabelTypeId: setLabelTypeId,
    labelTypes,
}: Props) {
    if (labelTypes.length === 0) {
        return <GenericValueDisplay value={"No label types found"} />;
    }
    return (
        <GenericDropdownInput
            options={labelTypes.map((labelType: LabelType) => ({
                id: labelType.id,
                label: labelType.labelTypeName,
            }))}
            value={selectedId}
            onChange={(labelTypeId) => setLabelTypeId(Number(labelTypeId))}
        />
    );
}
