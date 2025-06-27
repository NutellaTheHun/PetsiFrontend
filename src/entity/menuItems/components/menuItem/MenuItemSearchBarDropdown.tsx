import {
    createDropdownOptions,
    GenericSearchBarDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericSearchBarDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { MenuItem } from "../../../entityTypes";

interface MenuItemSearchBarDropdownProps {
    value: number | string | null;
    onChange: (value: number | string) => void;
    readOnly?: boolean;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    menuItems: MenuItem[];
}

export function MenuItemSearchBarDropdown({
    value,
    onChange,
    readOnly = false,
    className = "",
    placeholder = "Search menu items...",
    disabled = false,
    menuItems,
}: MenuItemSearchBarDropdownProps) {
    if (menuItems.length === 0) {
        return <GenericValueDisplay value={"No menu items found"} />;
    }
    return (
        <GenericSearchBarDropdownInput
            value={value}
            onChange={onChange}
            options={createDropdownOptions(menuItems, "itemName")}
            readOnly={readOnly}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
}
