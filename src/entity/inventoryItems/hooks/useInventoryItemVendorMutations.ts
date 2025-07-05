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
    setEditDto: (dto: Partial<UpdateInventoryItemVendorDto> | null) => void,
    setEditInstance: (instance: Partial<InventoryItemVendor> | null) => void,
    editDto: Partial<UpdateInventoryItemVendorDto> | null,
    editInstance: Partial<InventoryItemVendor> | null
): InventoryItemVendorEditContext => ({
    setVendorName: (vendorName: string) => {
        setEditInstance({ ...editInstance, vendorName });
        setEditDto({ ...editDto, vendorName });
    },
});

const createInventoryItemVendorCreateContext = (
    setCreateDto: (dto: Partial<CreateInventoryItemVendorDto> | null) => void,
    setCreateInstance: (instance: Partial<InventoryItemVendor> | null) => void,
    createDto: Partial<CreateInventoryItemVendorDto> | null,
    createInstance: Partial<InventoryItemVendor> | null
): InventoryItemVendorCreateContext => ({
    setVendorName: (vendorName: string) => {
        setCreateInstance({ ...createInstance, vendorName });
        setCreateDto({ ...createDto, vendorName });
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
