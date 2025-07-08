import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemVendorDto,
    InventoryItemVendor,
    UpdateInventoryItemVendorDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryItemVendorEditContext = {
    setVendorName: (vendorName: string) => void;
};

export type InventoryItemVendorCreateContext = {
    setVendorName: (vendorName: string) => void;
};

// Context factory functions
const createInventoryItemVendorEditContext = (
    editInstance: Partial<InventoryItemVendor> | null,
    setEditInstance: (instance: Partial<InventoryItemVendor> | null) => void
): InventoryItemVendorEditContext => ({
    setVendorName: (vendorName: string) => {
        setEditInstance({ ...editInstance, vendorName });
    },
});

const createInventoryItemVendorCreateContext = (
    createInstance: Partial<InventoryItemVendor>,
    setCreateInstance: (instance: Partial<InventoryItemVendor>) => void
): InventoryItemVendorCreateContext => ({
    setVendorName: (vendorName: string) => {
        setCreateInstance({ ...createInstance, vendorName });
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
        createEditContext: createInventoryItemVendorEditContext,
        createCreateContext: createInventoryItemVendorCreateContext,
    });
}
