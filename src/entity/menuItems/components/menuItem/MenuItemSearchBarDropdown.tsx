import { Text } from "@mantine/core";
import { SearchbarDropdownSelection } from "../../../../lib/uiComponents/input/SearchbarDropdownSelection";
import type { MenuItem } from "../../../entityTypes";

interface MenuItemSearchBarDropdownProps {
    value: MenuItem | null;
    onChange: (value: MenuItem) => void;
    menuItems: MenuItem[];
}

export function MenuItemSearchBarDropdown({
    value,
    onChange,
    menuItems,
}: MenuItemSearchBarDropdownProps) {
    /*const filteredOptions = React.useMemo(
        () => createDropdownOptions(menuItems, "itemName", filterStrings),
        [menuItems, filterStrings]
    );*/

    if (menuItems.length === 0) {
        return <Text>No menu items found</Text>;
    }

    return (
        <SearchbarDropdownSelection<MenuItem>
            totalOptions={menuItems}
            selectedOption={value}
            onOptionChange={onChange}
            searchProperty={"itemName"}
        />
    );
}
