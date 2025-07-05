import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
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
        return <GenericValueDisplay value={"No menu item categories found"} />;
    }
    return (
        <GenericDropdownInput
            options={createDropdownOptions(menuItemCategories, "categoryName")}
            value={selectedCategory}
            onChange={onUpdateCategory}
        />
    );
}
