import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItemCategory } from "../../../entityTypes";

type Props = {
    selectedCategoryId: number | null;
    onUpdateCategoryId: (id: number | null) => void;
    inventoryItemCategories: InventoryItemCategory[];
};

export function InventoryItemCategoryDropdown({
    selectedCategoryId: selectedId,
    onUpdateCategoryId: setCategoryId,
    inventoryItemCategories,
}: Props) {
    if (inventoryItemCategories.length === 0) {
        return (
            <GenericValueDisplay value={"No inventory item categories found"} />
        );
    }
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
