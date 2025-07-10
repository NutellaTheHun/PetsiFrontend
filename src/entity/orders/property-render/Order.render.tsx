import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { GenericCheckBoxInput } from "../../../lib/generics/propertyRenderers/GenericCheckBoxInput";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericTextArea } from "../../../lib/generics/propertyRenderers/GenericTextArea";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    MenuItem,
    MenuItemSize,
    Order,
    OrderCategory,
    OrderMenuItem,
} from "../../entityTypes";
import { FulfillmentDropdown } from "../components/order/FulfillmentDropdown";
import { WeekdayFulfillmentDropdown } from "../components/order/WeekdayFulfillmentDropdown";
import { OrderCategoryDropdown } from "../components/orderCategory/OrderCategoryDropdown";

export type OrderRenderContext = {
    setRecipient: (recipient: string) => void;
    setOrderCategory: (category: OrderCategory) => void;
    setFulfillmentType: (type: string) => void;
    setFulfillmentContactName: (name: string | null) => void;
    setDeliveryAddress: (address: string | null) => void;
    setPhoneNumber: (phone: string | null) => void;
    setEmail: (email: string | null) => void;
    setNote: (note: string | null) => void;
    setIsFrozen: (frozen: boolean) => void;
    setIsWeekly: (weekly: boolean) => void;
    setWeeklyFulfillment: (day: string | null) => void;
    setFulfillmentDate: (date: string) => void;
    setOrderedMenuItems: (items: OrderMenuItem[]) => void;
};

export interface OrderDataContext extends EntityDataContext<Order> {
    orderCategories?: OrderCategory[];
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<Order>,
    _context: OrderRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedOrderCategory = (
    value: OrderCategory,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext,
    dataContext?: OrderDataContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <OrderCategoryDropdown
                selectedCategory={value ?? null}
                onUpdateCategory={context.setOrderCategory}
                orderCategories={dataContext?.orderCategories ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.categoryName ?? "No Category"} />;
};

const renderedRecipient = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(value) => context.setRecipient(value)}
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedCreatedAt = (
    value: string,
    _statefulInstance: GenericStatefulEntity<Order>,
    _context: OrderRenderContext
) => {
    return <GenericValueDisplay type="date" value={value} />;
};

const renderedUpdatedAt = (
    value: string,
    _statefulInstance: GenericStatefulEntity<Order>,
    _context: OrderRenderContext
) => {
    return <GenericValueDisplay type="date" value={value} />;
};

const renderedFulfillmentDate = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericInput
                type="date"
                value={value}
                onChange={(e) => context.setFulfillmentDate(e)}
            />
        );
    }
    return <GenericValueDisplay value={new Date(value).toLocaleDateString()} />;
};

const renderedFulfillmentType = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <FulfillmentDropdown
                selectedType={value}
                onUpdateType={context.setFulfillmentType}
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedFulfillmentContactName = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericInput
                value={value || ""}
                type="text"
                onChange={(value) => context.setFulfillmentContactName(value)}
            />
        );
    }
    return <GenericValueDisplay value={value || "N/A"} />;
};

const renderedDeliveryAddress = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericInput
                value={value || ""}
                type="text"
                onChange={(value) => context.setDeliveryAddress(value)}
            />
        );
    }
    return <GenericValueDisplay value={value || "N/A"} />;
};

const renderedPhoneNumber = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericInput
                type="tel"
                value={value || ""}
                onChange={(e) => context.setPhoneNumber(e)}
            />
        );
    }
    return <GenericValueDisplay value={value || "N/A"} />;
};

const renderedEmail = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericInput
                type="email"
                value={value || ""}
                onChange={(e) => context.setEmail(e)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value || "N/A"} />;
};

const renderedNote = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericTextArea
                value={value || ""}
                onChange={(e) => context.setNote(e)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value || "No notes"} />;
};

const renderedIsFrozen = (
    value: boolean,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericCheckBoxInput
                value={value}
                onChange={(e) => context.setIsFrozen(e)}
            />
        );
    }
    return <GenericValueDisplay value={value ? "Yes" : "No"} />;
};

const renderedIsWeekly = (
    value: boolean,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericCheckBoxInput
                value={value}
                onChange={(e) => context.setIsWeekly(e)}
            />
        );
    }
    return <GenericValueDisplay value={value ? "Yes" : "No"} />;
};

const renderedWeeklyFulfillment = (
    value: string,
    statefulInstance: GenericStatefulEntity<Order>,
    context: OrderRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <WeekdayFulfillmentDropdown
                selectedDay={value}
                onUpdateDay={context.setWeeklyFulfillment}
            />
        );
    }
    return <GenericValueDisplay value={value || "No day selected"} />;
};

// TODO: Implement this
const renderedOrderedItems = (
    value: OrderMenuItem[],
    _statefulInstance: GenericStatefulEntity<Order>,
    _context: OrderRenderContext,
    dataContext?: OrderDataContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} items`} />;
};

export const orderPropertyRenderer: PropertyRendererRecord<Order> = {
    id: renderedId,
    orderCategory: renderedOrderCategory,
    recipient: renderedRecipient,
    createdAt: renderedCreatedAt,
    updatedAt: renderedUpdatedAt,
    fulfillmentDate: renderedFulfillmentDate,
    fulfillmentType: renderedFulfillmentType,
    fulfillmentContactName: renderedFulfillmentContactName,
    deliveryAddress: renderedDeliveryAddress,
    phoneNumber: renderedPhoneNumber,
    email: renderedEmail,
    note: renderedNote,
    isFrozen: renderedIsFrozen,
    isWeekly: renderedIsWeekly,
    weeklyFulfillment: renderedWeeklyFulfillment,
    orderedItems: renderedOrderedItems,
};

export type OrderRenderProps = {
    entityProp: keyof Order;
    statefulInstance: GenericStatefulEntity<Order>;
    context: OrderRenderContext;
    dataContext?: OrderDataContext;
};

export function OrderRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: OrderRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={orderPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
