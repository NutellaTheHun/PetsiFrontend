import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type TemplateMenuItem = components["schemas"]["TemplateMenuItem"];

export type TemplateMenuItemRenderContext = {
    setDisplayName: (name: string) => void;
    setMenuItem: (id: number | null) => void;
    setTablePosIndex: (index: number) => void;
    setParentTemplate: (id: number | null) => void;
};

export type TemplateMenuItemPropertyRenderer = (
    value: any,
    entity: TemplateMenuItem,
    state: RenderState,
    context: TemplateMenuItemRenderContext
) => ReactNode;

export const templateMenuItemPropertyRenderer: Record<
    keyof TemplateMenuItem,
    TemplateMenuItemPropertyRenderer
> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    displayName: (value, entity, state, context) =>
        renderedDisplayName(value, entity, state, context),
    menuItem: (value, entity, state, context) =>
        renderedMenuItem(value, entity, state, context),
    tablePosIndex: (value, entity, state, context) =>
        renderedTablePosIndex(value, entity, state, context),
    parentTemplate: (value, entity, state, context) =>
        renderedParentTemplate(value, entity, state, context),
};

export type TemplateMenuItemRenderProps = {
    entityProp: keyof TemplateMenuItem;
    instance: TemplateMenuItem;
    state: RenderState;
    context: TemplateMenuItemRenderContext;
};

export function TemplateMenuItemRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: TemplateMenuItemRenderProps) {
    const value = entityInstance[entityProp];
    const renderer = templateMenuItemPropertyRenderer[entityProp];
    if (!renderer) return null;
    return renderer(value, entityInstance, state, context);
}

const renderedId = (
    value: number,
    entity: TemplateMenuItem,
    state: RenderState,
    context: TemplateMenuItemRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedDisplayName = (
    value: string,
    entity: TemplateMenuItem,
    state: RenderState,
    context: TemplateMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setDisplayName(e);
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedMenuItem = (
    value: TemplateMenuItem["menuItem"],
    entity: TemplateMenuItem,
    state: RenderState,
    context: TemplateMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setMenuItem(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Menu Item</option>
                {/* TODO: Populate with actual menu items */}
            </select>
        );
    }
    return <GenericValue value={value?.itemName || "No menu item"} />;
};

const renderedTablePosIndex = (
    value: number,
    entity: TemplateMenuItem,
    state: RenderState,
    context: TemplateMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="number"
                onChange={(e) => {
                    context.setTablePosIndex(Number(e));
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedParentTemplate = (
    value: TemplateMenuItem["parentTemplate"],
    entity: TemplateMenuItem,
    state: RenderState,
    context: TemplateMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setParentTemplate(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Parent Template</option>
                {/* TODO: Populate with actual templates */}
            </select>
        );
    }
    return <GenericValue value={value?.templateName || "No parent template"} />;
};
