import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryAreaItemDto,
    InventoryAreaCount,
    InventoryAreaItem,
    InventoryItem,
    InventoryItemSize,
    UpdateInventoryAreaItemDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryAreaItemEditContext = {
    setCountedInventoryItem: (countedInventoryItem: InventoryItem) => void;
    setCountedAmount: (countedAmount: number) => void;
    setCountedItemSize: (countedItemSize: InventoryItemSize) => void;
    setCountedItemSizeDto: (countedItemSizeDto: any) => void; // create or update?
};

export type InventoryAreaItemCreateContext = {
    setParentInventoryCount: (parentInventoryCount: InventoryAreaCount) => void;
    setCountedInventoryItem: (countedInventoryItem: InventoryItem) => void;
    setCountedAmount: (countedAmount: number) => void;
    setCountedItemSize: (countedItemSize: InventoryItemSize) => void;
    setCountedItemSizeDto: (countedItemSizeDto: any) => void; // create or update?
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
        countedInventoryItemId: entity.countedItem?.id || 0,
        countedAmount: entity.amount || 0,
        countedItemSizeId: entity.countedItemSize?.id || 0,
        countedItemSizeDto: {
            mode: "update",
            id: entity.countedItemSize?.id || 0,
            measureUnitId: entity.countedItemSize?.measureUnit?.id || 0,
            measureAmount: entity.countedItemSize?.measureAmount || 0,
            inventoryPackageId: entity.countedItemSize?.packageType?.id || 0,
            cost: Number(entity.countedItemSize?.cost) || 0,
        },
    }),
};

// Context factory functions
const createInventoryAreaItemEditContext = (
    setEditDto: (dto: Partial<UpdateInventoryAreaItemDto> | null) => void,
    setEditInstance: (instance: Partial<InventoryAreaItem> | null) => void,
    editDto: Partial<UpdateInventoryAreaItemDto> | null,
    editInstance: Partial<InventoryAreaItem> | null
): InventoryAreaItemEditContext => ({
    setCountedInventoryItem: (countedItem: InventoryItem) => {
        setEditInstance({ ...editInstance, countedItem });
        setEditDto({
            ...editDto,
            countedInventoryItemId: countedItem.id,
        });
    },
    setCountedAmount: (amount: number) => {
        setEditInstance({ ...editInstance, amount });
        setEditDto({ ...editDto, countedAmount: amount });
    },
    setCountedItemSize: (countedItemSize: InventoryItemSize) => {
        setEditInstance({ ...editInstance, countedItemSize });
        setEditDto({ ...editDto, countedItemSizeId: countedItemSize.id });
    },
    setCountedItemSizeDto: (countedItemSizeDto: any) => {
        // Not setting on instance, only DTO
        setEditDto({ ...editDto, countedItemSizeDto });
    },
});

const createInventoryAreaItemCreateContext = (
    setCreateDto: (dto: Partial<CreateInventoryAreaItemDto> | null) => void,
    setCreateInstance: (instance: Partial<InventoryAreaItem> | null) => void,
    createDto: Partial<CreateInventoryAreaItemDto> | null,
    createInstance: Partial<InventoryAreaItem> | null
): InventoryAreaItemCreateContext => ({
    setParentInventoryCount: (parentInventoryCount: InventoryAreaCount) => {
        // Not setting on instance, only DTO
        setCreateDto({
            ...createDto,
            parentInventoryCountId: parentInventoryCount.id,
        });
    },
    setCountedInventoryItem: (countedInventoryItem: InventoryItem) => {
        // Not setting on instance, only DTO
        setCreateDto({
            ...createDto,
            countedInventoryItemId: countedInventoryItem.id,
        });
    },
    setCountedAmount: (countedAmount: number) => {
        setCreateInstance({ ...createInstance, amount: countedAmount });
        setCreateDto({ ...createDto, countedAmount });
    },
    setCountedItemSize: (countedItemSize: InventoryItemSize) => {
        setCreateInstance({ ...createInstance, countedItemSize });
        setCreateDto({
            ...createDto,
            countedItemSizeId: countedItemSize.id,
        });
    },
    setCountedItemSizeDto: (countedItemSizeDto: any) => {
        // Not setting on instance, only DTO
        setCreateDto({ ...createDto, countedItemSizeDto });
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
