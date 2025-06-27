import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { Label, LabelType, MenuItem } from "../../entityTypes";
import { MenuItemSearchBarDropdown } from "../../menuItems/components/menuItem/MenuItemSearchBarDropdown";
import { LabelTypeDropdown } from "../components/labelType/LabelTypeDropdown";

export type LabelRenderContext = {
    setMenuItem: (id: number | null) => void;
    setImageUrl: (url: string) => void;
    setLabelType: (id: number | null) => void;
    menuItems?: MenuItem[];
    labelTypes?: LabelType[];
};

const renderedId = (
    value: number,
    _entity: Label,
    _state: RenderState,
    _context: LabelRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedMenuItem = (
    value: MenuItem,
    _entity: Label,
    state: RenderState,
    context: LabelRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemSearchBarDropdown
                value={value?.id || null}
                onChange={(menuItemId) =>
                    context.setMenuItem(menuItemId ? Number(menuItemId) : null)
                }
                placeholder="Search menu items..."
                menuItems={context.menuItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName ?? "No Menu Item"} />;
};

const renderedImageUrl = (
    _value: string,
    _entity: Label,
    _state: RenderState,
    _context: LabelRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display here"} />;
};

const renderedLabelType = (
    value: LabelType,
    _entity: Label,
    state: RenderState,
    context: LabelRenderContext
) => {
    if (state === "edited") {
        return (
            <LabelTypeDropdown
                selectedLabelTypeId={value?.id ?? null}
                onUpdateLabelTypeId={context.setLabelType}
                labelTypes={context.labelTypes ?? []}
            />
        );
    }
    return (
        <GenericValueDisplay value={value?.labelTypeName ?? "No Label Type"} />
    );
};

export const labelPropertyRenderer: PropertyRendererRecord<Label> = {
    id: renderedId,
    menuItem: renderedMenuItem,
    imageUrl: renderedImageUrl,
    labelType: renderedLabelType,
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
