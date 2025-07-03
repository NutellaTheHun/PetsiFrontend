import type { ReactNode } from "react";

export type RenderState = "normal" | "selected" | "edited";

// Generic type for any entity's property renderer record
export type PropertyRendererRecord<T> = Record<keyof T, PropertyRenderer<T>>;

// Generic type for any property renderer function
export type PropertyRenderer<T> = (
    value: any,
    entity: T,
    state: RenderState,
    context: any
) => ReactNode;

// Generic type for any entity's render context
export type EntityRenderContext<T> = Record<string, any>;

// Generic props for any entity render component
export type GenericEntityRenderProps<T> = {
    entityProp: keyof T;
    instance: T;
    state: RenderState;
    context: EntityRenderContext<T>;
    propertyRenderer: PropertyRendererRecord<T>;
};

export function determineState(
    targetId: number | null,
    editingId: number | null,
    itemId: number
) {
    if (targetId === itemId && editingId === itemId) {
        return "edited";
    }
    if (targetId === itemId) {
        return "selected";
    }
    return "normal";
}

// Generic entity render component
export function GenericEntityRenderer<T>({
    entityProp,
    instance,
    state,
    context,
    propertyRenderer,
}: GenericEntityRenderProps<T>) {
    const renderer = propertyRenderer[entityProp];
    if (!renderer) {
        return <span>Unknown property: {String(entityProp)}</span>;
    }

    return renderer(instance[entityProp], instance, state, context);
}
