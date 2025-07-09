import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryAreaItemDto,
    InventoryAreaCount,
    InventoryAreaItem,
    InventoryItem,
    InventoryItemSize,
    UpdateInventoryAreaItemDto,
} from "../../entityTypes";

export type InventoryAreaItemEditContext = {
    setParentInventoryCount: (parentInventoryCount: InventoryAreaCount) => void;
    setCountedItem: (countedItem: InventoryItem) => void;
    setAmount: (amount: number) => void;
    setCountedItemSize: (countedItemSize: InventoryItemSize) => void;
};

export type InventoryAreaItemCreateContext = {
    setParentInventoryCount: (parentInventoryCount: InventoryAreaCount) => void;
    setCountedItem: (countedItem: InventoryItem) => void;
    setAmount: (amount: number) => void;
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
    setParentInventoryCount: (parentInventoryCount: InventoryAreaCount) => {
        setEditInstance({ ...editInstance, parentInventoryCount });
    },
    setCountedItem: (countedItem: InventoryItem) => {
        setEditInstance({ ...editInstance, countedItem });
    },
    setAmount: (amount: number) => {
        setEditInstance({ ...editInstance, amount });
    },
    setCountedItemSize: (countedItemSize: InventoryItemSize) => {
        setEditInstance({ ...editInstance, countedItemSize });
    },
});

const createInventoryAreaItemCreateContext = (
    createInstance: Partial<InventoryAreaItem>,
    setCreateInstance: (instance: Partial<InventoryAreaItem>) => void
): InventoryAreaItemCreateContext => ({
    setParentInventoryCount: (parentInventoryCount: InventoryAreaCount) => {
        setCreateInstance({ ...createInstance, parentInventoryCount });
    },
    setCountedItem: (countedItem: InventoryItem) => {
        setCreateInstance({ ...createInstance, countedItem });
    },
    setAmount: (amount: number) => {
        setCreateInstance({ ...createInstance, amount });
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
