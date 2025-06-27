import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericCheckBoxInput } from "../../../lib/generics/propertyRenderers/GenericCheckBoxInput";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { Order, OrderCategory, OrderMenuItem } from "../../entityTypes";
import { OrderCategoryDropdown } from "../components/orderCategory/OrderCategoryDropdown";

export type OrderRenderContext = {
    setRecipient: (recipient: string) => void;
    setOrderCategory: (id: number | null) => void;
    setFulfillmentType: (type: string) => void;
    setFulfillmentContactName: (name: string) => void;
    setDeliveryAddress: (address: string) => void;
    setPhoneNumber: (phone: string) => void;
    setEmail: (email: string) => void;
    setNote: (note: string) => void;
    setIsFrozen: (frozen: boolean) => void;
    setIsWeekly: (weekly: boolean) => void;
    setWeeklyFulfillment: (day: string) => void;
    setFulfillmentDate: (date: string) => void;
    orderCategories?: OrderCategory[];
};

const renderedId = (
    value: number,
    _entity: Order,
    _state: RenderState,
    _context: OrderRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedOrderCategory = (
    value: OrderCategory,
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            <OrderCategoryDropdown
                selectedCategoryId={value?.id ?? null}
                onUpdateCategoryId={context.setOrderCategory}
                orderCategories={context.orderCategories ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.categoryName ?? "No Category"} />;
};

const renderedRecipient = (
    value: string,
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
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
    _entity: Order,
    _state: RenderState,
    _context: OrderRenderContext
) => {
    return <GenericValueDisplay type="date" value={value} />;
};

const renderedUpdatedAt = (
    value: string,
    _entity: Order,
    _state: RenderState,
    _context: OrderRenderContext
) => {
    return <GenericValueDisplay type="date" value={value} />;
};

const renderedFulfillmentDate = (
    value: string,
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            // make a generic date value/input?
            <input
                type="datetime-local"
                value={value}
                onChange={(e) => context.setFulfillmentDate(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={new Date(value).toLocaleDateString()} />;
};

// Pickup or Delivery
const renderedFulfillmentType = (
    value: string,
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            // Pickup/Delivery dropdown
            <select
                value={value}
                onChange={(e) => context.setFulfillmentType(e.target.value)}
                className="border rounded px-2 py-1"
            >
                <option value="">Select Type</option>
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
            </select>
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedFulfillmentContactName = (
    value: string,
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
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
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
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
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            // Generic for phone number?
            <input
                type="tel"
                value={value || ""}
                onChange={(e) => context.setPhoneNumber(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value || "N/A"} />;
};

const renderedEmail = (
    value: string,
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            // Generic for email?
            <input
                type="email"
                value={value || ""}
                onChange={(e) => context.setEmail(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value || "N/A"} />;
};

const renderedNote = (
    value: string,
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            // Generic for note/description?
            <textarea
                value={value || ""}
                onChange={(e) => context.setNote(e.target.value)}
                className="border rounded px-2 py-1 w-full"
                rows={3}
            />
        );
    }
    return <GenericValueDisplay value={value || "No notes"} />;
};

const renderedIsFrozen = (
    value: boolean,
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
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
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            // Weekday dropdown (same as weekly fulfillment)
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => context.setIsWeekly(e.target.checked)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value ? "Yes" : "No"} />;
};

const renderedWeeklyFulfillment = (
    value: string,
    _entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            // Weekday dropdown (same as isWeekly)
            <select
                value={value || ""}
                onChange={(e) => context.setWeeklyFulfillment(e.target.value)}
                className="border rounded px-2 py-1"
            >
                <option value="">Select Day</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
            </select>
        );
    }
    return <GenericValueDisplay value={value || "N/A"} />;
};

const renderedOrderedItems = (
    value: OrderMenuItem[],
    _entity: Order,
    _state: RenderState,
    _context: OrderRenderContext
) => {
    // TODO Implement
    return <div>Ordered Items ({value?.length || 0} items)</div>;
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
    instance: Order;
    state: RenderState;
    context: OrderRenderContext;
};

export function OrderRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: OrderRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={orderPropertyRenderer}
        />
    );
}
