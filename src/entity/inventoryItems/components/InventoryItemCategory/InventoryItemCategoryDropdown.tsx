import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItemCategory } from "../../../entityTypes";

type Props = {
    selectedCategory: InventoryItemCategory | null;
    onUpdateCategory: (category: InventoryItemCategory | null) => void;
    inventoryItemCategories: InventoryItemCategory[];
};

export function InventoryItemCategoryDropdown({
    selectedCategory,
    onUpdateCategory,
    inventoryItemCategories,
}: Props) {
    if (inventoryItemCategories.length === 0) {
        return (
            <GenericValueDisplay value={"No inventory item categories found"} />
        );
    }
    return (
        <GenericDropdownInput
            options={createDropdownOptions(
                inventoryItemCategories,
                "categoryName"
            )}
            value={selectedCategory}
            onChange={onUpdateCategory}
        />
    );
}
