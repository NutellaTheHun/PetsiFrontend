import type { components } from "../../../../api-types";
import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { useInventoryItemCategories } from "../../hooks/useInventoryItemCategories";

type InventoryItemCategory = components["schemas"]["InventoryItemCategory"];

type Props = {
    selectedCategoryId: number | null;
    onUpdateCategoryId: (id: number | null) => void;
};

export function InventoryItemCategoryDropdown({
    selectedCategoryId: selectedId,
    onUpdateCategoryId: setCategoryId,
}: Props) {
    const { inventoryItemCategories } = useInventoryItemCategories();

    return (
        <GenericDropdownInput
            options={inventoryItemCategories.map(
                (category: InventoryItemCategory) => ({
                    id: category.id,
                    label: category.categoryName,
                })
            )}
            value={selectedId}
            onChange={(categoryId) => setCategoryId(Number(categoryId))}
        />
    );
}
