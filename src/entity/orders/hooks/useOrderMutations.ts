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
    setEditValues: (values: Partial<UpdateOrderDto> | null) => void
): OrderEditContext => ({
    setOrderCategoryId: (orderCategoryId: number) => {
        setEditValues({ orderCategoryId });
    },
    setRecipient: (recipient: string) => {
        setEditValues({ recipient });
    },
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setEditValues({ fulfillmentContactName });
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setEditValues({ fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setEditValues({ fulfillmentType });
    },
    setDeliveryAddress: (deliveryAddress: string) => {
        setEditValues({ deliveryAddress });
    },
    setPhoneNumber: (phoneNumber: string) => {
        setEditValues({ phoneNumber });
    },
    setEmail: (email: string) => {
        setEditValues({ email });
    },
    setNote: (note: string) => {
        setEditValues({ note });
    },
    setIsFrozen: (isFrozen: boolean) => {
        setEditValues({ isFrozen });
    },
    setIsWeekly: (isWeekly: boolean) => {
        setEditValues({ isWeekly });
    },
    setWeeklyFulfillment: (weeklyFulfillment: string) => {
        setEditValues({ weeklyFulfillment });
    },
    setOrderedMenuItemDtos: (orderedMenuItemDtos: any[]) => {
        setEditValues({ orderedMenuItemDtos });
    },
});

const createOrderCreateContext = (
    setCreateValues: (values: Partial<CreateOrderDto> | null) => void
): OrderCreateContext => ({
    setOrderCategoryId: (orderCategoryId: number) => {
        setCreateValues({ orderCategoryId });
    },
    setRecipient: (recipient: string) => {
        setCreateValues({ recipient });
    },
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setCreateValues({ fulfillmentContactName });
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setCreateValues({ fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setCreateValues({ fulfillmentType });
    },
    setDeliveryAddress: (deliveryAddress: string) => {
        setCreateValues({ deliveryAddress });
    },
    setPhoneNumber: (phoneNumber: string) => {
        setCreateValues({ phoneNumber });
    },
    setEmail: (email: string) => {
        setCreateValues({ email });
    },
    setNote: (note: string) => {
        setCreateValues({ note });
    },
    setIsFrozen: (isFrozen: boolean) => {
        setCreateValues({ isFrozen });
    },
    setIsWeekly: (isWeekly: boolean) => {
        setCreateValues({ isWeekly });
    },
    setWeeklyFulfillment: (weeklyFulfillment: string) => {
        setCreateValues({ weeklyFulfillment });
    },
    setOrderedMenuItemDtos: (orderedMenuItemDtos: any[]) => {
        setCreateValues({ orderedMenuItemDtos });
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
