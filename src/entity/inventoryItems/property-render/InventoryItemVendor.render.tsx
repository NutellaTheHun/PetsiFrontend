import { Text, TextInput } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import type { InventoryItem, InventoryItemVendor } from "../../entityTypes";

export type InventoryItemVendorRenderContext = {
    setVendorName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryItemVendor>,
    _context: InventoryItemVendorRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedVendorName = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryItemVendor>,
    context: InventoryItemVendorRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                type="text"
                value={value}
                onChange={(e) => context.setVendorName(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedVendorItems = (
    value: InventoryItem[],
    _statefulInstance: GenericStatefulEntity<InventoryItemVendor>,
    _context: InventoryItemVendorRenderContext
) => {
    return <Text>{`${value?.length || 0} items`}</Text>;
};

export const inventoryItemVendorPropertyRenderer: PropertyRendererRecord<InventoryItemVendor> =
    {
        id: renderedId,
        vendorName: renderedVendorName,
        vendorItems: renderedVendorItems,
    };

export type InventoryItemVendorRenderProps = {
    entityProp: keyof InventoryItemVendor;
    statefulInstance: GenericStatefulEntity<InventoryItemVendor>;
    context: InventoryItemVendorRenderContext;
};

export function InventoryItemVendorRender({
    entityProp,
    statefulInstance,
    context,
}: InventoryItemVendorRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryItemVendorPropertyRenderer}
        />
    );
}
