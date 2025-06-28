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
    setEditValues: (
        values: Partial<UpdateInventoryItemCategoryDto> | null
    ) => void
): InventoryItemCategoryEditContext => ({
    setItemCategoryName: (itemCategoryName: string) => {
        setEditValues({ itemCategoryName });
    },
});

const createInventoryItemCategoryCreateContext = (
    setCreateValues: (
        values: Partial<CreateInventoryItemCategoryDto> | null
    ) => void
): InventoryItemCategoryCreateContext => ({
    setItemCategoryName: (itemCategoryName: string) => {
        setCreateValues({ itemCategoryName });
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
