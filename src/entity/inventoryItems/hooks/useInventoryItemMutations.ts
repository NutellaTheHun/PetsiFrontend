import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryItemDto,
    InventoryItem,
    InventoryItemCategory,
    InventoryItemVendor,
    UpdateInventoryItemDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryItemEditContext = {
    setItemName: (itemName: string) => void;
    setCategory: (category: InventoryItemCategory | null) => void;
    setVendor: (vendor: InventoryItemVendor | null) => void;
    setItemSizes: (itemSizes: any[]) => void;
};

export type InventoryItemCreateContext = {
    setItemName: (itemName: string) => void;
    setCategory: (category: InventoryItemCategory | null) => void;
    setVendor: (vendor: InventoryItemVendor | null) => void;
    setItemSizes: (itemSizes: any[]) => void;
};

// Context factory functions
const createInventoryItemEditContext = (
    setEditValues: (values: Partial<UpdateInventoryItemDto> | null) => void,
    setEditInstance: (instance: InventoryItem | null) => void,
    editValues: Partial<UpdateInventoryItemDto> | null,
    editInstance: InventoryItem | null
): InventoryItemEditContext => ({
    setItemName: (itemName: string) => {
        // Update the instance
        setEditInstance(editInstance ? { ...editInstance, itemName } : null);
        // Update the DTO
        setEditValues({ ...editValues, itemName });
    },
    setCategory: (category: InventoryItemCategory | null) => {
        // Update the instance with the entity object
        setEditInstance(editInstance ? { ...editInstance, category } : null);
        // Update the DTO with the ID
        setEditValues({
            ...editValues,
            inventoryItemCategoryId: category?.id || null,
        });
    },
    setVendor: (vendor: InventoryItemVendor | null) => {
        // Update the instance with the entity object
        setEditInstance(editInstance ? { ...editInstance, vendor } : null);
        // Update the DTO with the ID
        setEditValues({ ...editValues, vendorId: vendor?.id || null });
    },
    setItemSizes: (itemSizes: any[]) => {
        // Update the instance with the entity objects
        setEditInstance(editInstance ? { ...editInstance, itemSizes } : null);
        // Update the DTO with the DTO format
        setEditValues({ ...editValues, itemSizeDtos: itemSizes });
    },
});

const createInventoryItemCreateContext = (
    setCreateValues: (values: Partial<CreateInventoryItemDto> | null) => void,
    setCreateInstance: (instance: Partial<InventoryItem> | null) => void,
    createValues: Partial<CreateInventoryItemDto> | null,
    createInstance: Partial<InventoryItem> | null
): InventoryItemCreateContext => ({
    setItemName: (itemName: string) => {
        // Update the instance
        setCreateInstance({ ...createInstance, itemName });
        // Update the DTO
        setCreateValues({ ...createValues, itemName });
    },
    setCategory: (category: InventoryItemCategory | null) => {
        // Update the instance with the entity object
        setCreateInstance({ ...createInstance, category });
        // Update the DTO with the ID
        setCreateValues({
            ...createValues,
            inventoryItemCategoryId: category?.id || null,
        });
    },
    setVendor: (vendor: InventoryItemVendor | null) => {
        // Update the instance with the entity object
        setCreateInstance({ ...createInstance, vendor });
        // Update the DTO with the ID
        setCreateValues({ ...createValues, vendorId: vendor?.id || null });
    },
    setItemSizes: (itemSizes: any[]) => {
        // Update the instance with the entity objects
        setCreateInstance({ ...createInstance, itemSizes });
        // Update the DTO with the DTO format
        setCreateValues({ ...createValues, itemSizeDtos: itemSizes });
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
        createEditContext: createInventoryItemEditContext,
        createCreateContext: createInventoryItemCreateContext,
    });
}
