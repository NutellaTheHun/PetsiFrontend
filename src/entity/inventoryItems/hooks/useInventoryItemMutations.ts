import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryItemDto,
    InventoryItem,
    UpdateInventoryItemDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryItemEditContext = {
    setItemName: (itemName: string) => void;
    setInventoryItemCategoryId: (inventoryItemCategoryId: number) => void;
    setVendorId: (vendorId: number) => void;
    setItemSizeDtos: (itemSizeDtos: any[]) => void;
};

export type InventoryItemCreateContext = {
    setItemName: (itemName: string) => void;
    setInventoryItemCategoryId: (inventoryItemCategoryId: number) => void;
    setVendorId: (vendorId: number) => void;
    setItemSizeDtos: (itemSizeDtos: any[]) => void;
};

// Context factory functions
const createInventoryItemEditContext = (
    setEditValues: (values: Partial<UpdateInventoryItemDto> | null) => void
): InventoryItemEditContext => ({
    setItemName: (itemName: string) => {
        setEditValues({ itemName });
    },
    setInventoryItemCategoryId: (inventoryItemCategoryId: number) => {
        setEditValues({ inventoryItemCategoryId });
    },
    setVendorId: (vendorId: number) => {
        setEditValues({ vendorId });
    },
    setItemSizeDtos: (itemSizeDtos: any[]) => {
        // TODO: fix this
        setEditValues({ itemSizeDtos });
    },
});

const createInventoryItemCreateContext = (
    setCreateValues: (values: Partial<CreateInventoryItemDto> | null) => void
): InventoryItemCreateContext => ({
    setItemName: (itemName: string) => {
        setCreateValues({ itemName });
    },
    setInventoryItemCategoryId: (inventoryItemCategoryId: number) => {
        setCreateValues({ inventoryItemCategoryId });
    },
    setVendorId: (vendorId: number) => {
        setCreateValues({ vendorId });
    },
    setItemSizeDtos: (itemSizeDtos: any[]) => {
        // TODO: fix this
        setCreateValues({ itemSizeDtos });
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
