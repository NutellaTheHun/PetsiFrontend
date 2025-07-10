import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemCategoryDto,
    MenuItemCategory,
    UpdateMenuItemCategoryDto,
} from "../../entityTypes";
import type { MenuItemCategoryRenderContext } from "../property-render/MenuItemCategory.render";

export type MenuItemCategoryEditContext = Pick<
    MenuItemCategoryRenderContext,
    "setCategoryName"
>;

export type MenuItemCategoryCreateContext = Pick<
    MenuItemCategoryRenderContext,
    "setCategoryName"
>;

// DTO converter for MenuItemCategory
const menuItemCategoryDtoConverter = {
    toCreateDto: (
        entity: Partial<MenuItemCategory>
    ): CreateMenuItemCategoryDto => ({
        categoryName: entity.categoryName || "",
    }),
    toUpdateDto: (
        entity: Partial<MenuItemCategory>
    ): UpdateMenuItemCategoryDto => ({
        categoryName: entity.categoryName || "",
    }),
};

// Context factory functions
const createMenuItemCategoryEditContext = (
    editInstance: Partial<MenuItemCategory> | null,
    setEditInstance: (instance: Partial<MenuItemCategory> | null) => void
): MenuItemCategoryEditContext => ({
    setCategoryName: (name: string) => {
        setEditInstance({ ...editInstance, categoryName: name });
    },
});

const createMenuItemCategoryCreateContext = (
    createInstance: Partial<MenuItemCategory>,
    setCreateInstance: (instance: Partial<MenuItemCategory>) => void
): MenuItemCategoryCreateContext => ({
    setCategoryName: (name: string) => {
        setCreateInstance({ ...createInstance, categoryName: name });
    },
});

// Entity-specific mutations hook
export function useMenuItemCategoryMutations() {
    return useEntityMutations<
        MenuItemCategory,
        CreateMenuItemCategoryDto,
        UpdateMenuItemCategoryDto,
        MenuItemCategoryEditContext,
        MenuItemCategoryCreateContext
    >({
        endpoint: "/menu-item-categories",
        dtoConverter: menuItemCategoryDtoConverter,
        createEditContext: createMenuItemCategoryEditContext,
        createCreateContext: createMenuItemCategoryCreateContext,
    });
}
