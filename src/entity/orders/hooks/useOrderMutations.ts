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
    setEditInstance: (instance: Partial<Order> | null) => void,
    editDto: Partial<UpdateOrderDto> | null,
    editInstance: Partial<Order> | null
): OrderEditContext => ({
    setOrderCategory: (orderCategory: OrderCategory) => {
        setEditInstance({ ...editInstance, orderCategory });
        setEditDto({ ...editDto, orderCategoryId: orderCategory.id });
    },
    setRecipient: (recipient: string) => {
        setEditInstance({ ...editInstance, recipient });
        setEditDto({ ...editDto, recipient });
    },
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setEditInstance({ ...editInstance, fulfillmentContactName });
        setEditDto({ ...editDto, fulfillmentContactName });
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setEditInstance({ ...editInstance, fulfillmentDate });
        setEditDto({ ...editDto, fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setEditInstance({ ...editInstance, fulfillmentType });
        setEditDto({ ...editDto, fulfillmentType });
    },
    setDeliveryAddress: (deliveryAddress: string) => {
        setEditInstance({ ...editInstance, deliveryAddress });
        setEditDto({ ...editDto, deliveryAddress });
    },
    setPhoneNumber: (phoneNumber: string) => {
        setEditInstance({ ...editInstance, phoneNumber });
        setEditDto({ ...editDto, phoneNumber });
    },
    setEmail: (email: string) => {
        setEditInstance({ ...editInstance, email });
        setEditDto({ ...editDto, email });
    },
    setNote: (note: string) => {
        setEditInstance({ ...editInstance, note });
        setEditDto({ ...editDto, note });
    },
    setIsFrozen: (isFrozen: boolean) => {
        setEditInstance({ ...editInstance, isFrozen });
        setEditDto({ ...editDto, isFrozen });
    },
    setIsWeekly: (isWeekly: boolean) => {
        setEditInstance({ ...editInstance, isWeekly });
        setEditDto({ ...editDto, isWeekly });
    },
    setWeeklyFulfillment: (weeklyFulfillment: string) => {
        setEditInstance({ ...editInstance, weeklyFulfillment });
        setEditDto({ ...editDto, weeklyFulfillment });
    },
    setOrderedMenuItems: (orderedItems: OrderMenuItem[]) => {
        setEditInstance({ ...editInstance, orderedItems });
        setEditDto({ ...editDto /*orderedMenuItems*/ }); // TODO: fix this, to dto function?
    },
});

const createOrderCreateContext = (
    setCreateDto: (dto: Partial<CreateOrderDto> | null) => void,
    setCreateInstance: (instance: Partial<Order> | null) => void,
    createDto: Partial<CreateOrderDto> | null,
    createInstance: Partial<Order> | null
): OrderCreateContext => ({
    setOrderCategory: (orderCategory: OrderCategory) => {
        setCreateInstance({ ...createInstance, orderCategory });
        setCreateDto({ ...createDto, orderCategoryId: orderCategory.id });
    },
    setRecipient: (recipient: string) => {
        setCreateInstance({ ...createInstance, recipient });
        setCreateDto({ ...createDto, recipient });
    },
    setFulfillmentContactName: (fulfillmentContactName: string) => {
        setCreateInstance({ ...createInstance, fulfillmentContactName });
        setCreateDto({ ...createDto, fulfillmentContactName });
    },
    setFulfillmentDate: (fulfillmentDate: string) => {
        setCreateInstance({ ...createInstance, fulfillmentDate });
        setCreateDto({ ...createDto, fulfillmentDate });
    },
    setFulfillmentType: (fulfillmentType: string) => {
        setCreateInstance({ ...createInstance, fulfillmentType });
        setCreateDto({ ...createDto, fulfillmentType });
    },
    setDeliveryAddress: (deliveryAddress: string) => {
        setCreateInstance({ ...createInstance, deliveryAddress });
        setCreateDto({ ...createDto, deliveryAddress });
    },
    setPhoneNumber: (phoneNumber: string) => {
        setCreateInstance({ ...createInstance, phoneNumber });
        setCreateDto({ ...createDto, phoneNumber });
    },
    setEmail: (email: string) => {
        setCreateInstance({ ...createInstance, email });
        setCreateDto({ ...createDto, email });
    },
    setNote: (note: string) => {
        setCreateInstance({ ...createInstance, note });
        setCreateDto({ ...createDto, note });
    },
    setIsFrozen: (isFrozen: boolean) => {
        setCreateInstance({ ...createInstance, isFrozen });
        setCreateDto({ ...createDto, isFrozen });
    },
    setIsWeekly: (isWeekly: boolean) => {
        setCreateInstance({ ...createInstance, isWeekly });
        setCreateDto({ ...createDto, isWeekly });
    },
    setWeeklyFulfillment: (weeklyFulfillment: string) => {
        setCreateInstance({ ...createInstance, weeklyFulfillment });
        setCreateDto({ ...createDto, weeklyFulfillment });
    },
    setOrderedMenuItems: (orderedItems: OrderMenuItem[]) => {
        setCreateInstance({ ...createInstance, orderedItems });
        setCreateDto({ ...createDto /*orderedMenuItems*/ }); // TODO: fix this, to dto function?
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
