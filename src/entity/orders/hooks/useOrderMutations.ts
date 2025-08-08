import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateOrderDto,
    Order,
    OrderCategory,
    OrderMenuItem,
    UpdateOrderDto,
} from "../../entityTypes";
import { orderDtoConverter } from "../dto-converters/order.DtoConverter";
import type { OrderRenderContext } from "../property-render/Order.render";

export type OrderEditContext = Pick<
    OrderRenderContext,
    | "setOrderCategory"
    | "setRecipient"
    | "setFulfillmentDate"
    | "setFulfillmentType"
    | "setFulfillmentContactName"
    | "setDeliveryAddress"
    | "setPhoneNumber"
    | "setEmail"
    | "setIsFrozen"
    | "setIsWeekly"
    | "setWeeklyFulfillment"
    | "setOrderedMenuItems"
    | "setNote"
>;

export type OrderCreateContext = Pick<
    OrderRenderContext,
    | "setOrderCategory"
    | "setRecipient"
    | "setFulfillmentDate"
    | "setFulfillmentType"
    | "setFulfillmentContactName"
    | "setDeliveryAddress"
    | "setPhoneNumber"
    | "setEmail"
    | "setIsFrozen"
    | "setIsWeekly"
    | "setWeeklyFulfillment"
    | "setOrderedMenuItems"
    | "setNote"
>;

// Context factory functions
const createOrderEditContext = (
    editInstance: Partial<Order> | null,
    setEditInstance: (instance: Partial<Order> | null) => void
): OrderEditContext => ({
    setOrderCategory: (orderCategory: OrderCategory) => {
        setEditInstance({ ...editInstance, orderCategory });
    },
    setRecipient: (recipient: string) => {
        setEditInstance({ ...editInstance, recipient });
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setEditInstance({ ...editInstance, fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setEditInstance({ ...editInstance, fulfillmentType });
    },
    setFulfillmentContactName: (fulfillmentContactName: string | null) => {
        setEditInstance({ ...editInstance, fulfillmentContactName });
    },
    setDeliveryAddress: (deliveryAddress: string | null) => {
        setEditInstance({ ...editInstance, deliveryAddress });
    },
    setPhoneNumber: (phoneNumber: string | null) => {
        setEditInstance({ ...editInstance, phoneNumber });
    },
    setEmail: (email: string | null) => {
        setEditInstance({ ...editInstance, email });
    },
    setNote: (note: string | null) => {
        setEditInstance({ ...editInstance, note });
    },
    setIsFrozen: (isFrozen: boolean) => {
        setEditInstance({ ...editInstance, isFrozen });
    },
    setIsWeekly: (isWeekly: boolean) => {
        setEditInstance({ ...editInstance, isWeekly });
    },
    setWeeklyFulfillment: (weeklyFulfillment: string | null) => {
        setEditInstance({ ...editInstance, weeklyFulfillment });
    },
    setOrderedMenuItems: (orderedItems: OrderMenuItem[]) => {
        setEditInstance({ ...editInstance, orderedItems });
    },
});

const createOrderCreateContext = (
    createInstance: Partial<Order>,
    setCreateInstance: (instance: Partial<Order>) => void
): OrderCreateContext => ({
    setOrderCategory: (orderCategory: OrderCategory) => {
        setCreateInstance({ ...createInstance, orderCategory });
    },
    setRecipient: (recipient: string) => {
        setCreateInstance({ ...createInstance, recipient });
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setCreateInstance({ ...createInstance, fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setCreateInstance({ ...createInstance, fulfillmentType });
    },
    setFulfillmentContactName: (fulfillmentContactName: string | null) => {
        setCreateInstance({ ...createInstance, fulfillmentContactName });
    },
    setDeliveryAddress: (deliveryAddress: string | null) => {
        setCreateInstance({ ...createInstance, deliveryAddress });
    },
    setPhoneNumber: (phoneNumber: string | null) => {
        setCreateInstance({ ...createInstance, phoneNumber });
    },
    setEmail: (email: string | null) => {
        setCreateInstance({ ...createInstance, email });
    },
    setNote: (note: string | null) => {
        setCreateInstance({ ...createInstance, note });
    },
    setIsFrozen: (isFrozen: boolean) => {
        setCreateInstance({ ...createInstance, isFrozen });
    },
    setIsWeekly: (isWeekly: boolean) => {
        setCreateInstance({ ...createInstance, isWeekly });
    },
    setWeeklyFulfillment: (weeklyFulfillment: string | null) => {
        setCreateInstance({ ...createInstance, weeklyFulfillment });
    },
    setOrderedMenuItems: (orderedItems: OrderMenuItem[]) => {
        setCreateInstance({ ...createInstance, orderedItems });
    },
});

// Entity-specific mutations hook
export function useOrderMutations() {
    return useEntityMutations<
        Order,
        CreateOrderDto,
        UpdateOrderDto,
        OrderEditContext,
        OrderCreateContext
    >({
        endpoint: "/orders",
        dtoConverter: orderDtoConverter,
        createEditContext: createOrderEditContext,
        createCreateContext: createOrderCreateContext,
    });
}
