import { Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import type { InventoryItem, InventoryItemCategory } from "../../entityTypes";

export type InventoryItemCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryItemCategory>,
    _context: InventoryItemCategoryRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedCategoryName = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryItemCategory>,
    context: InventoryItemCategoryRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => context.setCategoryName(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedCategoryItems = (
    value: InventoryItem[],
    _statefulInstance: GenericStatefulEntity<InventoryItemCategory>,
    _context: InventoryItemCategoryRenderContext
) => {
    // TODO Implement this
    return <Text>{`${value?.length || 0} items`}</Text>;
};

export const inventoryItemCategoryPropertyRenderer: PropertyRendererRecord<InventoryItemCategory> =
    {
        id: renderedId,
        categoryName: renderedCategoryName,
        categoryItems: renderedCategoryItems,
    };

export type InventoryItemCategoryRenderProps = {
    entityProp: keyof InventoryItemCategory;
    statefulInstance: GenericStatefulEntity<InventoryItemCategory>;
    context: InventoryItemCategoryRenderContext;
};

export function InventoryItemCategoryRender({
    entityProp,
    statefulInstance,
    context,
}: InventoryItemCategoryRenderProps) {
    return (
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryItemCategoryPropertyRenderer}
        />
    );
}
