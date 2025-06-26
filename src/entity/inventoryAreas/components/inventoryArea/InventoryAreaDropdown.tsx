import type { components } from "../../../../api-types";
import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { useInventoryAreas } from "../../hooks/useInventoryAreas";

type InventoryArea = components["schemas"]["InventoryArea"];

type Props = {
    selectedAreaId: number | null;
    onUpdateAreaId: (id: number | null) => void;
};

export function InventoryAreaDropdown({
    selectedAreaId: selectedId,
    onUpdateAreaId: setAreaId,
}: Props) {
    const { inventoryAreas } = useInventoryAreas();

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
