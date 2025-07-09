import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateOrderDto,
    Order,
    OrderCategory,
    UpdateOrderDto,
} from "../../entityTypes";

export type OrderEditContext = {
    setOrderCategory: (orderCategory: OrderCategory) => void;
    setRecipient: (recipient: string) => void;
    setFulfillmentDate: (fulfillmentDate: string) => void;
    setFulfillmentType: (fulfillmentType: string) => void;
    setFulfillmentContactName: (fulfillmentContactName: string) => void;
    setDeliveryAddress: (deliveryAddress: string) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setEmail: (email: string) => void;
    setNote: (note: string) => void;
    setIsFrozen: (isFrozen: boolean) => void;
    setIsWeekly: (isWeekly: boolean) => void;
    setWeeklyFulfillment: (weeklyFulfillment: string) => void;
};

export type OrderCreateContext = {
    setOrderCategory: (orderCategory: OrderCategory) => void;
    setRecipient: (recipient: string) => void;
    setFulfillmentDate: (fulfillmentDate: string) => void;
    setFulfillmentType: (fulfillmentType: string) => void;
    setFulfillmentContactName: (fulfillmentContactName: string) => void;
    setDeliveryAddress: (deliveryAddress: string) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setEmail: (email: string) => void;
    setNote: (note: string) => void;
    setIsFrozen: (isFrozen: boolean) => void;
    setIsWeekly: (isWeekly: boolean) => void;
    setWeeklyFulfillment: (weeklyFulfillment: string) => void;
};

// DTO converter for Order
const orderDtoConverter = {
    toCreateDto: (entity: Partial<Order>): CreateOrderDto => ({
        orderCategoryId: entity.orderCategory?.id || 0,
        recipient: entity.recipient || "",
        fulfillmentDate: entity.fulfillmentDate || new Date().toISOString(),
        fulfillmentType: entity.fulfillmentType || "pickup",
        fulfillmentContactName: entity.fulfillmentContactName,
        deliveryAddress: entity.deliveryAddress,
        phoneNumber: entity.phoneNumber,
        email: entity.email,
        note: entity.note,
        isFrozen: entity.isFrozen || false,
        isWeekly: entity.isWeekly || false,
        weeklyFulfillment: entity.weeklyFulfillment,
        orderedMenuItemDtos: [], // Default empty array for menu items
    }),
    toUpdateDto: (entity: Partial<Order>): UpdateOrderDto => ({
        orderCategoryId: entity.orderCategory?.id,
        recipient: entity.recipient,
        fulfillmentDate: entity.fulfillmentDate,
        fulfillmentType: entity.fulfillmentType,
        fulfillmentContactName: entity.fulfillmentContactName,
        deliveryAddress: entity.deliveryAddress,
        phoneNumber: entity.phoneNumber,
        email: entity.email,
        note: entity.note,
        isFrozen: entity.isFrozen,
        isWeekly: entity.isWeekly,
        weeklyFulfillment: entity.weeklyFulfillment,
    }),
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
    setFulfillmentDate: (fulfillmentDate: string) => {
        setEditInstance({ ...editInstance, fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setEditInstance({ ...editInstance, fulfillmentType });
    },
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setEditInstance({ ...editInstance, fulfillmentContactName });
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
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setCreateInstance({ ...createInstance, fulfillmentContactName });
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
