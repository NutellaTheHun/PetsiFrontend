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

// Helper type to create a generic render component for any entity
/*export type CreateEntityRenderer<T> = (
    props: Omit<GenericEntityRenderProps<T>, "propertyRenderer"> & {
        propertyRenderer: PropertyRendererRecord<T>;
    }
) => ReactNode;*/

// Factory function to create entity-specific render components
/*export function createEntityRenderer<T>(
    propertyRenderer: PropertyRendererRecord<T>
): CreateEntityRenderer<T> {
    return ({ entityProp, instance, state, context }) => (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={instance}
            state={state}
            context={context}
            propertyRenderer={propertyRenderer}
        />
    );
}*/
