import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryAreaItemDto,
    InventoryAreaItem,
    UpdateInventoryAreaItemDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryAreaItemEditContext = {
    setCountedInventoryItemId: (countedInventoryItemId: any) => void;
    setCountedAmount: (countedAmount: number) => void;
    setCountedItemSizeId: (countedItemSizeId: number) => void;
    setCountedItemSizeDto: (countedItemSizeDto: any) => void;
};

export type InventoryAreaItemCreateContext = {
    setParentInventoryCountId: (parentInventoryCountId: number) => void;
    setCountedInventoryItemId: (countedInventoryItemId: number) => void;
    setCountedAmount: (countedAmount: number) => void;
    setCountedItemSizeId: (countedItemSizeId: number) => void;
    setCountedItemSizeDto: (countedItemSizeDto: any) => void;
};

// Context factory functions
const createInventoryAreaItemEditContext = (
    setEditValues: (values: Partial<UpdateInventoryAreaItemDto> | null) => void,
    setEditInstance: (instance: InventoryAreaItem | null) => void,
    editValues: Partial<UpdateInventoryAreaItemDto> | null,
    editInstance: InventoryAreaItem | null
): InventoryAreaItemEditContext => ({
    setCountedInventoryItemId: (countedInventoryItemId: any) => {
        setEditValues({ ...editValues, countedInventoryItemId });
    },
    setCountedAmount: (countedAmount: number) => {
        setEditValues({ ...editValues, countedAmount });
    },
    setCountedItemSizeId: (countedItemSizeId: number) => {
        setEditValues({ ...editValues, countedItemSizeId });
    },
    setCountedItemSizeDto: (countedItemSizeDto: any) => {
        setEditValues({ ...editValues, countedItemSizeDto });
    },
});

const createInventoryAreaItemCreateContext = (
    setCreateValues: (
        values: Partial<CreateInventoryAreaItemDto> | null
    ) => void,
    setCreateInstance: (instance: Partial<InventoryAreaItem> | null) => void,
    createValues: Partial<CreateInventoryAreaItemDto> | null,
    createInstance: Partial<InventoryAreaItem> | null
): InventoryAreaItemCreateContext => ({
    setParentInventoryCountId: (parentInventoryCountId: number) => {
        setCreateValues({ ...createValues, parentInventoryCountId });
        // Note: The entity uses 'parentInventoryCount' but DTO uses 'parentInventoryCountId'
        // We don't set this on the instance since it's a DTO field
    },
    setCountedInventoryItemId: (countedInventoryItemId: number) => {
        setCreateValues({ ...createValues, countedInventoryItemId });
        // Note: The entity uses 'countedInventoryItem' but DTO uses 'countedInventoryItemId'
        // We don't set this on the instance since it's a DTO field
    },
    setCountedAmount: (countedAmount: number) => {
        setCreateValues({ ...createValues, countedAmount });
        setCreateInstance({ ...createInstance, countedAmount });
    },
    setCountedItemSizeId: (countedItemSizeId: number) => {
        setCreateValues({ ...createValues, countedItemSizeId });
        // Note: The entity uses 'countedItemSize' but DTO uses 'countedItemSizeId'
        // We don't set this on the instance since it's a DTO field
    },
    setCountedItemSizeDto: (countedItemSizeDto: any) => {
        setCreateValues({ ...createValues, countedItemSizeDto });
        // Note: The entity uses 'countedItemSize' but DTO uses 'countedItemSizeDto'
        // We don't set this on the instance since it's a DTO field
    },
});

// Entity-specific mutations hook
export function useInventoryAreaItemMutations() {
    return useEntityMutations<
        InventoryAreaItem,
        CreateInventoryAreaItemDto,
        UpdateInventoryAreaItemDto,
        InventoryAreaItemEditContext,
        InventoryAreaItemCreateContext
    >({
        endpoint: "/inventory-area-items",
        createEditContext: createInventoryAreaItemEditContext,
        createCreateContext: createInventoryAreaItemCreateContext,
    });
}
