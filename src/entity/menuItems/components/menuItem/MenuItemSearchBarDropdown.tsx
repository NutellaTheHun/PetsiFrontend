import React from "react";
import {
    createDropdownOptions,
    GenericSearchBarDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericSearchBarDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { MenuItem } from "../../../entityTypes";

interface MenuItemSearchBarDropdownProps {
    value: MenuItem | null;
    onChange: (value: MenuItem) => void;
    readOnly?: boolean;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    menuItems: MenuItem[];
    filterStrings?: string[];
}

export function MenuItemSearchBarDropdown({
    value,
    onChange,
    readOnly = false,
    className = "",
    placeholder = "Search menu items...",
    disabled = false,
    menuItems,
    filterStrings,
}: MenuItemSearchBarDropdownProps) {
    const filteredOptions = React.useMemo(
        () => createDropdownOptions(menuItems, "itemName", filterStrings),
        [menuItems, filterStrings]
    );

    if (menuItems.length === 0) {
        return <GenericValueDisplay value={"No menu items found"} />;
    }

    return (
        <GenericSearchBarDropdownInput<MenuItem>
            value={value}
            onChange={onChange}
            options={filteredOptions}
            readOnly={readOnly}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
}
