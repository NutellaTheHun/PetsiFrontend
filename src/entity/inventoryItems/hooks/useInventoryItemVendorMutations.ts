import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
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
    setEditValues: (
        values: Partial<UpdateInventoryItemVendorDto> | null
    ) => void,
    setEditInstance: (instance: InventoryItemVendor | null) => void,
    editValues: Partial<UpdateInventoryItemVendorDto> | null,
    editInstance: InventoryItemVendor | null
): InventoryItemVendorEditContext => ({
    setVendorName: (vendorName: string) => {
        setEditValues({ ...editValues, vendorName });
    },
});

const createInventoryItemVendorCreateContext = (
    setCreateValues: (
        values: Partial<CreateInventoryItemVendorDto> | null
    ) => void,
    setCreateInstance: (instance: Partial<InventoryItemVendor> | null) => void,
    createValues: Partial<CreateInventoryItemVendorDto> | null,
    createInstance: Partial<InventoryItemVendor> | null
): InventoryItemVendorCreateContext => ({
    setVendorName: (vendorName: string) => {
        setCreateValues({ ...createValues, vendorName });
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
