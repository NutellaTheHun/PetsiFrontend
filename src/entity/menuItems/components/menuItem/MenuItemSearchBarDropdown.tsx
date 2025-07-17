import { Text } from "@mantine/core";
import { MantineAutoComplete } from "../../../../lib/uiComponents/input/MantineAutoComplete";
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
    /*const filteredOptions = React.useMemo(
        () => createDropdownOptions(menuItems, "itemName", filterStrings),
        [menuItems, filterStrings]
    );*/

    if (menuItems.length === 0) {
        return <Text>No menu items found</Text>;
    }

    return (
        <MantineAutoComplete<MenuItem>
            totalOptions={menuItems}
            selectedOption={value}
            onOptionChange={onChange}
            searchProperty={"itemName"}
        />
    );
}
