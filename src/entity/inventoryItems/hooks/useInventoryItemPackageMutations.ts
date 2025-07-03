import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryItemPackageDto,
    InventoryItemPackage,
    UpdateInventoryItemPackageDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryItemPackageEditContext = {
    setPackageName: (packageName: string) => void;
};

export type InventoryItemPackageCreateContext = {
    setPackageName: (packageName: string) => void;
};

// Context factory functions
const createInventoryItemPackageEditContext = (
    setEditValues: (
        values: Partial<UpdateInventoryItemPackageDto> | null
    ) => void,
    setEditInstance: (instance: InventoryItemPackage | null) => void,
    editValues: Partial<UpdateInventoryItemPackageDto> | null,
    editInstance: InventoryItemPackage | null
): InventoryItemPackageEditContext => ({
    setPackageName: (packageName: string) => {
        setEditValues({ ...editValues, packageName });
    },
});

const createInventoryItemPackageCreateContext = (
    setCreateValues: (
        values: Partial<CreateInventoryItemPackageDto> | null
    ) => void,
    setCreateInstance: (instance: Partial<InventoryItemPackage> | null) => void,
    createValues: Partial<CreateInventoryItemPackageDto> | null,
    createInstance: Partial<InventoryItemPackage> | null
): InventoryItemPackageCreateContext => ({
    setPackageName: (packageName: string) => {
        setCreateValues({ ...createValues, packageName });
        setCreateInstance({ ...createInstance, packageName });
    },
});

// Entity-specific mutations hook
export function useInventoryItemPackageMutations() {
    return useEntityMutations<
        InventoryItemPackage,
        CreateInventoryItemPackageDto,
        UpdateInventoryItemPackageDto,
        InventoryItemPackageEditContext,
        InventoryItemPackageCreateContext
    >({
        endpoint: "/inventory-item-packages",
        createEditContext: createInventoryItemPackageEditContext,
        createCreateContext: createInventoryItemPackageCreateContext,
    });
}
