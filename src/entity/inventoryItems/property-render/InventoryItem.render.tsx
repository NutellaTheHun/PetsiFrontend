import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import type { GenericStatefulEntity } from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    InventoryItem,
    InventoryItemCategory,
    InventoryItemSize,
    InventoryItemVendor,
} from "../../entityTypes";
import { InventoryItemCategoryDropdown } from "../components/InventoryItemCategory/InventoryItemCategoryDropdown";
import { InventoryItemVendorDropdown } from "../components/InventoryItemVendor/InventoryItemVendorDropdown";

export type InventoryItemRenderContext = {
    setItemName: (name: string) => void;
    setCategory: (id: number | null) => void;
    setVendor: (id: number | null) => void;
    inventoryItemCategories?: InventoryItemCategory[];
    inventoryItemVendors?: InventoryItemVendor[];
    //setItemSizes: (sizes: InventoryItem["itemSizes"]) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryItem>,
    _context: InventoryItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedItemName = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryItem>,
    context: InventoryItemRenderContext
) => {
    if (statefulInstance.state === "edited") {
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
    value: InventoryItemCategory,
    statefulInstance: GenericStatefulEntity<InventoryItem>,
    context: InventoryItemRenderContext
) => {
    if (statefulInstance.state === "edited") {
        return (
            <InventoryItemCategoryDropdown
                selectedCategory={value ?? null}
                onUpdateCategory={(category) => {
                    context.setCategory(category?.id ?? null);
                }}
                inventoryItemCategories={context.inventoryItemCategories ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.categoryName ?? ""} />;
};

const renderedVendor = (
    value: InventoryItemVendor,
    statefulInstance: GenericStatefulEntity<InventoryItem>,
    context: InventoryItemRenderContext
) => {
    if (statefulInstance.state === "edited") {
        return (
            <InventoryItemVendorDropdown
                selectedVendor={value ?? null}
                onUpdateVendor={(vendor) => {
                    context.setVendor(vendor?.id ?? null);
                }}
                inventoryItemVendors={context.inventoryItemVendors ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.vendorName ?? ""} />;
};

const renderedItemSizes = (
    value: InventoryItemSize[],
    _statefulInstance: GenericStatefulEntity<InventoryItem>,
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
    statefulInstance: GenericStatefulEntity<InventoryItem>;
    context: InventoryItemRenderContext;
};

export function InventoryItemRender({
    entityProp,
    statefulInstance,
    context,
}: InventoryItemRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryItemPropertyRenderer}
        />
    );
}
