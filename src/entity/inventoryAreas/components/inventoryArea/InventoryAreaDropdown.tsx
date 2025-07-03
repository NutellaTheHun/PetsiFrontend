import type { components } from "../../../../api-types";
import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";

type InventoryArea = components["schemas"]["InventoryArea"];

type Props = {
    selectedArea: InventoryArea | null;
    onUpdateArea: (area: InventoryArea | null) => void;
    inventoryAreas: InventoryArea[];
};

export function InventoryAreaDropdown({
    selectedArea,
    onUpdateArea: setArea,
    inventoryAreas,
}: Props) {
    if (inventoryAreas.length === 0) {
        return <GenericValueDisplay value={"No inventory areas found"} />;
    }
    return (
        <GenericDropdownInput<InventoryArea>
            options={inventoryAreas.map((area: InventoryArea) => ({
                entity: area,
                label: area.areaName,
            }))}
            value={selectedArea}
            onChange={(area) => setArea(area)}
        />
    );
}
