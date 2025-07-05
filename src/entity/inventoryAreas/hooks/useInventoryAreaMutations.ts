import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryAreaDto,
    InventoryArea,
    UpdateInventoryAreaDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryAreaEditContext = {
    setAreaName: (areaName: string) => void;
};

export type InventoryAreaCreateContext = {
    setAreaName: (areaName: string) => void;
};

// DTO converter for InventoryArea
const inventoryAreaDtoConverter = {
    toCreateDto: (entity: Partial<InventoryArea>): CreateInventoryAreaDto => ({
        areaName: entity.areaName || "",
    }),
    toUpdateDto: (entity: InventoryArea): UpdateInventoryAreaDto => ({
        areaName: entity.areaName,
    }),
};

// Context factory functions
const createInventoryAreaEditContext = (
    setEditInstance: (instance: InventoryArea | null) => void,
    editInstance: InventoryArea | null
): InventoryAreaEditContext => ({
    setAreaName: (areaName: string) => {
        setEditInstance(editInstance ? { ...editInstance, areaName } : null);
    },
});

const createInventoryAreaCreateContext = (
    setCreateInstance: (instance: Partial<InventoryArea> | null) => void,
    createInstance: Partial<InventoryArea> | null
): InventoryAreaCreateContext => ({
    setAreaName: (areaName: string) => {
        setCreateInstance({ ...createInstance, areaName });
    },
});

// Entity-specific mutations hook
export function useInventoryAreaMutations() {
    return useEntityMutations<
        InventoryArea,
        CreateInventoryAreaDto,
        UpdateInventoryAreaDto,
        InventoryAreaEditContext,
        InventoryAreaCreateContext
    >({
        endpoint: "/inventory-areas",
        dtoConverter: inventoryAreaDtoConverter,
        createEditContext: createInventoryAreaEditContext,
        createCreateContext: createInventoryAreaCreateContext,
    });
}
