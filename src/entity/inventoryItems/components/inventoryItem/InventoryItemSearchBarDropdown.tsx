import { Text } from "@mantine/core";
import { SearchbarDropdownSelection } from "../../../../lib/uiComponents/input/SearchbarDropdownSelection";
import type { InventoryItem } from "../../../entityTypes";

interface InventoryItemSearchBarDropdownProps {
    value: InventoryItem | null;
    onChange: (value: InventoryItem) => void;
    inventoryItems: InventoryItem[];
}

export function InventoryItemSearchBarDropdown({
    value,
    onChange,
    inventoryItems,
}: InventoryItemSearchBarDropdownProps) {
    if (inventoryItems?.length === 0) {
        return <Text>No inventory items found</Text>;
    }
    return (
        <SearchbarDropdownSelection<InventoryItem>
            totalOptions={inventoryItems}
            selectedOption={value}
            onOptionChange={onChange}
            searchProperty={"itemName"}
        />
    );
}
