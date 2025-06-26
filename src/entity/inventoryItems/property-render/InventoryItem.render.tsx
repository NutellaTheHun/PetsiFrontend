import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../lib/generics/table/render-cell-content/GenericValue";
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
    return <GenericValue value={value} />;
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
    return <GenericValue value={value} />;
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
    return <GenericValue value={value?.categoryName ?? ""} />;
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
    return <GenericValue value={value?.vendorName ?? ""} />;
};

const renderedItemSizes = (
    _value: InventoryItem["itemSizes"],
    _entity: InventoryItem,
    _state: RenderState,
    _context: InventoryItemRenderContext
) => {
    // TODO: implement this
    return <div>item size</div>;
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
