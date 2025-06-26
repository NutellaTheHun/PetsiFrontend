import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { LabelTypeDropdown } from "../../../features/admin/components/label/LabelTypeDropdown";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

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

export const labelPropertyRenderer: PropertyRendererRecord<Label> = {
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
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={labelPropertyRenderer}
        />
    );
}

const renderedId = (
    value: number,
    _entity: Label,
    _state: RenderState,
    _context: LabelRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedMenuItem = (
    value: Label["menuItem"],
    _entity: Label,
    state: RenderState,
    context: LabelRenderContext
) => {
    if (state === "edited") {
        // TODO: Add a searchbardropdown for the menu item
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
    _entity: Label,
    _state: RenderState,
    _context: LabelRenderContext
) => {
    // TODO: shouldnt exist in the UI
    return <GenericValue value={value} />;
};

const renderedLabelType = (
    value: Label["labelType"],
    _entity: Label,
    state: RenderState,
    context: LabelRenderContext
) => {
    if (state === "edited") {
        return (
            <LabelTypeDropdown
                selectedLabelTypeId={value?.id ?? null}
                onUpdateLabelTypeId={context.setLabelType}
            />
        );
    }
    return <GenericValue value={value?.labelTypeName ?? "No Label Type"} />;
};
