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
    setEditInstance: (instance: InventoryItemSize | null) => void,
    editDto: Partial<UpdateChildInventoryItemSizeDto> | null,
    editInstance: InventoryItemSize | null
): InventoryItemSizeEditContext => ({
    setMeasureUnit: (measureUnit: UnitOfMeasure) => {
        setEditDto({ ...editDto, measureUnitId: measureUnit.id });
        setEditInstance(editInstance ? { ...editInstance, measureUnit } : null);
    },
    setMeasureAmount: (measureAmount: number) => {
        setEditDto({ ...editDto, measureAmount });
        setEditInstance(
            editInstance ? { ...editInstance, measureAmount } : null
        );
    },
    setInventoryPackage: (packageType: InventoryItemPackage) => {
        setEditDto({ ...editDto, inventoryPackageId: packageType.id });
        setEditInstance(editInstance ? { ...editInstance, packageType } : null);
    },
    setCost: (cost: number) => {
        setEditDto({ ...editDto, cost });
        setEditInstance(
            editInstance ? { ...editInstance, cost: cost.toString() } : null
        );
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
        setCreateDto({ ...createDto, measureUnitId: measureUnit.id });
        setCreateInstance({ ...createInstance, measureUnit });
    },
    setMeasureAmount: (measureAmount: number) => {
        setCreateDto({ ...createDto, measureAmount });
        setCreateInstance({ ...createInstance, measureAmount });
    },
    setInventoryPackage: (packageType: InventoryItemPackage) => {
        setCreateDto({ ...createDto, inventoryPackageId: packageType.id });
        setCreateInstance({ ...createInstance, packageType });
    },
    setCost: (cost: number) => {
        setCreateDto({ ...createDto, cost });
        setCreateInstance({ ...createInstance, cost: cost.toString() });
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
