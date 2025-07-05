import {
    GenericEntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
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
    _statefulInstance: GenericStatefulEntity<Template>,
    _context: TemplateRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedTemplateName = (
    value: string,
    statefulInstance: GenericStatefulEntity<Template>,
    context: TemplateRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    statefulInstance: GenericStatefulEntity<Template>,
    context: TemplateRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    _statefulInstance: GenericStatefulEntity<Template>,
    _context: TemplateRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length ?? 0} items`} />;
};

export const templatePropertyRenderer: PropertyRendererRecord<Template> = {
    id: renderedId,
    templateName: renderedTemplateName,
    isPie: renderedIsPie,
    templateItems: renderedTemplateItems,
};

export type TemplateRenderProps = {
    entityProp: keyof Template;
    statefulInstance: GenericStatefulEntity<Template>;
    context: TemplateRenderContext;
};

export function TemplateRender({
    entityProp,
    statefulInstance,
    context,
}: TemplateRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={templatePropertyRenderer}
        />
    );
}
