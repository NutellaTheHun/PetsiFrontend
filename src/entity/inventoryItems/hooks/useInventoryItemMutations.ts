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
    setEditDto: (dto: Partial<UpdateInventoryItemDto> | null) => void,
    setEditInstance: (instance: Partial<InventoryItem> | null) => void,
    editDto: Partial<UpdateInventoryItemDto> | null,
    editInstance: Partial<InventoryItem> | null
): InventoryItemEditContext => ({
    setItemName: (itemName: string) => {
        setEditInstance({ ...editInstance, itemName });
        setEditDto({ ...editDto, itemName });
    },
    setCategory: (category: InventoryItemCategory | null) => {
        setEditInstance({ ...editInstance, category });
        setEditDto({
            ...editDto,
            inventoryItemCategoryId: category?.id || null,
        });
    },
    setVendor: (vendor: InventoryItemVendor | null) => {
        setEditInstance({ ...editInstance, vendor });
        setEditDto({ ...editDto, vendorId: vendor?.id || null });
    },
    setItemSizes: (itemSizes: any[]) => {
        setEditInstance({ ...editInstance, itemSizes });
        // setEditDto({ ...editDto, itemSizeDtos: itemSizes }); // TODO: map to DTOs if needed
    },
});

const createInventoryItemCreateContext = (
    setCreateDto: (dto: Partial<CreateInventoryItemDto> | null) => void,
    setCreateInstance: (instance: Partial<InventoryItem> | null) => void,
    createDto: Partial<CreateInventoryItemDto> | null,
    createInstance: Partial<InventoryItem> | null
): InventoryItemCreateContext => ({
    setItemName: (itemName: string) => {
        setCreateInstance({ ...createInstance, itemName });
        setCreateDto({ ...createDto, itemName });
    },
    setCategory: (category: InventoryItemCategory | null) => {
        setCreateInstance({ ...createInstance, category });
        setCreateDto({
            ...createDto,
            inventoryItemCategoryId: category?.id || null,
        });
    },
    setVendor: (vendor: InventoryItemVendor | null) => {
        setCreateInstance({ ...createInstance, vendor });
        setCreateDto({ ...createDto, vendorId: vendor?.id || null });
    },
    setItemSizes: (itemSizes: any[]) => {
        setCreateInstance({ ...createInstance, itemSizes });
        // setCreateDto({ ...createDto, itemSizeDtos: itemSizes }); // TODO: map to DTOs if needed
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
