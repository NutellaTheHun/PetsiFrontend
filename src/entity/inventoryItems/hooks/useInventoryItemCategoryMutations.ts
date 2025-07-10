import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemCategoryDto,
    InventoryItemCategory,
    UpdateInventoryItemCategoryDto,
} from "../../entityTypes";
import type { InventoryItemCategoryRenderContext } from "../property-render/InventoryItemCategory.render";

export type InventoryItemCategoryEditContext = Pick<
    InventoryItemCategoryRenderContext,
    "setCategoryName"
>;

export type InventoryItemCategoryCreateContext = Pick<
    InventoryItemCategoryRenderContext,
    "setCategoryName"
>;

// DTO converter for InventoryItemCategory
const inventoryItemCategoryDtoConverter = {
    toCreateDto: (
        entity: Partial<InventoryItemCategory>
    ): CreateInventoryItemCategoryDto => ({
        itemCategoryName: entity.categoryName || "",
    }),
    toUpdateDto: (
        entity: Partial<InventoryItemCategory>
    ): UpdateInventoryItemCategoryDto => ({
        itemCategoryName: entity.categoryName || "",
    }),
};

// Context factory functions
const createInventoryItemCategoryEditContext = (
    editInstance: Partial<InventoryItemCategory> | null,
    setEditInstance: (instance: Partial<InventoryItemCategory> | null) => void
): InventoryItemCategoryEditContext => ({
    setCategoryName: (name: string) => {
        setEditInstance({ ...editInstance, categoryName: name });
    },
});

const createInventoryItemCategoryCreateContext = (
    createInstance: Partial<InventoryItemCategory>,
    setCreateInstance: (instance: Partial<InventoryItemCategory>) => void
): InventoryItemCategoryCreateContext => ({
    setCategoryName: (name: string) => {
        setCreateInstance({ ...createInstance, categoryName: name });
    },
});

// Entity-specific mutations hook
export function useInventoryItemCategoryMutations() {
    return useEntityMutations<
        InventoryItemCategory,
        CreateInventoryItemCategoryDto,
        UpdateInventoryItemCategoryDto,
        InventoryItemCategoryEditContext,
        InventoryItemCategoryCreateContext
    >({
        endpoint: "/inventory-item-categories",
        dtoConverter: inventoryItemCategoryDtoConverter,
        createEditContext: createInventoryItemCategoryEditContext,
        createCreateContext: createInventoryItemCategoryCreateContext,
    });
}
