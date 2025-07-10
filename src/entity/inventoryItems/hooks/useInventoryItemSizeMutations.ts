import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemSizeDto,
    InventoryItemPackage,
    InventoryItemSize,
    UnitOfMeasure,
    UpdateChildInventoryItemSizeDto,
} from "../../entityTypes";
import type { InventoryItemSizeRenderContext } from "../property-render/InventoryItemSize.render";

// Define separate context types for create and update
export type InventoryItemSizeEditContext = Pick<
    InventoryItemSizeRenderContext,
    "setMeasureUnit" | "setMeasureAmount" | "setPackageType" | "setCost"
>;

export type InventoryItemSizeCreateContext = Pick<
    InventoryItemSizeRenderContext,
    "setMeasureUnit" | "setMeasureAmount" | "setPackageType" | "setCost"
>;

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
    setPackageType: (inventoryPackage: InventoryItemPackage) => {
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
    setPackageType: (inventoryPackage: InventoryItemPackage) => {
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
