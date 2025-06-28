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
    setEditValues: (values: UpdateInventoryAreaCountDto | null) => void
): InventoryAreaCountEditContext => ({
    setInventoryAreaId: (inventoryAreaId: number) => {
        setEditValues({ inventoryAreaId });
    },
});

const createInventoryAreaCountCreateContext = (
    setCreateValues: (values: CreateInventoryAreaCountDto | null) => void
): InventoryAreaCountCreateContext => ({
    setInventoryAreaId: (inventoryAreaId: number) => {
        setCreateValues({ inventoryAreaId });
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
