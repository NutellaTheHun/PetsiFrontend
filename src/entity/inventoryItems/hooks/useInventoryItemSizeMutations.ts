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
    ) => void,
    setEditInstance: (instance: InventoryItemSize | null) => void,
    editValues: Partial<UpdateChildInventoryItemSizeDto> | null,
    editInstance: InventoryItemSize | null
): InventoryItemSizeEditContext => ({
    setId: (id: number) => {
        setEditValues({ ...editValues, id });
    },
    setMeasureUnitId: (measureUnitId: number) => {
        setEditValues({ ...editValues, measureUnitId });
    },
    setMeasureAmount: (measureAmount: number) => {
        setEditValues({ ...editValues, measureAmount });
    },
    setInventoryPackageId: (inventoryPackageId: number) => {
        setEditValues({ ...editValues, inventoryPackageId });
    },
    setCost: (cost: number) => {
        setEditValues({ ...editValues, cost });
    },
});

const createInventoryItemSizeCreateContext = (
    setCreateValues: (
        values: Partial<CreateInventoryItemSizeDto> | null
    ) => void,
    setCreateInstance: (instance: Partial<InventoryItemSize> | null) => void,
    createValues: Partial<CreateInventoryItemSizeDto> | null,
    createInstance: Partial<InventoryItemSize> | null
): InventoryItemSizeCreateContext => ({
    setInventoryItemId: (inventoryItemId: any[]) => {
        setCreateValues({ ...createValues, inventoryItemId });
        // Note: The entity uses 'inventoryItem' but DTO uses 'inventoryItemId'
        // We don't set this on the instance since it's a DTO field
    },
    setMeasureUnitId: (measureUnitId: number) => {
        setCreateValues({ ...createValues, measureUnitId });
        setCreateInstance({ ...createInstance, measureUnitId });
    },
    setMeasureAmount: (measureAmount: number) => {
        setCreateValues({ ...createValues, measureAmount });
        setCreateInstance({ ...createInstance, measureAmount });
    },
    setInventoryPackageId: (inventoryPackageId: number) => {
        setCreateValues({ ...createValues, inventoryPackageId });
        setCreateInstance({ ...createInstance, inventoryPackageId });
    },
    setCost: (cost: number) => {
        setCreateValues({ ...createValues, cost });
        setCreateInstance({ ...createInstance, cost });
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
