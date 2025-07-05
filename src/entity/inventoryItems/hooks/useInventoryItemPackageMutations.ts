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
    setEditDto: (dto: Partial<UpdateInventoryItemPackageDto> | null) => void,
    setEditInstance: (instance: InventoryItemPackage | null) => void,
    editDto: Partial<UpdateInventoryItemPackageDto> | null,
    editInstance: InventoryItemPackage | null
): InventoryItemPackageEditContext => ({
    setPackageName: (packageName: string) => {
        setEditDto({ ...editDto, packageName });
        setEditInstance(editInstance ? { ...editInstance, packageName } : null);
    },
});

const createInventoryItemPackageCreateContext = (
    setCreateDto: (dto: Partial<CreateInventoryItemPackageDto> | null) => void,
    setCreateInstance: (instance: Partial<InventoryItemPackage> | null) => void,
    createDto: Partial<CreateInventoryItemPackageDto> | null,
    createInstance: Partial<InventoryItemPackage> | null
): InventoryItemPackageCreateContext => ({
    setPackageName: (packageName: string) => {
        setCreateDto({ ...createDto, packageName });
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
