import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type MenuItemContainerOptions =
    components["schemas"]["MenuItemContainerOptions"];

export type MenuItemContainerOptionsRenderContext = {
    setValidQuantity: (quantity: number) => void;
    setParentContainer: (id: number | null) => void;
};

export type MenuItemContainerOptionsPropertyRenderer = (
    value: any,
    entity: MenuItemContainerOptions,
    state: RenderState,
    context: MenuItemContainerOptionsRenderContext
) => ReactNode;

export const menuItemContainerOptionsPropertyRenderer: Record<
    keyof MenuItemContainerOptions,
    MenuItemContainerOptionsPropertyRenderer
> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    parentContainer: (value, entity, state, context) =>
        renderedParentContainer(value, entity, state, context),
    containerRules: (value, entity, state, context) =>
        renderedContainerRules(value, entity, state, context),
    validQuantity: (value, entity, state, context) =>
        renderedValidQuantity(value, entity, state, context),
};

export type MenuItemContainerOptionsRenderProps = {
    entityProp: keyof MenuItemContainerOptions;
    instance: MenuItemContainerOptions;
    state: RenderState;
    context: MenuItemContainerOptionsRenderContext;
};

export function MenuItemContainerOptionsRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: MenuItemContainerOptionsRenderProps) {
    const value = entityInstance[entityProp];
    const renderer = menuItemContainerOptionsPropertyRenderer[entityProp];
    if (!renderer) return null;
    return renderer(value, entityInstance, state, context);
}

const renderedId = (
    value: number,
    entity: MenuItemContainerOptions,
    state: RenderState,
    context: MenuItemContainerOptionsRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedParentContainer = (
    value: MenuItemContainerOptions["parentContainer"],
    entity: MenuItemContainerOptions,
    state: RenderState,
    context: MenuItemContainerOptionsRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setParentContainer(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Parent Container</option>
                {/* TODO: Populate with actual menu items */}
            </select>
        );
    }
    return <GenericValue value={value?.itemName || "No parent container"} />;
};

const renderedContainerRules = (
    value: MenuItemContainerOptions["containerRules"],
    entity: MenuItemContainerOptions,
    state: RenderState,
    context: MenuItemContainerOptionsRenderContext
) => {
    return <div>Container Rules ({value?.length || 0})</div>;
};

const renderedValidQuantity = (
    value: number,
    entity: MenuItemContainerOptions,
    state: RenderState,
    context: MenuItemContainerOptionsRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="number"
                onChange={(e) => {
                    context.setValidQuantity(Number(e));
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};
