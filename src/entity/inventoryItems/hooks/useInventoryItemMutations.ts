import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
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
    editInstance: Partial<InventoryItem> | null,
    setEditInstance: (instance: Partial<InventoryItem> | null) => void
): InventoryItemEditContext => ({
    setItemName: (itemName: string) => {
        setEditInstance({ ...editInstance, itemName });
    },
    setCategory: (category: InventoryItemCategory | null) => {
        setEditInstance({ ...editInstance, category });
    },
    setVendor: (vendor: InventoryItemVendor | null) => {
        setEditInstance({ ...editInstance, vendor });
    },
    setItemSizes: (itemSizes: any[]) => {
        setEditInstance({ ...editInstance, itemSizes });
    },
});

const createInventoryItemCreateContext = (
    createInstance: Partial<InventoryItem>,
    setCreateInstance: (instance: Partial<InventoryItem>) => void
): InventoryItemCreateContext => ({
    setItemName: (itemName: string) => {
        setCreateInstance({ ...createInstance, itemName });
    },
    setCategory: (category: InventoryItemCategory | null) => {
        setCreateInstance({ ...createInstance, category });
    },
    setVendor: (vendor: InventoryItemVendor | null) => {
        setCreateInstance({ ...createInstance, vendor });
    },
    setItemSizes: (itemSizes: any[]) => {
        setCreateInstance({ ...createInstance, itemSizes });
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
