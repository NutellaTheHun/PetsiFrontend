import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryAreaDto,
    InventoryArea,
    UpdateInventoryAreaDto,
} from "../../entityTypes";
import type { InventoryAreaRenderContext } from "../property-render/InventoryArea.render";

export type InventoryAreaEditContext = Pick<
    InventoryAreaRenderContext,
    "setAreaName"
>;
export type InventoryAreaCreateContext = Pick<
    InventoryAreaRenderContext,
    "setAreaName"
>;

const inventoryAreaDtoConverter = {
    toCreateDto: (entity: Partial<InventoryArea>): CreateInventoryAreaDto => ({
        areaName: entity.areaName || "",
    }),
    toUpdateDto: (entity: Partial<InventoryArea>): UpdateInventoryAreaDto => ({
        areaName: entity.areaName,
    }),
};

const createInventoryAreaEditContext = (
    editInstance: Partial<InventoryArea> | null,
    setEditInstance: (instance: Partial<InventoryArea> | null) => void
): InventoryAreaEditContext => ({
    setAreaName: (areaName: string) => {
        setEditInstance({ ...editInstance, areaName });
    },
});

const createInventoryAreaCreateContext = (
    createInstance: Partial<InventoryArea>,
    setCreateInstance: (instance: Partial<InventoryArea>) => void
): InventoryAreaCreateContext => ({
    setAreaName: (areaName: string) => {
        setCreateInstance({ ...createInstance, areaName });
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
