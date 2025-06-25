import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type MenuItemSize = components["schemas"]["MenuItemSize"];

export type MenuItemSizeRenderContext = {
    setName: (name: string) => void;
};

export type MenuItemSizePropertyRenderer = (
    value: any,
    entity: MenuItemSize,
    state: RenderState,
    context: MenuItemSizeRenderContext
) => ReactNode;

export const menuItemSizePropertyRenderer: Record<
    keyof MenuItemSize,
    MenuItemSizePropertyRenderer
> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    name: (value, entity, state, context) =>
        renderedName(value, entity, state, context),
};

export type MenuItemSizeRenderProps = {
    entityProp: keyof MenuItemSize;
    instance: MenuItemSize;
    state: RenderState;
    context: MenuItemSizeRenderContext;
};

export function MenuItemSizeRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: MenuItemSizeRenderProps) {
    const value = entityInstance[entityProp];
    const renderer = menuItemSizePropertyRenderer[entityProp];
    if (!renderer) return null;
    return renderer(value, entityInstance, state, context);
}

const renderedId = (
    value: number,
    entity: MenuItemSize,
    state: RenderState,
    context: MenuItemSizeRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedName = (
    value: string,
    entity: MenuItemSize,
    state: RenderState,
    context: MenuItemSizeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setName(e);
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};
