import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericCheckBoxInput } from "../../../lib/generics/propertyRenderers/GenericCheckBoxInput";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { Template, TemplateMenuItem } from "../../entityTypes";

export type TemplateRenderContext = {
    setTemplateName: (name: string) => void;
    setIsPie: (isPie: boolean) => void;
};

const renderedId = (
    value: number,
    _entity: Template,
    _state: RenderState,
    _context: TemplateRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedTemplateName = (
    value: string,
    _entity: Template,
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
    return <GenericValueDisplay value={value} />;
};

const renderedIsPie = (
    value: boolean,
    _entity: Template,
    state: RenderState,
    context: TemplateRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericCheckBoxInput
                value={value}
                onChange={(value) => context.setIsPie(value as boolean)}
            />
        );
    }
    return <GenericValueDisplay value={value ? "Pie" : "Pastry"} />;
};

const renderedTemplateItems = (
    value: TemplateMenuItem[],
    _entity: Template,
    _state: RenderState,
    _context: TemplateRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} items`} />;
};

export const templatePropertyRenderer: PropertyRendererRecord<Template> = {
    id: renderedId,
    templateName: renderedTemplateName,
    isPie: renderedIsPie,
    templateItems: renderedTemplateItems,
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
