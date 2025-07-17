import { Text } from "@mantine/core";
import { MantineComboBox } from "../../../../lib/uiComponents/input/MantineComboBox";
import type { MenuItemSize } from "../../../entityTypes";

interface MenuItemSizeDropdownProps {
    selectedSize: MenuItemSize | null;
    onUpdateSize: (size: MenuItemSize) => void;
    menuItemSizes: MenuItemSize[];
    disabled?: boolean;
}

export function MenuItemSizeDropdown({
    selectedSize,
    onUpdateSize,
    menuItemSizes,
    disabled = false,
}: MenuItemSizeDropdownProps) {
    if (menuItemSizes.length === 0) {
        return <Text>No menu item sizes found</Text>;
    }

    return (
        <MantineComboBox<MenuItemSize>
            totalOptions={menuItemSizes}
            selectedOption={selectedSize}
            onOptionChange={onUpdateSize}
            labelKey={"name"}
        />
    );
}
