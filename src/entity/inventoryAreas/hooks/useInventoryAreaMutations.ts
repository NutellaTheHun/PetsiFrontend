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

// DTO converter for InventoryArea
const inventoryAreaDtoConverter = {
    toCreateDto: (entity: Partial<InventoryArea>): CreateInventoryAreaDto => ({
        areaName: entity.areaName || "",
    }),
    toUpdateDto: (entity: Partial<InventoryArea>): UpdateInventoryAreaDto => ({
        areaName: entity.areaName,
    }),
};

// Context factory functions
const createInventoryAreaEditContext = (
    setEditDto: (dto: Partial<UpdateInventoryAreaDto> | null) => void,
    setEditInstance: (instance: Partial<InventoryArea> | null) => void,
    editDto: Partial<UpdateInventoryAreaDto> | null,
    editInstance: Partial<InventoryArea> | null
): InventoryAreaEditContext => ({
    setAreaName: (areaName: string) => {
        setEditInstance({ ...editInstance, areaName });
        setEditDto({ ...editDto, areaName });
    },
});

const createInventoryAreaCreateContext = (
    setCreateDto: (dto: Partial<CreateInventoryAreaDto> | null) => void,
    setCreateInstance: (instance: Partial<InventoryArea> | null) => void,
    createDto: Partial<CreateInventoryAreaDto> | null,
    createInstance: Partial<InventoryArea> | null
): InventoryAreaCreateContext => ({
    setAreaName: (areaName: string) => {
        setCreateInstance({ ...createInstance, areaName });
        setCreateDto({ ...createDto, areaName });
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
        dtoConverter: inventoryAreaDtoConverter,
        createEditContext: createInventoryAreaEditContext,
        createCreateContext: createInventoryAreaCreateContext,
    });
}
