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
    toUpdateDto: (
        entity: Partial<MenuItemCategory>
    ): UpdateMenuItemCategoryDto => ({
        categoryName: entity.categoryName,
    }),
};

// Context factory functions
const createMenuItemCategoryEditContext = (
    setEditDto: (dto: Partial<UpdateMenuItemCategoryDto> | null) => void,
    setEditInstance: (instance: Partial<MenuItemCategory> | null) => void,
    editDto: Partial<UpdateMenuItemCategoryDto> | null,
    editInstance: Partial<MenuItemCategory> | null
): MenuItemCategoryEditContext => ({
    setCategoryName: (categoryName: string) => {
        setEditInstance({ ...editInstance, categoryName });
        setEditDto({ ...editDto, categoryName });
    },
});

const createMenuItemCategoryCreateContext = (
    setCreateDto: (dto: Partial<CreateMenuItemCategoryDto> | null) => void,
    setCreateInstance: (instance: Partial<MenuItemCategory> | null) => void,
    createDto: Partial<CreateMenuItemCategoryDto> | null,
    createInstance: Partial<MenuItemCategory> | null
): MenuItemCategoryCreateContext => ({
    setCategoryName: (categoryName: string) => {
        setCreateInstance({ ...createInstance, categoryName });
        setCreateDto({ ...createDto, categoryName });
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
