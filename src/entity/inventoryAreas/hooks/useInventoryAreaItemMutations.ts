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
    setEditValues: (values: Partial<UpdateInventoryAreaItemDto> | null) => void
): InventoryAreaItemEditContext => ({
    setCountedInventoryItemId: (countedInventoryItemId: any) => {
        setEditValues({ countedInventoryItemId });
    },
    setCountedAmount: (countedAmount: number) => {
        setEditValues({ countedAmount });
    },
    setCountedItemSizeId: (countedItemSizeId: number) => {
        setEditValues({ countedItemSizeId });
    },
    setCountedItemSizeDto: (countedItemSizeDto: any) => {
        setEditValues({ countedItemSizeDto });
    },
});

const createInventoryAreaItemCreateContext = (
    setCreateValues: (
        values: Partial<CreateInventoryAreaItemDto> | null
    ) => void
): InventoryAreaItemCreateContext => ({
    setParentInventoryCountId: (parentInventoryCountId: number) => {
        setCreateValues({ parentInventoryCountId });
    },
    setCountedInventoryItemId: (countedInventoryItemId: number) => {
        setCreateValues({ countedInventoryItemId });
    },
    setCountedAmount: (countedAmount: number) => {
        setCreateValues({ countedAmount });
    },
    setCountedItemSizeId: (countedItemSizeId: number) => {
        setCreateValues({ countedItemSizeId });
    },
    setCountedItemSizeDto: (countedItemSizeDto: any) => {
        setCreateValues({ countedItemSizeDto });
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
