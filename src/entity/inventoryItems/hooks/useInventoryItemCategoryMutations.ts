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
    setEditDto: (dto: Partial<UpdateInventoryItemCategoryDto> | null) => void,
    setEditInstance: (instance: Partial<InventoryItemCategory> | null) => void,
    editDto: Partial<UpdateInventoryItemCategoryDto> | null,
    editInstance: Partial<InventoryItemCategory> | null
): InventoryItemCategoryEditContext => ({
    setItemCategoryName: (categoryName: string) => {
        setEditInstance({ ...editInstance, categoryName });
        setEditDto({ ...editDto, itemCategoryName: categoryName });
    },
});

const createInventoryItemCategoryCreateContext = (
    setCreateDto: (dto: Partial<CreateInventoryItemCategoryDto> | null) => void,
    setCreateInstance: (
        instance: Partial<InventoryItemCategory> | null
    ) => void,
    createDto: Partial<CreateInventoryItemCategoryDto> | null,
    createInstance: Partial<InventoryItemCategory> | null
): InventoryItemCategoryCreateContext => ({
    setItemCategoryName: (categoryName: string) => {
        setCreateInstance({ ...createInstance, categoryName });
        setCreateDto({ ...createDto, itemCategoryName: categoryName });
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
