import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryAreaItemDto,
    InventoryAreaItem,
    InventoryItem,
    InventoryItemSize,
    UpdateInventoryAreaItemDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryAreaItemEditContext = {
    setAmount: (amount: number) => void;
    setCountedItem: (countedItem: InventoryItem) => void;
    setCountedItemSize: (countedItemSize: InventoryItemSize) => void;
};

export type InventoryAreaItemCreateContext = {
    setAmount: (amount: number) => void;
    setCountedItem: (countedItem: InventoryItem) => void;
    setCountedItemSize: (countedItemSize: InventoryItemSize) => void;
};

// DTO converter for InventoryAreaItem
const inventoryAreaItemDtoConverter = {
    toCreateDto: (
        entity: Partial<InventoryAreaItem>
    ): CreateInventoryAreaItemDto => ({
        parentInventoryCountId: entity.parentInventoryCount?.id || 0,
        countedInventoryItemId: entity.countedItem?.id || 0,
        countedAmount: entity.amount || 0,
        countedItemSizeId: entity.countedItemSize?.id || 0,
        countedItemSizeDto: {
            mode: "create",
            measureUnitId: entity.countedItemSize?.measureUnit?.id || 0,
            measureAmount: entity.countedItemSize?.measureAmount || 0,
            inventoryPackageId: entity.countedItemSize?.packageType?.id || 0,
            cost: Number(entity.countedItemSize?.cost) || 0,
        },
    }),
    toUpdateDto: (
        entity: Partial<InventoryAreaItem>
    ): UpdateInventoryAreaItemDto => ({
        countedInventoryItemId: entity.countedItem?.id,
        countedAmount: entity.amount,
        countedItemSizeId: entity.countedItemSize?.id,
        countedItemSizeDto: {
            mode: "update",
            id: entity.countedItemSize?.id || 0,
            measureUnitId: entity.countedItemSize?.measureUnit?.id,
            measureAmount: entity.countedItemSize?.measureAmount,
            inventoryPackageId: entity.countedItemSize?.packageType?.id,
            cost: Number(entity.countedItemSize?.cost),
        },
    }),
};

// Context factory functions
const createInventoryAreaItemEditContext = (
    editInstance: Partial<InventoryAreaItem> | null,
    setEditInstance: (instance: Partial<InventoryAreaItem> | null) => void
): InventoryAreaItemEditContext => ({
    setAmount: (amount: number) => {
        setEditInstance({ ...editInstance, amount });
    },
    setCountedItem: (countedItem: InventoryItem) => {
        setEditInstance({ ...editInstance, countedItem });
    },
    setCountedItemSize: (countedItemSize: InventoryItemSize) => {
        setEditInstance({ ...editInstance, countedItemSize });
    },
});

const createInventoryAreaItemCreateContext = (
    createInstance: Partial<InventoryAreaItem>,
    setCreateInstance: (instance: Partial<InventoryAreaItem>) => void
): InventoryAreaItemCreateContext => ({
    setAmount: (amount: number) => {
        setCreateInstance({ ...createInstance, amount });
    },
    setCountedItem: (countedItem: InventoryItem) => {
        setCreateInstance({ ...createInstance, countedItem });
    },
    setCountedItemSize: (countedItemSize: InventoryItemSize) => {
        setCreateInstance({ ...createInstance, countedItemSize });
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
        dtoConverter: inventoryAreaItemDtoConverter,
        createEditContext: createInventoryAreaItemEditContext,
        createCreateContext: createInventoryAreaItemCreateContext,
    });
}
