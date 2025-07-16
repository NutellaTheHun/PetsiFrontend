import { Text, TextInput } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { MantineAutoComplete } from "../../../lib/uiComponents/input/MantineAutoComplete";
import type {
    InventoryItem,
    InventoryItemCategory,
    InventoryItemSize,
    InventoryItemVendor,
} from "../../entityTypes";

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
    return <Text>{value}</Text>;
};

const renderedItemName = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryItem>,
    context: InventoryItemRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => {
                    context.setItemName(e.target.value);
                }}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedCategory = (
    value: InventoryItemCategory,
    statefulInstance: GenericStatefulEntity<InventoryItem>,
    context: InventoryItemRenderContext,
    dataContext?: InventoryItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineAutoComplete<InventoryItemCategory>
                totalOptions={dataContext?.inventoryItemCategories ?? []}
                selectedOption={value}
                onOptionChange={context.setCategory}
                searchProperty="categoryName"
            />
        );
    }
    return <Text>{value?.categoryName ?? ""}</Text>;
};

const renderedVendor = (
    value: InventoryItemVendor,
    statefulInstance: GenericStatefulEntity<InventoryItem>,
    context: InventoryItemRenderContext,
    dataContext?: InventoryItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineAutoComplete<InventoryItemVendor>
                totalOptions={dataContext?.inventoryItemVendors ?? []}
                selectedOption={value}
                onOptionChange={context.setVendor}
                searchProperty="vendorName"
            />
        );
    }
    return <Text>{value?.vendorName ?? ""}</Text>;
};

// TODO: implement this, dropdown or new form for edit or create?
const renderedItemSizes = (
    value: InventoryItemSize[],
    _statefulInstance: GenericStatefulEntity<InventoryItem>,
    _context: InventoryItemRenderContext
) => {
    return <Text>{`${value?.length || 0} sizes`}</Text>;
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
