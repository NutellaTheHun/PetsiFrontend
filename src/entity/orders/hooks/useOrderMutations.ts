import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateOrderDto,
    Order,
    OrderCategory,
    OrderMenuItem,
    UpdateOrderDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type OrderEditContext = {
    setOrderCategory: (orderCategory: OrderCategory) => void;
    setRecipient: (recipient: string) => void;
    setFulfillmentContactName: (fulfillmentContactName: string) => void;
    setFulfillmentDate: (fulfillmentDate: string) => void;
    setFulfillmentType: (fulfillmentType: string) => void;
    setDeliveryAddress: (deliveryAddress: string) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setEmail: (email: string) => void;
    setNote: (note: string) => void;
    setIsFrozen: (isFrozen: boolean) => void;
    setIsWeekly: (isWeekly: boolean) => void;
    setWeeklyFulfillment: (weeklyFulfillment: string) => void;
    setOrderedMenuItems: (orderedMenuItems: OrderMenuItem[]) => void;
};

export type OrderCreateContext = {
    setOrderCategory: (orderCategory: OrderCategory) => void;
    setRecipient: (recipient: string) => void;
    setFulfillmentContactName: (fulfillmentContactName: string) => void;
    setFulfillmentDate: (fulfillmentDate: string) => void;
    setFulfillmentType: (fulfillmentType: string) => void;
    setDeliveryAddress: (deliveryAddress: string) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setEmail: (email: string) => void;
    setNote: (note: string) => void;
    setIsFrozen: (isFrozen: boolean) => void;
    setIsWeekly: (isWeekly: boolean) => void;
    setWeeklyFulfillment: (weeklyFulfillment: string) => void;
    setOrderedMenuItems: (orderedMenuItems: OrderMenuItem[]) => void; // Create and Update DTOs
};

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
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setEditInstance({ ...editInstance, fulfillmentContactName });
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setEditInstance({ ...editInstance, fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setEditInstance({ ...editInstance, fulfillmentType });
    },
    setDeliveryAddress: (deliveryAddress: string) => {
        setEditInstance({ ...editInstance, deliveryAddress });
    },
    setPhoneNumber: (phoneNumber: string) => {
        setEditInstance({ ...editInstance, phoneNumber });
    },
    setEmail: (email: string) => {
        setEditInstance({ ...editInstance, email });
    },
    setNote: (note: string) => {
        setEditInstance({ ...editInstance, note });
    },
    setIsFrozen: (isFrozen: boolean) => {
        setEditInstance({ ...editInstance, isFrozen });
    },
    setIsWeekly: (isWeekly: boolean) => {
        setEditInstance({ ...editInstance, isWeekly });
    },
    setWeeklyFulfillment: (weeklyFulfillment: string) => {
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
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setCreateInstance({ ...createInstance, fulfillmentContactName });
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setCreateInstance({ ...createInstance, fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setCreateInstance({ ...createInstance, fulfillmentType });
    },
    setDeliveryAddress: (deliveryAddress: string) => {
        setCreateInstance({ ...createInstance, deliveryAddress });
    },
    setPhoneNumber: (phoneNumber: string) => {
        setCreateInstance({ ...createInstance, phoneNumber });
    },
    setEmail: (email: string) => {
        setCreateInstance({ ...createInstance, email });
    },
    setNote: (note: string) => {
        setCreateInstance({ ...createInstance, note });
    },
    setIsFrozen: (isFrozen: boolean) => {
        setCreateInstance({ ...createInstance, isFrozen });
    },
    setIsWeekly: (isWeekly: boolean) => {
        setCreateInstance({ ...createInstance, isWeekly });
    },
    setWeeklyFulfillment: (weeklyFulfillment: string) => {
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
        createEditContext: createOrderEditContext,
        createCreateContext: createOrderCreateContext,
    });
}
