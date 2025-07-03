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

// Context factory functions
const createInventoryAreaEditContext = (
    setEditValues: (values: Partial<UpdateInventoryAreaDto> | null) => void,
    setEditInstance: (instance: InventoryArea | null) => void,
    editValues: Partial<UpdateInventoryAreaDto> | null,
    editInstance: InventoryArea | null
): InventoryAreaEditContext => ({
    setAreaName: (areaName: string) => {
        // Update the instance
        setEditInstance(editInstance ? { ...editInstance, areaName } : null);
        // Update the DTO
        setEditValues({ ...editValues, areaName });
    },
});

const createInventoryAreaCreateContext = (
    setCreateValues: (values: Partial<CreateInventoryAreaDto> | null) => void,
    setCreateInstance: (instance: Partial<InventoryArea> | null) => void,
    createValues: Partial<CreateInventoryAreaDto> | null,
    createInstance: Partial<InventoryArea> | null
): InventoryAreaCreateContext => ({
    setAreaName: (areaName: string) => {
        // Update the instance
        setCreateInstance({ ...createInstance, areaName });
        // Update the DTO
        setCreateValues({ ...createValues, areaName });
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
        createEditContext: createInventoryAreaEditContext,
        createCreateContext: createInventoryAreaCreateContext,
    });
}
