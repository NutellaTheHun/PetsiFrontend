import type { ReactNode } from "react";
import type { GenericStatefulEntity } from "../GenericStatefulEntity";

export type RenderState = "read" | "select" | "edit" | "create";

/**
 * A Mapping of an entity's properties to their renderer functions.
 */
export type PropertyRendererRecord<T> = Record<keyof T, PropertyRenderer<T>>;

/**
 * Definition of the property render function.
 * @param value - The value of the property to render.
 * @param entity - The entity instance being rendered.
 * @param context - Can contain functions and data for the entity instance, setter functions will be here.
 * @param dataContext - Any extra data the entity instance being rendered depends on.
 * @returns A ReactNode that will be rendered in the UI.
 */
export type PropertyRenderer<T> = (
    value: any,
    entity: GenericStatefulEntity<T>,
    context: any,
    dataContext?: EntityDataContext<T>
) => ReactNode;

/**
 * Context of the entity instance being rendered.
 * Setter functions are provided here for the entity instance.
 */
export type EntityRenderContext<T> = Record<string, any>;

/**
 * Data context for the entity instance being rendered.
 * This is used to pass data to the property renderer.
 * For example, when a property is rendered in edit state,
 * it could require a list of other entities to populate a dropdown selection.
 */
export interface EntityDataContext<T> {}

/**
 * Generic props for any entity render component.
 * Every entity implementation calls this function.
 * @param entityProp - The property to render.
 * @param statefulInstance - The entity instance being rendered paired with its current state.
 * @param context - The context of functions and data surrounding the current instance, such as its property setters.
 * @param propertyRenderer - The mapping of properties to render functions for the particular entity implementation.
 * @param dataContext - Any extra data the entity instance being rendered depends on.
 */
export interface EntityPropertyRenderProps<T> {
    entityProp: keyof T;
    statefulInstance: GenericStatefulEntity<T>;
    context: EntityRenderContext<T>;
    propertyRenderer: PropertyRendererRecord<T>;
    dataContext?: EntityDataContext<T>;
}

/**
 * Generic component for rendering an entity's property.
 * Every entity implementation calls this function.
 */
export function EntityPropertyRenderer<T>({
    entityProp,
    statefulInstance,
    context,
    propertyRenderer,
    dataContext,
}: EntityPropertyRenderProps<T>) {
    const renderer = propertyRenderer[entityProp];
    if (!renderer) {
        return <span>Unknown property: {String(entityProp)}</span>;
    }

    return renderer(
        statefulInstance.entity[entityProp],
        statefulInstance,
        context,
        dataContext
    );
}
