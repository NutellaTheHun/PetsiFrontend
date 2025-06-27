import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { MenuItem, Template, TemplateMenuItem } from "../../entityTypes";
import { MenuItemSearchBarDropdown } from "../../menuItems/components/menuItem/MenuItemSearchBarDropdown";

export type TemplateMenuItemRenderContext = {
    setDisplayName: (name: string) => void;
    setMenuItem: (id: number | null) => void;
    setTablePosIndex: (index: number) => void;
    setParentTemplate: (id: number | null) => void;
    menuItems?: MenuItem[];
};

const renderedId = (
    value: number,
    _entity: TemplateMenuItem,
    _state: RenderState,
    _context: TemplateMenuItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
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
    return <GenericValueDisplay value={value} />;
};

const renderedMenuItem = (
    value: MenuItem,
    _entity: TemplateMenuItem,
    state: RenderState,
    context: TemplateMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemSearchBarDropdown
                value={value?.id ?? null}
                onChange={(e) => context.setMenuItem(Number(e))}
                menuItems={context.menuItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName || "No menu item"} />;
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
    return <GenericValueDisplay value={value} />;
};

const renderedParentTemplate = (
    _value: Template,
    _entity: TemplateMenuItem,
    _state: RenderState,
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
