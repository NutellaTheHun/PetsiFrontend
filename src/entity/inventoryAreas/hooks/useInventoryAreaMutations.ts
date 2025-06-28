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
    setEditValues: (values: UpdateInventoryAreaDto | null) => void
): InventoryAreaEditContext => ({
    setAreaName: (areaName: string) => {
        setEditValues({ areaName });
    },
});

const createInventoryAreaCreateContext = (
    setCreateValues: (values: CreateInventoryAreaDto | null) => void
): InventoryAreaCreateContext => ({
    setAreaName: (areaName: string) => {
        setCreateValues({ areaName });
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
