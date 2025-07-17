import { Text } from "@mantine/core";
import { DropdownSelection } from "../../../../lib/uiComponents/input/DropdownSelection";
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
        return <Text>No inventory areas found</Text>;
    }
    return (
        <DropdownSelection<InventoryArea>
            totalOptions={inventoryAreas}
            selectedOption={selectedArea}
            onOptionChange={onUpdateArea}
            labelKey="areaName"
        />
    );
}
