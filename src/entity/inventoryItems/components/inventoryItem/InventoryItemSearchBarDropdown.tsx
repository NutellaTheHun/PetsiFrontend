import { Text } from "@mantine/core";
import { MantineAutoComplete } from "../../../../lib/uiComponents/input/MantineAutoComplete";
import type { InventoryItem } from "../../../entityTypes";

interface InventoryItemSearchBarDropdownProps {
    value: InventoryItem | null;
    onChange: (value: InventoryItem) => void;
    readOnly?: boolean;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    inventoryItems: InventoryItem[];
}

export function InventoryItemSearchBarDropdown({
    value,
    onChange,
    readOnly = false,
    className = "",
    placeholder = "Search inventory items...",
    disabled = false,
    inventoryItems,
}: InventoryItemSearchBarDropdownProps) {
    if (inventoryItems?.length === 0) {
        return <Text>No inventory items found</Text>;
    }
    return (
        <MantineAutoComplete<InventoryItem>
            totalOptions={inventoryItems}
            selectedOption={value}
            onOptionChange={onChange}
            searchProperty={"itemName"}
        />
    );
}
