import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryAreaCountDto,
    InventoryArea,
    InventoryAreaCount,
    UpdateInventoryAreaCountDto,
} from "../../entityTypes";
import type { InventoryAreaCountRenderContext } from "../property-render/InventoryAreaCount.render";

export type InventoryAreaCountEditContext = Pick<
    InventoryAreaCountRenderContext,
    "setInventoryArea"
>;

export type InventoryAreaCountCreateContext = Pick<
    InventoryAreaCountRenderContext,
    "setInventoryArea"
>;

// DTO converter for InventoryAreaCount
const inventoryAreaCountDtoConverter = {
    toCreateDto: (
        entity: Partial<InventoryAreaCount>
    ): CreateInventoryAreaCountDto => ({
        inventoryAreaId: entity.inventoryArea?.id || 0,
    }),
    toUpdateDto: (
        entity: Partial<InventoryAreaCount>
    ): UpdateInventoryAreaCountDto => ({
        inventoryAreaId: entity.inventoryArea?.id || 0,
    }),
};

// Context factory functions
const createInventoryAreaCountEditContext = (
    editInstance: Partial<InventoryAreaCount> | null,
    setEditInstance: (instance: Partial<InventoryAreaCount> | null) => void
): InventoryAreaCountEditContext => ({
    setInventoryArea: (inventoryArea: InventoryArea) => {
        setEditInstance({ ...editInstance, inventoryArea });
    },
});

const createInventoryAreaCountCreateContext = (
    createInstance: Partial<InventoryAreaCount>,
    setCreateInstance: (instance: Partial<InventoryAreaCount>) => void
): InventoryAreaCountCreateContext => ({
    setInventoryArea: (inventoryArea: InventoryArea) => {
        setCreateInstance({ ...createInstance, inventoryArea });
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
