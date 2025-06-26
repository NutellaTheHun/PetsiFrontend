import type { components } from "../../../../../api-types";
import { useMenuItemCategories } from "../../../../../entity/hooks/MenuItems/useMenuItemCategories";
import { GenericDropdownInput } from "../../../../shared-components/table/render-cell-content/GenericDropdownInput";

type MenuItemCategory = components["schemas"]["MenuItemCategory"];

type Props = {
    selectedCategoryId: number | null;
    onUpdateCategoryId: (id: number | null) => void;
};

export function MenuItemCategoryDropdown({
    selectedCategoryId: selectedId,
    onUpdateCategoryId: setCategoryId,
}: Props) {
    const { menuItemCategories = [] } = useMenuItemCategories();

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
