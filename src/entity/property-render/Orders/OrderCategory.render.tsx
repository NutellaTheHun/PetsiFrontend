import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type OrderCategory = components["schemas"]["OrderCategory"];

export type OrderCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

export type OrderCategoryPropertyRenderer = (
    value: any,
    entity: OrderCategory,
    state: RenderState,
    context: OrderCategoryRenderContext
) => ReactNode;

export const orderCategoryPropertyRenderer: Record<
    keyof OrderCategory,
    OrderCategoryPropertyRenderer
> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    categoryName: (value, entity, state, context) =>
        renderedCategoryName(value, entity, state, context),
    orders: (value, entity, state, context) =>
        renderedOrders(value, entity, state, context),
};

export type OrderCategoryRenderProps = {
    entityProp: keyof OrderCategory;
    instance: OrderCategory;
    state: RenderState;
    context: OrderCategoryRenderContext;
};

export function OrderCategoryRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: OrderCategoryRenderProps) {
    const value = entityInstance[entityProp];
    const renderer = orderCategoryPropertyRenderer[entityProp];
    if (!renderer) return null;
    return renderer(value, entityInstance, state, context);
}

const renderedId = (
    value: number,
    entity: OrderCategory,
    state: RenderState,
    context: OrderCategoryRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedCategoryName = (
    value: string,
    entity: OrderCategory,
    state: RenderState,
    context: OrderCategoryRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setCategoryName(e);
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedOrders = (
    value: OrderCategory["orders"],
    entity: OrderCategory,
    state: RenderState,
    context: OrderCategoryRenderContext
) => {
    return <div>Orders ({value?.length || 0})</div>;
};
