import { NumberInput, Text, TextInput } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import { MantineAutoComplete } from "../../../lib/uiComponents/input/MantineAutoComplete";
import type { MenuItem, Template, TemplateMenuItem } from "../../entityTypes";

export type TemplateMenuItemRenderContext = {
    setDisplayName: (name: string) => void;
    setMenuItem: (menuItem: MenuItem) => void;
    setTablePosIndex: (index: number) => void;
    setParentTemplate?: (template: Template) => void; // Only for create context, not edit
};

export interface TemplateMenuItemDataContext
    extends EntityDataContext<TemplateMenuItem> {
    menuItems?: MenuItem[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<TemplateMenuItem>,
    _context: TemplateMenuItemRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedDisplayName = (
    value: string,
    statefulInstance: GenericStatefulEntity<TemplateMenuItem>,
    context: TemplateMenuItemRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => {
                    context.setDisplayName(e.target.value);
                }}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedMenuItem = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<TemplateMenuItem>,
    context: TemplateMenuItemRenderContext,
    dataContext?: TemplateMenuItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineAutoComplete<MenuItem>
                totalOptions={dataContext?.menuItems ?? []}
                selectedOption={value}
                onOptionChange={(option) => context.setMenuItem(option)}
                searchProperty={"itemName"}
            />
        );
    }
    return <Text>{value?.itemName ?? "No menu item"}</Text>;
};

const renderedTablePosIndex = (
    value: number,
    statefulInstance: GenericStatefulEntity<TemplateMenuItem>,
    context: TemplateMenuItemRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <NumberInput
                value={value}
                onChange={(e) => {
                    context.setTablePosIndex(Number(e));
                }}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedParentTemplate = (
    _value: Template,
    _statefulInstance: GenericStatefulEntity<TemplateMenuItem>,
    _context: TemplateMenuItemRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display"} />;
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
    statefulInstance: GenericStatefulEntity<TemplateMenuItem>;
    context: TemplateMenuItemRenderContext;
    dataContext?: TemplateMenuItemDataContext;
};

export function TemplateMenuItemRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: TemplateMenuItemRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={templateMenuItemPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
