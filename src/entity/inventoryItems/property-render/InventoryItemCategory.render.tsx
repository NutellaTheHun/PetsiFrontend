import {
    GenericEntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import type { GenericStatefulEntity } from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItem, InventoryItemCategory } from "../../entityTypes";

export type InventoryItemCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryItemCategory>,
    _context: InventoryItemCategoryRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCategoryName = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryItemCategory>,
    context: InventoryItemCategoryRenderContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <GenericInput
                type="text"
                value={value}
                onChange={(e) => context.setCategoryName(e)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedCategoryItems = (
    value: InventoryItem[],
    _statefulInstance: GenericStatefulEntity<InventoryItemCategory>,
    _context: InventoryItemCategoryRenderContext
) => {
    // TODO Implement this
    return <GenericValueDisplay value={`${value?.length || 0} items`} />;
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
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryItemCategoryPropertyRenderer}
        />
    );
}
