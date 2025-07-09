import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateOrderMenuItemDto,
    MenuItem,
    MenuItemSize,
    Order,
    OrderMenuItem,
    UpdateOrderMenuItemDto,
} from "../../entityTypes";

export type OrderMenuItemEditContext = {
    setOrder: (order: Order) => void;
    setMenuItem: (menuItem: MenuItem) => void;
    setSize: (size: MenuItemSize) => void;
    setQuantity: (quantity: number) => void;
};

export type OrderMenuItemCreateContext = {
    setOrder: (order: Order) => void;
    setMenuItem: (menuItem: MenuItem) => void;
    setSize: (size: MenuItemSize) => void;
    setQuantity: (quantity: number) => void;
};

// DTO converter for OrderMenuItem
const orderMenuItemDtoConverter = {
    toCreateDto: (entity: Partial<OrderMenuItem>): CreateOrderMenuItemDto => ({
        orderId: entity.order?.id || 0,
        menuItemId: entity.menuItem?.id || 0,
        menuItemSizeId: entity.size?.id || 0,
        quantity: entity.quantity || 0,
    }),
    toUpdateDto: (entity: Partial<OrderMenuItem>): UpdateOrderMenuItemDto => ({
        menuItemId: entity.menuItem?.id,
        menuItemSizeId: entity.size?.id,
        quantity: entity.quantity,
    }),
};

// Context factory functions
const createOrderMenuItemEditContext = (
    editInstance: Partial<OrderMenuItem> | null,
    setEditInstance: (instance: Partial<OrderMenuItem> | null) => void
): OrderMenuItemEditContext => ({
    setOrder: (order: Order) => {
        setEditInstance({ ...editInstance, order });
    },
    setMenuItem: (menuItem: MenuItem) => {
        setEditInstance({ ...editInstance, menuItem });
    },
    setSize: (size: MenuItemSize) => {
        setEditInstance({ ...editInstance, size });
    },
    setQuantity: (quantity: number) => {
        setEditInstance({ ...editInstance, quantity });
    },
});

const createOrderMenuItemCreateContext = (
    createInstance: Partial<OrderMenuItem>,
    setCreateInstance: (instance: Partial<OrderMenuItem>) => void
): OrderMenuItemCreateContext => ({
    setOrder: (order: Order) => {
        setCreateInstance({ ...createInstance, order });
    },
    setMenuItem: (menuItem: MenuItem) => {
        setCreateInstance({ ...createInstance, menuItem });
    },
    setSize: (size: MenuItemSize) => {
        setCreateInstance({ ...createInstance, size });
    },
    setQuantity: (quantity: number) => {
        setCreateInstance({ ...createInstance, quantity });
    },
});

// Entity-specific mutations hook
export function useOrderMenuItemMutations() {
    return useEntityMutations<
        OrderMenuItem,
        CreateOrderMenuItemDto,
        UpdateOrderMenuItemDto,
        OrderMenuItemEditContext,
        OrderMenuItemCreateContext
    >({
        endpoint: "/order-menu-items",
        dtoConverter: orderMenuItemDtoConverter,
        createEditContext: createOrderMenuItemEditContext,
        createCreateContext: createOrderMenuItemCreateContext,
    });
}
