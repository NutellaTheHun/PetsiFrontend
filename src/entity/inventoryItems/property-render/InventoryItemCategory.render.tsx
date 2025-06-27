import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";

type InventoryItemCategory = components["schemas"]["InventoryItemCategory"];

export type InventoryItemCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _entity: InventoryItemCategory,
    _state: RenderState,
    _context: InventoryItemCategoryRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCategoryName = (
    value: string,
    _entity: InventoryItemCategory,
    state: RenderState,
    context: InventoryItemCategoryRenderContext
) => {
    if (state === "edited") {
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
    value: InventoryItemCategory["categoryItems"],
    _entity: InventoryItemCategory,
    _state: RenderState,
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
    instance: InventoryItemCategory;
    state: RenderState;
    context: InventoryItemCategoryRenderContext;
};

export function InventoryItemCategoryRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryItemCategoryRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={inventoryItemCategoryPropertyRenderer}
        />
    );
}
