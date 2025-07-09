import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemDto,
    InventoryItem,
    InventoryItemCategory,
    InventoryItemVendor,
    UpdateInventoryItemDto,
} from "../../entityTypes";

export type InventoryItemEditContext = {
    setItemName: (name: string) => void;
    setCategory: (category: InventoryItemCategory) => void;
    setVendor: (vendor: InventoryItemVendor) => void;
};

export type InventoryItemCreateContext = {
    setItemName: (name: string) => void;
    setCategory: (category: InventoryItemCategory) => void;
    setVendor: (vendor: InventoryItemVendor) => void;
};

// DTO converter for InventoryItem
const inventoryItemDtoConverter = {
    toCreateDto: (entity: Partial<InventoryItem>): CreateInventoryItemDto => ({
        itemName: entity.itemName || "",
        inventoryItemCategoryId: entity.category?.id || 0,
        vendorId: entity.vendor?.id || 0,
    }),
    toUpdateDto: (entity: Partial<InventoryItem>): UpdateInventoryItemDto => ({
        itemName: entity.itemName,
        inventoryItemCategoryId: entity.category?.id,
        vendorId: entity.vendor?.id,
    }),
};

// Context factory functions
const createInventoryItemEditContext = (
    editInstance: Partial<InventoryItem> | null,
    setEditInstance: (instance: Partial<InventoryItem> | null) => void
): InventoryItemEditContext => ({
    setItemName: (name: string) => {
        setEditInstance({ ...editInstance, itemName: name });
    },
    setCategory: (category: InventoryItemCategory) => {
        setEditInstance({ ...editInstance, category });
    },
    setVendor: (vendor: InventoryItemVendor) => {
        setEditInstance({ ...editInstance, vendor });
    },
});

const createInventoryItemCreateContext = (
    createInstance: Partial<InventoryItem>,
    setCreateInstance: (instance: Partial<InventoryItem>) => void
): InventoryItemCreateContext => ({
    setItemName: (name: string) => {
        setCreateInstance({ ...createInstance, itemName: name });
    },
    setCategory: (category: InventoryItemCategory) => {
        setCreateInstance({ ...createInstance, category });
    },
    setVendor: (vendor: InventoryItemVendor) => {
        setCreateInstance({ ...createInstance, vendor });
    },
});

// Entity-specific mutations hook
export function useInventoryItemMutations() {
    return useEntityMutations<
        InventoryItem,
        CreateInventoryItemDto,
        UpdateInventoryItemDto,
        InventoryItemEditContext,
        InventoryItemCreateContext
    >({
        endpoint: "/inventory-items",
        dtoConverter: inventoryItemDtoConverter,
        createEditContext: createInventoryItemEditContext,
        createCreateContext: createInventoryItemCreateContext,
    });
}
