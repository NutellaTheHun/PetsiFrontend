import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type Template = components["schemas"]["Template"];

export type TemplateRenderContext = {
    setTemplateName: (name: string) => void;
    setIsPie: (isPie: boolean) => void;
};

export type TemplatePropertyRenderer = (
    value: any,
    entity: Template,
    state: RenderState,
    context: TemplateRenderContext
) => ReactNode;

export const templatePropertyRenderer: PropertyRendererRecord<Template> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    templateName: (value, entity, state, context) =>
        renderedTemplateName(value, entity, state, context),
    isPie: (value, entity, state, context) =>
        renderedIsPie(value, entity, state, context),
    templateItems: (value, entity, state, context) =>
        renderedTemplateItems(value, entity, state, context),
};

export type TemplateRenderProps = {
    entityProp: keyof Template;
    instance: Template;
    state: RenderState;
    context: TemplateRenderContext;
};

export function TemplateRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: TemplateRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={templatePropertyRenderer}
        />
    );
}

const renderedId = (
    value: number,
    entity: Template,
    state: RenderState,
    context: TemplateRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedTemplateName = (
    value: string,
    entity: Template,
    state: RenderState,
    context: TemplateRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(value) => context.setTemplateName(value)}
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedIsPie = (
    value: boolean,
    entity: Template,
    state: RenderState,
    context: TemplateRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => context.setIsPie(e.target.checked)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value ? "Pie" : "Pastry"} />;
};

const renderedTemplateItems = (
    value: Template["templateItems"],
    entity: Template,
    state: RenderState,
    context: TemplateRenderContext
) => {
    // Placeholder for entity reference
    return <div>Template Items ({value?.length || 0} items)</div>;
};
