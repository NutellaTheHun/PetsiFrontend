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

// Context factory functions
const createMenuItemCategoryEditContext = (
    setEditValues: (values: Partial<UpdateMenuItemCategoryDto> | null) => void,
    setEditInstance: (instance: MenuItemCategory | null) => void,
    editValues: Partial<UpdateMenuItemCategoryDto> | null,
    editInstance: MenuItemCategory | null
): MenuItemCategoryEditContext => ({
    setCategoryName: (categoryName: string) => {
        setEditValues({ ...editValues, categoryName });
    },
});

const createMenuItemCategoryCreateContext = (
    setCreateValues: (
        values: Partial<CreateMenuItemCategoryDto> | null
    ) => void,
    setCreateInstance: (instance: Partial<MenuItemCategory> | null) => void,
    createValues: Partial<CreateMenuItemCategoryDto> | null,
    createInstance: Partial<MenuItemCategory> | null
): MenuItemCategoryCreateContext => ({
    setCategoryName: (categoryName: string) => {
        setCreateValues({ ...createValues, categoryName });
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
        createEditContext: createMenuItemCategoryEditContext,
        createCreateContext: createMenuItemCategoryCreateContext,
    });
}
