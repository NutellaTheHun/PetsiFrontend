import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
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
    setCategory: (entity: InventoryItemCategory | null) => void;
    setVendor: (entity: InventoryItemVendor | null) => void;
    //setItemSizes: (sizes: InventoryItem["itemSizes"]) => void;
};

export interface InventoryItemDataContext
    extends EntityDataContext<InventoryItem> {
    inventoryItemCategories?: InventoryItemCategory[];
    inventoryItemVendors?: InventoryItemVendor[];
}

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
    if (statefulInstance.state === "edit") {
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
    context: InventoryItemRenderContext,
    dataContext?: InventoryItemDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <InventoryItemCategoryDropdown
                selectedCategory={value ?? null}
                onUpdateCategory={(category) => {
                    context.setCategory(category ?? null);
                }}
                inventoryItemCategories={
                    dataContext?.inventoryItemCategories ?? []
                }
            />
        );
    }
    return <GenericValueDisplay value={value?.categoryName ?? ""} />;
};

const renderedVendor = (
    value: InventoryItemVendor,
    statefulInstance: GenericStatefulEntity<InventoryItem>,
    context: InventoryItemRenderContext,
    dataContext?: InventoryItemDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <InventoryItemVendorDropdown
                selectedVendor={value ?? null}
                onUpdateVendor={(vendor) => {
                    context.setVendor(vendor ?? null);
                }}
                inventoryItemVendors={dataContext?.inventoryItemVendors ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.vendorName ?? ""} />;
};

// TODO: implement this, dropdown or new form for edit or create?
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

export function RenderInventoryItemProperty({
    entityProp,
    statefulInstance,
    context,
}: InventoryItemRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryItemPropertyRenderer}
        />
    );
}
