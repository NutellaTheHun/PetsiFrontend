import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryItemCategoryDto,
    InventoryItemCategory,
    UpdateInventoryItemCategoryDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryItemCategoryEditContext = {
    setItemCategoryName: (itemCategoryName: string) => void;
};

export type InventoryItemCategoryCreateContext = {
    setItemCategoryName: (itemCategoryName: string) => void;
};

// Context factory functions
const createInventoryItemCategoryEditContext = (
    editInstance: Partial<InventoryItemCategory> | null,
    setEditInstance: (instance: Partial<InventoryItemCategory> | null) => void
): InventoryItemCategoryEditContext => ({
    setItemCategoryName: (itemCategoryName: string) => {
        setEditInstance({ ...editInstance, categoryName: itemCategoryName });
    },
});

const createInventoryItemCategoryCreateContext = (
    createInstance: Partial<InventoryItemCategory>,
    setCreateInstance: (instance: Partial<InventoryItemCategory>) => void
): InventoryItemCategoryCreateContext => ({
    setItemCategoryName: (itemCategoryName: string) => {
        setCreateInstance({
            ...createInstance,
            categoryName: itemCategoryName,
        });
    },
});

// Entity-specific mutations hook
export function useInventoryItemCategoryMutations() {
    return useEntityMutations<
        InventoryItemCategory,
        CreateInventoryItemCategoryDto,
        UpdateInventoryItemCategoryDto,
        InventoryItemCategoryEditContext,
        InventoryItemCategoryCreateContext
    >({
        endpoint: "/inventory-item-categories",
        createEditContext: createInventoryItemCategoryEditContext,
        createCreateContext: createInventoryItemCategoryCreateContext,
    });
}
