import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryAreaCountDto,
    InventoryArea,
    InventoryAreaCount,
    UpdateInventoryAreaCountDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type InventoryAreaCountEditContext = {
    setInventoryArea: (inventoryArea: InventoryArea) => void;
};

export type InventoryAreaCountCreateContext = {
    setInventoryArea: (inventoryArea: InventoryArea) => void;
};

// DTO converter for InventoryAreaCount
const inventoryAreaCountDtoConverter = {
    toCreateDto: (
        entity: Partial<InventoryAreaCount>
    ): CreateInventoryAreaCountDto => ({
        inventoryAreaId: entity.inventoryArea?.id || 0,
    }),
    toUpdateDto: (entity: InventoryAreaCount): UpdateInventoryAreaCountDto => ({
        inventoryAreaId: entity.inventoryArea?.id || 0,
    }),
};

// Context factory functions
const createInventoryAreaCountEditContext = (
    setEditDto: (dto: Partial<UpdateInventoryAreaCountDto> | null) => void,
    setEditInstance: (instance: InventoryAreaCount | null) => void,
    editDto: Partial<UpdateInventoryAreaCountDto> | null,
    editInstance: InventoryAreaCount | null
): InventoryAreaCountEditContext => ({
    setInventoryArea: (inventoryArea: InventoryArea) => {
        setEditDto({ ...editDto, inventoryAreaId: inventoryArea.id });
        setEditInstance(
            editInstance ? { ...editInstance, inventoryArea } : null
        );
    },
});

const createInventoryAreaCountCreateContext = (
    setCreateDto: (dto: Partial<CreateInventoryAreaCountDto> | null) => void,
    setCreateInstance: (instance: Partial<InventoryAreaCount> | null) => void,
    createDto: Partial<CreateInventoryAreaCountDto> | null,
    createInstance: Partial<InventoryAreaCount> | null
): InventoryAreaCountCreateContext => ({
    setInventoryArea: (inventoryArea: InventoryArea) => {
        setCreateDto({ ...createDto, inventoryAreaId: inventoryArea.id });
        setCreateInstance(
            createInstance ? { ...createInstance, inventoryArea } : null
        );
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
        dtoConverter: inventoryAreaCountDtoConverter,
        createEditContext: createInventoryAreaCountEditContext,
        createCreateContext: createInventoryAreaCountCreateContext,
    });
}
