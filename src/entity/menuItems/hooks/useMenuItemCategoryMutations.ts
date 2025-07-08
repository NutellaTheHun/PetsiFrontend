import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemCategoryDto,
    MenuItemCategory,
    UpdateMenuItemCategoryDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type MenuItemCategoryEditContext = {
    setCategoryName: (categoryName: string) => void;
};

export type MenuItemCategoryCreateContext = {
    setCategoryName: (categoryName: string) => void;
};

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
        categoryName: entity.categoryName,
    }),
};

// Context factory functions
const createMenuItemCategoryEditContext = (
    editInstance: Partial<MenuItemCategory> | null,
    setEditInstance: (instance: Partial<MenuItemCategory> | null) => void
): MenuItemCategoryEditContext => ({
    setCategoryName: (categoryName: string) => {
        setEditInstance({ ...editInstance, categoryName });
    },
});

const createMenuItemCategoryCreateContext = (
    createInstance: Partial<MenuItemCategory>,
    setCreateInstance: (instance: Partial<MenuItemCategory>) => void
): MenuItemCategoryCreateContext => ({
    setCategoryName: (categoryName: string) => {
        setCreateInstance({ ...createInstance, categoryName });
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
