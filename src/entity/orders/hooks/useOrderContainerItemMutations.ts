import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateOrderContainerItemDto,
    MenuItem,
    MenuItemSize,
    OrderContainerItem,
    OrderMenuItem,
    UpdateOrderContainerItemDto,
} from "../../entityTypes";

export type OrderContainerItemEditContext = {
    setParentOrderItem: (parentOrderItem: OrderMenuItem) => void;
    setContainedItem: (containedItem: MenuItem) => void;
    setContainedItemSize: (containedItemSize: MenuItemSize) => void;
    setQuantity: (quantity: number) => void;
};

export type OrderContainerItemCreateContext = {
    setParentOrderItem: (parentOrderItem: OrderMenuItem) => void;
    setContainedItem: (containedItem: MenuItem) => void;
    setContainedItemSize: (containedItemSize: MenuItemSize) => void;
    setQuantity: (quantity: number) => void;
};

// DTO converter for OrderContainerItem
const orderContainerItemDtoConverter = {
    toCreateDto: (
        entity: Partial<OrderContainerItem>
    ): CreateOrderContainerItemDto => ({
        parentOrderMenuItemId: entity.parentOrderItem?.id || 0,
        parentContainerMenuItemId: entity.parentOrderItem?.menuItem?.id || 0,
        containedMenuItemId: entity.containedItem?.id || 0,
        containedMenuItemSizeId: entity.containedItemSize?.id || 0,
        quantity: entity.quantity || 0,
    }),
    toUpdateDto: (
        entity: Partial<OrderContainerItem>
    ): UpdateOrderContainerItemDto => ({
        parentContainerMenuItemId: entity.parentOrderItem?.menuItem?.id,
        containedMenuItemId: entity.containedItem?.id,
        containedMenuItemSizeId: entity.containedItemSize?.id,
        quantity: entity.quantity,
    }),
};

// Context factory functions
const createOrderContainerItemEditContext = (
    editInstance: Partial<OrderContainerItem> | null,
    setEditInstance: (instance: Partial<OrderContainerItem> | null) => void
): OrderContainerItemEditContext => ({
    setParentOrderItem: (parentOrderItem: OrderMenuItem) => {
        setEditInstance({ ...editInstance, parentOrderItem });
    },
    setContainedItem: (containedItem: MenuItem) => {
        setEditInstance({ ...editInstance, containedItem });
    },
    setContainedItemSize: (containedItemSize: MenuItemSize) => {
        setEditInstance({ ...editInstance, containedItemSize });
    },
    setQuantity: (quantity: number) => {
        setEditInstance({ ...editInstance, quantity });
    },
});

const createOrderContainerItemCreateContext = (
    createInstance: Partial<OrderContainerItem>,
    setCreateInstance: (instance: Partial<OrderContainerItem>) => void
): OrderContainerItemCreateContext => ({
    setParentOrderItem: (parentOrderItem: OrderMenuItem) => {
        setCreateInstance({ ...createInstance, parentOrderItem });
    },
    setContainedItem: (containedItem: MenuItem) => {
        setCreateInstance({ ...createInstance, containedItem });
    },
    setContainedItemSize: (containedItemSize: MenuItemSize) => {
        setCreateInstance({ ...createInstance, containedItemSize });
    },
    setQuantity: (quantity: number) => {
        setCreateInstance({ ...createInstance, quantity });
    },
});

// Entity-specific mutations hook
export function useOrderContainerItemMutations() {
    return useEntityMutations<
        OrderContainerItem,
        CreateOrderContainerItemDto,
        UpdateOrderContainerItemDto,
        OrderContainerItemEditContext,
        OrderContainerItemCreateContext
    >({
        endpoint: "/order-container-items",
        dtoConverter: orderContainerItemDtoConverter,
        createEditContext: createOrderContainerItemEditContext,
        createCreateContext: createOrderContainerItemCreateContext,
    });
}
