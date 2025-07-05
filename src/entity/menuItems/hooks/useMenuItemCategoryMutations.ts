import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
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
    toUpdateDto: (entity: MenuItemCategory): UpdateMenuItemCategoryDto => ({
        categoryName: entity.categoryName,
    }),
};

// Context factory functions
const createMenuItemCategoryEditContext = (
    setEditInstance: (instance: MenuItemCategory | null) => void,
    editInstance: MenuItemCategory | null
): MenuItemCategoryEditContext => ({
    setCategoryName: (categoryName: string) => {
        setEditInstance(
            editInstance ? { ...editInstance, categoryName } : null
        );
    },
});

const createMenuItemCategoryCreateContext = (
    setCreateInstance: (instance: Partial<MenuItemCategory> | null) => void,
    createInstance: Partial<MenuItemCategory> | null
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
