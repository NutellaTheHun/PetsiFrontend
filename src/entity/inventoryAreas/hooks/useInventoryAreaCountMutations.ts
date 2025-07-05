import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryAreaCountDto,
    InventoryArea,
    InventoryAreaCount,
    UpdateInventoryAreaCountDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryAreaCountEditContext = {
    setInventoryArea: (inventoryArea: InventoryArea) => void;
};

export type InventoryAreaCountCreateContext = {
    setInventoryArea: (inventoryArea: InventoryArea) => void;
};

// DTO converter for InventoryAreaCount
const inventoryAreaCountDtoConverter = {
    toCreateDto: (
        entity: Partial<InventoryAreaCount>
    ): CreateInventoryAreaCountDto => ({
        inventoryAreaId: entity.inventoryArea?.id || 0,
    }),
    toUpdateDto: (
        entity: Partial<InventoryAreaCount>
    ): UpdateInventoryAreaCountDto => ({
        inventoryAreaId: entity.inventoryArea?.id || 0,
    }),
};

// Context factory functions
const createInventoryAreaCountEditContext = (
    editInstance: Partial<InventoryAreaCount> | null,
    setEditInstance: (instance: Partial<InventoryAreaCount> | null) => void
): InventoryAreaCountEditContext => ({
    setInventoryArea: (inventoryArea: InventoryArea) => {
        setEditInstance({ ...editInstance, inventoryArea });
    },
});

const createInventoryAreaCountCreateContext = (
    createInstance: Partial<InventoryAreaCount>,
    setCreateInstance: (instance: Partial<InventoryAreaCount>) => void
): InventoryAreaCountCreateContext => ({
    setInventoryArea: (inventoryArea: InventoryArea) => {
        setCreateInstance({ ...createInstance, inventoryArea });
    },
});

// Entity-specific mutations hook
export function useInventoryAreaCountMutations() {
    return useEntityMutations<
        InventoryAreaCount,
        CreateInventoryAreaCountDto,
        UpdateInventoryAreaCountDto,
        InventoryAreaCountEditContext,
        InventoryAreaCountCreateContext
    >({
        endpoint: "/inventory-area-counts",
        dtoConverter: inventoryAreaCountDtoConverter,
        createEditContext: createInventoryAreaCountEditContext,
        createCreateContext: createInventoryAreaCountCreateContext,
    });
}
