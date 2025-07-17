import { Text } from "@mantine/core";
import { DropdownSelection } from "../../../../lib/uiComponents/input/DropdownSelection";
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
        <DropdownSelection<MenuItemCategory>
            totalOptions={menuItemCategories}
            selectedOption={selectedCategory}
            onOptionChange={onUpdateCategory}
            labelKey={"categoryName"}
        />
    );
}
