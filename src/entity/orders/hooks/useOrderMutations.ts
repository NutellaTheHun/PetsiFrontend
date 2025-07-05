import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
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
    setEditDto: (dto: Partial<UpdateOrderDto> | null) => void,
    setEditInstance: (instance: Order | null) => void,
    editDto: Partial<UpdateOrderDto> | null,
    editInstance: Order | null
): OrderEditContext => ({
    setOrderCategory: (orderCategory: OrderCategory) => {
        setEditDto({ ...editDto, orderCategoryId: orderCategory.id });
        setEditInstance(
            editInstance ? { ...editInstance, orderCategory } : null
        );
    },
    setRecipient: (recipient: string) => {
        setEditDto({ ...editDto, recipient });
        setEditInstance(editInstance ? { ...editInstance, recipient } : null);
    },
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setEditDto({ ...editDto, fulfillmentContactName });
        setEditInstance(
            editInstance ? { ...editInstance, fulfillmentContactName } : null
        );
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setEditDto({ ...editDto, fulfillmentDate });
        setEditInstance(
            editInstance ? { ...editInstance, fulfillmentDate } : null
        );
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setEditDto({ ...editDto, fulfillmentType });
        setEditInstance(
            editInstance ? { ...editInstance, fulfillmentType } : null
        );
    },
    setDeliveryAddress: (deliveryAddress: string) => {
        setEditDto({ ...editDto, deliveryAddress });
        setEditInstance(
            editInstance ? { ...editInstance, deliveryAddress } : null
        );
    },
    setPhoneNumber: (phoneNumber: string) => {
        setEditDto({ ...editDto, phoneNumber });
        setEditInstance(editInstance ? { ...editInstance, phoneNumber } : null);
    },
    setEmail: (email: string) => {
        setEditDto({ ...editDto, email });
        setEditInstance(editInstance ? { ...editInstance, email } : null);
    },
    setNote: (note: string) => {
        setEditDto({ ...editDto, note });
        setEditInstance(editInstance ? { ...editInstance, note } : null);
    },
    setIsFrozen: (isFrozen: boolean) => {
        setEditDto({ ...editDto, isFrozen });
        setEditInstance(editInstance ? { ...editInstance, isFrozen } : null);
    },
    setIsWeekly: (isWeekly: boolean) => {
        setEditDto({ ...editDto, isWeekly });
        setEditInstance(editInstance ? { ...editInstance, isWeekly } : null);
    },
    setWeeklyFulfillment: (weeklyFulfillment: string) => {
        setEditDto({ ...editDto, weeklyFulfillment });
        setEditInstance(
            editInstance ? { ...editInstance, weeklyFulfillment } : null
        );
    },
    setOrderedMenuItems: (orderedItems: OrderMenuItem[]) => {
        setEditDto({ ...editDto /*orderedMenuItems*/ }); // TODO: fix this, to dto function?
        setEditInstance(
            editInstance ? { ...editInstance, orderedItems } : null
        );
    },
});

const createOrderCreateContext = (
    setCreateDto: (dto: Partial<CreateOrderDto> | null) => void,
    setCreateInstance: (instance: Partial<Order> | null) => void,
    createDto: Partial<CreateOrderDto> | null,
    createInstance: Partial<Order> | null
): OrderCreateContext => ({
    setOrderCategory: (orderCategory: OrderCategory) => {
        setCreateDto({ ...createDto, orderCategoryId: orderCategory.id });
        setCreateInstance({ ...createInstance, orderCategory });
    },
    setRecipient: (recipient: string) => {
        setCreateDto({ ...createDto, recipient });
        setCreateInstance({ ...createInstance, recipient });
    },
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setCreateDto({ ...createDto, fulfillmentContactName });
        setCreateInstance({ ...createInstance, fulfillmentContactName });
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setCreateDto({ ...createDto, fulfillmentDate });
        setCreateInstance({ ...createInstance, fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setCreateDto({ ...createDto, fulfillmentType });
        setCreateInstance({ ...createInstance, fulfillmentType });
    },
    setDeliveryAddress: (deliveryAddress: string) => {
        setCreateDto({ ...createDto, deliveryAddress });
        setCreateInstance({ ...createInstance, deliveryAddress });
    },
    setPhoneNumber: (phoneNumber: string) => {
        setCreateDto({ ...createDto, phoneNumber });
        setCreateInstance({ ...createInstance, phoneNumber });
    },
    setEmail: (email: string) => {
        setCreateDto({ ...createDto, email });
        setCreateInstance({ ...createInstance, email });
    },
    setNote: (note: string) => {
        setCreateDto({ ...createDto, note });
        setCreateInstance({ ...createInstance, note });
    },
    setIsFrozen: (isFrozen: boolean) => {
        setCreateDto({ ...createDto, isFrozen });
        setCreateInstance({ ...createInstance, isFrozen });
    },
    setIsWeekly: (isWeekly: boolean) => {
        setCreateDto({ ...createDto, isWeekly });
        setCreateInstance({ ...createInstance, isWeekly });
    },
    setWeeklyFulfillment: (weeklyFulfillment: string) => {
        setCreateDto({ ...createDto, weeklyFulfillment });
        setCreateInstance({ ...createInstance, weeklyFulfillment });
    },
    setOrderedMenuItems: (orderedItems: OrderMenuItem[]) => {
        setCreateDto({ ...createDto /*orderedMenuItems*/ }); // TODO: fix this, to dto function?
        setCreateInstance({
            ...createInstance,
            orderedItems,
        });
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
