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
    setCost: (cost: number) => void;
};

export type InventoryItemSizeCreateContext = {
    setInventoryItemId: (inventoryItemId: any[]) => void;
    setMeasureUnit: (measureUnit: UnitOfMeasure) => void;
    setMeasureAmount: (measureAmount: number) => void;
    setInventoryPackage: (inventoryPackage: InventoryItemPackage) => void;
    setCost: (cost: number) => void;
};

// Context factory functions
const createInventoryItemSizeEditContext = (
    setEditDto: (dto: Partial<UpdateChildInventoryItemSizeDto> | null) => void,
    setEditInstance: (instance: Partial<InventoryItemSize> | null) => void,
    editDto: Partial<UpdateChildInventoryItemSizeDto> | null,
    editInstance: Partial<InventoryItemSize> | null
): InventoryItemSizeEditContext => ({
    setMeasureUnit: (measureUnit: UnitOfMeasure) => {
        setEditInstance({ ...editInstance, measureUnit });
        setEditDto({ ...editDto, measureUnitId: measureUnit.id });
    },
    setMeasureAmount: (measureAmount: number) => {
        setEditInstance({ ...editInstance, measureAmount });
        setEditDto({ ...editDto, measureAmount });
    },
    setInventoryPackage: (packageType: InventoryItemPackage) => {
        setEditInstance({ ...editInstance, packageType });
        setEditDto({ ...editDto, inventoryPackageId: packageType.id });
    },
    setCost: (cost: number) => {
        setEditInstance({ ...editInstance, cost: cost.toString() });
        setEditDto({ ...editDto, cost });
    },
});

const createInventoryItemSizeCreateContext = (
    setCreateDto: (dto: Partial<CreateInventoryItemSizeDto> | null) => void,
    setCreateInstance: (instance: Partial<InventoryItemSize> | null) => void,
    createDto: Partial<CreateInventoryItemSizeDto> | null,
    createInstance: Partial<InventoryItemSize> | null
): InventoryItemSizeCreateContext => ({
    setInventoryItemId: (inventoryItemId: any[]) => {
        setCreateDto({ ...createDto, inventoryItemId });
        // Note: The entity uses 'inventoryItem' but DTO uses 'inventoryItemId'
        // We don't set this on the instance since it's a DTO field
    },
    setMeasureUnit: (measureUnit: UnitOfMeasure) => {
        setCreateInstance({ ...createInstance, measureUnit });
        setCreateDto({ ...createDto, measureUnitId: measureUnit.id });
    },
    setMeasureAmount: (measureAmount: number) => {
        setCreateInstance({ ...createInstance, measureAmount });
        setCreateDto({ ...createDto, measureAmount });
    },
    setInventoryPackage: (packageType: InventoryItemPackage) => {
        setCreateInstance({ ...createInstance, packageType });
        setCreateDto({ ...createDto, inventoryPackageId: packageType.id });
    },
    setCost: (cost: number) => {
        setCreateInstance({ ...createInstance, cost: cost.toString() });
        setCreateDto({ ...createDto, cost });
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
