import { Checkbox, Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import type { MenuItem, Template, TemplateMenuItem } from "../../entityTypes";

export type TemplateRenderContext = {
    setTemplateName: (name: string) => void;
    setIsPie: (isPie: boolean) => void;
    setTemplateItems: (templateItems: TemplateMenuItem[]) => void;
};

export interface TemplateDataContext extends EntityDataContext<Template> {
    menuItems?: MenuItem[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<Template>,
    _context: TemplateRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedTemplateName = (
    value: string,
    statefulInstance: GenericStatefulEntity<Template>,
    context: TemplateRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => context.setTemplateName(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedIsPie = (
    value: boolean,
    statefulInstance: GenericStatefulEntity<Template>,
    context: TemplateRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <Checkbox
                checked={value}
                onChange={(e) => context.setIsPie(e.target.checked)}
            />
        );
    }
    return <Checkbox checked={value} />;
};

// TODO: Implement this
const renderedTemplateItems = (
    value: TemplateMenuItem[],
    _statefulInstance: GenericStatefulEntity<Template>,
    _context: TemplateRenderContext,
    _dataContext?: TemplateDataContext
) => {
    return <Text>{`${value?.length ?? 0} items`}</Text>;
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
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={templatePropertyRenderer}
        />
    );
}
