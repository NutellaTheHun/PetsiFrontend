import type { ReactNode } from "react";
import type { GenericStatefulEntity } from "./GenericStatefulEntity";

export type RenderState = "normal" | "selected" | "edited";

// Generic type for any entity's property renderer record
export type PropertyRendererRecord<T> = Record<keyof T, PropertyRenderer<T>>;

// Generic type for any property renderer function
export type PropertyRenderer<T> = (
    value: any,
    entity: GenericStatefulEntity<T>,
    context: any
) => ReactNode;

// Generic type for any entity's render context
export type EntityRenderContext<T> = Record<string, any>;

// Generic props for any entity render component
export type GenericEntityRenderProps<T> = {
    entityProp: keyof T;
    statefulInstance: GenericStatefulEntity<T>;
    context: EntityRenderContext<T>;
    propertyRenderer: PropertyRendererRecord<T>;
};

// Generic entity render component
export function GenericEntityRenderer<T>({
    entityProp,
    statefulInstance,
    context,
    propertyRenderer,
}: GenericEntityRenderProps<T>) {
    const renderer = propertyRenderer[entityProp];
    if (!renderer) {
        return <span>Unknown property: {String(entityProp)}</span>;
    }

    return renderer(
        statefulInstance.entity[entityProp],
        statefulInstance,
        context
    );
}
