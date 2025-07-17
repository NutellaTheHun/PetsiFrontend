import { Text } from "@mantine/core";
import { MantineComboBox } from "../../../../lib/uiComponents/input/MantineComboBox";
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
        <MantineComboBox<InventoryArea>
            totalOptions={inventoryAreas}
            selectedOption={selectedArea}
            onOptionChange={onUpdateArea}
            labelKey="areaName"
        />
    );
}
