import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    InventoryItem,
    InventoryItemCategory,
    InventoryItemPackage,
    InventoryItemVendor,
    UnitOfMeasure,
} from "../../../entityTypes";
import type {
    InventoryItemCreateContext,
    InventoryItemEditContext,
} from "../../hooks/useInventoryItemMutations";

interface InventoryItemNewFormProps {
    instance?: InventoryItem;
    useEntityMutation: UseEntityMutationsReturn<
        InventoryItem,
        InventoryItemEditContext,
        InventoryItemCreateContext
    >;
    inventoryItemCategories: InventoryItemCategory[];
    inventoryItemVendors: InventoryItemVendor[];
    inventoryItemPackages: InventoryItemPackage[];
    unitsOfMeasure: UnitOfMeasure[];
}

/**
 * Instance relation requirements: Category, Vendor, ItemSize
 */
export function InventoryItemNewForm({
    instance,
    useEntityMutation,
    inventoryItemCategories,
    inventoryItemVendors,
    inventoryItemPackages,
    unitsOfMeasure,
}: InventoryItemNewFormProps) {
    // if instance, set to edit, else set to create

    // onClickSave() -> update or create

    // onClickCancel()

    // name field

    // category dropdown selections (can clear)

    // vendor dropdown selection (can clear)

    // inventoryItemSize table
    return <div>InventoryItemNewForm</div>;
}
// itemName
// InventoryItemCategory
// InventoryItemVendor
// InventoryItemSize
//    measureAmount
//    measureUnit
//    InventoryItemPackage
//    cost: string
