import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type Order = components["schemas"]["Order"];

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
};

export type OrderPropertyRenderer = (
    value: any,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => ReactNode;

export const orderPropertyRenderer: PropertyRendererRecord<Order> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    orderCategory: (value, entity, state, context) =>
        renderedOrderCategory(value, entity, state, context),
    recipient: (value, entity, state, context) =>
        renderedRecipient(value, entity, state, context),
    createdAt: (value, entity, state, context) =>
        renderedCreatedAt(value, entity, state, context),
    updatedAt: (value, entity, state, context) =>
        renderedUpdatedAt(value, entity, state, context),
    fulfillmentDate: (value, entity, state, context) =>
        renderedFulfillmentDate(value, entity, state, context),
    fulfillmentType: (value, entity, state, context) =>
        renderedFulfillmentType(value, entity, state, context),
    fulfillmentContactName: (value, entity, state, context) =>
        renderedFulfillmentContactName(value, entity, state, context),
    deliveryAddress: (value, entity, state, context) =>
        renderedDeliveryAddress(value, entity, state, context),
    phoneNumber: (value, entity, state, context) =>
        renderedPhoneNumber(value, entity, state, context),
    email: (value, entity, state, context) =>
        renderedEmail(value, entity, state, context),
    note: (value, entity, state, context) =>
        renderedNote(value, entity, state, context),
    isFrozen: (value, entity, state, context) =>
        renderedIsFrozen(value, entity, state, context),
    isWeekly: (value, entity, state, context) =>
        renderedIsWeekly(value, entity, state, context),
    weeklyFulfillment: (value, entity, state, context) =>
        renderedWeeklyFulfillment(value, entity, state, context),
    orderedItems: (value, entity, state, context) =>
        renderedOrderedItems(value, entity, state, context),
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

const renderedId = (
    value: number,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedOrderCategory = (
    value: Order["orderCategory"],
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setOrderCategory(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Category</option>
                {/* TODO: Populate with actual order categories */}
            </select>
        );
    }
    return <GenericValue value={value?.categoryName ?? "No Category"} />;
};

const renderedRecipient = (
    value: string,
    entity: Order,
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
    return <GenericValue value={value} />;
};

const renderedCreatedAt = (
    value: string,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    return <GenericValue value={new Date(value).toLocaleDateString()} />;
};

const renderedUpdatedAt = (
    value: string,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    return <GenericValue value={new Date(value).toLocaleDateString()} />;
};

const renderedFulfillmentDate = (
    value: string,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="datetime-local"
                value={value}
                onChange={(e) => context.setFulfillmentDate(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={new Date(value).toLocaleDateString()} />;
};

const renderedFulfillmentType = (
    value: string,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
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
    return <GenericValue value={value} />;
};

const renderedFulfillmentContactName = (
    value: string,
    entity: Order,
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
    return <GenericValue value={value || "N/A"} />;
};

const renderedDeliveryAddress = (
    value: string,
    entity: Order,
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
    return <GenericValue value={value || "N/A"} />;
};

const renderedPhoneNumber = (
    value: string,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="tel"
                value={value || ""}
                onChange={(e) => context.setPhoneNumber(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value || "N/A"} />;
};

const renderedEmail = (
    value: string,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="email"
                value={value || ""}
                onChange={(e) => context.setEmail(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value || "N/A"} />;
};

const renderedNote = (
    value: string,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            <textarea
                value={value || ""}
                onChange={(e) => context.setNote(e.target.value)}
                className="border rounded px-2 py-1 w-full"
                rows={3}
            />
        );
    }
    return <GenericValue value={value || "No notes"} />;
};

const renderedIsFrozen = (
    value: boolean,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => context.setIsFrozen(e.target.checked)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value ? "Yes" : "No"} />;
};

const renderedIsWeekly = (
    value: boolean,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => context.setIsWeekly(e.target.checked)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value ? "Yes" : "No"} />;
};

const renderedWeeklyFulfillment = (
    value: string,
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    if (state === "edited") {
        return (
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
    return <GenericValue value={value || "N/A"} />;
};

const renderedOrderedItems = (
    value: Order["orderedItems"],
    entity: Order,
    state: RenderState,
    context: OrderRenderContext
) => {
    // Placeholder for entity reference
    return <div>Ordered Items ({value?.length || 0} items)</div>;
};
