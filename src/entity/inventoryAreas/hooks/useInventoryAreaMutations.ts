import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateInventoryAreaDto,
    InventoryArea,
    UpdateInventoryAreaDto,
} from "../../entityTypes";

export type InventoryAreaEditContext = {
    setAreaName: (areaName: string) => void;
};

export type InventoryAreaCreateContext = {
    setAreaName: (areaName: string) => void;
};

const inventoryAreaDtoConverter = {
    toCreateDto: (entity: Partial<InventoryArea>): CreateInventoryAreaDto => ({
        areaName: entity.areaName || "",
    }),
    toUpdateDto: (entity: Partial<InventoryArea>): UpdateInventoryAreaDto => ({
        areaName: entity.areaName,
    }),
};

const createInventoryAreaEditContext = (
    setEditDto: (dto: Partial<UpdateInventoryAreaDto>) => void,
    setEditInstance: (instance: Partial<InventoryArea> | null) => void,
    editDto: Partial<UpdateInventoryAreaDto>,
    editInstance: Partial<InventoryArea> | null
): InventoryAreaEditContext => ({
    setAreaName: (areaName: string) => {
        setEditInstance({ ...editInstance, areaName });
        setEditDto({ ...editDto, areaName });
    },
});

const createInventoryAreaCreateContext = (
    setCreateDto: (dto: Partial<CreateInventoryAreaDto>) => void,
    setCreateInstance: (instance: Partial<InventoryArea>) => void,
    createDto: Partial<CreateInventoryAreaDto>,
    createInstance: Partial<InventoryArea>
): InventoryAreaCreateContext => ({
    setAreaName: (areaName: string) => {
        setCreateInstance({ ...createInstance, areaName });
        setCreateDto({ ...createDto, areaName });
    },
});

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
