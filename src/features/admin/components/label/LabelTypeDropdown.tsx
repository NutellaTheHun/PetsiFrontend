import type { components } from "../../../../api-types";
import { useLabelTypes } from "../../../../entity/hooks/Labels/useLabelTypes";
import { GenericDropdownInput } from "../../../shared-components/table/render-cell-content/GenericDropdownInput";

type LabelType = components["schemas"]["LabelType"];

type Props = {
    selectedLabelTypeId: number | null;
    onUpdateLabelTypeId: (id: number | null) => void;
};

export function LabelTypeDropdown({
    selectedLabelTypeId: selectedId,
    onUpdateLabelTypeId: setLabelTypeId,
}: Props) {
    const { labelTypes } = useLabelTypes();

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
