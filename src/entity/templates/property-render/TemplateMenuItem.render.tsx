import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { MenuItem, Template, TemplateMenuItem } from "../../entityTypes";
import { MenuItemSearchBarDropdown } from "../../menuItems/components/menuItem/MenuItemSearchBarDropdown";

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
    return <GenericValueDisplay value={value} />;
};

const renderedDisplayName = (
    value: string,
    statefulInstance: GenericStatefulEntity<TemplateMenuItem>,
    context: TemplateMenuItemRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    return <GenericValueDisplay value={value} />;
};

const renderedMenuItem = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<TemplateMenuItem>,
    context: TemplateMenuItemRenderContext,
    dataContext?: TemplateMenuItemDataContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <MenuItemSearchBarDropdown
                value={value}
                onChange={(menuItem) => context.setMenuItem(menuItem)}
                menuItems={dataContext?.menuItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName ?? "No menu item"} />;
};

const renderedTablePosIndex = (
    value: number,
    statefulInstance: GenericStatefulEntity<TemplateMenuItem>,
    context: TemplateMenuItemRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    return <GenericValueDisplay value={value} />;
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
