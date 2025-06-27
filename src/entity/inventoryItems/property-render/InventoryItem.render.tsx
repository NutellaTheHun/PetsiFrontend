import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItemSize } from "../../entityTypes";
import { InventoryItemCategoryDropdown } from "../components/InventoryItemCategory/InventoryItemCategoryDropdown";
import { InventoryItemVendorDropdown } from "../components/InventoryItemVendor/InventoryItemVendorDropdown";

type InventoryItem = components["schemas"]["InventoryItem"];

export type InventoryItemRenderContext = {
    setItemName: (name: string) => void;
    setCategory: (id: number | null) => void;
    setVendor: (id: number | null) => void;
    //setItemSizes: (sizes: InventoryItem["itemSizes"]) => void;
};

const renderedId = (
    value: any,
    _entity: InventoryItem,
    _state: RenderState,
    _context: InventoryItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedItemName = (
    value: string,
    _entity: InventoryItem,
    state: RenderState,
    context: InventoryItemRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setItemName(e);
                }}
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedCategory = (
    value: InventoryItem["category"],
    _entity: InventoryItem,
    state: RenderState,
    context: InventoryItemRenderContext
) => {
    if (state === "edited") {
        return (
            <InventoryItemCategoryDropdown
                selectedCategoryId={value?.id ?? null}
                onUpdateCategoryId={(id) => {
                    context.setCategory(id);
                }}
            />
        );
    }
    return <GenericValueDisplay value={value?.categoryName ?? ""} />;
};

const renderedVendor = (
    value: InventoryItem["vendor"],
    _entity: InventoryItem,
    state: RenderState,
    context: InventoryItemRenderContext
) => {
    if (state === "edited") {
        return (
            <InventoryItemVendorDropdown
                selectedVendorId={value?.id ?? null}
                onUpdateVendorId={(id) => {
                    context.setVendor(id);
                }}
            />
        );
    }
    return <GenericValueDisplay value={value?.vendorName ?? ""} />;
};

const renderedItemSizes = (
    value: InventoryItemSize[],
    _entity: InventoryItem,
    _state: RenderState,
    _context: InventoryItemRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} sizes`} />;
};

export const inventoryItemPropertyRenderer: PropertyRendererRecord<InventoryItem> =
    {
        id: renderedId,
        itemName: renderedItemName,
        category: renderedCategory,
        vendor: renderedVendor,
        itemSizes: renderedItemSizes,
    };

export type InventoryItemRenderProps = {
    entityProp: keyof InventoryItem;
    instance: InventoryItem;
    state: RenderState;
    context: InventoryItemRenderContext;
};

export function InventoryItemRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryItemRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={inventoryItemPropertyRenderer}
        />
    );
}
