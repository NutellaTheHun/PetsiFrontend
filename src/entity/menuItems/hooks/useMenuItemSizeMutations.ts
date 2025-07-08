import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemSizeDto,
    MenuItemSize,
    UpdateMenuItemSizeDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type MenuItemSizeEditContext = {
    setName: (name: string) => void;
};

export type MenuItemSizeCreateContext = {
    setName: (name: string) => void;
};

// Context factory functions
const createMenuItemSizeEditContext = (
    editInstance: Partial<MenuItemSize> | null,
    setEditInstance: (instance: Partial<MenuItemSize> | null) => void
): MenuItemSizeEditContext => ({
    setName: (name: string) => {
        setEditInstance({ ...editInstance, name });
    },
});

const createMenuItemSizeCreateContext = (
    createInstance: Partial<MenuItemSize>,
    setCreateInstance: (instance: Partial<MenuItemSize>) => void
): MenuItemSizeCreateContext => ({
    setName: (name: string) => {
        setCreateInstance({ ...createInstance, name });
    },
});

// Entity-specific mutations hook
export function useMenuItemSizeMutations() {
    return useEntityMutations<
        MenuItemSize,
        CreateMenuItemSizeDto,
        UpdateMenuItemSizeDto,
        MenuItemSizeEditContext,
        MenuItemSizeCreateContext
    >({
        endpoint: "/menu-item-sizes",
        createEditContext: createMenuItemSizeEditContext,
        createCreateContext: createMenuItemSizeCreateContext,
    });
}
