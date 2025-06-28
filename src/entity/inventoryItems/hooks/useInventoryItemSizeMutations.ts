import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryItemSizeDto,
    InventoryItemSize,
    UpdateChildInventoryItemSizeDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryItemSizeEditContext = {
    setId: (id: number) => void;
    setMeasureUnitId: (measureUnitId: number) => void;
    setMeasureAmount: (measureAmount: number) => void;
    setInventoryPackageId: (inventoryPackageId: number) => void;
    setCost: (cost: number) => void;
};

export type InventoryItemSizeCreateContext = {
    setInventoryItemId: (inventoryItemId: any[]) => void;
    setMeasureUnitId: (measureUnitId: number) => void;
    setMeasureAmount: (measureAmount: number) => void;
    setInventoryPackageId: (inventoryPackageId: number) => void;
    setCost: (cost: number) => void;
};

// Context factory functions
const createInventoryItemSizeEditContext = (
    setEditValues: (
        values: Partial<UpdateChildInventoryItemSizeDto> | null
    ) => void
): InventoryItemSizeEditContext => ({
    setId: (id: number) => {
        setEditValues({ id });
    },
    setMeasureUnitId: (measureUnitId: number) => {
        setEditValues({ measureUnitId });
    },
    setMeasureAmount: (measureAmount: number) => {
        setEditValues({ measureAmount });
    },
    setInventoryPackageId: (inventoryPackageId: number) => {
        setEditValues({ inventoryPackageId });
    },
    setCost: (cost: number) => {
        setEditValues({ cost });
    },
});

const createInventoryItemSizeCreateContext = (
    setCreateValues: (
        values: Partial<CreateInventoryItemSizeDto> | null
    ) => void
): InventoryItemSizeCreateContext => ({
    setInventoryItemId: (inventoryItemId: any[]) => {
        setCreateValues({ inventoryItemId });
    },
    setMeasureUnitId: (measureUnitId: number) => {
        setCreateValues({ measureUnitId });
    },
    setMeasureAmount: (measureAmount: number) => {
        setCreateValues({ measureAmount });
    },
    setInventoryPackageId: (inventoryPackageId: number) => {
        setCreateValues({ inventoryPackageId });
    },
    setCost: (cost: number) => {
        setCreateValues({ cost });
    },
});

// Entity-specific mutations hook
export function useInventoryItemSizeMutations() {
    return useEntityMutations<
        InventoryItemSize,
        CreateInventoryItemSizeDto,
        UpdateChildInventoryItemSizeDto,
        InventoryItemSizeEditContext,
        InventoryItemSizeCreateContext
    >({
        endpoint: "/inventory-item-sizes",
        createEditContext: createInventoryItemSizeEditContext,
        createCreateContext: createInventoryItemSizeCreateContext,
    });
}
