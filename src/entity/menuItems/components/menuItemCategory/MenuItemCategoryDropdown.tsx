import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { MenuItemCategory } from "../../../entityTypes";

type Props = {
    selectedCategoryId: number | null;
    onUpdateCategoryId: (id: number | null) => void;
    menuItemCategories: MenuItemCategory[];
};

export function MenuItemCategoryDropdown({
    selectedCategoryId: selectedId,
    onUpdateCategoryId: setCategoryId,
    menuItemCategories,
}: Props) {
    if (menuItemCategories.length === 0) {
        return <GenericValueDisplay value={"No menu item categories found"} />;
    }
    return (
        <GenericDropdownInput
            options={menuItemCategories.map((category: MenuItemCategory) => ({
                id: category.id,
                label: category.categoryName,
            }))}
            value={selectedId}
            onChange={(categoryId: number | string) =>
                setCategoryId(Number(categoryId))
            }
        />
    );
}
