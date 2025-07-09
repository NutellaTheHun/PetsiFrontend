import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemPackageDto,
    InventoryItemPackage,
    UpdateInventoryItemPackageDto,
} from "../../entityTypes";

export type InventoryItemPackageEditContext = {
    setPackageName: (name: string) => void;
};

export type InventoryItemPackageCreateContext = {
    setPackageName: (name: string) => void;
};

// DTO converter for InventoryItemPackage
const inventoryItemPackageDtoConverter = {
    toCreateDto: (
        entity: Partial<InventoryItemPackage>
    ): CreateInventoryItemPackageDto => ({
        packageName: entity.packageName || "",
    }),
    toUpdateDto: (
        entity: Partial<InventoryItemPackage>
    ): UpdateInventoryItemPackageDto => ({
        packageName: entity.packageName || "",
    }),
};

// Context factory functions
const createInventoryItemPackageEditContext = (
    editInstance: Partial<InventoryItemPackage> | null,
    setEditInstance: (instance: Partial<InventoryItemPackage> | null) => void
): InventoryItemPackageEditContext => ({
    setPackageName: (name: string) => {
        setEditInstance({ ...editInstance, packageName: name });
    },
});

const createInventoryItemPackageCreateContext = (
    createInstance: Partial<InventoryItemPackage>,
    setCreateInstance: (instance: Partial<InventoryItemPackage>) => void
): InventoryItemPackageCreateContext => ({
    setPackageName: (name: string) => {
        setCreateInstance({ ...createInstance, packageName: name });
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
        dtoConverter: inventoryItemPackageDtoConverter,
        createEditContext: createInventoryItemPackageEditContext,
        createCreateContext: createInventoryItemPackageCreateContext,
    });
}
