import { Text } from "@mantine/core";
import { DropdownSelection } from "../../../../lib/uiComponents/input/DropdownSelection";
import type { MenuItemSize } from "../../../entityTypes";

interface MenuItemSizeDropdownProps {
    selectedSize: MenuItemSize | null;
    onUpdateSize: (size: MenuItemSize) => void;
    menuItemSizes: MenuItemSize[];
}

export function MenuItemSizeDropdown({
    selectedSize,
    onUpdateSize,
    menuItemSizes,
}: MenuItemSizeDropdownProps) {
    if (menuItemSizes.length === 0) {
        return <Text>No menu item sizes found</Text>;
    }

    return (
        <DropdownSelection<MenuItemSize>
            totalOptions={menuItemSizes}
            selectedOption={selectedSize}
            onOptionChange={onUpdateSize}
            labelKey={"name"}
        />
    );
}
