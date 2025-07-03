import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryAreaCountDto,
    InventoryAreaCount,
    UpdateInventoryAreaCountDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryAreaCountEditContext = {
    setInventoryAreaId: (inventoryAreaId: number) => void;
};

export type InventoryAreaCountCreateContext = {
    setInventoryAreaId: (inventoryAreaId: number) => void;
};

// Context factory functions
const createInventoryAreaCountEditContext = (
    setEditValues: (
        values: Partial<UpdateInventoryAreaCountDto> | null
    ) => void,
    setEditInstance: (instance: InventoryAreaCount | null) => void,
    editValues: Partial<UpdateInventoryAreaCountDto> | null,
    editInstance: InventoryAreaCount | null
): InventoryAreaCountEditContext => ({
    setInventoryAreaId: (inventoryAreaId: number) => {
        setEditValues({ ...editValues, inventoryAreaId });
    },
});

const createInventoryAreaCountCreateContext = (
    setCreateValues: (
        values: Partial<CreateInventoryAreaCountDto> | null
    ) => void,
    setCreateInstance: (instance: Partial<InventoryAreaCount> | null) => void,
    createValues: Partial<CreateInventoryAreaCountDto> | null,
    createInstance: Partial<InventoryAreaCount> | null
): InventoryAreaCountCreateContext => ({
    setInventoryAreaId: (inventoryAreaId: number) => {
        setCreateValues({ ...createValues, inventoryAreaId });
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
        createEditContext: createInventoryAreaCountEditContext,
        createCreateContext: createInventoryAreaCountCreateContext,
    });
}
