import { Text } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
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
    return <Text>{value}</Text>;
};

const renderedMenuItem = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<Label>,
    context: LabelRenderContext,
    dataContext?: LabelDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MenuItemSearchBarDropdown
                value={value}
                onChange={context.setMenuItem}
                placeholder="Search menu items..."
                menuItems={dataContext?.menuItems ?? []}
            />
        );
    }
    return <Text>{value?.itemName ?? "No Menu Item"}</Text>;
};

const renderedImageUrl = (
    _value: string,
    _statefulInstance: GenericStatefulEntity<Label>,
    _context: LabelRenderContext
) => {
    return <Text>{"Nothing to display here"}</Text>;
};

const renderedLabelType = (
    value: LabelType,
    statefulInstance: GenericStatefulEntity<Label>,
    context: LabelRenderContext,
    dataContext?: LabelDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
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
    return <Text>{value?.labelTypeName ?? "No Label Type"}</Text>;
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
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={labelPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
