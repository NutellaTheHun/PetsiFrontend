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
    ) => void
): InventoryItemPackageEditContext => ({
    setPackageName: (packageName: string) => {
        setEditValues({ packageName });
    },
});

const createInventoryItemPackageCreateContext = (
    setCreateValues: (
        values: Partial<CreateInventoryItemPackageDto> | null
    ) => void
): InventoryItemPackageCreateContext => ({
    setPackageName: (packageName: string) => {
        setCreateValues({ packageName });
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
