import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type { CreateOrderDto, Order, UpdateOrderDto } from "../../entityTypes";

// Define separate context types for create and update
export type OrderEditContext = {
    setOrderCategoryId: (orderCategoryId: number) => void;
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
    setOrderedMenuItemDtos: (orderedMenuItemDtos: any[]) => void;
};

export type OrderCreateContext = {
    setOrderCategoryId: (orderCategoryId: number) => void;
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
    setOrderedMenuItemDtos: (orderedMenuItemDtos: any[]) => void;
};

// Context factory functions
const createOrderEditContext = (
    setEditValues: (values: Partial<UpdateOrderDto> | null) => void,
    setEditInstance: (instance: Order | null) => void,
    editValues: Partial<UpdateOrderDto> | null,
    editInstance: Order | null
): OrderEditContext => ({
    setOrderCategoryId: (orderCategoryId: number) => {
        setEditValues({ ...editValues, orderCategoryId });
    },
    setRecipient: (recipient: string) => {
        setEditValues({ ...editValues, recipient });
    },
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setEditValues({ ...editValues, fulfillmentContactName });
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setEditValues({ ...editValues, fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setEditValues({ ...editValues, fulfillmentType });
    },
    setDeliveryAddress: (deliveryAddress: string) => {
        setEditValues({ ...editValues, deliveryAddress });
    },
    setPhoneNumber: (phoneNumber: string) => {
        setEditValues({ ...editValues, phoneNumber });
    },
    setEmail: (email: string) => {
        setEditValues({ ...editValues, email });
    },
    setNote: (note: string) => {
        setEditValues({ ...editValues, note });
    },
    setIsFrozen: (isFrozen: boolean) => {
        setEditValues({ ...editValues, isFrozen });
    },
    setIsWeekly: (isWeekly: boolean) => {
        setEditValues({ ...editValues, isWeekly });
    },
    setWeeklyFulfillment: (weeklyFulfillment: string) => {
        setEditValues({ ...editValues, weeklyFulfillment });
    },
    setOrderedMenuItemDtos: (orderedMenuItemDtos: any[]) => {
        setEditValues({ ...editValues, orderedMenuItemDtos });
    },
});

const createOrderCreateContext = (
    setCreateValues: (values: Partial<CreateOrderDto> | null) => void,
    setCreateInstance: (instance: Partial<Order> | null) => void,
    createValues: Partial<CreateOrderDto> | null,
    createInstance: Partial<Order> | null
): OrderCreateContext => ({
    setOrderCategoryId: (orderCategoryId: number) => {
        setCreateValues({ ...createValues, orderCategoryId });
        // Note: The entity uses 'orderCategory' but DTO uses 'orderCategoryId'
        // We don't set this on the instance since it's a DTO field
    },
    setRecipient: (recipient: string) => {
        setCreateValues({ ...createValues, recipient });
        setCreateInstance({ ...createInstance, recipient });
    },
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setCreateValues({ ...createValues, fulfillmentContactName });
        setCreateInstance({ ...createInstance, fulfillmentContactName });
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setCreateValues({ ...createValues, fulfillmentDate });
        setCreateInstance({ ...createInstance, fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setCreateValues({ ...createValues, fulfillmentType });
        setCreateInstance({ ...createInstance, fulfillmentType });
    },
    setDeliveryAddress: (deliveryAddress: string) => {
        setCreateValues({ ...createValues, deliveryAddress });
        setCreateInstance({ ...createInstance, deliveryAddress });
    },
    setPhoneNumber: (phoneNumber: string) => {
        setCreateValues({ ...createValues, phoneNumber });
        setCreateInstance({ ...createInstance, phoneNumber });
    },
    setEmail: (email: string) => {
        setCreateValues({ ...createValues, email });
        setCreateInstance({ ...createInstance, email });
    },
    setNote: (note: string) => {
        setCreateValues({ ...createValues, note });
        setCreateInstance({ ...createInstance, note });
    },
    setIsFrozen: (isFrozen: boolean) => {
        setCreateValues({ ...createValues, isFrozen });
        setCreateInstance({ ...createInstance, isFrozen });
    },
    setIsWeekly: (isWeekly: boolean) => {
        setCreateValues({ ...createValues, isWeekly });
        setCreateInstance({ ...createInstance, isWeekly });
    },
    setWeeklyFulfillment: (weeklyFulfillment: string) => {
        setCreateValues({ ...createValues, weeklyFulfillment });
        setCreateInstance({ ...createInstance, weeklyFulfillment });
    },
    setOrderedMenuItemDtos: (orderedMenuItemDtos: any[]) => {
        setCreateValues({ ...createValues, orderedMenuItemDtos });
        // Note: The entity uses 'orderedMenuItems' but DTO uses 'orderedMenuItemDtos'
        // We don't set this on the instance since it's a DTO field
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
