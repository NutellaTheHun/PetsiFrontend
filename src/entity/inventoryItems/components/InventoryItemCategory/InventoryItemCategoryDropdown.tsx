import { Text } from "@mantine/core";
import { MantineComboBox } from "../../../../lib/uiComponents/input/MantineComboBox";
import type { InventoryItemCategory } from "../../../entityTypes";

type Props = {
    selectedCategory: InventoryItemCategory | null;
    onUpdateCategory: (category: InventoryItemCategory | null) => void;
    inventoryItemCategories: InventoryItemCategory[];
};

export function InventoryItemCategoryDropdown({
    selectedCategory,
    onUpdateCategory,
    inventoryItemCategories,
}: Props) {
    if (inventoryItemCategories.length === 0) {
        return <Text>No inventory item categories found</Text>;
    }
    return (
        <MantineComboBox<InventoryItemCategory>
            totalOptions={inventoryItemCategories}
            selectedOption={selectedCategory}
            onOptionChange={onUpdateCategory}
            labelKey={"categoryName"}
        />
    );
}
