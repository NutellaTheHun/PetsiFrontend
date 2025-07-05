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
    editInstance: Partial<InventoryItemPackage> | null,
    setEditInstance: (instance: Partial<InventoryItemPackage> | null) => void
): InventoryItemPackageEditContext => ({
    setPackageName: (packageName: string) => {
        setEditInstance({ ...editInstance, packageName });
    },
});

const createInventoryItemPackageCreateContext = (
    createInstance: Partial<InventoryItemPackage>,
    setCreateInstance: (instance: Partial<InventoryItemPackage>) => void
): InventoryItemPackageCreateContext => ({
    setPackageName: (packageName: string) => {
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
