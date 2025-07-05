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
        }, // to DTO ?
    }),
    toUpdateDto: (entity: InventoryAreaItem): UpdateInventoryAreaItemDto => ({
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
        }, // to DTO ?
    }),
};

// Context factory functions
const createInventoryAreaItemEditContext = (
    setEditDto: (dto: Partial<UpdateInventoryAreaItemDto> | null) => void,
    setEditInstance: (instance: InventoryAreaItem | null) => void,
    editDto: Partial<UpdateInventoryAreaItemDto> | null,
    editInstance: InventoryAreaItem | null
): InventoryAreaItemEditContext => ({
    setCountedInventoryItem: (countedItem: InventoryItem) => {
        setEditDto({
            ...editDto,
            countedInventoryItemId: countedItem.id,
        });
        setEditInstance(editInstance ? { ...editInstance, countedItem } : null);
    },
    setCountedAmount: (amount: number) => {
        setEditDto({ ...editDto, countedAmount: amount });
        setEditInstance(editInstance ? { ...editInstance, amount } : null);
    },
    setCountedItemSize: (countedItemSize: InventoryItemSize) => {
        setEditDto({ ...editDto, countedItemSizeId: countedItemSize.id });
        setEditInstance(
            editInstance ? { ...editInstance, countedItemSize } : null
        );
    },
    setCountedItemSizeDto: (countedItemSizeDto: any) => {
        setEditDto({ ...editDto, countedItemSizeDto });
        // ???
    },
});

const createInventoryAreaItemCreateContext = (
    setCreateDto: (dto: Partial<CreateInventoryAreaItemDto> | null) => void,
    setCreateInstance: (instance: Partial<InventoryAreaItem> | null) => void,
    createDto: Partial<CreateInventoryAreaItemDto> | null,
    createInstance: Partial<InventoryAreaItem> | null
): InventoryAreaItemCreateContext => ({
    setParentInventoryCount: (parentInventoryCount: InventoryAreaCount) => {
        setCreateDto({
            ...createDto,
            parentInventoryCountId: parentInventoryCount.id,
        });
        // Note: The entity uses 'parentInventoryCount' but DTO uses 'parentInventoryCountId'
        // We don't set this on the instance since it's a DTO field
    },
    setCountedInventoryItem: (countedInventoryItem: InventoryItem) => {
        setCreateDto({
            ...createDto,
            countedInventoryItemId: countedInventoryItem.id,
        });
        // Note: The entity uses 'countedInventoryItem' but DTO uses 'countedInventoryItemId'
        // We don't set this on the instance since it's a DTO field
    },
    setCountedAmount: (countedAmount: number) => {
        setCreateDto({ ...createDto, countedAmount });
        setCreateInstance({ ...createInstance, amount: countedAmount });
    },
    setCountedItemSize: (countedItemSize: InventoryItemSize) => {
        setCreateDto({
            ...createDto,
            countedItemSizeId: countedItemSize.id,
        });
        setCreateInstance({ ...createInstance, countedItemSize });
        // Note: The entity uses 'countedItemSize' but DTO uses 'countedItemSizeId'
        // We don't set this on the instance since it's a DTO field
    },
    setCountedItemSizeDto: (countedItemSizeDto: any) => {
        setCreateDto({ ...createDto, countedItemSizeDto });
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
        dtoConverter: inventoryAreaItemDtoConverter,
        createEditContext: createInventoryAreaItemEditContext,
        createCreateContext: createInventoryAreaItemCreateContext,
    });
}
