import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import type { GenericStatefulEntity } from "../../../lib/generics/GenericStatefulEntity";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { Label, LabelType, MenuItem } from "../../entityTypes";
import { MenuItemSearchBarDropdown } from "../../menuItems/components/menuItem/MenuItemSearchBarDropdown";
import { LabelTypeDropdown } from "../components/labelType/LabelTypeDropdown";

export type LabelRenderContext = {
    setMenuItem: (menuItem: MenuItem) => void;
    setImageUrl: (url: string) => void;
    setLabelType: (labelType: LabelType) => void;
};

export interface LabelDataContext extends EntityDataContext<Label> {
    menuItems?: MenuItem[];
    labelTypes?: LabelType[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<Label>,
    _context: LabelRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedMenuItem = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<Label>,
    context: LabelRenderContext,
    dataContext?: LabelDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <MenuItemSearchBarDropdown
                value={value}
                onChange={context.setMenuItem}
                placeholder="Search menu items..."
                menuItems={dataContext?.menuItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName ?? "No Menu Item"} />;
};

const renderedImageUrl = (
    _value: string,
    _statefulInstance: GenericStatefulEntity<Label>,
    _context: LabelRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display here"} />;
};

const renderedLabelType = (
    value: LabelType,
    statefulInstance: GenericStatefulEntity<Label>,
    context: LabelRenderContext,
    dataContext?: LabelDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <LabelTypeDropdown
                selectedLabelType={value ?? null}
                onUpdateLabelType={(labelType) =>
                    context.setLabelType(labelType)
                }
                labelTypes={dataContext?.labelTypes ?? []}
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
    statefulInstance: GenericStatefulEntity<Label>;
    context: LabelRenderContext;
    dataContext?: LabelDataContext;
};

export function LabelRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: LabelRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={labelPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
