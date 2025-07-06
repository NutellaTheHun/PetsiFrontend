import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryArea } from "../../../entityTypes";

type Props = {
    selectedArea: InventoryArea | null;
    onUpdateArea: (area: InventoryArea) => void;
    inventoryAreas: InventoryArea[];
};

export function InventoryAreaDropdown({
    selectedArea,
    onUpdateArea,
    inventoryAreas,
}: Props) {
    if (inventoryAreas.length === 0) {
        return <GenericValueDisplay value={"No inventory areas found"} />;
    }
    return (
        <GenericDropdownInput<InventoryArea>
            options={createDropdownOptions(inventoryAreas, "areaName")}
            value={selectedArea}
            onChange={onUpdateArea}
        />
    );
}
