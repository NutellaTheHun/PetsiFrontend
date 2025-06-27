import type { components } from "../../../../api-types";
import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";

type InventoryArea = components["schemas"]["InventoryArea"];

type Props = {
    selectedAreaId: number | null;
    onUpdateAreaId: (id: number | null) => void;
    inventoryAreas: InventoryArea[];
};

export function InventoryAreaDropdown({
    selectedAreaId: selectedId,
    onUpdateAreaId: setAreaId,
    inventoryAreas,
}: Props) {
    if (inventoryAreas.length === 0) {
        return <GenericValueDisplay value={"No inventory areas found"} />;
    }
    return (
        <GenericDropdownInput
            options={inventoryAreas.map((area: InventoryArea) => ({
                id: area.id,
                label: area.areaName,
            }))}
            value={selectedId}
            onChange={(areaId) => setAreaId(Number(areaId))}
        />
    );
}
