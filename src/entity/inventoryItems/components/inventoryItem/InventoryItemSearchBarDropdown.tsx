import {
    createDropdownOptions,
    GenericSearchBarDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericSearchBarDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItem } from "../../../entityTypes";

interface InventoryItemSearchBarDropdownProps {
    value: number | string | null;
    onChange: (value: number | string) => void;
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
        return <GenericValueDisplay value={"No inventory items found"} />;
    }
    return (
        <GenericSearchBarDropdownInput
            value={value}
            onChange={onChange}
            options={createDropdownOptions(inventoryItems, "itemName")}
            readOnly={readOnly}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
}
