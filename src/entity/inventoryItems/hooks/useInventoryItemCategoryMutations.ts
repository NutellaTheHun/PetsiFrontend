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
    ) => void,
    setEditInstance: (instance: InventoryItemCategory | null) => void,
    editValues: Partial<UpdateInventoryItemCategoryDto> | null,
    editInstance: InventoryItemCategory | null
): InventoryItemCategoryEditContext => ({
    setItemCategoryName: (itemCategoryName: string) => {
        setEditValues({ ...editValues, itemCategoryName });
    },
});

const createInventoryItemCategoryCreateContext = (
    setCreateValues: (
        values: Partial<CreateInventoryItemCategoryDto> | null
    ) => void,
    setCreateInstance: (
        instance: Partial<InventoryItemCategory> | null
    ) => void,
    createValues: Partial<CreateInventoryItemCategoryDto> | null,
    createInstance: Partial<InventoryItemCategory> | null
): InventoryItemCategoryCreateContext => ({
    setItemCategoryName: (itemCategoryName: string) => {
        setCreateValues({ ...createValues, itemCategoryName });
        setCreateInstance({ ...createInstance, itemCategoryName });
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
