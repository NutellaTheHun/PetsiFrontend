import { Text } from "@mantine/core";
import { MantineComboBox } from "../../../../lib/uiComponents/input/MantineComboBox";
import type { MenuItemCategory } from "../../../entityTypes";

type Props = {
    selectedCategory: MenuItemCategory | null;
    onUpdateCategory: (category: MenuItemCategory | null) => void;
    menuItemCategories: MenuItemCategory[];
};

export function MenuItemCategoryDropdown({
    selectedCategory,
    onUpdateCategory,
    menuItemCategories,
}: Props) {
    if (menuItemCategories.length === 0) {
        return <Text>No menu item categories found</Text>;
    }
    return (
        <MantineComboBox<MenuItemCategory>
            totalOptions={menuItemCategories}
            selectedOption={selectedCategory}
            onOptionChange={onUpdateCategory}
            labelKey={"categoryName"}
        />
    );
}
