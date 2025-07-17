import { NumberInput, Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import { SearchbarDropdownSelection } from "../../../lib/uiComponents/input/SearchbarDropdownSelection";
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
            <SearchbarDropdownSelection<MenuItem>
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
    return <Text>{"Nothing to display"}</Text>;
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
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={templateMenuItemPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
