import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../lib/generics/table/render-cell-content/GenericValue";

type TemplateMenuItem = components["schemas"]["TemplateMenuItem"];

export type TemplateMenuItemRenderContext = {
    setDisplayName: (name: string) => void;
    setMenuItem: (id: number | null) => void;
    setTablePosIndex: (index: number) => void;
    setParentTemplate: (id: number | null) => void;
};

const renderedId = (
    value: number,
    _entity: TemplateMenuItem,
    _state: RenderState,
    _context: TemplateMenuItemRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedDisplayName = (
    value: string,
    _entity: TemplateMenuItem,
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
    _entity: TemplateMenuItem,
    state: RenderState,
    context: TemplateMenuItemRenderContext
) => {
    // TODO implement, menu item search dropdown?
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
    _entity: TemplateMenuItem,
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
    _entity: TemplateMenuItem,
    state: RenderState,
    context: TemplateMenuItemRenderContext
) => {
    // TODO implement, may not need UI display?
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

export const templateMenuItemPropertyRenderer: PropertyRendererRecord<TemplateMenuItem> =
    {
        id: renderedId,
        displayName: renderedDisplayName,
        menuItem: renderedMenuItem,
        tablePosIndex: renderedTablePosIndex,
        parentTemplate: renderedParentTemplate,
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
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={templateMenuItemPropertyRenderer}
        />
    );
}
