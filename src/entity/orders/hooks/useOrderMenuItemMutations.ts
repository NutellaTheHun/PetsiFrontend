import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateOrderMenuItemDto,
    MenuItem,
    MenuItemSize,
    Order,
    OrderMenuItem,
    UpdateOrderMenuItemDto,
} from "../../entityTypes";
import type { OrderMenuItemRenderContext } from "../property-render/OrderMenuItem.render";

export type OrderMenuItemEditContext = Pick<
    OrderMenuItemRenderContext,
    "setMenuItem" | "setSize" | "setQuantity"
>;

export type OrderMenuItemCreateContext = Pick<
    OrderMenuItemRenderContext,
    "setOrder" | "setMenuItem" | "setSize" | "setQuantity"
>;

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
