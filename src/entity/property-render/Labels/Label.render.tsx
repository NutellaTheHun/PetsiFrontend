import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type Label = components["schemas"]["Label"];

export type LabelRenderContext = {
    setMenuItem: (id: number | null) => void;
    setImageUrl: (url: string) => void;
    setLabelType: (id: number | null) => void;
};

export type LabelPropertyRenderer = (
    value: any,
    entity: Label,
    state: RenderState,
    context: LabelRenderContext
) => ReactNode;

export const labelPropertyRenderer: Record<keyof Label, LabelPropertyRenderer> =
    {
        id: (value, entity, state, context) =>
            renderedId(value, entity, state, context),
        menuItem: (value, entity, state, context) =>
            renderedMenuItem(value, entity, state, context),
        imageUrl: (value, entity, state, context) =>
            renderedImageUrl(value, entity, state, context),
        labelType: (value, entity, state, context) =>
            renderedLabelType(value, entity, state, context),
    };

export type LabelRenderProps = {
    entityProp: keyof Label;
    instance: Label;
    state: RenderState;
    context: LabelRenderContext;
};

export function LabelRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: LabelRenderProps) {
    const value = entityInstance[entityProp];
    const renderer = labelPropertyRenderer[entityProp];
    if (!renderer) return null;
    return renderer(value, entityInstance, state, context);
}

const renderedId = (
    value: number,
    entity: Label,
    state: RenderState,
    context: LabelRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedMenuItem = (
    value: Label["menuItem"],
    entity: Label,
    state: RenderState,
    context: LabelRenderContext
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
    return <GenericValue value={value?.itemName ?? "No Menu Item"} />;
};

const renderedImageUrl = (
    value: string,
    entity: Label,
    state: RenderState,
    context: LabelRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setImageUrl(e);
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedLabelType = (
    value: Label["labelType"],
    entity: Label,
    state: RenderState,
    context: LabelRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setLabelType(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Label Type</option>
                {/* TODO: Populate with actual label types */}
            </select>
        );
    }
    return <GenericValue value={value?.labelTypeName ?? "No Label Type"} />;
};
