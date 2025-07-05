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
    setEditInstance: (instance: InventoryItem | null) => void,
    editDto: Partial<UpdateInventoryItemDto> | null,
    editInstance: InventoryItem | null
): InventoryItemEditContext => ({
    setItemName: (itemName: string) => {
        setEditDto({ ...editDto, itemName });
        setEditInstance(editInstance ? { ...editInstance, itemName } : null);
    },
    setCategory: (category: InventoryItemCategory | null) => {
        setEditDto({
            ...editDto,
            inventoryItemCategoryId: category?.id || null,
        });
        setEditInstance(editInstance ? { ...editInstance, category } : null);
    },
    setVendor: (vendor: InventoryItemVendor | null) => {
        setEditDto({ ...editDto, vendorId: vendor?.id || null });
        setEditInstance(editInstance ? { ...editInstance, vendor } : null);
    },
    setItemSizes: (itemSizes: any[]) => {
        // setEditDto({ ...editDto, itemSizeDtos: itemSizes }); DTOS ???
        setEditInstance(editInstance ? { ...editInstance, itemSizes } : null);
    },
});

const createInventoryItemCreateContext = (
    setCreateDto: (dto: Partial<CreateInventoryItemDto> | null) => void,
    setCreateInstance: (instance: Partial<InventoryItem> | null) => void,
    createDto: Partial<CreateInventoryItemDto> | null,
    createInstance: Partial<InventoryItem> | null
): InventoryItemCreateContext => ({
    setItemName: (itemName: string) => {
        setCreateDto({ ...createDto, itemName });
        setCreateInstance({ ...createInstance, itemName });
    },
    setCategory: (category: InventoryItemCategory | null) => {
        setCreateDto({
            ...createDto,
            inventoryItemCategoryId: category?.id || null,
        });
        setCreateInstance({ ...createInstance, category });
    },
    setVendor: (vendor: InventoryItemVendor | null) => {
        setCreateDto({ ...createDto, vendorId: vendor?.id || null });
        setCreateInstance({ ...createInstance, vendor });
    },
    setItemSizes: (itemSizes: any[]) => {
        // setCreateDto({ ...createDto, itemSizeDtos: itemSizes }); DTOS ???
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
