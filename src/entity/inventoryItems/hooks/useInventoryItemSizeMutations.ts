import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryItemSizeDto,
    InventoryItemPackage,
    InventoryItemSize,
    UnitOfMeasure,
    UpdateChildInventoryItemSizeDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryItemSizeEditContext = {
    setMeasureUnit: (measureUnit: UnitOfMeasure) => void;
    setMeasureAmount: (measureAmount: number) => void;
    setInventoryPackage: (inventoryPackage: InventoryItemPackage) => void;
    setCost: (cost: string) => void;
};

export type InventoryItemSizeCreateContext = {
    setMeasureUnit: (measureUnit: UnitOfMeasure) => void;
    setMeasureAmount: (measureAmount: number) => void;
    setInventoryPackage: (inventoryPackage: InventoryItemPackage) => void;
    setCost: (cost: string) => void;
};

// Context factory functions
const createInventoryItemSizeEditContext = (
    editInstance: Partial<InventoryItemSize> | null,
    setEditInstance: (instance: Partial<InventoryItemSize> | null) => void
): InventoryItemSizeEditContext => ({
    setMeasureUnit: (measureUnit: UnitOfMeasure) => {
        setEditInstance({ ...editInstance, measureUnit });
    },
    setMeasureAmount: (measureAmount: number) => {
        setEditInstance({ ...editInstance, measureAmount });
    },
    setInventoryPackage: (inventoryPackage: InventoryItemPackage) => {
        setEditInstance({ ...editInstance, packageType: inventoryPackage });
    },
    setCost: (cost: string) => {
        setEditInstance({ ...editInstance, cost });
    },
});

const createInventoryItemSizeCreateContext = (
    createInstance: Partial<InventoryItemSize>,
    setCreateInstance: (instance: Partial<InventoryItemSize>) => void
): InventoryItemSizeCreateContext => ({
    setMeasureUnit: (measureUnit: UnitOfMeasure) => {
        setCreateInstance({ ...createInstance, measureUnit });
    },
    setMeasureAmount: (measureAmount: number) => {
        setCreateInstance({ ...createInstance, measureAmount });
    },
    setInventoryPackage: (inventoryPackage: InventoryItemPackage) => {
        setCreateInstance({ ...createInstance, packageType: inventoryPackage });
    },
    setCost: (cost: string) => {
        setCreateInstance({ ...createInstance, cost });
    },
});

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
