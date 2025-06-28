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
    setEditValues: (values: Partial<UpdateMenuItemCategoryDto> | null) => void
): MenuItemCategoryEditContext => ({
    setCategoryName: (categoryName: string) => {
        setEditValues({ categoryName });
    },
});

const createMenuItemCategoryCreateContext = (
    setCreateValues: (values: Partial<CreateMenuItemCategoryDto> | null) => void
): MenuItemCategoryCreateContext => ({
    setCategoryName: (categoryName: string) => {
        setCreateValues({ categoryName });
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
