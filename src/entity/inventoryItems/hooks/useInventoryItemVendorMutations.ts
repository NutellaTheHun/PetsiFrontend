import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemVendorDto,
    InventoryItemVendor,
    UpdateInventoryItemVendorDto,
} from "../../entityTypes";
import type { InventoryItemVendorRenderContext } from "../property-render/InventoryItemVendor.render";

export type InventoryItemVendorEditContext = Pick<
    InventoryItemVendorRenderContext,
    "setVendorName"
>;

export type InventoryItemVendorCreateContext = Pick<
    InventoryItemVendorRenderContext,
    "setVendorName"
>;

// DTO converter for InventoryItemVendor
const inventoryItemVendorDtoConverter = {
    toCreateDto: (
        entity: Partial<InventoryItemVendor>
    ): CreateInventoryItemVendorDto => ({
        vendorName: entity.vendorName || "",
    }),
    toUpdateDto: (
        entity: Partial<InventoryItemVendor>
    ): UpdateInventoryItemVendorDto => ({
        vendorName: entity.vendorName || "",
    }),
};

// Context factory functions
const createInventoryItemVendorEditContext = (
    editInstance: Partial<InventoryItemVendor> | null,
    setEditInstance: (instance: Partial<InventoryItemVendor> | null) => void
): InventoryItemVendorEditContext => ({
    setVendorName: (name: string) => {
        setEditInstance({ ...editInstance, vendorName: name });
    },
});

const createInventoryItemVendorCreateContext = (
    createInstance: Partial<InventoryItemVendor>,
    setCreateInstance: (instance: Partial<InventoryItemVendor>) => void
): InventoryItemVendorCreateContext => ({
    setVendorName: (name: string) => {
        setCreateInstance({ ...createInstance, vendorName: name });
    },
});

// Entity-specific mutations hook
export function useInventoryItemVendorMutations() {
    return useEntityMutations<
        InventoryItemVendor,
        CreateInventoryItemVendorDto,
        UpdateInventoryItemVendorDto,
        InventoryItemVendorEditContext,
        InventoryItemVendorCreateContext
    >({
        endpoint: "/inventory-item-vendors",
        dtoConverter: inventoryItemVendorDtoConverter,
        createEditContext: createInventoryItemVendorEditContext,
        createCreateContext: createInventoryItemVendorCreateContext,
    });
}
