import type { components } from "../../../../api-types";
import { useInventoryItemCategories } from "../../../../entity/hooks/InventoryItems/useInventoryItemCategories";
import { GenericDropdownInput } from "../../../shared-components/table/render-cell-content/GenericDropdownInput";

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
